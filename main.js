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

        margin: 0 0 22px;
      }


      /* THE ENTIRE CARD IS CLICKABLE */

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

        -webkit-tap-highlight-color: transparent;
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


      /* =========================================
         HIDE ORIGINAL CARD CONTENT
         ========================================= */

      #cards .card .symbol,
      #cards .card strong,
      #cards .card a {
        display: none !important;
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

          margin-top: 0;
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
     FALLBACK ICON
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
     MAKE SONG ROW ANIMAL
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
     SONG ROWS
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
    });
  }


  /* =========================================
     GET SHUFFLED SONG POSITION
     ========================================= */

  function getCardSongIndex(card) {

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
     PLAY CARD
     ========================================= */

  function playCard(card) {

    if (!card) return;

    const link =
      card.querySelector("a");

    if (!link) return;


    /*
      IMPORTANT:

      We DO NOT use link.click() here.

      link.click() would bubble back into
      the card and trigger this function again.

      Instead, we directly call the existing
      onclick function that index.html created.

      That preserves the shuffled card's
      actual position in the Music Reading.
    */

    if (typeof link.onclick === "function") {

      link.onclick({
        preventDefault() {},
        stopPropagation() {}
      });

      return;
    }


    /*
      Emergency fallback.

      If the original onclick somehow isn't
      available, use the actual song index.
    */

    const songIndex =
      getCardSongIndex(card);

    if (
      songIndex >= 0 &&
      typeof window.play === "function"
    ) {
      window.play(songIndex);
    }
  }


  /* =========================================
     MAKE ENTIRE CARD CLICKABLE
     ========================================= */

  function makeCardClickable(card) {

    if (!card) return;

    if (
      card.dataset.animalCardReady === "true"
    ) {
      return;
    }


    card.addEventListener(
      "click",
      event => {

        event.preventDefault();
        event.stopPropagation();

        playCard(card);
      }
    );


    card.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();
          event.stopPropagation();

          playCard(card);
        }
      }
    );


    card.setAttribute(
      "role",
      "button"
    );

    card.setAttribute(
      "tabindex",
      "0"
    );

    card.setAttribute(
      "aria-label",
      "Play this music reading card"
    );


    card.dataset.animalCardReady =
      "true";
  }


  /* =========================================
     ADD ANIMAL TO CARD
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
      Remove anything we previously created.
    */

    card
      .querySelector(
        ".card-animal-icon"
      )
      ?.remove();

    card
      .querySelector(
        ".card-animal-name"
      )
      ?.remove();


    /*
      Hide the original contents.

      We keep the original link alive
      because its onclick contains the
      actual shuffled-song logic.
    */

    const symbol =
      card.querySelector(".symbol");

    const strong =
      card.querySelector("strong");

    const link =
      card.querySelector("a");


    if (symbol) {
      symbol.style.display = "none";
    }

    if (strong) {
      strong.style.display = "none";
    }

    if (link) {
      link.style.display = "none";
    }


    /* =========================================
       CREATE ANIMAL IMAGE
       ========================================= */

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


    /* =========================================
       CREATE ANIMAL NAME
       ========================================= */

    const name =
      document.createElement("span");

    name.className =
      "card-animal-name";

    name.textContent =
      animalName;

    name.dataset.songIndex =
      String(songIndex);


    /* =========================================
       PUT ANIMAL + NAME INTO CARD
       ========================================= */

    card.appendChild(img);
    card.appendChild(name);


    /* =========================================
       MAKE WHOLE CARD CLICKABLE
       ========================================= */

    makeCardClickable(card);
  }


  /* =========================================
     UPDATE ALL CARDS
     ========================================= */

  function addCardIcons() {

    if (updatingCards) return;

    updatingCards = true;

    try {

      const cardElements =
        document.querySelectorAll(
          "#cards .card"
        );

      cardElements.forEach(
        card => addAnimalToCard(card)
      );

    } finally {

      updatingCards = false;
    }
  }


  /* =========================================
     POSITION MUSIC READING
     ========================================= */

  function positionReading() {

    const reading =
      document.getElementById(
        "reading"
      );

    if (!reading) return;


    const heading =
      reading.querySelector("h2");

    if (!heading) return;


    /*
      The gold line is the bottom border
      of "Your Music Reading".

      Put that gold line immediately
      below the sticky player.
    */

    const dock =
      document.querySelector(
        ".player-dock"
      );

    const dockHeight =
      dock
        ? dock.getBoundingClientRect().height
        : 0;


    const headingRect =
      heading.getBoundingClientRect();

    const goldLineY =
      window.scrollY +
      headingRect.bottom;


    const targetY =
      goldLineY -
      dockHeight -
      2;


    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth"
    });
  }


  /* =========================================
     WATCH CARDS
     ========================================= */

  function setupCardWatching() {

    const cards =
      document.getElementById(
        "cards"
      );

    if (cards) {

      const observer =
        new MutationObserver(
          () => {

            if (!updatingCards) {
              addCardIcons();
            }

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


    /* =======================================
       CARDS BUTTON
       ======================================= */

    const drawCards =
      document.getElementById(
        "draw-cards"
      );

    if (drawCards) {

      drawCards.addEventListener(
        "click",
        () => {

          /*
            index.html does the actual
            six-song shuffle first.

            Then we decorate those exact
            six cards with the matching
            animal icons.
          */

          setTimeout(
            () => {

              addCardIcons();

              positionReading();

            },
            120
          );

        }
      );
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
          item =>
            item.name
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

    setupCardWatching();


    iconFiles =
      await getAnimalFiles();


    if (!iconFiles.length) {

      console.warn(
        "No animal icon files were found."
      );

      return;
    }


    putIcons();

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
