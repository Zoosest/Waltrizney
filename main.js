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
         SONG ROW ANIMAL BUTTON
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


      /* The entire card is now the button */

      #cards .card {
        min-width: 0;
        min-height: 0;

        box-sizing: border-box;

        padding: 9px 6px;

        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;

        overflow: hidden;

        color: var(--bright-purple, #e0aaff);

        background:
          linear-gradient(
            145deg,
            #21102e,
            #090509
          );

        border: 2px solid var(--gold, #d4af37);
        border-radius: 12px;

        text-align: center;

        cursor: pointer;

        font: inherit;

        transition:
          transform .12s ease,
          background .12s ease,
          border-color .12s ease;
      }


      #cards .card:hover {
        background:
          linear-gradient(
            145deg,
            #2b1540,
            #100817
          );

        border-color:
          var(--bright-gold, #f5d76e);

        transform: translateY(-2px);
      }


      #cards .card:active {
        transform: translateY(0);
      }


      #cards .card:focus-visible {
        outline:
          2px solid
          var(--bright-gold, #f5d76e);

        outline-offset: 3px;
      }


      /* Remove everything except our animal */

      #cards .card .symbol {
        display: none;
      }

      #cards .card strong {
        display: none;
      }

      #cards .card a {
        display: none;
      }


      /* =========================================
         CARD ANIMAL
         ========================================= */

      #cards .card-animal-icon {
        display: block;

        width: 104px;
        height: 104px;

        margin: 0 auto 5px;

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

        width: 100%;
        max-width: 100%;

        margin: 0;

        color:
          var(--bright-gold, #f5d76e);

        font-family:
          Georgia,
          "Times New Roman",
          serif;

        font-size: .78rem;
        font-weight: 700;

        line-height: 1.1;

        text-align: center;

        white-space: nowrap;

        overflow: hidden;

        text-overflow: ellipsis;
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


        /* Two columns on phones */

        #cards {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 7px;

          margin-top: 10px;
          margin-bottom: 18px;
        }


        #cards .card {
          padding: 6px 4px;

          border-radius: 10px;
        }


        #cards .card-animal-icon {
          width: 76px;
          height: 76px;

          margin-bottom: 4px;
        }


        #cards .card-animal-name {
          font-size: .65rem;
        }
      }


      /* =========================================
         VERY SMALL PHONES
         ========================================= */

      @media (max-width: 380px) {

        #cards {
          gap: 5px;
        }


        #cards .card {
          padding: 5px 3px;
        }


        #cards .card-animal-icon {
          width: 66px;
          height: 66px;
        }


        #cards .card-animal-name {
          font-size: .59rem;
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
    const button =
      document.createElement("button");

    button.type = "button";
    button.className = "animal-button";

    const label =
      iconLabel(filename);

    button.title = label;
    button.setAttribute(
      "aria-label",
      label
    );

    const img =
      document.createElement("img");

    img.className =
      "animal-icon";

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
      document.querySelectorAll(
        "#song-list .song"
      )
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
     SONG NUMBER
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
      The working index.html creates:

      Play song 47

      Play song 183

      etc.

      We read that actual number so the
      shuffled card always receives the
      correct animal.
    */

    const link =
      card.querySelector("a");

    if (!link) return -1;

    const match =
      link.textContent.match(/(\d+)/);

    if (!match) return -1;

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
     TURN CARD INTO FULL BUTTON
     ========================================= */

  function makeCardClickable(card) {

    if (
      card.dataset.animalCardReady === "true"
    ) {
      return;
    }

    const link =
      card.querySelector("a");

    if (!link) return;


    card.dataset.animalCardReady = "true";

    card.setAttribute(
      "role",
      "button"
    );

    card.setAttribute(
      "tabindex",
      "0"
    );


    const activate = event => {

      /*
        Don't activate twice if the hidden
        original link somehow receives the
        event itself.
      */

      if (
        event.target === link
      ) {
        event.preventDefault();
      }

      const songIndex =
        getCardSongIndex(card);

      if (songIndex < 0) return;


      /*
        The existing index.html already
        provides playPosition(position).

        We determine which card this is
        among the six cards and tell the
        existing playlist to play that
        position.
      */

      const allCards =
        Array.from(
          document.querySelectorAll(
            "#cards .card"
          )
        );

      const position =
        allCards.indexOf(card);

      if (
        position < 0 ||
        typeof window.playPosition !==
          "function"
      ) {
        /*
          playPosition is normally scoped
          inside index.html, so use the
          original link as the fallback.
        */

        link.click();
        return;
      }

      window.playPosition(position);
    };


    card.addEventListener(
      "click",
      activate
    );


    card.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          activate(event);
        }
      }
    );


    /*
      Keep the original link invisible.
      It remains in the card because the
      existing shuffle code owns it.
    */

    link.setAttribute(
      "tabindex",
      "-1"
    );

    link.setAttribute(
      "aria-hidden",
      "true"
    );
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

    const animalName =
      iconLabel(animalFile);


    /*
      Make the entire card clickable.
    */

    makeCardClickable(card);


    /*
      If the card already has the correct
      animal, don't rebuild it.
    */

    const existing =
      card.querySelector(
        ".card-animal-icon"
      );

    if (
      existing &&
      existing.dataset.songIndex ===
        String(songIndex)
    ) {
      return;
    }


    /*
      Remove an old animal/name if this
      card has been reused for another
      shuffled song.
    */

    card
      .querySelector(
        ".card-animal-icon, .card-animal-name"
      )
      ?.remove();

    card
      .querySelector(
        ".card-animal-name"
      )
      ?.remove();


    const img =
      document.createElement("img");

    img.className =
      "card-animal-icon";

    img.src =
      RAW_PREFIX +
      encodeURIComponent(animalFile);

    img.alt =
      animalName;

    img.title =
      animalName;

    img.loading = "lazy";
    img.decoding = "async";

    img.dataset.songIndex =
      String(songIndex);


    img.onerror = () => {
      img.replaceWith(
        fallback()
      );
    };


    const name =
      document.createElement("span");

    name.className =
      "card-animal-name";

    name.textContent =
      animalName;

    name.dataset.songIndex =
      String(songIndex);


    /*
      The card contains only the animal
      and animal name visually.
    */

    card.innerHTML = "";

    card.appendChild(img);
    card.appendChild(name);


    /*
      Re-add accessibility/click behavior
      because innerHTML removed the old link.
    */

    card.dataset.animalCardReady = "false";

    makeCardClickable(card);
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

      cards.forEach(
        card => addAnimalToCard(card)
      );

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


    const cards =
      document.getElementById("cards");


    /*
      Watch for the six shuffled cards
      being created by index.html.
    */

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
      Regular song-list animals.
    */

    putIcons();


    /*
      Cards, if already visible.
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
