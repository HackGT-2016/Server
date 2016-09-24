// script.js

// create the module and name it strideApp
    // also include ngRoute for all our routing needs
var strideApp = angular.module('strideApp', ['ngRoute']);

// configure our routes
strideApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        .when('/home', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        })

        .when('/tags', {
            templateUrl : 'pages/tags.html',
            controller  : 'tagsController'
        })

        .when('/teams', {
            templateUrl : 'pages/teams.html',
            controller  : 'teamsController'
        })

        .otherwise({redirectTo : '/home'});
});

// create the controller and inject Angular's $scope
strideApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

strideApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

strideApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

strideApp.controller('tagsController', function($scope, $http) {
  $http.get("/tags")
  .then(function(response) {
    $scope.tags = response.data;
  });
});

strideApp.controller('teamsController', function($scope, $http) {
  $http.get("/teams")
  .then(function(response) {
    $scope.teams = response.data;
  });
});

strideApp.controller('matchupsController', function($scope, $http) {
  $http.get("/teams")
  .then(function(response) {
    $scope.teams = response.data;
  });
});
