"use strict";
export class TestQuestionBlock {
  constructor(question) {
    this.question = question;
  }
  toDomElement() {
    const el = document.createElement("div");
    el.classList.add("test-question-block");

    const numberTitle = document.createElement("h3");
    numberTitle.innerText = this.question.number;
    numberTitle.className = "title";
    el.appendChild(numberTitle);

    const description = document.createElement("p");
    description.innerText = this.question.text;
    description.classList.add("text");
    el.appendChild(description);

    const label = document.createElement("label");
    label.innerText = "Пропущенное слово:";
    description.classList.add("text");
    el.appendChild(description);

    const wordInput = document.createElement("input");
    wordInput.type = "text";
    wordInput.name = this.question.id;
    //wordInput.classList.add("text-input", "text");
    wordInput.className = "text-input text form__text-input";
    el.appendChild(wordInput);

    return el;
  }
}
