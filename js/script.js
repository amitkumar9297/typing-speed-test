const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".wrapper .input-field");
let charIndex = 0;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  paragraphs[randIndex].split("").forEach((char) => {
    let spanTag = `<span>${char}</span>`;
    typingText.innerHTML += spanTag;
  });
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

randomParagraph();

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (characters[charIndex].innerText === typedChar) {
    characters[charIndex].classList.add("correct");
    console.log("correct");
  } else {
    characters[charIndex].classList.add("incorrect");
    console.log("incorrect");
  }
  charIndex++;
  characters.forEach((span) => span.classList.remove("active"));
  characters[charIndex].classList.add("active");
}

inpField.addEventListener("input", initTyping);
