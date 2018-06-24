const chalk = require("chalk");

const help = () => {
	console.log(chalk.blue("\n\tHere are the lists of available commands"));
	console.log(chalk.green("\tlistquizzes: ") + chalk.yellow(" Lists all the availablequizzes in your library"));
	console.log(chalk.green("\timportquiz [source] [filename]: ") + chalk.yellow(" Import a new quiz from a source to the quiz library"));
	console.log(chalk.green("\ttakequiz [quizName]: ") + chalk.yellow(" Start taking a quiz."));
	console.log(chalk.green("\tlistonlinequizzes: ") + chalk.yellow(" Lists all online quizzes."));
	console.log(chalk.green("\tdownloadquiz [quizName]: ") + chalk.yellow(" Download a quiz to your library"));
	console.log(chalk.green("\tuploadquiz [quizName]: ") + chalk.yellow(" Upload a quiz in your local library to the online library"));
}

module.exports = help;