const readline = require("readline");
const chalk = require("chalk");
let quiz = require("./quizFile");
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
const q = "quizit>> ";

const quizLibraryPath = "./quizzes";
const User = require("./userModel");
const fileLibrary = require("./fileLibrary");
const help = require("./helpFile");

console.log("-------------------------------------------------------------");
console.log("\n********************  Quiz App 1.0 ***************************");
console.log("**********************  Developed By  ***************************");
console.log("---------------------- Ogunbo Emmanuel --------------------------")
console.log("\nType 'help' for more information.");

const enterUserName = () => {
  r1.question("\nEnter a User name to continue \nUsername>>", (userName) => {
    if (userName === "") {
      enterUserName();
    }
    else {
      User.setUserName(userName);
      r1.setPrompt(q);
      r1.prompt();
    }
  })
};

enterUserName();

const runCommands = (commands, r1) => {
  const command = commands[0].toLowerCase();
  const quizName = commands[1];
  const arg3 = commands[2];

  switch (command) {
    case "listquizzes":
      r1.pause();
      fileLibrary.listQuizzesInTheLibrary();
      r1.resume();
      r1.prompt();
      break;

    case "importquiz":
      r1.pause();
      fileLibrary.importQuizzesToTheLibrary(quizName.trim().replace("\\", "/"), arg3.trim());
      r1.resume();
      r1.prompt();
      break;

    case "takequiz":
      quiz = quiz(quizName);
      quiz.startQuiz(r1)
      r1.prompt();
      break;

    case "help":
    case "-h":
    case "--help":
      help();
      r1.prompt();
      break;

    default:
      console.log(command + chalk.red(" Unrecognized Command."));
      console.log("Type 'help' for more information. ");
      r1.prompt();
      break;
  };
};

r1.on("line", (line) => {
  if (quiz.quizMode) {
    const answers = ['A', 'B', 'C', 'D'];
    let answer = line.trim();
    answer = answer.toUpperCase();

    if (quiz.questionNumber === 5) {
      quiz.endQuiz();
      r1.setPrompt('quizit>> ');
      r1.prompt();
    }
    else {
      if (answers.includes(answer)) {
        if (quiz.quizAnswer === answer) {
          User.setUserQuizScore(1)
        };
        quiz.loadNextQuestion();
        r1.setPrompt("Answer>> ");
        r1.prompt();
      }
      else if (answer === "QUIT") {
        console.log(chalk.yellow("\tYou ended the quiz."));
        quiz.endQuiz();
        r1.setPrompt('quizit>> ');
        r1.prompt();
      }
      else {
        console.log(chalk.red("You entered a wrong command. \nEither type A or B or C or or D. You can also type quit to end the quiz"));
        r1.prompt();
      }
    }
  }
  else {
    const arguments = line.trim();
    if (arguments.length === 0) {
      r1.prompt();
    }
    else {
      const arg = arguments.split(" ")
      if (arg.length > 3) {
        console.log(chalk.red(" Unrecognized command.") + " \nTypet 'help' for more information. ");
        r1.prompt();
      }
      else {
        try {
          runCommands(arg, r1);
        }
        catch (err) {
          console.log(err)
          console.log(chalk.red("Unrecognized command") + "\nTypea 'help' for more information.")
          r1.prompt();
        }
      }
    }
  }
});
