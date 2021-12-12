"use strict";
import { TestQuestion } from "./test-question.js";
import { TestAnswer } from "./test-answer.js";
import { testAnswerBlock } from "./test-answer-block.js";
import { getCookiesObject } from "./getCookiesObject.js";

document.addEventListener("DOMContentLoaded", ready);

function ready() {
  /*const question = new TestQuestion({
    id: "123",
    number: 5,
    text: "Seikeam lai iianeas, ___ laele kelo selkeu",
  });
  const answer = new TestAnswer({
    question,
    answer: "ei",
    correctAnswer: "ei",
  });
  const answer1 = new TestAnswer({
    question,
    answer: "su",
    correctAnswer: "ei",
  });*/

  console.log("cookies str: ", decodeURIComponent(document.cookie));
  const cookies = getCookiesObject();
  console.log(cookies);

  const results = JSON.parse(cookies.results);
  console.log(results);

  const testAnswer = document.querySelector(".test-answer");
  const clones = getNodeNTimes(testAnswer, results.length);
  //console.log("results.length: ", results.length);
  let correctCount = 0;
  for (let i in clones) {
    const answer = new TestAnswer({
      question: new TestQuestion(results[i].question),
      answer: results[i].answer,
      correctAnswer: results[i].correctAnswer,
    });
    //console.log(answer);
    if (answer.isCorrect()) {
      correctCount++;
    }
    testAnswerBlock(clones[i], answer);
  }

  const correctnessPercent = Math.round((correctCount / results.length) * 100);
  document.querySelector(".correctness-percent").innerHTML =
    correctnessPercent + "%";

  /*const answerBlock = testAnswerBlock(
    document.querySelector(".test-answer"),
    answer1
  );*/
}

function getNodeNTimes(node, n) {
  const clones = new Array(n);
  const parent = node.parentNode;
  clones[0] = node;
  for (let i = 1; i < n; i++) {
    clones[i] = node.cloneNode(true);
    parent.appendChild(clones[i]);
  }
  return clones;
}
