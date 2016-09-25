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

        .when('/bracket', {
            templateUrl : 'pages/bracket.html',
            controller  : 'bracketController'
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
  $scope.calculateWidth = function(leftVotes, rightVotes) {
    var left = (leftVotes/(leftVotes + rightVotes)) * 100
    var right = (rightVotes/(leftVotes + rightVotes)) * 100
    var leftPer = left.toString() + "%"
    var rightPer = right.toString() + "%"
    $("#leftBar").width(leftPer);
    $("#rightBar").width(rightPer);
  }
  $http.get("/tags/" + $routeParams.tag1)
  .then(function(response) {
    var teams = response.data[0];
    $http.get("/teams/" + teams.team1)
    .then(function(response) {
      $scope.team1 = response.data;
    });
    $http.get("/teams/" + teams.team2)
    .then(function(response) {
      $scope.team2 = response.data;
    });
  });
});

striveApp.controller('bracketController', function($scope, $http, $routeParams) {
  $scope.initialize = function() {
    console.log("initalize");
      // init on data-gracket
      $("[data-gracket]").eq(0).gracket({
        cornerRadius : (15),
        canvasLineGap : 15
      });
      // init on data-gracket
      $("[data-gracket]").eq(1).gracket({
        cornerRadius : (15),
        canvasLineGap : 15
      });
      // init on data-gracket
      $("[data-gracket]").eq(2).gracket({
        cornerRadius : (50),
        canvasLineGap : 0,
        teamClass : "g_team_custom",
        gameClass : "g_game_custom",
        currentClass : "g_current_custom",
        canvasLineColor : "#444",
        winnerClass : "g_winner_custom"
      });
      // init on data-gracket
      $("[data-gracket]").eq(3).gracket({
        cornerRadius : (15),
        canvasLineGap : 15
      });
      // init on data-gracket
      $("[data-gracket]").eq(4).gracket({
        cornerRadius : (15),
        canvasLineGap : 15
      });
      // init on data-gracket
      $("[data-gracket]").eq(5).gracket({
        cornerRadius : (15),
        roundLabels : ["SPORTS : 1st Round", "SPORTS : 2nd Round", "SPORTS : WINNER!!!!"]
      });
      // add some labels
      $(".container-secondary .secondary-bracket .g_winner")
        .parent()
        .css("position", "relative")
        .prepend("<h4>3rd Place</h4>")
      $(".container-secondary > div").eq(0).find(".g_winner")
        .parent()
        .css("position", "relative")
        .prepend("<h4>Winner</h4>")
  }
});

striveApp.controller('companyController', function($scope, $http, $routeParams) {
  $http.get("/teams/" + $routeParams.companyId)
  .then(function(response) {
    $scope.company = response.data;
  });
});
