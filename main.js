(() => {
  "use strict";

  const API_URL =
    "https://api.github.com/repos/the-zeusest/waltrizney-/contents/assets/animal-icons?ref=main";

  const RAW_PREFIX =
    "https://raw.githubusercontent.com/the-zeusest/waltrizney-/main/assets/animal-icons/";

  const FALLBACK_ICON = "🐾";

  function addStyles() {
    if (document.getElementById("animal-icon-styles")) return;

    const style = document.createElement("style");
    style.id = "animal-icon-styles";

    style.textContent = `
      /* =========================
         DESKTOP SONG ROWS
         ========================= */

      #song-list .song {
        position: relative;
        display: grid;
        grid-template-columns: minmax(0, 1fr) 62px;
        gap: 10px;
        width: calc(100% - 58px);
        min-width: 0;
        margin-left: 58px;
        align-items: center;

        padding-top: 2px;
        padding-bottom: 2px;

        /* Tiny breathing room so text doesn't touch box edge */
        padding-left: 10px;
        padding-right: 10px;

        box-sizing: border-box;
      }

      #song-list .song-number {
        position: absolute;

        left: calc(
          -1 * (
            (
              (100vw - min(100vw - 24px, 900px)) / 2 + 58px
            ) / 2
          ) - 29px
        );

        top: 50%;
        transform: translateY(-50%);

        display: flex;
        align-items: center;
        justify-content: center;

        width: 58px;

        color: var(--gold, #d4af37);
        background: transparent;
        border: 0;
        outline: 0;
        box-shadow: none;
        text-decoration: none;

        font-weight: 700;
        font-size: 1rem;
        line-height: 1;

        padding: 0;
        margin: 0;

        text-align: center;
        white-space: nowrap;

        cursor: pointer;
        z-index: 20;
        box-sizing: border-box;
      }

      #song-list .song-number:hover,
      #song-list .song-number:focus {
        color: var(--bright-gold, #f5d76e);
      }

      #song-list .song .play {
        display: none;
      }

      #song-list .song-title {
        min-width: 0;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-self: stretch;

        text-align: left;
        box-sizing: border-box;

        line-height: 1.2;
      }

      #song-list .song-title {
        text-overflow: ellipsis;
      }

      #song-list .song-title small {
        display: block;
        min-width: 0;
        overflow: hidden;

        text-overflow: ellipsis;
        white-space: nowrap;

        margin-top: 3px;
        line-height: 1.2;
      }

      /* =========================
         ANIMAL BUTTON
         ========================= */

      #song-list .animal-button {
        width: 62px;
        height: 62px;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0;
        margin: 0;

        border: 0;
        background: transparent;

        cursor: pointer;
        box-sizing: border-box;
      }

      #song-list .animal-button img {
        display: block;

        width: 58px;
        height: 58px;

        object-fit: contain;
        object-position: center;

        border: 0;
        background: transparent;

        box-sizing: border-box;
      }

      /* =========================
         MOBILE SONG ROWS
         ========================= */

      @media (max-width: 700px) {
        #song-list .song {
          grid-template-columns: minmax(0, 1fr) 54px;
          gap: 8px;

          width: calc(100% - 42px);
          margin-left: 42px;

          padding-top: 1px;
          padding-bottom: 1px;

          /* Same tiny breathing room on phones */
          padding-left: 8px;
          padding-right: 8px;

          box-sizing: border-box;
        }

        #song-list .song-number {
          left: calc(
            -1 * (
              (
                (100vw - min(100vw - 24px, 900px)) / 2 + 42px
              ) / 2
            ) - 21px
          );

          width: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          text-align: center;
          font-size: .9rem;
        }

        #song-list .song-title {
          min-width: 0;
          overflow: hidden;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-self: stretch;

          text-align: left;
          box-sizing: border-box;

          line-height: 1.2;
        }

        #song-list .song-title small {
          display: block;
          min-width: 0;
          overflow: hidden;

          text-overflow: ellipsis;
          white-space: nowrap;

          margin-top: 3px;
          line-height: 1.2;
        }

        #song-list .animal-button {
          width: 54px;
          height: 54px;
        }

        #song-list .animal-button img {
          width: 50px;
          height: 50px;
        }
      }

      /* =========================
         TAROT / MUSIC READING CARDS
         ========================= */

      #card-results {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      .music-card {
        min-width: 0;
      }

      .music-card .animal-icon {
        width: 112px;
        height: 112px;

        object-fit: contain;
        object-position: center;

        display: block;
        margin: 0 auto;
      }

      @media (max-width: 700px) {
        #card-results {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .music-card .animal-icon {
          width: 82px;
          height: 82px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function iconLabel(filename) {
    return filename
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  function fallback() {
    const span = document.createElement("span");
    span.textContent = FALLBACK_ICON;
    span.style.fontSize = "2rem";
    span.style.lineHeight = "1";
    span.style.display = "block";
    span.style.textAlign = "center";
    return span;
  }

  function makeImage(filename, sizeClass = "") {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "animal-button";
    button.title = iconLabel(filename);

    const img = document.createElement("img");

    img.className = `animal-icon ${sizeClass}`.trim();
    img.alt = iconLabel(filename);
    img.loading = "lazy";
    img.src = RAW_PREFIX + encodeURIComponent(filename);

    img.onerror = () => {
      img.replaceWith(fallback());
    };

    button.appendChild(img);

    return button;
  }

  function songRows() {
    return Array.from(document.querySelectorAll("#song-list .song"));
  }

  function playSongFromRow(row) {
    if (!row) return;

    const playButton = row.querySelector(".play");

    if (playButton) {
      playButton.click();
    }
  }

  function makeSongNumber(row, index) {
    const oldNumber = row.querySelector(".song-number");

    if (!oldNumber) return;

    const numberLink = document.createElement("a");

    numberLink.className = "song-number";
    numberLink.href = "#";
    numberLink.textContent = oldNumber.textContent.trim();
    numberLink.setAttribute("aria-label", `Play song ${index + 1}`);

    numberLink.addEventListener("click", event => {
      event.preventDefault();
      playSongFromRow(row);
    });

    oldNumber.replaceWith(numberLink);
  }

  function makePlayButton(row) {
    const button = row.querySelector(".play");

    if (!button) return;

    button.setAttribute("aria-label", "Play this song");
  }

  function putIcons(files) {
    const rows = songRows();

    rows.forEach((row, index) => {
      if (row.querySelector(".animal-button")) return;

      const filename = files[index % files.length];

      if (!filename) return;

      const icon = makeImage(filename);

      row.appendChild(icon);

      icon.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        playSongFromRow(row);
      });

      makeSongNumber(row, index);
      makePlayButton(row);
    });
  }

  function addCardIcons(files) {
    const cards = Array.from(
      document.querySelectorAll(
        "#card-results .music-card, #card-results .card"
      )
    );

    cards.forEach((card, index) => {
      if (card.querySelector(".animal-icon")) return;

      const filename = files[index % files.length];

      if (!filename) return;

      const img = document.createElement("img");

      img.className = "animal-icon";
      img.alt = iconLabel(filename);
      img.loading = "lazy";
      img.src = RAW_PREFIX + encodeURIComponent(filename);

      img.onerror = () => {
        img.replaceWith(fallback());
      };

      card.appendChild(img);

      const label = document.createElement("div");

      label.className = "animal-label";
      label.textContent = iconLabel(filename);

      card.appendChild(label);
    });
  }

  async function getAnimalFiles() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected GitHub API response.");
      }

      return data
        .filter(item => item && item.type === "file")
        .map(item => item.name)
        .filter(name => /\.(png|jpg|jpeg|webp)$/i.test(name))
        .sort((a, b) => a.localeCompare(b));
    } catch (error) {
      console.error("Unable to load animal icons:", error);
      return [];
    }
  }

  async function init() {
    addStyles();

    const files = await getAnimalFiles();

    if (!files.length) {
      console.warn("No animal icon files were found.");
      return;
    }

    putIcons(files);
    addCardIcons(files);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
