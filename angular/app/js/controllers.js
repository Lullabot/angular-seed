'use strict';

angular.module('myApp.controllers', [])
  .controller('SiteCtrl', ['$scope', 'cmsSiteSettings', function($scope, cmsSiteSettings) {
    $scope.site = {
      templates: {
        mainMenu: '/_partials/mainMenu.html'
      }
    };
    var siteSettings = cmsSiteSettings.get({}, function (settings) {
      if (settings.variables) {
        for (var key in settings.variables) {
          if (settings.variables.hasOwnProperty(key) && key.substr(0, 5) === 'site_') {
            $scope.site[key.substr(5)] = settings.variables[key];
          }
        }
      }
    });
  }])

  .controller('MainMenuCtrl', ['$scope', 'cmsMainMenu', function($scope, cmsMainMenu) {
   $scope.mainMenu = [];
    var mainMenu = cmsMainMenu.get({}, function(data) {
      if (data.links.length) {
        for (var i = 0; i < data.links.length; i++) {
          var link = data.links[i].link;
          if (link.internal_path === '<front>') {
            link.path = '/';
          }
          else {
            link.path = '/' + link.alias;
          }
          $scope.mainMenu.push(data.links[i].link);
        }
      }
    });
  }])

  .controller('PageCtrl', ['$scope', 'cmsNode', 'cmsSiteSettings', '$location', 'cmsTemplate', function($scope, cmsNode, cmsSiteSettings, $location, cmsTemplate) {
    $scope.node = {};
    $scope.front = false;
    $scope.path = $location.path().substr(1);
    var node = cmsNode.get({path: $scope.path}, function(data) {
      if (data.nodes && data.nodes[0] && data.nodes[0].node) {
        $scope.node = data.nodes[0].node;
        var siteSettings = cmsSiteSettings.get({}, function (settings) {
          if (settings.variables) {
            if (settings.variables.site_frontpage) {
              if ($scope.node.path && $scope.node.path == settings.variables.site_frontpage || 'node/' + $scope.node.id == settings.variables.site_frontpage) {
                $scope.front = true;
              }
            }

            if ($scope.node.type && settings.variables.allowed_content_types && settings.variables.allowed_content_types.indexOf($scope.node.type) !== -1) {
              if ($scope.path !== $scope.node.path) {
                $location.path($scope.node.path).replace();
              }

              cmsTemplate.getPartial($scope.node).then(function(partialUrl) {
                $scope.templateUrl = partialUrl;
              }, function () {
                $location.path('/404');
              });
            }
            else {
              $location.path('/404');
            }
          }
        });
      }
      else {
        $location.path('/404');
      }
    });
  }])

    });
  }])


;