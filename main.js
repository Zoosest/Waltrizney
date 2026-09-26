/* Add numbered song rows and animal icons to every song row and tarot card. */
(() => {
  "use strict";

  const API_URL =
    "https://api.github.com/repos/the-zeusest/waltrizney-/contents/assets/animal-icons?ref=main";

  const RAW_PREFIX =
    "https://raw.githubusercontent.com/the-zeusest/waltrizney-/main/assets/animal-icons/";

  const FALLBACK_ICON = "🐾";

  let iconFiles = [];
  let updatingCards = false;


  function addStyles() {
    if (document.getElementById("animal-icon-styles")) return;

    const style = document.createElement("style");
    style.id = "animal-icon-styles";

    style.textContent = `

      /* =========================================================
         SONG ROW
         ========================================================= */

      #song-list .song {
        position: relative;

        display: grid;

        /* Song text + animal button */
        grid-template-columns:
          minmax(0, 1fr) 62px;

        gap: 10px;

        width: calc(100% - 58px);

        min-width: 0;

        margin-left: 58px;

        align-items: center;

        /* Keep the rows short */
        padding-top: 2px;
        padding-bottom: 2px;

        /* Animal button reaches the right edge */
        padding-right: 0;

        box-sizing: border-box;
      }


      /* =========================================================
         GOLD NUMBER
         ========================================================= */

      #song-list .song-number {
        position: absolute;

        /*
         * Number lives in the BLACK space to the left
         * of the purple song box.
         */
        left: -48px;

        top: 50%;

        transform: translateY(-50%);

        display: block;

        width: 38px;

        color: var(--gold, #d4af37);

        background: transparent;

        border: 0;
        outline: 0;
        box-shadow: none;

        text-decoration: none;

        font-weight: 700;

        /* Slightly larger */
        font-size: 1rem;

        line-height: 1;

        padding: 0;
        margin: 0;

        text-align: right;

        white-space: nowrap;

        cursor: pointer;

        z-index: 10;
      }


      #song-list .song-number:hover {
        color: var(--bright-gold, #f5d76e);

        text-decoration: none;
      }


      #song-list .song-number:focus-visible {
        color: var(--bright-gold, #f5d76e);

        outline: 1px solid var(--bright-gold, #f5d76e);

        outline-offset: 3px;
      }


      /* =========================================================
         ORIGINAL PLAY BUTTON
         ========================================================= */

      #song-list .song .play {
        display: none;
      }


      /* =========================================================
         ANIMAL BUTTON
         ========================================================= */

      .song-animal-button {
        display: grid;

        place-items: center;

        width: 62px;
        height: 62px;

        min-width: 62px;
        min-height: 62px;

        padding: 1px;

        border: 1px solid var(--gold, #d4af37);

        border-radius: 10px;

        background: #000;

        cursor: pointer;

        overflow: hidden;

        box-sizing: border-box;

        /* Push animal all the way to the RIGHT */
        justify-self: end;

        margin-right: 0;
      }


      .song-animal-button:focus-visible {
        outline: 2px solid var(--bright-gold, #f5d76e);

        outline-offset: 2px;
      }


      .song-animal-button:hover {
        background: #261334;
      }


      /* Animal artwork stays at the size you liked */

      .song-animal-icon,
      .song-animal-fallback {
        display: block;

        width: 58px;
        height: 58px;

        max-width: 100%;
        max-height: 100%;

        object-fit: contain;

        border-radius: 8px;

        background: #000;

        padding: 0;
        margin: 0;

        box-sizing: border-box;
      }


      .song-animal-fallback {
        display: grid;

        place-items: center;

        font-size: 2rem;

        line-height: 1;
      }


      /* =========================================================
         SONG TEXT
         ========================================================= */

      .song-title {
        min-width: 0;

        overflow: hidden;

        text-overflow: ellipsis;

        white-space: nowrap;
      }


      .song-title small {
        overflow: hidden;

        text-overflow: ellipsis;

        white-space: nowrap;
      }


      /* =========================================================
         TAROT / MUSIC READING CARDS
         ========================================================= */

      #cards {
        display: grid;

        grid-template-columns:
          repeat(3, minmax(0, 1fr));

        gap: 10px;
      }


      #cards .card {
        min-height: 0;

        height: auto;

        padding: 10px 8px;

        background: #000;

        display: flex;

        flex-direction: column;

        justify-content: space-between;

        align-items: center;
      }


      #cards .card .symbol {
        display: none;
      }


      #cards .card strong {
        margin: 0 0 4px;
      }


      .card-animal-icon {
        display: block;

        width: 112px;
        height: 112px;

        margin: 0 auto 6px;

        object-fit: contain;

        border-radius: 12px;

        background: #000;

        padding: 0;
      }


      .card-animal-fallback {
        display: block;

        width: 112px;
        height: 112px;

        margin: 0 auto 6px;

        padding-top: 28px;

        box-sizing: border-box;

        text-align: center;

        font-size: 3rem;

        line-height: 1;

        background: #000;

        border-radius: 12px;
      }


      /* =========================================================
         MOBILE
         ========================================================= */

      @media (max-width: 640px) {

        #song-list .song {

          grid-template-columns:
            minmax(0, 1fr) 54px;

          gap: 8px;

          /*
           * Wider black area on the left
           * for the song numbers.
           */
          width: calc(100% - 42px);

          margin-left: 42px;

          /* Keep row short */
          padding-top: 1px;
          padding-bottom: 1px;

          padding-right: 0;
        }


        /* GOLD NUMBER */

        #song-list .song-number {

          left: -36px;

          width: 30px;

          font-size: 0.9rem;

          text-align: right;
        }


        /* ANIMAL BUTTON */

        .song-animal-button {

          width: 54px;
          height: 54px;

          min-width: 54px;
          min-height: 54px;

          padding: 1px;

          border-radius: 8px;

          margin-right: 0;
        }


        .song-animal-icon,
        .song-animal-fallback {

          width: 50px;
          height: 50px;

          max-width: 100%;
          max-height: 100%;

          border-radius: 6px;
        }


        .song-animal-fallback {
          font-size: 1.8rem;
        }


        /* =====================================================
           CARDS
           ===================================================== */

        #cards {

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 8px;
        }


        #cards .card {
          padding: 8px 5px;
        }


        .card-animal-icon,
        .card-animal-fallback {

          width: 82px;
          height: 82px;
        }


        .card-animal-fallback {

          padding-top: 20px;

          font-size: 2.3rem;
        }
      }
    `;

    document.head.appendChild(style);
  }


  /* =========================================================
     ANIMAL FILE NAME -> DISPLAY NAME
     ========================================================= */

  function iconLabel(filename) {
    return filename
      .replace(
        /\.(png|jpe?g|webp|gif)$/i,
        ""
      )
      .replace(
        /[-_]+/g,
        " "
      )
      .replace(
        /\b\w/g,
        letter => letter.toUpperCase()
      );
  }


  /* =========================================================
     FALLBACK ICON
     ========================================================= */

  function fallback(
    className = "song-animal-fallback"
  ) {
    const element =
      document.createElement("span");

    element.className =
      className;

    element.textContent =
      FALLBACK_ICON;

    element.setAttribute(
      "aria-label",
      "Animal icon"
    );

    return element;
  }


  /* =========================================================
     MAKE ANIMAL IMAGE
     ========================================================= */

  function makeImage(
    file,
    className
  ) {
    const image =
      document.createElement("img");

    image.className =
      className;

    image.src =
      RAW_PREFIX +
      encodeURIComponent(
        file.name
      );

    image.alt =
      iconLabel(
        file.name
      );

    image.loading =
      "lazy";

    image.decoding =
      "async";


    image.onerror = () => {

      image.replaceWith(
        fallback(
          className.replace(
            "-icon",
            "-fallback"
          )
        )
      );

    };


    return image;
  }


  /* =========================================================
     FIND SONG ROWS
     ========================================================= */

  function songRows() {
    return [
      ...document.querySelectorAll(
        "#song-list .song, .song"
      )
    ];
  }


  /* =========================================================
     SONG NUMBER
     ========================================================= */

  function makeSongNumber(
    row,
    index
  ) {

    /*
     * Use a real link so the number itself is
     * clickable and plays that song.
     */

    const number =
      document.createElement("a");


    number.className =
      "song-number";


    number.href =
      "#";


    number.textContent =
      String(index + 1);


    number.setAttribute(
      "aria-label",
      `Play song ${index + 1}`
    );


    number.title =
      `Play song ${index + 1}`;


    number.addEventListener(
      "click",
      event => {

        event.preventDefault();


        row
          .querySelector(
            ".play"
          )
          ?.click();

      }
    );


    return number;
  }


  /* =========================================================
     ANIMAL PLAY BUTTON
     ========================================================= */

  function makePlayButton(
    row,
    icon
  ) {

    const button =
      document.createElement(
        "button"
      );


    button.type =
      "button";


    button.className =
      "song-animal-button";


    button.setAttribute(
      "aria-label",
      "Play song"
    );


    button.title =
      "Play song";


    button.append(
      icon
    );


    button.addEventListener(
      "click",
      () => {

        row
          .querySelector(
            ".play"
          )
          ?.click();

      }
    );


    return button;
  }


  /* =========================================================
     ADD NUMBERS + ANIMAL ICONS
     ========================================================= */

  function putIcons() {

    songRows().forEach(
      (row, index) => {


        /* Add song number */

        if (
          !row.querySelector(
            ".song-number"
          )
        ) {

          row.prepend(
            makeSongNumber(
              row,
              index
            )
          );

        }


        /* Don't add animal twice */

        if (
          row.querySelector(
            ".song-animal-button"
          )
        ) {
          return;
        }


        const icon =
          iconFiles.length
            ? makeImage(
                iconFiles[
                  index %
                  iconFiles.length
                ],
                "song-animal-icon"
              )
            : fallback();


        /* Animal goes on the far RIGHT */

        row.append(
          makePlayButton(
            row,
            icon
          )
        );

      }
    );
  }


  /* =========================================================
     TAROT CARD ANIMAL ICONS
     ========================================================= */

  function addCardIcons() {

    if (
      updatingCards
    ) return;


    updatingCards =
      true;


    try {

      const rows =
        songRows();


      document
        .querySelectorAll(
          "#cards .card"
        )
        .forEach(
          card => {

            const link =
              card.querySelector(
                "a"
              );


            const match =
              link?.textContent.match(
                /(\d+)/
              );


            const songIndex =
              match
                ? Number(
                    match[1]
                  ) - 1
                : -1;


            const animalFile =
              iconFiles[
                songIndex
              ];


            const heading =
              card.querySelector(
                "strong"
              );


            const label =
              animalFile
                ? iconLabel(
                    animalFile.name
                  )
                : "Animal";


            if (
              heading &&
              heading.textContent !==
                label
            ) {

              heading.textContent =
                label;

            }


            card
              .querySelector(
                ".symbol"
              )
              ?.remove();


            if (
              card.querySelector(
                ".card-animal-icon, .card-animal-fallback"
              )
            ) {
              return;
            }


            const rowIcon =
              rows[
                songIndex
              ]?.querySelector(
                ".song-animal-icon, .song-animal-fallback"
              );


            const icon =
              rowIcon
                ? rowIcon.cloneNode(
                    true
                  )
                : animalFile
                  ? makeImage(
                      animalFile,
                      "card-animal-icon"
                    )
                  : fallback(
                      "card-animal-fallback"
                    );


            icon.className =
              rowIcon
                ? "card-animal-icon"
                : icon.className;


            card.prepend(
              icon
            );

          }
        );


    } finally {

      updatingCards =
        false;

    }
  }


  /* =========================================================
     INITIALIZE
     ========================================================= */

  async function init() {

    addStyles();


    const cards =
      document.getElementById(
        "cards"
      );


    if (cards) {

      new MutationObserver(
        addCardIcons
      ).observe(
        cards,
        {
          childList: true,
          subtree: true
        }
      );

    }


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
          `Icon list request failed: ${response.status}`
        );

      }


      iconFiles =
        (await response.json())

          .filter(
            file =>
              file &&
              file.type ===
                "file" &&
              /\.(png|jpe?g|webp|gif)$/i.test(
                file.name
              )
          )

          .sort(
            (a, b) =>
              a.name.localeCompare(
                b.name
              )
          );

    } catch (error) {

      console.warn(
        "Animal icons could not be loaded; using paw-print placeholders.",
        error
      );

    }


    putIcons();

    addCardIcons();

  }


  /* =========================================================
     START
     ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );

  } else {

    init();

  }

})();
