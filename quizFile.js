const fileLibrary = require('./fileLibrary');
const chalk = require('chalk');
const User = require('./userModel');

module.exports = (subject) => {
  class Quiz {
    constructor(subject) {
      this.subject = subject;
      this.questions = null;
      this.time = null;
      this.quizAnswer = null;
      this.questionNumber = 0;
      this.timeUp = null;
      this.quizMode = false;
    }

    countTime() {
      const date = new Date();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      const showTime = h + ' ' + m + ' ' + s;
      console.log(showTime);

      setTimeout(() => this.countTime, 1000);
    }

    loadSingleQuestion(questions, questionNumber) {
      return questions[questionNumber];
    }

    loadNextQuestion() {
      ++this.questionNumber;
      var singleQuestion = this.loadSingleQuestion(this.questions, `question${this.questionNumber}`);

      this.quizAnswer = singleQuestion.answer;
      console.log('\n(' + this.questionNumber + ').');
      console.log('\t' + singleQuestion.title);
      console.log('\t(A)' + singleQuestion.A);
      console.log('\t(B)' + singleQuestion.B);
      console.log('\t(c)' + singleQuestion.c);
      console.log('\t(D)' + singleQuestion.D);
    }

    startQuiz(r1) {
      if (fileLibrary.checkFile(this.subject)) {
        this.questions = fileLibrary.loadQuiz(this.subject);
        this.time = this.questions['time'];
        this.quizMode = true;
        console.log(this.time)
        console.log(chalk.yellow('Starting quiz'));
        console.log(chalk.yellow('\t\tQuiz mode activated'));
        console.log(chalk.magenta('\t\tYou have got ' + this.time + ' minutes to answer all the questions'));

        this.timeUp = setTimeout(() => {
          console.log(chalk.red('\n\tYou time is up!'));
          this.endQuiz(r1);
        }, this.time * 60000);
        this.loadNextQuestion();
        r1.setPrompt('Answer>> ');
      }
      else {
        console.log(chalk.red('\tNo such file in the library.'));
        return;
      }
    }

    endQuiz(r1) {
      clearTimeout(this.timeUp);
      console.log(chalk.green('\tHey ' + User.userName + ' \n\tYou scored ' + User.userQuizScore + ' out of 5'));
      this.quizMode = false;
      process.exit();
    };

    static quizMode() {
      return this.quizMode;
    }

    static quizAnswer() {
      return this.quizAnswer
    }
    static questionNumber() {
      return this.questionNumber;
    }

  };

  return new Quiz(subject);
}

