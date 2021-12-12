"use strict";

document.addEventListener("DOMContentLoaded", ready);

function ready() {
  //console.log("ready");
  const textArea = document.querySelector(".add-question-form");
  textArea.addEventListener("submit", onAddNewQuestionSubmit);
}

function onAddNewQuestionSubmit(e) {
  //console.log("submit");
  const textArea = document.querySelector(".form__textarea");
  //console.log(textArea.value);
  if (!textArea.value.includes("___")) {
    alert('В предложении не указано место пропущенного слова ("___")');
    e.preventDefault();
  }
}
