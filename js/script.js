const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".wrapper .input-field");
mistakeTag = document.querySelector(".mistake");
timeTag = document.querySelector(".time span b");
wpmTag = document.querySelector(".wpm span");
cpmTag = document.querySelector(".cpm span");
tryAgainBtn = document.querySelector("button");

let timer,
  maxTime = 60,
  timeLeft = maxTime;

let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);

  typingText.innerHTML = "";

  paragraphs[randIndex].split("").forEach((char) => {
    let spanTag = `<span>${char}</span>`;
    typingText.innerHTML += spanTag;
  });
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    // if user hasn't entered anything or press backspace
    if (typedChar == null) {
      charIndex--;
      // mistakes <= 0 ? (mistakes = 0) : mistakes--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
        // console.log("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
        // console.log("incorrect");
      }
      charIndex++;
    }

    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.floor(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    ); //by assuming 5 characters per word and 1 word per second

    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    mistakeTag.innerHTML = `<p>Mistakes:</p><span>${mistakes}</span>`;
    wpmTag.innerText = wpm; // count correct words per minute
    cpmTag.innerText = charIndex - mistakes; // count correct words per minute
  } else {
    clearInterval(timer);
    inpField.disabled = true;
    inpField.value = "";
    timeTag.innerText = 0;
    timeLeft = maxTime;
  }
}

initTimer = () => {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
    inpField.disabled = true;
    inpField.value = "";
    timeTag.innerText = 0;
    timeLeft = maxTime;
  }
};

randomParagraph();

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", () => {
  clearInterval(timer);
  timeLeft = maxTime;
  timeTag.innerText = timeLeft;
  inpField.disabled = false;
  inpField.value = "";
  charIndex = 0;
  mistakes = 0;
  cpmTag.innerText = 0;
  isTyping = false;
  typingText.innerHTML = "";
  randomParagraph();
});
