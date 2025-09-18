const podcastGrid = document.getElementById("podcastGrid");
const audio = document.getElementById("audio");
const player = document.getElementById("player");
const playerTitle = document.getElementById("playerTitle");
const podcastTitle = document.getElementById("podcastTitle");
const podcastCover = document.getElementById("podcastCover");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressFill = document.getElementById("progressFill");
const timeDisplay = document.getElementById("time");
const closePlayer = document.getElementById("closePlayer");
const filtersDiv = document.querySelector(".filters");
const sortSelect = document.getElementById("sortSelect");

// Description dans le player
const podcastDesc = document.createElement("p");
podcastDesc.style.margin = "5px 0";
podcastDesc.style.fontSize = "1em";
podcastDesc.style.opacity = "0.9";
podcastDesc.style.textAlign = "left";
document.querySelector(".player-info").appendChild(podcastDesc);

let currentIndex = 0;
let currentFilter = "All";
let currentSort = "date";
let filteredPodcasts = [];

// Création des boutons filtres dynamiques
const categories = ["All", ...new Set(podcasts.map(p => p.category))];
categories.forEach(cat => {
  const btn = document.createElement("button");
  btn.textContent = cat;
  btn.dataset.category = cat;
  if(cat === "All") btn.classList.add("active");
  btn.addEventListener("click", () => {
    currentFilter = cat;
    filtersDiv.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderCards();
  });
  filtersDiv.appendChild(btn);
});

// Tri
sortSelect.addEventListener("change", () => {
  currentSort = sortSelect.value;
  renderCards();
});

// Affichage des cartes
function renderCards() {
  podcastGrid.innerHTML = "";

  // Filtrer
  filteredPodcasts = podcasts.filter(p => currentFilter === "All" || p.category === currentFilter);

  // Trier
  filteredPodcasts.sort((a,b) => {
    if(currentSort === "date") return new Date(b.date) - new Date(a.date);
    if(currentSort === "title") return a.title.localeCompare(b.title);
    if(currentSort === "category") return a.category.localeCompare(b.category);
  });

  filteredPodcasts.forEach((podcast, index) => {
    const card = document.createElement("div");
    card.className = "card";

    // Image avec fallback
    const img = document.createElement("img");
    img.src = podcast.image || "default.png";
    img.alt = "cover";
    img.onerror = () => { img.src = "default.jpg"; };
    card.appendChild(img);

    // Titre
    const date = new Date(podcast.date);
    const now = new Date();
    const isNew = (now - date)/(1000*60*60*24) <= 30;
    const title = document.createElement("h2");
    title.innerHTML = `${podcast.title}${isNew ? '<span class="new">NEW</span>' : ''}`;
    card.appendChild(title);

    // Description limitée
    const desc = document.createElement("p");
    const maxLength = 60; // limite de caractères
    desc.textContent = podcast.description.length > maxLength
      ? podcast.description.slice(0,maxLength) + "..."
      : podcast.description;
    card.appendChild(desc);

    // Catégorie
    const cat = document.createElement("p");
    cat.className = "category";
    cat.textContent = podcast.category;
    card.appendChild(cat);

    // Click pour jouer
    card.addEventListener("click", () => playPodcast(index));
    podcastGrid.appendChild(card);
  });
}

// Jouer un podcast
function playPodcast(index){
  currentIndex = index;
  const podcast = filteredPodcasts[index]; 
  podcastTitle.textContent = podcast.title;
  podcastDesc.textContent = podcast.description;
  playerTitle.textContent = podcast.title;

  podcastCover.src = podcast.image || "default.png";
  podcastCover.onerror = () => { podcastCover.src = "default.png"; };

  audio.src = podcast.file;
  audio.play();
  player.classList.remove("closed");
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Play/Pause
playPauseBtn.addEventListener("click", () => {
  if(audio.paused){
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Prev / Next
prevBtn.addEventListener("click", ()=>{
  if(filteredPodcasts.length === 0) return;
  currentIndex = (currentIndex - 1 + filteredPodcasts.length) % filteredPodcasts.length;
  playPodcast(currentIndex);
});
nextBtn.addEventListener("click", ()=>{
  if(filteredPodcasts.length === 0) return;
  currentIndex = (currentIndex + 1) % filteredPodcasts.length;
  playPodcast(currentIndex);
});

// Progress bar
audio.addEventListener("timeupdate", ()=>{
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  progressFill.style.width = percent + "%";
  updateTime();
});

progressFill.parentElement.addEventListener("click", e => {
  const rect = e.currentTarget.getBoundingClientRect();
  const pos = (e.clientX - rect.left)/rect.width;
  audio.currentTime = pos * audio.duration;
});

function updateTime(){
  const format = t => { 
    const m=Math.floor(t/60); 
    const s=Math.floor(t%60).toString().padStart(2,"0"); 
    return `${m}:${s}`; 
  };
  timeDisplay.textContent = `${format(audio.currentTime)} / ${format(audio.duration || 0)}`;
}

// Fermer le player
closePlayer.addEventListener("click", () => {
  player.classList.toggle("closed");
});

// Initial render
renderCards();
