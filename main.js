(() => {
"use strict";

const $ = (selector, root = document) =>
root.querySelector(selector);

const $$ = (selector, root = document) =>
[...root.querySelectorAll(selector)];

/*



ANIMAL ICONS



*/

const animalNames = [
"aardvark",
"alligator",
"angelfish",
"ant",
"anteater",
"armadillo",
"baboon",
"badger",
"bald-eagle",
"bass",
"bat",
"bear",
"beaver",
"bee",
"blob-fish",
"blue-heron",
"boar",
"buffalo",
"bull-skull",
"butterfly",
"camel",
"capuchin-monkey",
"capybara",
"caribou",
"cassowary",
"catfish",
"centipede",
"chameleon",
"cheetah",
"chicken",
"chimpanzee",
"chipmunk",
"cicada",
"cobra",
"cockatoo",
"condor",
"coyote",
"crab",
"crane",
"crocodile",
"crow",
"deer",
"dingo",
"dodo",
"donkey",
"dragon",
"dragonfly",
"duck",
"eagle",
"echidna",
"eel",
"elephant",
"elk",
"falcon",
"ferret",
"flamingo",
"fly",
"fox",
"frog",
"gazelle",
"gecko",
"giraffe",
"goat",
"goose",
"gorilla",
"grasshopper",
"hamster",
"hare",
"hawk",
"hedgehog",
"heron",
"hippopotamus",
"horse",
"hyena",
"ibis",
"iguana",
"jackal",
"jaguar",
"jellyfish",
"kangaroo",
"kingfisher",
"kiwi",
"koala",
"komodo-dragon",
"lemur",
"leopard",
"lion",
"lizard",
"llama",
"lobster",
"lynx",
"macaw",
"magpie",
"manatee",
"mandrill",
"manta-ray",
"meerkat",
"mink",
"mole",
"mongoose",
"monkey",
"moose",
"mosquito",
"narwhal",
"newt",
"octopus",
"opossum",
"orangutan",
"ostrich",
"otter",
"owl",
"panda",
"panther",
"parrot",
"peacock",
"pelican",
"penguin",
"pig",
"platypus",
"polar-bear",
"porcupine",
"prairie-dog",
"puffin",
"python",
"quail",
"rabbit",
"raccoon",
"ram",
"raven",
"red-panda",
"reindeer",
"rhino",
"rooster",
"salamander",
"salmon",
"scorpion",
"seahorse",
"seal",
"shark",
"skunk",
"sloth",
"snail",
"snake",
"snow-leopard",
"sparrow",
"spider",
"squid",
"squirrel",
"starfish",
"stingray",
"swan",
"tapir",
"tiger",
"toad",
"toucan",
"turtle",
"vulture",
"walrus",
"wasp",
"weasel",
"whale",
"wolf",
"wolverine",
"woodpecker",
"yak",
"zebra",
"sasquatch"
];

const animalMeanings = {
aardvark: ["grounded", "curious", "patient"],
alligator: ["ancient", "powerful", "patient"],
angelfish: ["beauty", "grace", "calm"],
ant: ["work", "community", "persistence"],
anteater: ["focus", "patience", "curiosity"],
armadillo: ["protection", "boundaries", "resilience"],
baboon: ["social", "bold", "playful"],
badger: ["determined", "fearless", "independent"],
"bald-eagle": ["freedom", "vision", "strength"],
bass: ["depth", "rhythm", "grounding"],
bat: ["intuition", "change", "rebirth"],
bear: ["strength", "protection", "healing"],
beaver: ["building", "resourceful", "persistence"],
bee: ["community", "purpose", "diligence"],
"blob-fish": ["adaptation", "depth", "acceptance"],
"blue-heron": ["patience", "solitude", "balance"],
boar: ["courage", "strength", "determination"],
buffalo: ["abundance", "endurance", "gratitude"],
"bull-skull": ["mortality", "strength", "transformation"],
butterfly: ["change", "rebirth", "freedom"],
camel: ["endurance", "patience", "survival"],
"capuchin-monkey": ["play", "intelligence", "adaptability"],
capybara: ["calm", "community", "acceptance"],
caribou: ["journey", "endurance", "instinct"],
cassowary: ["independence", "strength", "boundaries"],
catfish: ["intuition", "depth", "adaptation"],
centipede: ["movement", "persistence", "adaptation"],
chameleon: ["adaptation", "change", "awareness"],
cheetah: ["speed", "focus", "decisiveness"],
chicken: ["courage", "routine", "community"],
chimpanzee: ["intelligence", "social", "curiosity"],
chipmunk: ["preparation", "play", "resourcefulness"],
cicada: ["rebirth", "patience", "awakening"],
cobra: ["transformation", "protection", "power"],
cockatoo: ["expression", "social", "play"],
condor: ["freedom", "perspective", "renewal"],
coyote: ["adaptability", "cleverness", "survival"],
crab: ["protection", "emotion", "boundaries"],
crane: ["balance", "patience", "grace"],
crocodile: ["ancient", "patience", "power"],
crow: ["intelligence", "mystery", "change"],
deer: ["gentleness", "awareness", "grace"],
dingo: ["independence", "adaptation", "instinct"],
dodo: ["memory", "loss", "change"],
donkey: ["humility", "endurance", "service"],
dragon: ["power", "transformation", "imagination"],
dragonfly: ["change", "lightness", "clarity"],
duck: ["adaptability", "emotion", "play"],
eagle: ["vision", "freedom", "courage"],
echidna: ["protection", "uniqueness", "persistence"],
eel: ["adaptation", "mystery", "flow"],
elephant: ["memory", "wisdom", "family"],
elk: ["strength", "nobility", "endurance"],
falcon: ["focus", "vision", "speed"],
ferret: ["curiosity", "play", "exploration"],
flamingo: ["balance", "expression", "community"],
fly: ["persistence", "adaptation", "annoyance"],
fox: ["cleverness", "adaptation", "independence"],
frog: ["transformation", "renewal", "emotion"],
gazelle: ["grace", "speed", "awareness"],
gecko: ["adaptation", "regeneration", "persistence"],
giraffe: ["perspective", "vision", "grace"],
goat: ["determination", "independence", "climbing"],
goose: ["loyalty", "protection", "community"],
gorilla: ["strength", "family", "compassion"],
grasshopper: ["leap", "change", "faith"],
hamster: ["routine", "energy", "resourcefulness"],
hare: ["speed", "alertness", "fertility"],
hawk: ["vision", "focus", "awareness"],
hedgehog: ["boundaries", "protection", "sensitivity"],
heron: ["patience", "balance", "solitude"],
hippopotamus: ["power", "emotion", "protection"],
horse: ["freedom", "movement", "strength"],
hyena: ["community", "adaptability", "humor"],
ibis: ["wisdom", "transition", "patience"],
iguana: ["adaptation", "stillness", "survival"],
jackal: ["adaptation", "cleverness", "survival"],
jaguar: ["power", "courage", "mystery"],
jellyfish: ["flow", "adaptation", "emotion"],
kangaroo: ["movement", "family", "resilience"],
kingfisher: ["patience", "focus", "precision"],
kiwi: ["uniqueness", "grounding", "curiosity"],
koala: ["rest", "calm", "comfort"],
"komodo-dragon": ["power", "patience", "survival"],
lemur: ["curiosity", "social", "play"],
leopard: ["independence", "stealth", "strength"],
lion: ["courage", "leadership", "confidence"],
lizard: ["adaptation", "regeneration", "survival"],
llama: ["endurance", "calm", "boundaries"],
lobster: ["protection", "renewal", "strength"],
lynx: ["intuition", "independence", "awareness"],
macaw: ["expression", "color", "social"],
magpie: ["curiosity", "intelligence", "gathering"],
manatee: ["gentleness", "peace", "healing"],
mandrill: ["confidence", "social", "expression"],
"manta-ray": ["flow", "grace", "freedom"],
meerkat: ["awareness", "community", "curiosity"],
mink: ["adaptation", "resourcefulness", "independence"],
mole: ["intuition", "depth", "persistence"],
mongoose: ["courage", "agility", "protection"],
monkey: ["play", "curiosity", "adaptability"],
moose: ["strength", "independence", "grounding"],
mosquito: ["persistence", "adaptation", "annoyance"],
narwhal: ["mystery", "uniqueness", "imagination"],
newt: ["renewal", "adaptation", "regeneration"],
octopus: ["intelligence", "flexibility", "creativity"],
opossum: ["survival", "adaptation", "resilience"],
orangutan: ["intelligence", "patience", "individuality"],
ostrich: ["awareness", "speed", "grounding"],
otter: ["play", "joy", "community"],
owl: ["wisdom", "intuition", "observation"],
panda: ["peace", "balance", "gentleness"],
panther: ["mystery", "power", "independence"],
parrot: ["expression", "communication", "social"],
peacock: ["expression", "confidence", "beauty"],
pelican: ["abundance", "community", "generosity"],
penguin: ["loyalty", "community", "adaptation"],
pig: ["abundance", "joy", "grounding"],
platypus: ["uniqueness", "adaptation", "individuality"],
"polar-bear": ["endurance", "solitude", "adaptation"],
porcupine: ["boundaries", "protection", "confidence"],
"prairie-dog": ["community", "communication", "alertness"],
puffin: ["community", "loyalty", "joy"],
python: ["transformation", "power", "patience"],
quail: ["community", "protection", "grounding"],
rabbit: ["fertility", "alertness", "gentleness"],
raccoon: ["resourcefulness", "curiosity", "adaptation"],
ram: ["determination", "courage", "leadership"],
raven: ["mystery", "intelligence", "change"],
"red-panda": ["balance", "individuality", "play"],
reindeer: ["journey", "endurance", "community"],
rhino: ["strength", "protection", "determination"],
rooster: ["confidence", "awakening", "expression"],
salamander: ["renewal", "transformation", "resilience"],
salmon: ["journey", "persistence", "instinct"],
scorpion: ["protection", "transformation", "intensity"],
seahorse: ["patience", "gentleness", "devotion"],
seal: ["play", "emotion", "adaptation"],
shark: ["power", "instinct", "movement"],
skunk: ["boundaries", "confidence", "protection"],
sloth: ["patience", "rest", "acceptance"],
snail: ["patience", "persistence", "grounding"],
snake: ["transformation", "healing", "rebirth"],
"snow-leopard": ["solitude", "strength", "mystery"],
sparrow: ["community", "simplicity", "resilience"],
spider: ["creativity", "patience", "connection"],
squid: ["adaptation", "mystery", "intelligence"],
squirrel: ["preparation", "resourcefulness", "energy"],
starfish: ["renewal", "healing", "adaptation"],
stingray: ["flow", "grace", "intuition"],
swan: ["grace", "transformation", "beauty"],
tapir: ["grounding", "gentleness", "independence"],
tiger: ["courage", "power", "independence"],
toad: ["transformation", "patience", "grounding"],
toucan: ["expression", "joy", "communication"],
turtle: ["patience", "protection", "longevity"],
vulture: ["renewal", "transformation", "cleansing"],
walrus: ["community", "strength", "adaptation"],
wasp: ["determination", "protection", "focus"],
weasel: ["cleverness", "agility", "adaptation"],
whale: ["emotion", "depth", "wisdom"],
wolf: ["loyalty", "instinct", "community"],
wolverine: ["strength", "independence", "determination"],
woodpecker: ["persistence", "rhythm", "focus"],
yak: ["endurance", "grounding", "strength"],
zebra: ["individuality", "balance", "community"],
sasquatch: ["mystery", "freedom", "humor"]
};

/*



SONG ROW ANIMALS



*/

function getSongIndexFromLink(link) {
if (!link) return -1;

const text = link.textContent || "";
const match = text.match(/Play song\s+(\d+)/i);

if (!match) return -1;

return Number(match[1]) - 1;

}

function getAnimalName(index) {
if (index < 0 || index >= animalNames.length) {
return null;
}

return animalNames[index];

}

function getAnimalImage(name) {
if (!name) return null;

return `./assets/animal-icons/${name}.jpg`;

}

function addAnimalToSongRow(row) {
if (!row || row.dataset.animalReady === "true") {
return;
}

const link = row.querySelector("a");

if (!link) {
  return;
}

const songIndex = getSongIndexFromLink(link);
const animalName = getAnimalName(songIndex);

if (!animalName) {
  return;
}

const button = document.createElement("button");

button.type = "button";
button.className = "animal-button";
button.title = animalName;

button.innerHTML = `
  <img
    src="${getAnimalImage(animalName)}"
    alt="${animalName}"
    loading="lazy"
  >
  <span>${animalName}</span>
`;

button.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (typeof link.onclick === "function") {
    link.onclick({
      preventDefault() {},
      stopPropagation() {}
    });
  } else {
    link.click();
  }
});

row.insertBefore(button, row.firstChild);

row.dataset.animalReady = "true";

}

