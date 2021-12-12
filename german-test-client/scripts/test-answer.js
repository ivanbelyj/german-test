"use strict";
export class TestAnswer {
  constructor({ question, answer, correctAnswer }) {
    this.question = question;
    this.answer = answer;
    this.correctAnswer = correctAnswer;
  }
  isCorrect() {
    return this.answer === this.correctAnswer;
  }
}
