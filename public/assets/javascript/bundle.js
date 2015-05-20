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
	$scope.numQuestions = QuestionService.getNumQuestions();
	$scope.correct = null;
	$scope.incorrect = null;

	//Fetch the next question
	var nextQuestion = function() {
		if ($scope.questionNum < QuestionService.getNumQuestions()) { //If there's still questions left then get them ready and display them
			//questionIndex += 1;
			$scope.question = QuestionService.getQuestion($scope.questionNum-1);
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
		}
	};
	
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgncXVpenVsYXJBcHAnLCBbJ25nUm91dGUnLCAnbmdBbmltYXRlJ10pXHJcbi5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcblx0JHJvdXRlUHJvdmlkZXJcclxuXHQud2hlbignLycsIHtcclxuXHRcdHRlbXBsYXRlVXJsOid2aWV3cy9pbmRleC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6ICdJbmRleENvbnRyb2xsZXInXHJcblx0fSlcclxuXHQud2hlbignL3dlbGNvbWUnLCB7XHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL3dlbGNvbWUuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOiAnV2VsY29tZUNvbnRyb2xsZXInXHJcblx0fSlcclxuXHQud2hlbignL3F1aXonLCB7XHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL3F1aXouaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOiAnUXVpekNvbnRyb2xsZXInXHJcblx0fSlcclxuXHQud2hlbignL3Jlc3VsdHMnLCB7XHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL3Jlc3VsdHMuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOiAnUmVzdWx0c0NvbnRyb2xsZXInXHJcblx0fSlcclxuXHQub3RoZXJ3aXNlKHtcclxuXHRcdHJlZGlyZWN0VG86ICcvJ1xyXG5cdH0pO1xyXG59XSk7IFxyXG5cclxuXHJcbmFwcC5jb250cm9sbGVyKCdJbmRleENvbnRyb2xsZXInLCBbJyRzY29wZScsJyRsb2NhdGlvbicsJ1VzZXJTZXJ2aWNlJywgJ1F1ZXN0aW9uU2VydmljZScsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uLCBVc2VyU2VydmljZSwgUXVlc3Rpb25TZXJ2aWNlKSB7XHJcblxyXG5cdHZhciB1c2VyID0gVXNlclNlcnZpY2U7XHJcblxyXG5cdCRzY29wZS5lbnRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dXNlci5zZXRVc2VyKCRzY29wZS51c2VyTmFtZSk7XHJcblx0XHQkbG9jYXRpb24ucGF0aCgnL3dlbGNvbWUnKTtcclxuXHR9O1xyXG5cclxufV0pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ1dlbGNvbWVDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJGxvY2F0aW9uJywgJ1VzZXJTZXJ2aWNlJywgJ1F1ZXN0aW9uU2VydmljZScsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uLCBVc2VyU2VydmljZSwgUXVlc3Rpb25TZXJ2aWNlKSB7XHJcblxyXG5cdGlmIChVc2VyU2VydmljZS5nZXRVc2VyKCkgPT09IG51bGwpIHtcclxuXHRcdCRzY29wZS51c2VybmFtZSA9IFwiVW5rbm93biBVc2VyIVwiO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkc2NvcGUudXNlcm5hbWUgPSBVc2VyU2VydmljZS5nZXRVc2VyKCk7XHJcblx0fVxyXG5cclxuXHRRdWVzdGlvblNlcnZpY2UuZ2V0UXVlc3Rpb25zKCk7Ly8gLy9Mb2FkIHRoZSBxdWVzdGlvbnMuXHJcblxyXG5cdCRzY29wZS5iZWdpblF1aXogPSBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiQnV0dG9uIFByZXNzZWQhXCIpO1xyXG5cclxuXHRcdCRsb2NhdGlvbi5wYXRoKCcvcXVpeicpO1xyXG5cdH07XHJcblxyXG59XSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignUXVpekNvbnRyb2xsZXInLCBbJyRzY29wZScsICckdGltZW91dCcsICckbG9jYXRpb24nLCAnUXVlc3Rpb25TZXJ2aWNlJywgJ1VzZXJTZXJ2aWNlJywgZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCwgJGxvY2F0aW9uLCBRdWVzdGlvblNlcnZpY2UsIFVzZXJTZXJ2aWNlKXtcclxuXHJcblx0Ly9Jbml0aWFsIHZhcmlhYmxlcyBibGFoIGJsYWggYmxhaFxyXG5cdCRzY29wZS5zY29yZSA9IDA7XHJcblx0XHJcblx0JHNjb3BlLnVzZXIgPSBVc2VyU2VydmljZS5nZXRVc2VyKCk7Ly9HZXQgdGhlIHVzZXIgaW5mb3JtYXRpb24uXHJcblx0Ly92YXIgcXVlc3Rpb25JbmRleCA9IC0xO1xyXG5cdCRzY29wZS5xdWVzdGlvbk51bSA9IDE7XHJcblx0JHNjb3BlLnF1ZXN0aW9uID0gUXVlc3Rpb25TZXJ2aWNlLmdldFF1ZXN0aW9uKCRzY29wZS5xdWVzdGlvbk51bS0xKTtcclxuXHQkc2NvcGUubnVtUXVlc3Rpb25zID0gUXVlc3Rpb25TZXJ2aWNlLmdldE51bVF1ZXN0aW9ucygpO1xyXG5cdCRzY29wZS5jb3JyZWN0ID0gbnVsbDtcclxuXHQkc2NvcGUuaW5jb3JyZWN0ID0gbnVsbDtcclxuXHJcblx0Ly9GZXRjaCB0aGUgbmV4dCBxdWVzdGlvblxyXG5cdHZhciBuZXh0UXVlc3Rpb24gPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmICgkc2NvcGUucXVlc3Rpb25OdW0gPCBRdWVzdGlvblNlcnZpY2UuZ2V0TnVtUXVlc3Rpb25zKCkpIHsgLy9JZiB0aGVyZSdzIHN0aWxsIHF1ZXN0aW9ucyBsZWZ0IHRoZW4gZ2V0IHRoZW0gcmVhZHkgYW5kIGRpc3BsYXkgdGhlbVxyXG5cdFx0XHQvL3F1ZXN0aW9uSW5kZXggKz0gMTtcclxuXHRcdFx0JHNjb3BlLnF1ZXN0aW9uID0gUXVlc3Rpb25TZXJ2aWNlLmdldFF1ZXN0aW9uKCRzY29wZS5xdWVzdGlvbk51bS0xKTtcclxuXHRcdFx0JHNjb3BlLnF1ZXN0aW9uTnVtICs9IDE7XHJcblx0XHRcdCRzY29wZS5jb3JyZWN0ID0gbnVsbDtcclxuXHRcdFx0JHNjb3BlLmluY29ycmVjdCA9IG51bGw7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkbG9jYXRpb24ucGF0aCgnL3Jlc3VsdHMnKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQkc2NvcGUuY2hlY2tBbnN3ZXIgPSBmdW5jdGlvbihpbmRleCkge1xyXG5cdFx0aWYgKCRzY29wZS5xdWVzdGlvbi5hbnN3ZXJzW2luZGV4XSA9PT0gJHNjb3BlLnF1ZXN0aW9uLmNvcnJlY3QpIHtcclxuXHRcdFx0JHNjb3BlLmNvcnJlY3QgPSBpbmRleDtcclxuXHRcdFx0VXNlclNlcnZpY2UucmlnaHRBbnN3ZXIoKTtcclxuXHRcdFx0JHRpbWVvdXQobmV4dFF1ZXN0aW9uLCAyMDAwKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBjb3JyZWN0ID0gJHNjb3BlLnF1ZXN0aW9uLmFuc3dlcnMuaW5kZXhPZigkc2NvcGUucXVlc3Rpb24uY29ycmVjdCk7XHJcblx0XHRcdCRzY29wZS5jb3JyZWN0ID0gY29ycmVjdDtcclxuXHRcdFx0JHNjb3BlLmluY29ycmVjdCA9IGluZGV4O1xyXG5cdFx0XHRVc2VyU2VydmljZS53cm9uZ0Fuc3dlcigpO1xyXG5cdFx0XHQkdGltZW91dChuZXh0UXVlc3Rpb24sIDIwMDApO1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHJcbn1dKTtcclxuXHJcbmFwcC5jb250cm9sbGVyKCdSZXN1bHRzQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRsb2NhdGlvbicsICdVc2VyU2VydmljZScsICdRdWVzdGlvblNlcnZpY2UnLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbiwgVXNlclNlcnZpY2UsIFF1ZXN0aW9uU2VydmljZSkge1xyXG5cclxuXHQkc2NvcGUuY29ycmVjdCA9IFVzZXJTZXJ2aWNlLmdldENvcnJlY3RBbnN3ZXJzKCk7XHJcblx0JHNjb3BlLnRvdGFsUXVlc3Rpb25zID0gUXVlc3Rpb25TZXJ2aWNlLmdldE51bVF1ZXN0aW9ucygpO1xyXG5cclxuXHQkc2NvcGUudHJ5QWdhaW4gPSBmdW5jdGlvbigpIHtcclxuXHRcdCRsb2NhdGlvbi5wYXRoKCcvcXVpeicpO1xyXG5cdH07XHJcblxyXG59XSk7XHJcblxyXG5hcHAuc2VydmljZSgnVXNlclNlcnZpY2UnLCBbZnVuY3Rpb24gKCkge1xyXG5cdHZhciB1c2VyO1xyXG5cdHZhciBjb3JyZWN0ID0gMDtcclxuXHR2YXIgaW5jb3JyZWN0ID0gMDtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGdldFVzZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gdXNlcjtcclxuXHRcdH0sXHJcblxyXG5cdFx0c2V0VXNlcjogZnVuY3Rpb24odmFsKSB7XHJcblx0XHRcdHVzZXIgPSB2YWw7XHJcblx0XHR9LFxyXG5cclxuXHRcdHJpZ2h0QW5zd2VyOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29ycmVjdCArPSAxO1xyXG5cdFx0fSxcclxuXHJcblx0XHR3cm9uZ0Fuc3dlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGluY29ycmVjdCArPSAxO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXRDb3JyZWN0QW5zd2VyczogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBjb3JyZWN0O1xyXG5cdFx0fVxyXG5cdH07XHJcblx0XHJcbn1dKTtcclxuXHJcbmFwcC5zZXJ2aWNlKCdRdWVzdGlvblNlcnZpY2UnLCBbICckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKSB7XHJcblxyXG5cdHZhciBxdWVzdGlvbnM7XHJcbiBcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0UXVlc3Rpb25zOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JGh0dHAuZ2V0KCdxdWVzdGlvbnMuanNvbicpXHJcblx0XHRcdC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRxdWVzdGlvbnMgPSBkYXRhLnF1ZXN0aW9ucztcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhxdWVzdGlvbnMpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Z2V0UXVlc3Rpb246IGZ1bmN0aW9uKGluZGV4KSB7XHJcblx0XHRcdHJldHVybiBxdWVzdGlvbnNbaW5kZXhdO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXROdW1RdWVzdGlvbnM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gcXVlc3Rpb25zLmxlbmd0aDtcclxuXHRcdH1cclxuXHR9O1xyXG5cdFxyXG59XSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9