function addAnimalToSongRows() {
const rows = $$("#songs li, #songs .song-row, .song-row");

rows.forEach(addAnimalToSongRow);

}

/*



CARDS



*/

function getCardSongIndex(card) {
if (!card) return -1;

const link = card.querySelector("a");

return getSongIndexFromLink(link);

}

function playCard(card) {
if (!card) return;

const link = card.querySelector("a");

if (!link) return;

/*
 * IMPORTANT:
 * The card's original link has an onclick handler created
 * by index.html. Calling that handler directly plays the
 * correct shuffled song without triggering the card click
 * again.
 */

if (typeof link.onclick === "function") {
  link.onclick({
    preventDefault() {},
    stopPropagation() {}
  });

  return;
}

const songIndex = getCardSongIndex(card);

if (
  songIndex >= 0 &&
  typeof window.play === "function"
) {
  window.play(songIndex);
}

}

function makeCardClickable(card) {
if (!card) return;

if (card.dataset.animalCardReady === "true") {
  return;
}

card.style.cursor = "pointer";

card.setAttribute("role", "button");
card.setAttribute("tabindex", "0");

card.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  playCard(card);
});

card.addEventListener("keydown", (event) => {
  if (
    event.key === "Enter" ||
    event.key === " "
  ) {
    event.preventDefault();
    event.stopPropagation();

    playCard(card);
  }
});

