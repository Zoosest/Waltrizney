/* Add numbered song links and animal icons to every song row and tarot card. */
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

        grid-template-columns:
          minmax(0, 1fr) 62px;

        gap: 10px;

        width: calc(100% - 58px);

        min-width: 0;

        margin-left: 58px;

        align-items: center;

        padding-top: 2px;
        padding-bottom: 2px;
        padding-right: 0;
        padding-left: 0;

        box-sizing: border-box;
      }


      /* =========================================================
         GOLD SONG NUMBER
         ========================================================= */

      #song-list .song-number {
        position: absolute;

        /*
         * The purple row begins 58px from the left.
         *
         * The number is placed in the BLACK space
         * between the left edge of the screen and
         * the purple box.
         */
        left: -60px;

        top: 50%;

        transform: translateY(-50%);

        display: block;

        width: 42px;

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

        text-align: right;

        white-space: nowrap;

        cursor: pointer;

        z-index: 20;
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

          width: calc(100% - 42px);

          margin-left: 42px;

          padding-top: 1px;
          padding-bottom: 1px;
          padding-right: 0;
          padding-left: 0;
        }


        /* GOLD NUMBER */

        #song-list .song-number {

          /*
           * Center the number in the black
           * space to the left of the purple box.
           */
          left: -40px;

          width: 32px;

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
        "#song-list .song"
      )
    ];
  }


  /* =========================================================
     PLAY SONG FROM ROW
     ========================================================= */

  function playSongFromRow(row) {

    /*
     * The original index.html creates a .play button
     * for every row. Its onclick calls play(index),
     * which is exactly what we want.
     */
    const playButton =
      row.querySelector(
        ".play"
      );


    if (playButton) {

      playButton.click();

      return true;
    }


    return false;
  }


  /* =========================================================
     CONVERT SONG NUMBER INTO PLAYABLE LINK
     ========================================================= */

  function makeSongNumber(
    row,
    index
  ) {

    /*
     * index.html already creates:
     *
     * <span class="song-number">1</span>
     *
     * So instead of creating another number,
     * convert that existing span into an <a>.
     */
    let number =
      row.querySelector(
        ".song-number"
      );


    if (
      number &&
      number.tagName.toLowerCase() !== "a"
    ) {

      const link =
        document.createElement("a");

      link.className =
        "song-number";

      link.textContent =
        String(index + 1);

      link.href =
        "#";

      link.setAttribute(
        "aria-label",
        `Play song ${index + 1}`
      );

      link.title =
        `Play song ${index + 1}`;


      number.replaceWith(
        link
      );


      number =
        link;

    }


    /*
     * If a number doesn't exist for some reason,
     * create one.
     */
    if (!number) {

      number =
        document.createElement("a");

      number.className =
        "song-number";

      number.textContent =
        String(index + 1);

      number.href =
        "#";

      number.setAttribute(
        "aria-label",
        `Play song ${index + 1}`
      );

      number.title =
        `Play song ${index + 1}`;

      row.prepend(
        number
      );

    }


    /*
     * Make sure the click handler exists only once.
     */
    if (
      number.dataset.playHandler !== "true"
    ) {

      number.dataset.playHandler =
        "true";


      number.addEventListener(
        "click",
        event => {

          event.preventDefault();

          event.stopPropagation();

          playSongFromRow(row);

        }
      );

    }


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
      event => {

        event.preventDefault();

        event.stopPropagation();

        playSongFromRow(row);

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

        /*
         * Convert the EXISTING number from index.html
         * into a playable link.
         */
        makeSongNumber(
          row,
          index
        );


        /*
         * Don't add animal twice.
         */
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


        /*
         * Animal stays on the far RIGHT.
         */
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
