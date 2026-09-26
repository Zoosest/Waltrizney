/* Animal icons for song rows + shuffled Music Reading cards. */
(() => {
  "use strict";

  const API_URL =
    "https://api.github.com/repos/the-zeusest/waltrizney-/contents/assets/animal-icons?ref=main";

  const RAW_PREFIX =
    "https://raw.githubusercontent.com/the-zeusest/waltrizney-/main/assets/animal-icons/";

  const FALLBACK_ICON = "🐾";

  let iconFiles = [];
  let updatingCards = false;


  /* =========================================
     STYLES
     ========================================= */

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
        padding-left: 10px;
        padding-right: 10px;

        box-sizing: border-box;
      }


      /* =========================================
         SONG NUMBERS
         ========================================= */

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

        font-weight: 700;
        font-size: 1rem;
        line-height: 1;

        padding: 0;
        margin: 0;

        text-align: center;
        white-space: nowrap;

        cursor: pointer;

        z-index: 0 !important;

        box-sizing: border-box;
      }

      #song-list .song-number:hover,
      #song-list .song-number:focus {
        color: var(--bright-gold, #f5d76e);
        z-index: 0 !important;
      }


      /* =========================================
         HIDE ORIGINAL PLAY BUTTON
         ========================================= */

      #song-list .song .play {
        display: none;
      }


      /* =========================================
         SONG TEXT
         ========================================= */

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
         SONG ROW ANIMAL
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

        grid-template-columns:
          repeat(3, minmax(0, 1fr));

        gap: 9px;

        margin: 12px 0 22px;
      }

      #cards .card {
        min-width: 0;
        min-height: 0;

        box-sizing: border-box;

        padding: 7px 5px;

        display: flex;
        flex-direction: column;

        justify-content: space-between;
        align-items: center;

        overflow: hidden;
      }


      /* Hide the decorative tarot symbol.
         The animal becomes the visual symbol. */

      #cards .card .symbol {
        display: none;
      }


      /* =========================================
         CARD READING TITLE
         ========================================= */

      #cards .card strong {
        display: block;

        margin: 0 0 4px;

        font-size: .72rem;

        line-height: 1.15;

        text-align: center;
      }


      /* =========================================
         CARD ANIMAL
         ========================================= */

      #cards .card-animal-icon {
        display: block;

        width: 96px;
        height: 96px;

        margin: 0 auto 4px;

        object-fit: contain;
        object-position: center;

        border: 0;
        background: transparent;

        box-sizing: border-box;

        flex: 0 0 auto;
      }


      /* =========================================
         CARD ANIMAL NAME
         ========================================= */

      #cards .card-animal-name {
        display: block;

        margin: 0 0 3px;

        color: var(--bright-purple, #e0aaff);

        font-size: .66rem;
        line-height: 1.1;

        text-align: center;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        max-width: 100%;
      }


      /* =========================================
         CARD SONG LINK
         ========================================= */

      #cards .card a {
        display: block;

        max-width: 100%;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        font-size: .66rem;

        line-height: 1.1;
      }


      /* =========================================
         MOBILE
         ========================================= */

      @media (max-width: 700px) {

        #song-list .song {
          grid-template-columns:
            minmax(0, 1fr) 54px;

          gap: 8px;

          width: calc(100% - 42px);

          margin-left: 42px;

          padding-top: 1px;
          padding-bottom: 1px;

          padding-left: 8px;
          padding-right: 8px;
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

          font-size: .9rem;

          z-index: 0 !important;
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
          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 7px;

          margin-top: 10px;
          margin-bottom: 18px;
        }


        #cards .card {
          padding: 5px 4px;
        }


        #cards .card-animal-icon {
          width: 70px;
          height: 70px;

          margin-bottom: 3px;
        }


        #cards .card-animal-name {
          font-size: .58rem;
          margin-bottom: 2px;
        }


        #cards .card strong {
          font-size: .65rem;
          margin-bottom: 2px;
        }


        #cards .card a {
          font-size: .58rem;
        }
      }


      /* Very small phones */

      @media (max-width: 380px) {

        #cards {
          gap: 5px;
        }

        #cards .card {
          padding: 4px 3px;
        }

        #cards .card-animal-icon {
          width: 62px;
          height: 62px;
        }

        #cards .card-animal-name {
          font-size: .54rem;
        }

        #cards .card strong {
          font-size: .6rem;
        }

        #cards .card a {
          font-size: .54rem;
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

  function fallback(className = "") {
    const span = document.createElement("span");

    if (className) {
      span.className = className;
    }

    span.textContent = FALLBACK_ICON;

    span.style.display = "flex";
    span.style.alignItems = "center";
    span.style.justifyContent = "center";
    span.style.fontSize = "2rem";
    span.style.lineHeight = "1";

    return span;
  }


  /* =========================================
     MAKE ANIMAL IMAGE
     ========================================= */

  function makeImage(filename) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "animal-button";

    const label = iconLabel(filename);

    button.title = label;
    button.setAttribute("aria-label", label);

    const img = document.createElement("img");

    img.className = "animal-icon";

    img.alt = label;

    img.loading = "lazy";
    img.decoding = "async";

    img.src =
      RAW_PREFIX +
      encodeURIComponent(filename);

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

    const playButton =
      row.querySelector(".play");

    if (playButton) {
      playButton.click();
    }
  }


  /* =========================================
     SONG NUMBERS
     ========================================= */

  function makeSongNumber(row, index) {
    const oldNumber =
      row.querySelector(".song-number");

    if (!oldNumber) return;

    if (oldNumber.tagName === "A") {
      return;
    }

    const numberLink =
      document.createElement("a");

    numberLink.className =
      "song-number";

    numberLink.href = "#";

    numberLink.textContent =
      oldNumber.textContent.trim();

    numberLink.setAttribute(
      "aria-label",
      `Play song ${index + 1}`
    );

    numberLink.addEventListener(
      "click",
      event => {
        event.preventDefault();

        playSongFromRow(row);
      }
    );

    oldNumber.replaceWith(numberLink);
  }


  /* =========================================
     PLAY BUTTON
     ========================================= */

  function makePlayButton(row) {
    const button =
      row.querySelector(".play");

    if (!button) return;

    button.setAttribute(
      "aria-label",
      "Play this song"
    );
  }


  /* =========================================
     SONG ROW ANIMAL ICONS
     ========================================= */

  function putIcons() {
    const rows = songRows();

    rows.forEach((row, index) => {

      if (
        row.querySelector(".animal-button")
      ) {
        return;
      }

      const filename =
        iconFiles[index % iconFiles.length];

      if (!filename) return;

      const icon =
        makeImage(filename);

      row.appendChild(icon);

      icon.addEventListener(
        "click",
        event => {
          event.preventDefault();
          event.stopPropagation();

          playSongFromRow(row);
        }
      );

      makeSongNumber(row, index);
      makePlayButton(row);
    });
  }


  /* =========================================
     FIND SONG NUMBER FROM CARD
     ========================================= */

  function getCardSongIndex(card) {
    /*
      Your working card system creates links like:

      "Play song 47"

      We deliberately read the NUMBER
      from the actual card.

      This is what makes shuffled cards
      match their correct animals.
    */

    const link =
      card.querySelector("a");

    if (!link) {
      return -1;
    }

    const match =
      link.textContent.match(/(\d+)/);

    if (!match) {
      return -1;
    }

    const songNumber =
      Number(match[1]);

    if (
      !Number.isInteger(songNumber) ||
      songNumber < 1
    ) {
      return -1;
    }

    return songNumber - 1;
  }


  /* =========================================
     ADD ANIMAL TO ONE CARD
     ========================================= */

  function addAnimalToCard(card) {
    if (!card) return;

    const songIndex =
      getCardSongIndex(card);

    if (songIndex < 0) return;

    const animalFile =
      iconFiles[songIndex];

    if (!animalFile) return;


    /*
      If this card already has an animal,
      check whether it is the correct one.

      This is important because the cards
      are shuffled and can change.
    */

    const existing =
      card.querySelector(
        ".card-animal-icon, .card-animal-fallback"
      );

    const desiredName =
      iconLabel(animalFile);


    if (
      existing &&
      existing.dataset.songIndex ===
        String(songIndex)
    ) {
      return;
    }


    /*
      Remove an old animal if the card
      has been reused for a different
      shuffled song.
    */

    if (existing) {
      existing.remove();
    }


    const img =
      document.createElement("img");

    img.className =
      "card-animal-icon";

    img.src =
      RAW_PREFIX +
      encodeURIComponent(animalFile);

    img.alt =
      desiredName;

    img.title =
      desiredName;

    img.loading = "lazy";
    img.decoding = "async";

    img.dataset.songIndex =
      String(songIndex);


    img.onerror = () => {
      img.remove();
    };


    /*
      Add the animal name underneath it.
    */

    const oldName =
      card.querySelector(
        ".card-animal-name"
      );

    if (oldName) {
      oldName.remove();
    }


    const name =
      document.createElement("span");

    name.className =
      "card-animal-name";

    name.textContent =
      desiredName;

    name.dataset.songIndex =
      String(songIndex);


    /*
      Insert both at the top of the card,
      keeping the original card link intact.
    */

    const first =
      card.firstChild;

    card.insertBefore(
      img,
      first
    );

    card.insertBefore(
      name,
      img.nextSibling
    );
  }


  /* =========================================
     UPDATE ALL CARDS
     ========================================= */

  function addCardIcons() {
    if (updatingCards) return;

    updatingCards = true;

    try {

      const cards =
        document.querySelectorAll(
          "#cards .card"
        );

      cards.forEach(card => {
        addAnimalToCard(card);
      });

    } finally {

      updatingCards = false;
    }
  }


  /* =========================================
     LOAD ANIMAL FILES
     ========================================= */

  async function getAnimalFiles() {

    try {

      const response =
        await fetch(
          API_URL,
          {
            headers: {
              Accept:
                "application/vnd.github+json"
            }
          }
        );

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
        .map(
          item => item.name
        )
        .filter(
          name =>
            /\.(png|jpg|jpeg|webp|gif)$/i.test(
              name
            )
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


    /*
      Watch #cards.

      Your index.html creates the six
      shuffled cards dynamically when
      CARDS is pressed.

      The observer catches those new cards.
    */

    const cards =
      document.getElementById("cards");

    if (cards) {

      const observer =
        new MutationObserver(
          () => {
            addCardIcons();
          }
        );

      observer.observe(
        cards,
        {
          childList: true,
          subtree: true
        }
      );
    }


    iconFiles =
      await getAnimalFiles();


    if (!iconFiles.length) {

      console.warn(
        "No animal icon files were found."
      );

      return;
    }


    /*
      Add animals to the chronological
      song list.
    */

    putIcons();


    /*
      Also check the cards in case
      CARDS was already open.
    */

    addCardIcons();
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
      init,
      { once: true }
    );

  } else {

    init();
  }

})();
