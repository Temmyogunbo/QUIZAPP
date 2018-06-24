class User {
	constructor() {
		this.userName = null;
		this.userQuizScore = 0;
	}

	 setUserName(userName) {
		this.userName = userName;
	}

	 setUserQuizScore(score) {
		this.userQuizScore += score;
	}
}

module.exports = new User();