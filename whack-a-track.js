/* Whack-a-Track mini-game for the Rizney YouTube player. */
(() => {
  "use strict";
  const TRACK_HEALTH = 24;
  const GAME_DURATION = 80;
  const MOLE_VISIBLE_MS = 460;
  const MOLE_INTERVAL_MS = 1400;
  const youtube = () => window.rizneyPlayer || window.player || null;
  const $ = (selector, root = document) => root.querySelector(selector);
  const controls = () => $(".controls");
  let game;
  let active = false;
  let trackHealth = TRACK_HEALTH;
  let secondsLeft = GAME_DURATION;
  let moleTimer;
  let hideTimer;
  let gameTimer;

  // Keep the toolbar attached to the bottom edge of the sticky player dock.
  // Cards should not hide it; Whack-a-Track hides it only while its game panel is open.
  function setToolbarHidden(hidden) {
    controls()?.classList.toggle("toolbar-hidden", hidden);
  }

  function positionToolbar() {
    const dock = $(".player-dock");
    if (dock) document.documentElement.style.setProperty("--player-dock-height", `${dock.offsetHeight}px`);
  }

  function scrollToReading() {
    const reading = $("#reading");
    if (!reading || reading.hidden) return;
    requestAnimationFrame(() => reading.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function setupToolbar() {
    const style = document.createElement("style");
    style.textContent = `
      .controls {
        position: sticky;
        top: var(--player-dock-height, 0px);
        z-index: 90;
        transition: opacity .18s ease, visibility .18s ease;
      }
      .controls.toolbar-hidden {
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
      }
      #reading, #whack-a-track-game {
        scroll-margin-top: calc(var(--player-dock-height, 0px) + 8px);
      }
      @media (max-width: 640px) {
        #whack-a-track-game {
          width: 100%;
          margin-top: 4px;
          margin-bottom: 12px;
          padding: 8px 10px 10px;
        }
        #whack-a-track-game #wat-board {
          gap: 6px;
          margin: 10px auto;
        }
        #whack-a-track-game .wat-hole {
          min-height: 58px !important;
          padding: 4px !important;
          font-size: 1.65rem !important;
        }
      }
    `;
    document.head.appendChild(style);
    positionToolbar();
    window.addEventListener("resize", positionToolbar, { passive: true });
    if (window.ResizeObserver) {
      const dock = $(".player-dock");
      if (dock) new ResizeObserver(positionToolbar).observe(dock);
    }

    // Keep CARDS immediately to the left of Whack-A-Track regardless of HTML order.
    const cardsButton = $("#draw-cards");
    const whackButton = $("#whack-track");
    if (cardsButton && whackButton) whackButton.parentElement.insertBefore(cardsButton, whackButton);

    // Do not observe #reading here: opening CARDS must leave the toolbar visible.
    setToolbarHidden(false);

    // CARDS is a toggle: pressing it again closes the reading panel.
    const reading = $("#reading");
    cardsButton?.addEventListener("click", event => {
      if (!reading || reading.hidden) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      reading.hidden = true;
    }, true);

    // The inline CARDS handler creates the six-card playlist first. Scroll after
    // that handler has revealed the panel, including on small screens.
    cardsButton?.addEventListener("click", scrollToReading);
  }

  const playing = () => {
    const player = youtube();
    return player && typeof player.getPlayerState === "function" && window.YT &&
      player.getPlayerState() === YT.PlayerState.PLAYING;
  };

  function createGame() {
    if (game) return game;
    const panel = document.createElement("section");
    panel.id = "whack-a-track-game";
    panel.setAttribute("aria-label", "Whack-a-Track");
    panel.innerHTML = `
      <h2>Whack-a-Track</h2>
      <p id="wat-status" aria-live="polite"></p>
      <p><span id="wat-time">${GAME_DURATION}</span>s</p>
      <progress id="wat-health" max="${TRACK_HEALTH}" value="${TRACK_HEALTH}" aria-label="Track health"></progress>
      <div id="wat-board" role="group" aria-label="Whack-a-Track board"></div>
      <button id="wat-refresh" type="button" hidden>Refresh playlist</button>
      <button id="wat-close" type="button">Close game</button>`;

    Object.assign(panel.style, {
      position: "sticky", top: "var(--player-dock-height, 104px)", zIndex: "20", maxWidth: "min(92vw, 620px)",
      boxSizing: "border-box", margin: "8px auto 18px", padding: "10px 14px 14px",
      textAlign: "center", background: "#120b18", border: "2px solid #d4af37",
      borderRadius: "12px", boxShadow: "0 0 24px rgba(212,175,55,.35)", scrollMarginTop: "calc(var(--player-dock-height, 0px) + 8px)"
    });
    Object.assign($("h2", panel).style, { margin: "0 0 6px" });
    Object.assign($("#wat-status", panel).style, { margin: "0 0 4px", minHeight: "1.4em" });
    Object.assign($("#wat-time", panel).parentElement.style, { margin: "0 0 8px" });
    Object.assign($("#wat-health", panel).style, {
      display: "block", width: "100%", height: "18px", margin: "8px 0 14px", accentColor: "#d4af37"
    });

    const board = $("#wat-board", panel);
    Object.assign(board.style, { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "10px", margin: "18px auto" });
    for (let i = 0; i < 6; i++) {
      const hole = document.createElement("button");
      hole.type = "button";
      hole.className = "wat-hole";
      hole.textContent = "🕳️";
      hole.dataset.active = "false";
      Object.assign(hole.style, { minHeight: "76px", padding: "8px", fontSize: "2rem", cursor: "crosshair" });
      hole.addEventListener("click", () => {
        if (!active || hole.dataset.active !== "true") return;
        hole.dataset.active = "false";
        hole.textContent = "💥";
        trackHealth--;
        $("#wat-health", panel).value = trackHealth;
        if (trackHealth <= 0) finish(true);
      });
      board.appendChild(hole);
    }

    $("#wat-close", panel).addEventListener("click", closeGame);
    $("#wat-refresh", panel).addEventListener("click", () => window.location.reload());
    ($(".player-dock") || $("main") || document.body).insertAdjacentElement("afterend", panel);
    panel.hidden = true;
    // The toolbar follows the game panel only. It returns as soon as the panel closes.
    new MutationObserver(() => setToolbarHidden(!panel.hidden)).observe(panel, {
      attributes: true, attributeFilter: ["hidden"]
    });
    game = { panel, board, status: $("#wat-status", panel) };
    return game;
  }

  function hideMoles() {
    game.board.querySelectorAll(".wat-hole").forEach(hole => {
      hole.dataset.active = "false";
      hole.textContent = "🕳️";
    });
  }

  function spawnMole() {
    if (!active) return;
    const holes = [...game.board.querySelectorAll(".wat-hole")];
    const hole = holes[Math.floor(Math.random() * holes.length)];
    hideMoles();
    hole.dataset.active = "true";
    hole.textContent = "🐭";
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (hole.dataset.active === "true") hole.textContent = "🕳️";
      hole.dataset.active = "false";
    }, MOLE_VISIBLE_MS);
    moleTimer = setTimeout(spawnMole, MOLE_INTERVAL_MS);
  }

  function startClock() {
    clearInterval(gameTimer);
    secondsLeft = GAME_DURATION;
    $("#wat-time", game.panel).textContent = secondsLeft;
    gameTimer = setInterval(() => {
      if (!active) return;
      secondsLeft--;
      $("#wat-time", game.panel).textContent = secondsLeft;
      if (secondsLeft <= 0) finish(false);
    }, 1000);
  }

  function finish(won) {
    if (!active) return;
    active = false;
    clearTimeout(moleTimer);
    clearTimeout(hideTimer);
    clearInterval(gameTimer);
    hideMoles();
    game.status.textContent = won ? "💥 TRACK WHACKED!" : "The track survived. Try again!";
  }

  function closeGame() {
    active = false;
    clearTimeout(moleTimer);
    clearTimeout(hideTimer);
    clearInterval(gameTimer);
    if (game) game.panel.hidden = true;
  }

  function startGame(event) {
    event?.preventDefault();
    event?.stopImmediatePropagation();
    game = createGame();
    clearTimeout(moleTimer);
    clearTimeout(hideTimer);
    clearInterval(gameTimer);
    $("#wat-refresh", game.panel).hidden = true;
    game.panel.hidden = false;
    if (!playing()) {
      active = false;
      game.status.textContent = "Play a track to start the game, then pause it to remove from playlist";
      game.panel.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    trackHealth = TRACK_HEALTH;
    active = true;
    $("#wat-health", game.panel).value = trackHealth;
    hideMoles();
    game.status.textContent = "Whack every mouse before the clock runs out!";
    startClock();
    spawnMole();
    game.panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function init() {
    setupToolbar();
    const button = $("#whack-track");
    if (!button || button.dataset.whackGameBound === "true") return;
    button.dataset.whackGameBound = "true";
    Object.assign(button.style, { cursor: "pointer" });
    button.addEventListener("click", startGame);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();

