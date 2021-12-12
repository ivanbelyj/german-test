"use strict";
export const testAnswerBlock = ($elem, testAnswer) => {
  //const $elem = document.querySelector(elem);
  let state = { testAnswer };
  const setState = (newState) => {
    state = newState;
    render();
  };
  const isCorrectAnswer = () =>
    state.testAnswer.answer === state.testAnswer.correctAnswer;

  const $number = $elem.querySelector(".test-answer__number");
  const $correctnessString = $elem.querySelector(
    ".test-answer__correctness-string"
  );
  const $correctAnswerWrap = $elem.querySelector(
    ".test-answer__correct-answer-wrap"
  );
  const $correctAnswer = $elem.querySelector(".test-answer__correct-answer");

  const renderQuestionText = () => {
    const $questionText = $elem.querySelector(".test-answer__question-text");

    const $missingWord = document.createElement("span");
    $missingWord.classList.add(
      "test-answer__missing-word",
      isCorrectAnswer() ? "color_green" : "color_red"
    );
    $missingWord.innerText = state.testAnswer.answer;

    const splitted = state.testAnswer.question.text.split("___", 2);
    $questionText.appendChild(document.createTextNode(splitted[0]));
    $questionText.appendChild($missingWord);
    $questionText.appendChild(document.createTextNode(splitted[1]));
  };

  const render = () => {
    //console.log(state);
    const answer = state.testAnswer;
    $number.innerText = answer.question.number;
    $number.classList.add(isCorrectAnswer() ? "color_green" : "color_red");
    $correctnessString.innerText = isCorrectAnswer() ? "Верно" : "Не верно";
    $correctnessString.classList.add(
      isCorrectAnswer() ? "color_green" : "color_red"
    );
    renderQuestionText();

    if (isCorrectAnswer()) {
      $correctAnswerWrap.classList.add(
        "test-answer__correct-answer-wrap_hidden"
      );
    } else {
      $correctAnswerWrap.classList.remove(
        "test-answer__correct-answer-wrap_hidden"
      );
      $correctAnswer.innerText = answer.correctAnswer;
    }
  };

  const destroy = () => {
    $elem.parentNode.removeChild($elem);
  };

  render();
  return {
    $elem,
    render,
    setState,
    destroy,
  };
};