card.dataset.animalCardReady = "true";

}

function addAnimalToCard(card) {
if (!card) return;

if (card.dataset.animalCardReady === "true") {
  return;
}

const link = card.querySelector("a");

if (!link) {
  return;
}

const songIndex = getSongIndexFromLink(link);
const animalName = getAnimalName(songIndex);

if (!animalName) {
  return;
}

/*
 * Keep the original link in the card.
 * We hide it rather than removing it because its onclick
 * contains the actual connection to the shuffled song.
 */

const originalChildren = [...card.children];

originalChildren.forEach((child) => {
  child.style.display = "none";
});

link.style.display = "none";

const icon = document.createElement("img");

icon.src = getAnimalImage(animalName);
icon.alt = animalName;
icon.className = "animal-card-icon";

const name = document.createElement("div");

name.className = "animal-card-name";
name.textContent = animalName;

card.appendChild(icon);
card.appendChild(name);

makeCardClickable(card);

}

function addCardIcons() {
const cards = $$("#cards .card");

cards.forEach(addAnimalToCard);

}

/*



CARD WATCHER



*/

function positionReading() {
const reading =
document.getElementById("reading");

if (!reading) return;

/*
 * We scroll to the TOP of the reading section,
 * not to the cards themselves.
 *
 * The player dock is taken into account so the
 * "Your Music Reading" heading isn't hidden behind it.
 */

const dock =
  document.querySelector(".player-dock");

const dockHeight =
  dock
    ? dock.getBoundingClientRect().height
    : 0;

const readingRect =
  reading.getBoundingClientRect();

const targetY =
  window.scrollY +
  readingRect.top -
  dockHeight -
  2;

window.scrollTo({
  top: Math.max(0, targetY),
  behavior: "smooth"
});

}

