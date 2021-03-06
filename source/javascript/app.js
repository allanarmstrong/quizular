var app = angular.module('quizularApp', ['ngRoute', 'ngAnimate'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl:'views/index.html',
		controller: 'IndexController'
	})
	.when('/welcome', {
		templateUrl: 'views/welcome.html',
		controller: 'WelcomeController'
	})
	.when('/quiz', {
		templateUrl: 'views/quiz.html',
		controller: 'QuizController'
	})
	.when('/results', {
		templateUrl: 'views/results.html',
		controller: 'ResultsController'
	})
	.otherwise({
		redirectTo: '/'
	});
}]); 


app.controller('IndexController', ['$scope','$location','UserService', 'QuestionService', function($scope, $location, UserService, QuestionService) {

	var user = UserService;

	$scope.enter = function() {
		user.setUser($scope.userName);
		$location.path('/welcome');
	};

}]);

app.controller('WelcomeController', ['$scope', '$location', 'UserService', 'QuestionService', function($scope, $location, UserService, QuestionService) {

	if (UserService.getUser() === null) {
		$scope.username = "Unknown User!";
	} else {
		$scope.username = UserService.getUser();
	}

	QuestionService.getQuestions();// //Load the questions.

	$scope.beginQuiz = function() {
		console.log("Button Pressed!");

		$location.path('/quiz');
	};

}]);

app.controller('QuizController', ['$scope', '$timeout', '$location', 'QuestionService', 'UserService', function($scope, $timeout, $location, QuestionService, UserService){

	//Initial variables blah blah blah
	$scope.score = 0;
	
	$scope.user = UserService.getUser();//Get the user information.
	//var questionIndex = -1;
	$scope.questionNum = 1;
	$scope.question = QuestionService.getQuestion($scope.questionNum-1);
	$scope.answers = QuestionService.shuffleAnswers($scope.question.answers);
	$scope.numQuestions = QuestionService.getNumQuestions();
	$scope.correct = null;
	$scope.incorrect = null;

	//Fetch the next question
	var nextQuestion = function() {
		if ($scope.questionNum < QuestionService.getNumQuestions()) { //If there's still questions left then get them ready and display them
			//questionIndex += 1;
			$scope.question = QuestionService.getQuestion($scope.questionNum-1);
			$scope.answers = QuestionService.shuffleAnswers($scope.question.answers);
			$scope.questionNum += 1;
			$scope.correct = null;
			$scope.incorrect = null;
		} else {
			$location.path('/results');
		}
	}; 

	$scope.checkAnswer = function(index) {
		if ($scope.question.answers[index] === $scope.question.correct) {
			$scope.correct = index;
			UserService.rightAnswer();
			$timeout(nextQuestion, 2000);
		} else {
			var correct = $scope.question.answers.indexOf($scope.question.correct);
			$scope.correct = correct;
			$scope.incorrect = index;
			UserService.wrongAnswer();
			$timeout(nextQuestion, 2000);
		}

	};


}]);

app.controller('ResultsController', ['$scope', '$location', 'UserService', 'QuestionService', function($scope, $location, UserService, QuestionService) {

	$scope.correct = UserService.getCorrectAnswers();
	$scope.totalQuestions = QuestionService.getNumQuestions();

	$scope.tryAgain = function() {
		$location.path('/quiz');
	};

}]);

app.service('UserService', [function () {
	var user;
	var correct = 0;
	var incorrect = 0;

	return {
		getUser: function() {
			return user;
		},

		setUser: function(val) {
			user = val;
		},

		rightAnswer: function() {
			correct += 1;
		},

		wrongAnswer: function() {
			incorrect += 1;
		},

		getCorrectAnswers: function() {
			return correct;
		}
	};
	
}]);

app.service('QuestionService', [ '$http', function($http) {

	var questions;
 
	return {
		getQuestions: function() {
			$http.get('questions.json')
			.success(function(data) {
				questions = data.questions;
				console.log(questions);
			});
		},

		getQuestion: function(index) {
			return questions[index];
		},

		getNumQuestions: function() {
			return questions.length;
		},

		shuffleAnswers: function(arr) {
			for (var i = arr.length - 1; i>0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var tmp = arr[i];
				arr[i] = arr[j];
				arr[j] = tmp;
			}

			return arr;
		}
	};
	
}]);