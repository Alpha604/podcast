const container = document.getElementById("news-container");
const mainSection = document.getElementById("main-section");
const detailsPage = document.getElementById("details-page");

const detailsImage = document.getElementById("details-image");
const detailsTitle = document.getElementById("details-title");
const detailsText = document.getElementById("details-text");
const backBtn = detailsPage.querySelector(".back-btn");

const searchInput = document.getElementById("search-input");
const badgeFilter = document.getElementById("badge-filter");
const sortFilter = document.getElementById("sort-filter");

const fallbackImage = "default.jpg";
const bannerImages = { 
  "Exclusif":"banners/exclusif.jpg", 
  "Échec":"banners/echec.jpg", 
  "Tournoi":"banners/tournoi.jpg", 
  "Actu":"banners/actu.jpg" 
};

// Vérifie si une news est "new" (7 jours)
function isNew(dateStr){
  const diff = (new Date() - new Date(dateStr)) / (1000*60*60*24);
  return diff <= 7;
}

// Formate le texte pour tableaux, blocs copiable et iframe
function formatContent(text){
  let html = text.replace(/</g,"&lt;").replace(/>/g,"&gt;");

  // Tableau
  html = html.replace(/\/\/tableau([\s\S]*?)\/\/ftableau/g, (_, tableText) => {
    const lines = tableText.trim().split("\n");
    const headers = lines[0].split("|").map(h=>h.trim());
    const rows = lines.slice(1).map(l=>l.split("|").map(c=>c.trim()));
    let table = "<table><thead><tr>" + headers.map(h=>`<th>${h}</th>`).join("") + "</tr></thead>";
    table += "<tbody>" + rows.map(r=>"<tr>" + r.map(c=>`<td>${c}</td>`).join("") + "</tr>").join("") + "</tbody></table>";
    return table;
  });

  // Bloc copiable
  html = html.replace(/\/\/copy([\s\S]*?)\/\/fcopy/g, (_, copyText) => {
    return `<div class="copy-block">
      <pre>${copyText.trim()}</pre>
      <button class="copy-btn">Copier</button>
    </div>`;
  });

  // Bloc iframe
  html = html.replace(/\/\/iframe([\s\S]*?)\/\/fiframe/g, (_, iframeSrc) => {
    return `<div class="iframe-block">
      <iframe src="${iframeSrc.trim()}" frameborder="0"></iframe>
    </div>`;
  });

  // Sauts de ligne
  return html.replace(/\n/g,"<br>");
}

// Active les boutons copier
function attachCopyButtons(){
  document.querySelectorAll(".copy-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const pre = btn.previousElementSibling;
      navigator.clipboard.writeText(pre.innerText).then(()=>{
        btn.textContent = "Copié ✅";
        setTimeout(()=>btn.textContent="Copier",1000);
      });
    });
  });
}

// Affiche les news
function renderNews(arr){
  container.innerHTML="";
  arr.forEach(news=>{
    const card=document.createElement("div"); 
    card.className="news-card";

    const imgSrc = news.image && news.image.trim()!=="" ? news.image : fallbackImage;

    card.innerHTML = `
      <div class="news-header">
        <img src="${imgSrc}" onerror="this.src='${fallbackImage}'">
        <div class="news-badges">${news.badges.map(b=>`<span class="badge">${b}</span>`).join("")}</div>
        ${isNew(news.date)?`<div class="new-tag">NEW</div>`:""}
      </div>
      <div class="news-body">
        <h3>${news.title}</h3>
        <p class="news-date">Publié le: ${news.date}</p>
        <button>Lire l'article</button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", ()=> openDetails(news));
    container.appendChild(card);
  });
}

// Page article
function openDetails(news){
  mainSection.style.display="none";
  detailsPage.style.display="block";

  const mainBadge = news.badges.length>0 ? news.badges[0] : null;
  const banner = mainBadge && bannerImages[mainBadge] ? bannerImages[mainBadge] : fallbackImage;

  detailsImage.src = banner;
  detailsImage.onerror = ()=> detailsImage.src=fallbackImage;

  detailsTitle.textContent = news.title;

  // Si content est un fichier JS
  if(typeof news.content === "string" && news.content.endsWith(".js")){
    const script = document.createElement("script");
    script.src = news.content;
    script.onload = () => {
      const content = typeof newsText !== "undefined" ? newsText : "Contenu indisponible.";
      detailsText.innerHTML = formatContent(content);
      attachCopyButtons();
      newsText = undefined;
      script.remove();
    };
    script.onerror = () => { detailsText.innerHTML="Impossible de charger le contenu."; };
    document.body.appendChild(script);
  } else {
    detailsText.innerHTML = formatContent(news.content);
    attachCopyButtons();
  }
}

// Bouton retour
backBtn.addEventListener("click", ()=>{
  detailsPage.style.display="none";
  mainSection.style.display="block";
});

// Filtrage et tri
function filterAndSortNews(){
  let arr = [...newsData];
  const search = searchInput.value.toLowerCase();
  const badge = badgeFilter.value;

  if(search){
    arr = arr.filter(n=>n.title.toLowerCase().includes(search) || 
      (typeof n.content === "string" && n.content.toLowerCase().includes(search)));
  }
  if(badge){
    arr = arr.filter(n=>n.badges.includes(badge));
  }

  arr.sort((a,b)=> sortFilter.value==="newest" ? new Date(b.date)-new Date(a.date) : new Date(a.date)-new Date(b.date));
  renderNews(arr);
}

searchInput.addEventListener("input", filterAndSortNews);
badgeFilter.addEventListener("change", filterAndSortNews);
sortFilter.addEventListener("change", filterAndSortNews);

// Initialisation
filterAndSortNews();
