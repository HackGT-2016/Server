// script.js

// create the module and name it striveApp
    // also include ngRoute for all our routing needs
var striveApp = angular.module('striveApp', ['ngRoute']);
// configure our routes
striveApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/bracket.html',
            controller  : 'bracketController'
        })

        .when('/home', {
            templateUrl : 'pages/bracket.html',
            controller  : 'bracketController'
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
  $scope.donate = function(donateID) {
    $http.get("/donate/" + donateID + "/amount/" + "1")
    .then(function(response) {
      if (donateID == "Warner_Brothers") {
        $scope.team1.current_money += 5;
      } else {
        $scope.team2.current_money += 5;
      }
      $scope.calculateWidth($scope.team1.current_money, $scope.team2.current_money);
    });
  }
  $http.get("/tags/" + $routeParams.tag1)
  .then(function(response) {
    var teams = response.data[0];
    $http.get("/teams/" + teams.team1)
    .then(function(response) {
      $scope.team1 = response.data;
      $http.get("/money/" + $scope.team1.id)
      .then(function (response) {
        $scope.team1.current_money = response.data[0].balance;
        if ($scope.team2) {
          $scope.calculateWidth($scope.team1.current_money, $scope.team2.current_money);
        }
      });
    });
    $http.get("/teams/" + teams.team2)
    .then(function(response) {
      $scope.team2 = response.data;
      $http.get("/money/" + $scope.team2.id)
      .then(function (response) {
        $scope.team2.current_money = response.data[0].balance;
        if ($scope.team1) {
          $scope.calculateWidth($scope.team1.current_money, $scope.team2.current_money);
        }
      });
    });

  });
});
striveApp.controller('bracketController', function($scope, $http, $routeParams) {
  $scope.initialize = function() {
    $http.get("/tags/cats")
    .then(function(response) {
      var pairs = response.data;
      var bracketData = [[], [], [], [], []];
      var seed = 1;
      for(var i = 0; i < 8; i++) {
        bracketData[0].push([
          {"name": "", "id": "", "seed": seed},
          {"name": "", "id": "", "seed": seed+1}
        ]);
        seed += 2;
      }
      for(var i = 0; i < 4; i++) {
        bracketData[1].push([
          {"name": "", "id": "", "seed": seed},
          {"name": "", "id": "", "seed": seed+1}
        ]);
        seed += 2;
      }

      for(var i = 0; i < 2; i++) {
        bracketData[2].push([
          {"name": "", "id": "", "seed": seed},
          {"name": "", "id": "", "seed": seed+1}
        ]);
        seed += 2;
      }

      for(var i = 0; i < 1; i++) {
        bracketData[3].push([
          {"name": "", "id": "", "seed": seed},
          {"name": "", "id": "", "seed": seed+1}
        ]);
        seed += 2;

        bracketData[4].push([
          {"name": "", "id": "", "seed": seed},
        ]);
      }
      seed = 0;

      for (var i = 0; i < pairs.length; i++) {
        bracketData[0][i] = [
          {"name": pairs[i].team1, "id": pairs[i].team1, "seed": seed},
          {"name": pairs[i].team2, "id": pairs[i].team2, "seed": seed+1}
        ];
        seed += 2;
      }

      seed = 8;
      for (var i = 8; i < pairs.length; i++) {
        bracketData[1][i] = [
          {"name": pairs[i].team1, "id": pairs[i].team1, "seed": seed},
          {"name": pairs[i].team2, "id": pairs[i].team2, "seed": seed+1}
        ];
        seed += 2;
      }
      seed = 12;
      for (var i = 12; i < pairs.length; i++) {
        bracketData[2][i] = [
          {"name": pairs[i].team1, "id": pairs[i].team1, "seed": seed},
          {"name": pairs[i].team2, "id": pairs[i].team2, "seed": seed+1}
        ];
        seed += 2;
      }
      seed = 14;
      for (var i = 14; i < pairs.length; i++) {
        bracketData[3][i] = [
          {"name": pairs[i].team1, "id": pairs[i].team1, "seed": seed},
          {"name": pairs[i].team2, "id": pairs[i].team2, "seed": seed+1}
        ];
        seed += 2;
      }
      seed = 15;
      for (var i = seed; i < pairs.length; i++) {
        bracketData[4][i] = [
          {"name": pairs[i].team1, "id": pairs[i].team1, "seed": seed},
        ];
      }

        $("#bracket").attr("data-gracket", JSON.stringify(bracketData))
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
    });
  }
});

striveApp.controller('companyController', function($scope, $http, $routeParams) {
  $http.get("/teams/" + $routeParams.companyId)
  .then(function(response) {
    $scope.company = response.data;
  });
});