function setupCardWatching() {
const cards =
document.getElementById("cards");

if (!cards) return;

const observer =
  new MutationObserver(() => {
    addCardIcons();
  });

observer.observe(cards, {
  childList: true,
  subtree: true
});

/*
 * Watch for the CARDS button being pressed.
 *
 * We deliberately wait until the cards have been created
 * before doing anything with the scroll position.
 */

const drawCards =
  document.getElementById("draw-cards");

if (drawCards) {
  drawCards.addEventListener("click", () => {
    setTimeout(() => {
      addCardIcons();

      /*
       * Give the browser one frame to finish laying out
       * the new cards before calculating the scroll.
       */
      requestAnimationFrame(() => {
        positionReading();
      });
    }, 120);
  });
}

}

/*



BASIC STYLING FOR ANIMAL ELEMENTS



*/

function addStyles() {
if (document.getElementById("animal-main-js-styles")) {
return;
}

const style = document.createElement("style");

style.id = "animal-main-js-styles";

style.textContent = `
  .animal-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: #120b18;
    border: 1px solid #d4af37;
    color: #f5d76e;
    border-radius: 8px;
    padding: 5px 7px;
    margin-right: 8px;
    cursor: pointer;
    font: inherit;
  }

  .animal-button img {
    width: 34px;
    height: 34px;
    object-fit: contain;
    display: block;
  }

  .animal-button span {
    font-size: 0.8rem;
  }

  #cards .card {
    position: relative;
    cursor: pointer;
    user-select: none;
  }

  #cards .animal-card-icon {
    width: 100%;
    max-width: 130px;
    height: 130px;
    object-fit: contain;
    display: block;
    margin: 0 auto 8px;
  }

  #cards .animal-card-name {
    color: #f5d76e;
    text-align: center;
    font-weight: 700;
    text-transform: capitalize;
  }

  #cards .card:focus-visible {
    outline: 2px solid #f5d76e;
    outline-offset: 3px;
  }
`;

document.head.appendChild(style);

}

/*



INITIALIZE



*/

function init() {
addStyles();

addAnimalToSongRows();

setupCardWatching();

}

if (document.readyState === "loading") {
document.addEventListener(
"DOMContentLoaded",
init
);
} else {
init();
}
})();
