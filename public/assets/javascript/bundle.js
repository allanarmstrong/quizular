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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdxdWl6dWxhckFwcCcsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSlcclxuLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuXHQkcm91dGVQcm92aWRlclxyXG5cdC53aGVuKCcvJywge1xyXG5cdFx0dGVtcGxhdGVVcmw6J3ZpZXdzL2luZGV4Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjogJ0luZGV4Q29udHJvbGxlcidcclxuXHR9KVxyXG5cdC53aGVuKCcvd2VsY29tZScsIHtcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mvd2VsY29tZS5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6ICdXZWxjb21lQ29udHJvbGxlcidcclxuXHR9KVxyXG5cdC53aGVuKCcvcXVpeicsIHtcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvcXVpei5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6ICdRdWl6Q29udHJvbGxlcidcclxuXHR9KVxyXG5cdC53aGVuKCcvcmVzdWx0cycsIHtcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvcmVzdWx0cy5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6ICdSZXN1bHRzQ29udHJvbGxlcidcclxuXHR9KVxyXG5cdC5vdGhlcndpc2Uoe1xyXG5cdFx0cmVkaXJlY3RUbzogJy8nXHJcblx0fSk7XHJcbn1dKTsgXHJcblxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0luZGV4Q29udHJvbGxlcicsIFsnJHNjb3BlJywnJGxvY2F0aW9uJywnVXNlclNlcnZpY2UnLCAnUXVlc3Rpb25TZXJ2aWNlJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sIFVzZXJTZXJ2aWNlLCBRdWVzdGlvblNlcnZpY2UpIHtcclxuXHJcblx0dmFyIHVzZXIgPSBVc2VyU2VydmljZTtcclxuXHJcblx0JHNjb3BlLmVudGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHR1c2VyLnNldFVzZXIoJHNjb3BlLnVzZXJOYW1lKTtcclxuXHRcdCRsb2NhdGlvbi5wYXRoKCcvd2VsY29tZScpO1xyXG5cdH07XHJcblxyXG59XSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignV2VsY29tZUNvbnRyb2xsZXInLCBbJyRzY29wZScsICckbG9jYXRpb24nLCAnVXNlclNlcnZpY2UnLCAnUXVlc3Rpb25TZXJ2aWNlJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sIFVzZXJTZXJ2aWNlLCBRdWVzdGlvblNlcnZpY2UpIHtcclxuXHJcblx0aWYgKFVzZXJTZXJ2aWNlLmdldFVzZXIoKSA9PT0gbnVsbCkge1xyXG5cdFx0JHNjb3BlLnVzZXJuYW1lID0gXCJVbmtub3duIFVzZXIhXCI7XHJcblx0fSBlbHNlIHtcclxuXHRcdCRzY29wZS51c2VybmFtZSA9IFVzZXJTZXJ2aWNlLmdldFVzZXIoKTtcclxuXHR9XHJcblxyXG5cdFF1ZXN0aW9uU2VydmljZS5nZXRRdWVzdGlvbnMoKTsvLyAvL0xvYWQgdGhlIHF1ZXN0aW9ucy5cclxuXHJcblx0JHNjb3BlLmJlZ2luUXVpeiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJCdXR0b24gUHJlc3NlZCFcIik7XHJcblxyXG5cdFx0JGxvY2F0aW9uLnBhdGgoJy9xdWl6Jyk7XHJcblx0fTtcclxuXHJcbn1dKTtcclxuXHJcbmFwcC5jb250cm9sbGVyKCdRdWl6Q29udHJvbGxlcicsIFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJyRsb2NhdGlvbicsICdRdWVzdGlvblNlcnZpY2UnLCAnVXNlclNlcnZpY2UnLCBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0LCAkbG9jYXRpb24sIFF1ZXN0aW9uU2VydmljZSwgVXNlclNlcnZpY2Upe1xyXG5cclxuXHQvL0luaXRpYWwgdmFyaWFibGVzIGJsYWggYmxhaCBibGFoXHJcblx0JHNjb3BlLnNjb3JlID0gMDtcclxuXHRcclxuXHQkc2NvcGUudXNlciA9IFVzZXJTZXJ2aWNlLmdldFVzZXIoKTsvL0dldCB0aGUgdXNlciBpbmZvcm1hdGlvbi5cclxuXHQvL3ZhciBxdWVzdGlvbkluZGV4ID0gLTE7XHJcblx0JHNjb3BlLnF1ZXN0aW9uTnVtID0gMTtcclxuXHQkc2NvcGUucXVlc3Rpb24gPSBRdWVzdGlvblNlcnZpY2UuZ2V0UXVlc3Rpb24oJHNjb3BlLnF1ZXN0aW9uTnVtLTEpO1xyXG5cdCRzY29wZS5hbnN3ZXJzID0gUXVlc3Rpb25TZXJ2aWNlLnNodWZmbGVBbnN3ZXJzKCRzY29wZS5xdWVzdGlvbi5hbnN3ZXJzKTtcclxuXHQkc2NvcGUubnVtUXVlc3Rpb25zID0gUXVlc3Rpb25TZXJ2aWNlLmdldE51bVF1ZXN0aW9ucygpO1xyXG5cdCRzY29wZS5jb3JyZWN0ID0gbnVsbDtcclxuXHQkc2NvcGUuaW5jb3JyZWN0ID0gbnVsbDtcclxuXHJcblx0Ly9GZXRjaCB0aGUgbmV4dCBxdWVzdGlvblxyXG5cdHZhciBuZXh0UXVlc3Rpb24gPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmICgkc2NvcGUucXVlc3Rpb25OdW0gPCBRdWVzdGlvblNlcnZpY2UuZ2V0TnVtUXVlc3Rpb25zKCkpIHsgLy9JZiB0aGVyZSdzIHN0aWxsIHF1ZXN0aW9ucyBsZWZ0IHRoZW4gZ2V0IHRoZW0gcmVhZHkgYW5kIGRpc3BsYXkgdGhlbVxyXG5cdFx0XHQvL3F1ZXN0aW9uSW5kZXggKz0gMTtcclxuXHRcdFx0JHNjb3BlLnF1ZXN0aW9uID0gUXVlc3Rpb25TZXJ2aWNlLmdldFF1ZXN0aW9uKCRzY29wZS5xdWVzdGlvbk51bS0xKTtcclxuXHRcdFx0JHNjb3BlLmFuc3dlcnMgPSBRdWVzdGlvblNlcnZpY2Uuc2h1ZmZsZUFuc3dlcnMoJHNjb3BlLnF1ZXN0aW9uLmFuc3dlcnMpO1xyXG5cdFx0XHQkc2NvcGUucXVlc3Rpb25OdW0gKz0gMTtcclxuXHRcdFx0JHNjb3BlLmNvcnJlY3QgPSBudWxsO1xyXG5cdFx0XHQkc2NvcGUuaW5jb3JyZWN0ID0gbnVsbDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvcmVzdWx0cycpO1xyXG5cdFx0fVxyXG5cdH07IFxyXG5cclxuXHQkc2NvcGUuY2hlY2tBbnN3ZXIgPSBmdW5jdGlvbihpbmRleCkge1xyXG5cdFx0aWYgKCRzY29wZS5xdWVzdGlvbi5hbnN3ZXJzW2luZGV4XSA9PT0gJHNjb3BlLnF1ZXN0aW9uLmNvcnJlY3QpIHtcclxuXHRcdFx0JHNjb3BlLmNvcnJlY3QgPSBpbmRleDtcclxuXHRcdFx0VXNlclNlcnZpY2UucmlnaHRBbnN3ZXIoKTtcclxuXHRcdFx0JHRpbWVvdXQobmV4dFF1ZXN0aW9uLCAyMDAwKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBjb3JyZWN0ID0gJHNjb3BlLnF1ZXN0aW9uLmFuc3dlcnMuaW5kZXhPZigkc2NvcGUucXVlc3Rpb24uY29ycmVjdCk7XHJcblx0XHRcdCRzY29wZS5jb3JyZWN0ID0gY29ycmVjdDtcclxuXHRcdFx0JHNjb3BlLmluY29ycmVjdCA9IGluZGV4O1xyXG5cdFx0XHRVc2VyU2VydmljZS53cm9uZ0Fuc3dlcigpO1xyXG5cdFx0XHQkdGltZW91dChuZXh0UXVlc3Rpb24sIDIwMDApO1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHJcbn1dKTtcclxuXHJcbmFwcC5jb250cm9sbGVyKCdSZXN1bHRzQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRsb2NhdGlvbicsICdVc2VyU2VydmljZScsICdRdWVzdGlvblNlcnZpY2UnLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbiwgVXNlclNlcnZpY2UsIFF1ZXN0aW9uU2VydmljZSkge1xyXG5cclxuXHQkc2NvcGUuY29ycmVjdCA9IFVzZXJTZXJ2aWNlLmdldENvcnJlY3RBbnN3ZXJzKCk7XHJcblx0JHNjb3BlLnRvdGFsUXVlc3Rpb25zID0gUXVlc3Rpb25TZXJ2aWNlLmdldE51bVF1ZXN0aW9ucygpO1xyXG5cclxuXHQkc2NvcGUudHJ5QWdhaW4gPSBmdW5jdGlvbigpIHtcclxuXHRcdCRsb2NhdGlvbi5wYXRoKCcvcXVpeicpO1xyXG5cdH07XHJcblxyXG59XSk7XHJcblxyXG5hcHAuc2VydmljZSgnVXNlclNlcnZpY2UnLCBbZnVuY3Rpb24gKCkge1xyXG5cdHZhciB1c2VyO1xyXG5cdHZhciBjb3JyZWN0ID0gMDtcclxuXHR2YXIgaW5jb3JyZWN0ID0gMDtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGdldFVzZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gdXNlcjtcclxuXHRcdH0sXHJcblxyXG5cdFx0c2V0VXNlcjogZnVuY3Rpb24odmFsKSB7XHJcblx0XHRcdHVzZXIgPSB2YWw7XHJcblx0XHR9LFxyXG5cclxuXHRcdHJpZ2h0QW5zd2VyOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29ycmVjdCArPSAxO1xyXG5cdFx0fSxcclxuXHJcblx0XHR3cm9uZ0Fuc3dlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGluY29ycmVjdCArPSAxO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXRDb3JyZWN0QW5zd2VyczogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBjb3JyZWN0O1xyXG5cdFx0fVxyXG5cdH07XHJcblx0XHJcbn1dKTtcclxuXHJcbmFwcC5zZXJ2aWNlKCdRdWVzdGlvblNlcnZpY2UnLCBbICckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKSB7XHJcblxyXG5cdHZhciBxdWVzdGlvbnM7XHJcbiBcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0UXVlc3Rpb25zOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JGh0dHAuZ2V0KCdxdWVzdGlvbnMuanNvbicpXHJcblx0XHRcdC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRxdWVzdGlvbnMgPSBkYXRhLnF1ZXN0aW9ucztcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhxdWVzdGlvbnMpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Z2V0UXVlc3Rpb246IGZ1bmN0aW9uKGluZGV4KSB7XHJcblx0XHRcdHJldHVybiBxdWVzdGlvbnNbaW5kZXhdO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXROdW1RdWVzdGlvbnM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gcXVlc3Rpb25zLmxlbmd0aDtcclxuXHRcdH0sXHJcblxyXG5cdFx0c2h1ZmZsZUFuc3dlcnM6IGZ1bmN0aW9uKGFycikge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gYXJyLmxlbmd0aCAtIDE7IGk+MDsgaS0tKSB7XHJcblx0XHRcdFx0dmFyIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcclxuXHRcdFx0XHR2YXIgdG1wID0gYXJyW2ldO1xyXG5cdFx0XHRcdGFycltpXSA9IGFycltqXTtcclxuXHRcdFx0XHRhcnJbal0gPSB0bXA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBhcnI7XHJcblx0XHR9XHJcblx0fTtcclxuXHRcclxufV0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==