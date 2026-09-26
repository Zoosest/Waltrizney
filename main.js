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
      /* =========================================
         SONG ROWS
         ========================================= */

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

        /* Small breathing room around the text */
        padding-left: 10px;
        padding-right: 10px;

        box-sizing: border-box;
      }

      /* Song numbers stay behind expanding/dropdown panels */
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

        /* IMPORTANT:
           Do not let numbers sit above Whack-A-Track */
        z-index: 1;

        box-sizing: border-box;
      }

      #song-list .song-number:hover,
      #song-list .song-number:focus {
        color: var(--bright-gold, #f5d76e);
      }

      #song-list .song .play {
        display: none;
      }

      /* Text inside the purple song box */
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


      /* =========================================
         ANIMAL BUTTONS ON SONG ROWS
         ========================================= */

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


      /* =========================================
         MUSIC READING CARDS
         ========================================= */

      #cards {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      #cards .card {
        min-width: 0;

        display: flex;
        flex-direction: column;
        align-items: center;

        background: #000;
        box-sizing: border-box;
      }

      /* The old card symbol is hidden because
         the animal artwork replaces it */
      #cards .card .symbol {
        display: none;
      }

      #cards .card-animal-icon {
        width: 112px;
        height: 112px;

        display: block;

        object-fit: contain;
        object-position: center;

        margin: 0 auto;

        box-sizing: border-box;
      }

      #cards .card-animal-fallback {
        width: 112px;
        height: 112px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 3rem;
        line-height: 1;

        margin: 0 auto;

        box-sizing: border-box;
      }


      /* =========================================
         MOBILE
         ========================================= */

      @media (max-width: 700px) {

        #song-list .song {
          grid-template-columns: minmax(0, 1fr) 54px;
          gap: 8px;

          width: calc(100% - 42px);
          margin-left: 42px;

          padding-top: 1px;
          padding-bottom: 1px;

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

          /* Keep numbers behind dropdowns */
          z-index: 1;
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


        /* Mobile cards */
        #cards {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        #cards .card-animal-icon {
          width: 82px;
          height: 82px;
        }

        #cards .card-animal-fallback {
          width: 82px;
          height: 82px;
          font-size: 2.4rem;
        }
      }
    `;

    document.head.appendChild(style);
  }


  /* =========================================
     ANIMAL NAME
     ========================================= */

  function iconLabel(filename) {
    return filename
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());
  }


  /* =========================================
     FALLBACK
     ========================================= */

  function fallback() {
    const span = document.createElement("span");

    span.textContent = FALLBACK_ICON;

    span.style.fontSize = "2rem";
    span.style.lineHeight = "1";
    span.style.display = "block";
    span.style.textAlign = "center";

    return span;
  }


  /* =========================================
     MAKE SONG-ROW ANIMAL BUTTON
     ========================================= */

  function makeImage(filename) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "animal-button";
    button.title = iconLabel(filename);
    button.setAttribute("aria-label", iconLabel(filename));

    const img = document.createElement("img");

    img.className = "animal-icon";
    img.alt = iconLabel(filename);
    img.loading = "lazy";

    img.src = RAW_PREFIX + encodeURIComponent(filename);

    img.onerror = () => {
      img.replaceWith(fallback());
    };

    button.appendChild(img);

    return button;
  }


  /* =========================================
     SONG ROWS
     ========================================= */

  function songRows() {
    return Array.from(
      document.querySelectorAll("#song-list .song")
    );
  }


  /* =========================================
     PLAY SONG FROM ROW
     ========================================= */

  function playSongFromRow(row) {
    if (!row) return;

    const playButton = row.querySelector(".play");

    if (playButton) {
      playButton.click();
    }
  }


  /* =========================================
     NUMBER BUTTON
     ========================================= */

  function makeSongNumber(row, index) {
    const oldNumber = row.querySelector(".song-number");

    if (!oldNumber) return;

    /* Don't rebuild it if already converted */
    if (oldNumber.tagName === "A") return;

    const numberLink = document.createElement("a");

    numberLink.className = "song-number";
    numberLink.href = "#";

    numberLink.textContent =
      oldNumber.textContent.trim();

    numberLink.setAttribute(
      "aria-label",
      `Play song ${index + 1}`
    );

    numberLink.addEventListener("click", event => {
      event.preventDefault();

      playSongFromRow(row);
    });

    oldNumber.replaceWith(numberLink);
  }


  /* =========================================
     PLAY BUTTON
     ========================================= */

  function makePlayButton(row) {
    const button = row.querySelector(".play");

    if (!button) return;

    button.setAttribute(
      "aria-label",
      "Play this song"
    );
  }


  /* =========================================
     PUT ANIMAL ICONS ON SONG ROWS
     ========================================= */

  function putIcons(files) {
    const rows = songRows();

    rows.forEach((row, index) => {

      if (row.querySelector(".animal-button")) {
        return;
      }

      const filename =
        files[index % files.length];

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


  /* =========================================
     PUT ANIMAL ICONS ON MUSIC READING CARDS
     ========================================= */

  function addCardIcons(files) {

    /*
      IMPORTANT:
      The actual card container is #cards
      and the individual cards are .card.
    */

    const cards = Array.from(
      document.querySelectorAll("#cards .card")
    );

    cards.forEach((card, index) => {

      /* Don't duplicate icons */
      if (card.querySelector(".card-animal-icon")) {
        return;
      }

      const filename =
        files[index % files.length];

      if (!filename) return;

      const img = document.createElement("img");

      img.className = "card-animal-icon";

      img.alt = iconLabel(filename);

      img.title = iconLabel(filename);

      img.loading = "lazy";

      img.src =
        RAW_PREFIX + encodeURIComponent(filename);

      img.onerror = () => {

        const replacement =
          document.createElement("div");

        replacement.className =
          "card-animal-fallback";

        replacement.textContent =
          FALLBACK_ICON;

        card.replaceChild(
          replacement,
          img
        );
      };

      /*
        Put the animal artwork at the beginning
        of the card so it appears where the
        animal artwork belongs.
      */
      card.insertBefore(
        img,
        card.firstChild
      );
    });
  }


  /* =========================================
     LOAD ANIMAL FILES FROM GITHUB
     ========================================= */

  async function getAnimalFiles() {

    try {

      const response =
        await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `GitHub API error: ${response.status}`
        );
      }

      const data =
        await response.json();

      if (!Array.isArray(data)) {
        throw new Error(
          "Unexpected GitHub API response."
        );
      }

      return data
        .filter(
          item =>
            item &&
            item.type === "file"
        )
        .map(item => item.name)
        .filter(
          name =>
            /\.(png|jpg|jpeg|webp)$/i.test(name)
        )
        .sort(
          (a, b) =>
            a.localeCompare(b)
        );

    } catch (error) {

      console.error(
        "Unable to load animal icons:",
        error
      );

      return [];
    }
  }


  /* =========================================
     INITIALIZE
     ========================================= */

  async function init() {

    addStyles();

    const files =
      await getAnimalFiles();

    if (!files.length) {

      console.warn(
        "No animal icon files were found."
      );

      return;
    }

    putIcons(files);

    addCardIcons(files);
  }


  /* =========================================
     START
     ========================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();
  }

})();
