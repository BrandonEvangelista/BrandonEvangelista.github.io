const fetchPromptBtn = document.getElementById("fetchPromptBtn");
const promptType     = document.getElementById("promptType");
const userInput      = document.getElementById("userInput");
const statusEl       = document.getElementById("status");
const promptBox      = document.getElementById("promptBox");
const typingArea     = document.getElementById("typingArea");
const finishBtn      = document.getElementById("finishBtn");
const lastStatsEl    = document.getElementById("lastStats");
const bestStatsEl    = document.getElementById("bestStats");
const animeNameEl    = document.getElementById("animeName");
const characterNameEl = document.getElementById("characterName");

let currentPrompt = "";
let startTime = null;

// Show/hide filter input depending on quote type
promptType.addEventListener("change", () => {
  if (promptType.value === "random") {
    userInput.style.display = "none";
    userInput.value = "";
  } else {
    userInput.style.display = "block";
    userInput.placeholder =
      promptType.value === "anime"
        ? "Enter anime name"
        : "Enter character name";
  }
});

// Load personal best on startup
document.addEventListener("DOMContentLoaded", () => {
  const bestJSON = localStorage.getItem("typingBest");
  if (bestJSON) {
    const best = JSON.parse(bestJSON);
    bestStatsEl.textContent = `${best.wpm} WPM, ${best.accuracy}% accuracy`;
  } else {
    bestStatsEl.textContent = "–";
  }
});

// Build Animechan URL based on user selection
function buildUrl() {
  let url = "https://api.animechan.io/v1/quotes/random";

  if (promptType.value === "anime") {
    const anime = userInput.value.trim();
    if (!anime) throw new Error("Anime name required");
    url += `?anime=${encodeURIComponent(anime)}`;
  }

  if (promptType.value === "character") {
    const character = userInput.value.trim();
    if (!character) throw new Error("Character name required");
    url += `?character=${encodeURIComponent(character)}`;
  }

  return url;
}

// Fetch a quote from Animechan and return content + metadata
async function getAnimeQuote() {
  const url = buildUrl();
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  const data = json.data;

  return {
    content: data.content,
    animeName: data.anime?.name || "Unknown",
    characterName: data.character?.name || "Unknown"
  };
}

// Handle "Get Prompt" click
fetchPromptBtn.addEventListener("click", async () => {
  statusEl.textContent = "";
  typingArea.value = "";
  typingArea.disabled = true;
  finishBtn.disabled = true;
  currentPrompt = "";
  startTime = null;

  try {
    statusEl.textContent = "Fetching quote...";

    const { content, animeName, characterName } = await getAnimeQuote();

    currentPrompt = content;
    promptBox.textContent = content;
    animeNameEl.textContent = animeName;
    characterNameEl.textContent = characterName;

    typingArea.disabled = false;
    finishBtn.disabled = false;
    typingArea.focus();
    startTime = Date.now();

    statusEl.textContent = "";
  } catch (err) {
    console.error(err);
    statusEl.textContent = err.message.includes("required")
      ? err.message
      : "Failed to fetch quote. Try again.";
  }
});

// Finish typing test
finishBtn.addEventListener("click", () => {
  if (!currentPrompt || !startTime) {
    statusEl.textContent = "Fetch a prompt first.";
    return;
  }

  const typed = typingArea.value;
  const endTime = Date.now();
  const minutes = (endTime - startTime) / 1000 / 60;

  if (minutes <= 0) {
    statusEl.textContent = "Too fast to measure. Try again.";
    return;
  }

  const wordsTyped =
    typed.trim().length === 0 ? 0 : typed.trim().split(/\s+/).length;

  const wpm = Math.round(wordsTyped / minutes);
  const accuracy = calculateAccuracy(currentPrompt, typed);

  lastStatsEl.textContent = `${wpm} WPM, ${accuracy}% accuracy`;

  // update personal best
  const bestJSON = localStorage.getItem("typingBest");
  let best = bestJSON ? JSON.parse(bestJSON) : null;

  if (!best || wpm > best.wpm) {
    best = { wpm, accuracy, timestamp: Date.now() };
    localStorage.setItem("typingBest", JSON.stringify(best));
  }

  bestStatsEl.textContent = `${best.wpm} WPM, ${best.accuracy}% accuracy`;
  statusEl.textContent = "Done!";
});

// Character-based accuracy
function calculateAccuracy(prompt, typed) {
  if (!prompt.length) return 0;

  const minLen = Math.min(prompt.length, typed.length);
  let correct = 0;

  for (let i = 0; i < minLen; i++) {
    if (prompt[i] === typed[i]) correct++;
  }

  return Math.round((correct / prompt.length) * 100);
}