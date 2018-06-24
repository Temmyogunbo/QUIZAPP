const fs = require("fs");
const chalk = require("chalk");
const quizLibrary = "./quizzes/";

class FileLibrary {
	static listQuizzesInTheLibrary() {
		const quizzesInTheLibrary = fs.readdirSync(quizLibrary), //it returns an array consisting of the quizname(file name) in the quizLibrary
			numberOfquizzesInTheLibrary = quizzesInTheLibrary.length;
		if (!numberOfquizzesInTheLibrary) {
			console.log("No quiz in the library");
		}
		else {
			console.log(chalk.blue("We have " + numberOfquizzesInTheLibrary + " quiz file(s) in the library."))
			for (var i = 0; i < numberOfquizzesInTheLibrary; i++) {
				console.log("\t[" + (i + 1) + "]    " + quizzesInTheLibrary[i].replace(".json", ""));
			}
		}
	}

	static importQuizzesToTheLibrary (source, fileName) {
		if (fs.existsSync(source)) {//A synchronous function that reurns true if the source exist and otherwise if not.
			if (fs.existsSync(quizLibrary + fileName + ".json")) { //check if quiz file already exiss
				console.log(chalk.red("File already exist"));
				return;
			}
			else {
				console.log(chalk.yellow("Copying..."));
				fs.createReadStream(source).pipe(fs.createWriteStream(quizLibrary + fileName + ".json"));
				console.log(chalk.green("File copied"))
				return;
			}
		}
		else {
			console.log(chalk.red("The source doesn't exist."));
			return;
		}
	}

	static loadQuiz (fileName) {
		fileName = fileName.trim();
		if (fs.existsSync(quizLibrary + fileName + ".json")) {
			var fileContent = fs.readFileSync(quizLibrary + fileName + ".json", "utf8");
			var jsonValue = JSON.parse(fileContent);
			return jsonValue;
		}
		else {
			var jsonValue = {};
			return jsonValue;
		}
	
	}

	static checkFile(fileName) {
		fileName = fileName.trim();
		return fs.existsSync(quizLibrary + fileName + ".json");
	}
}

module.exports = FileLibrary;