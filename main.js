/* Add one uploaded animal icon to every song row and its tarot card. */
(() => {
  "use strict";

  const API_URL = "https://api.github.com/repos/the-zeusest/waltrizney-/contents/assets/animal-icons?ref=main";
  const RAW_PREFIX = "https://raw.githubusercontent.com/the-zeusest/waltrizney-/main/assets/animal-icons/";
  const FALLBACK_ICON = "🐾";
  let iconFiles = [];
  let updatingCards = false;

  function addStyles() {
    if (document.getElementById("animal-icon-styles")) return;
    const style = document.createElement("style");
    style.id = "animal-icon-styles";
    style.textContent = `
      /* Keep the song number on the left and the animal on the right. */
      #song-list .song {
        display: grid;
        grid-template-columns: 28px minmax(0, 1fr) auto;
        gap: 10px;
        width: 100%;
        min-width: 0;
        align-items: stretch;
      }
      #song-list .song-number { display: none; }
      #song-list .song .play { display: none; }
      .song-number-button {
        align-self: center;
        justify-self: start;
        padding: 0;
        border: 0;
        background: transparent;
        color: var(--gold, #d4af37);
        cursor: pointer;
        font: inherit;
        font-weight: bold;
        line-height: 1;
      }
      .song-number-button:focus-visible {
        outline: 2px solid var(--bright-gold, #f5d76e);
        outline-offset: 2px;
      }
      .song-number-button:hover { color: var(--bright-gold, #f5d76e); }
      .song-animal-button {
        display: grid;
        place-items: center;
        align-self: stretch;
        width: 64px;
        min-width: 64px;
        min-height: 52px;
        height: 100%;
        aspect-ratio: 1;
        padding: 0;
        border: 1px solid var(--gold, #d4af37);
        border-radius: 10px;
        background: #000;
        cursor: pointer;
        overflow: hidden;
      }
      .song-animal-button:focus-visible {
        outline: 2px solid var(--bright-gold, #f5d76e);
        outline-offset: 2px;
      }
      .song-animal-button:hover { background: #261334; }
      .song-animal-icon, .song-animal-fallback {
        width: 100%;
        height: 100%;
        min-width: 0;
        min-height: 0;
        object-fit: contain;
        border-radius: 8px;
        background: #000;
        padding: 2px;
        box-sizing: border-box;
      }
      .song-animal-fallback { display: grid; place-items: center; font-size: 2.1rem; }
      .song-title { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .song-title small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      #cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
      #cards .card { min-height: 0; height: auto; padding: 10px 8px; background: #000; display: flex; flex-direction: column; justify-content: space-between; align-items: center; }
      #cards .card .symbol { display: none; }
      #cards .card strong { margin: 0 0 4px; }
      .card-animal-icon { display: block; width: 112px; height: 112px; margin: 0 auto 6px; object-fit: contain; border-radius: 12px; background: #000; padding: 0; }
      .card-animal-fallback { display: block; width: 112px; height: 112px; margin: 0 auto 6px; padding-top: 28px; box-sizing: border-box; text-align: center; font-size: 3rem; line-height: 1; background: #000; }
      @media (max-width: 640px) {
        #song-list .song { grid-template-columns: 22px minmax(0, 1fr) auto; gap: 8px; padding: 8px; }
        .song-animal-button { width: 52px; min-width: 52px; min-height: 46px; }
        .song-animal-fallback { font-size: 1.8rem; }
        #cards { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        #cards .card { padding: 8px 5px; }
        .card-animal-icon, .card-animal-fallback { width: 82px; height: 82px; }
        .card-animal-fallback { padding-top: 20px; font-size: 2.3rem; }
      }
    `;
    document.head.appendChild(style);
  }

  function iconLabel(filename) {
    return filename.replace(/\.(png|jpe?g|webp|gif)$/i, "").replace(/[-_]+/g, " ").replace(/\b\w/g, letter => letter.toUpperCase());
  }

  function fallback(className = "song-animal-fallback") {
    const element = document.createElement("span");
    element.className = className;
    element.textContent = FALLBACK_ICON;
    element.setAttribute("aria-label", "Animal icon");
    return element;
  }

  function makeImage(file, className) {
    const image = document.createElement("img");
    image.className = className;
    image.src = RAW_PREFIX + encodeURIComponent(file.name);
    image.alt = iconLabel(file.name);
    image.loading = "lazy";
    image.decoding = "async";
    image.onerror = () => image.replaceWith(fallback(className.replace("-icon", "-fallback")));
    return image;
  }

  function songRows() { return [...document.querySelectorAll("#song-list .song, .song")]; }

  function makeNumberButton(row, songNumber) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "song-number-button";
    button.setAttribute("aria-label", `Play song ${songNumber}`);
    button.title = `Play song ${songNumber}`;
    button.textContent = songNumber;
    button.addEventListener("click", () => row.querySelector(".play")?.click());
    return button;
  }

  function makePlayButton(row, icon) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "song-animal-button";
    button.setAttribute("aria-label", "Play song");
    button.title = "Play song";
    button.append(icon);
    button.addEventListener("click", () => row.querySelector(".play")?.click());
    return button;
  }

  function putIcons() {
    songRows().forEach((row, index) => {
      if (row.querySelector(".song-number-button")) return;
      const icon = iconFiles.length ? makeImage(iconFiles[index % iconFiles.length], "song-animal-icon") : fallback();
      row.prepend(makeNumberButton(row, index + 1));
      row.append(makePlayButton(row, icon));
    });
  }

  function addCardIcons() {
    if (updatingCards) return;
    updatingCards = true;
    try {
      const rows = songRows();
      document.querySelectorAll("#cards .card").forEach(card => {
        const link = card.querySelector("a");
        const match = link?.textContent.match(/(\d+)/);
        const songIndex = match ? Number(match[1]) - 1 : -1;
        const animalFile = iconFiles[songIndex];
        const heading = card.querySelector("strong");
        const label = animalFile ? iconLabel(animalFile.name) : "Animal";
        if (heading && heading.textContent !== label) heading.textContent = label;
        card.querySelector(".symbol")?.remove();
        if (card.querySelector(".card-animal-icon, .card-animal-fallback")) return;
        const rowIcon = rows[songIndex]?.querySelector(".song-animal-icon, .song-animal-fallback");
        const icon = rowIcon ? rowIcon.cloneNode(true) : (animalFile ? makeImage(animalFile, "card-animal-icon") : fallback("card-animal-fallback"));
        icon.className = rowIcon ? "card-animal-icon" : icon.className;
        card.prepend(icon);
      });
    } finally { updatingCards = false; }
  }

  async function init() {
    addStyles();
    const cards = document.getElementById("cards");
    if (cards) new MutationObserver(addCardIcons).observe(cards, { childList: true, subtree: true });
    try {
      const response = await fetch(API_URL, { headers: { Accept: "application/vnd.github+json" } });
      if (!response.ok) throw new Error(`Icon list request failed: ${response.status}`);
      iconFiles = (await response.json()).filter(file => file && file.type === "file" && /\.(png|jpe?g|webp|gif)$/i.test(file.name)).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) { console.warn("Animal icons could not be loaded; using paw-print placeholders.", error); }
    putIcons();
    addCardIcons();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
