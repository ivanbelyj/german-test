"use strict";
import { TestQuestion } from "./test-question.js";
import { TestQuestionBlock } from "./test-question-block.js";
import { getCookiesObject } from "./getCookiesObject.js";

//1) Получаем с сервера вопросы в формате
// { id: "123123", text: "text", number: 1 }
//2) Добавляем их в DOM
//3) Пользователь нажимает на кнопку,
//собираем { id: "123123", usersAnswer: "asd" }

document.addEventListener("DOMContentLoaded", ready);

function ready() {
  if (!navigator.cookieEnabled) {
    alert(
      "В Вашем браузере отключены cookies. Данный сайт использует их для работы"
    );
  }
  document
    .querySelector(".end-test-button")
    .addEventListener("click", onEndTestButtonClick);

  const questions = JSON.parse(getCookiesObject().questions);

  const container = document.querySelector(".questions");
  for (const question of questions.sort((a, b) => a.number - b.number)) {
    const questionDOMElement = new TestQuestionBlock(
      new TestQuestion(question)
    ).toDomElement();
    container.appendChild(questionDOMElement);
  }
}

function onEndTestButtonClick() {}
