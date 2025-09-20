// version.js

// Contenu HTML du badge de version
const versionHTML = `
<div id="site-version"></div>

<style>
  #site-version {
    position: fixed;
    top: 10px;
    right: 20px;
    background: #1db95436;
    color: #fff;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 0.9em;
    font-family: "Segoe UI", sans-serif;
    z-index: 10000;
    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
  }
</style>
`;

// Fonction pour injecter le badge
function injectVersion() {
    document.body.insertAdjacentHTML('beforeend', versionHTML);

    // Récupère le chemin complet
    const path = window.location.pathname;

    // Découpe en dossiers
    const parts = path.split("/").filter(Boolean);

    // Cherche le premier dossier contenant un chiffre (ex: version)
    const versionFolder = parts.find(part => /\d/.test(part));

    // Injecte le texte
    document.getElementById("site-version").textContent = ` © Roméo | ` + versionFolder || "Version inconnue";
}

// Appel automatique
injectVersion();
