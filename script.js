// script.js

// create the module and name it striveApp
    // also include ngRoute for all our routing needs
var striveApp = angular.module('striveApp', ['ngRoute']);

// configure our routes
striveApp.config(function($routeProvider) {
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

        .when('/matchups/:tag1', {
          templateUrl : 'pages/matchups.html',
          controller : 'matchupsController'
        })

        .when('/company/:companyId', {
          templateUrl : 'pages/company.html',
          controller : 'companyController'
        })

        .otherwise({redirectTo : '/home'});
});

// create the controller and inject Angular's $scope
striveApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    //TODO: Nessie
    $scope.donate = function(amount) {
      alert(amount);
    }
});

striveApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

striveApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

striveApp.controller('tagsController', function($scope, $http) {
  $http.get("/tags")
  .then(function(response) {
    $scope.tags = response.data;
  });
});

striveApp.controller('teamsController', function($scope, $http) {
  $http.get("/teams")
  .then(function(response) {
    $scope.teams = response.data;
  });
});

striveApp.controller('matchupsController', function($scope, $http, $routeParams) {
  $http.get("/tags/" + $routeParams.tag1)
  .then(function(response) {
    $scope.matchups = response.data;
  });
});

striveApp.controller('companyController', function($scope, $http, $routeParams) {
  $http.get("/teams/" + $routeParams.companyId)
  .then(function(response) {
    $scope.company = response.data;
  });
});
