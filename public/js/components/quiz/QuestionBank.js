const StraightQuestions = [
	{
		"id": 1,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 2,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 3,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 4,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 5,
		"question": "Would you go out for a movie on saturday night ?",
	}
	
];

const LesbianQuestions = [
	{
		"id": 1,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 2,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 3,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 3,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 4,
		"question": "Would you go out for a movie on saturday night ?",
	}
];

const GayQuestions = [
	{
		"id": 1,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 2,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 3,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 3,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 4,
		"question": "Would you go out for a movie on saturday night ?",
	}
];

const BisexualQuestions = [
	{
		"id": 1,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 2,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 3,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 3,
		"question": "Would you go out for a movie on saturday night ?",
	},
	{
		"id": 4,
		"question": "Would you go out for a movie on saturday night ?",
	}
];

function questionBank() {
	return {
		StraightQuestions: StraightQuestions,
		LesbianQuestions: LesbianQuestions,
		GayQuestions: GayQuestions,
		BisexualQuestions: BisexualQuestions
	}
}

module.exports = questionBank();