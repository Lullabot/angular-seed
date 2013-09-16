'use strict';

angular.module('myApp.services', ['ngResource', 'LocalStorageModule'])

  .value('cms', 'http://local.angular-drupal.backend')

  .factory('cmsSiteSettings', ['$resource', 'cms', function($resource, cms) {
    return $resource(cms + '/api/1.0/site-information.json', {}, {
      get: {
        method: 'GET',
        cache: true
      }
    });
  }])

  .factory('cmsMainMenu', ['$resource', 'cms', function($resource, cms) {
    return $resource(cms + '/api/1.0/main-menu.json', {}, {
      get: {
        method: 'GET',
        cache: true
      }
    });
  }])

  .factory('cmsNode', ['$resource', 'cms', function($resource, cms) {
    return $resource(cms + '/api/1.0/nodes.json',
      {
        path: '@path'
      },
      {
        get: {
          method: 'GET',
          cache: true
        }
      }
    );
  }])

  .factory('cmsTemplate', ['$http', '$templateCache', 'localStorageService', '$q', '$timeout', function($http, $templateCache, localStorageService, $q, $timeout) {
    return {
      getPartial: function(node) {
        var currentPath = 'node/' + node.id;
        var deferred = $q.defer();
        $timeout(function() {
          var templateUrl = localStorageService.get('myApp.templateUri.node.' + currentPath) || '/_partials/nodes/' + node.type + '.html';
          $http.get(templateUrl, {
            cache: $templateCache
          })
            .success(function(data) {
              localStorageService.add('myApp.templateUri.node.' + currentPath, templateUrl);
              $templateCache.put(templateUrl, data);
              deferred.resolve(templateUrl);
            })
            .error(function(data) {
              var genericTemplateUrl = '/_partials/nodes/node.html';
              localStorageService.remove('myApp.templateUri.node.' + currentPath);
              $http.get(genericTemplateUrl, {
                cache: $templateCache
              })
                .success(function(data) {
                  localStorageService.add('myApp.templateUri.node.' + currentPath, genericTemplateUrl);
                  $templateCache.put(templateUrl, data);
                  deferred.resolve(templateUrl);
                })
                .error(function(data){
                  localStorageService.remove('myApp.templateUri.node.' + currentPath);
                  deferred.reject();
                });
          });
        });
        return deferred.promise;
      }
    };
  }])

  .factory('cmsNews', ['cms', '$resource', function(cms, $resource) {
    return $resource(cms + '/api/1.0/news.json', {}, {
      get: {
        method: 'GET',
        cache: true
      }
    });
  }])

  .factory('cmsTout', ['cms', '$resource', function(cms, $resource) {
    return $resource(cms + '/api/1.0/touts.json', {
      id: '@id'
    }, {
      get: {
        method: 'GET',
        cache: true
      }
    });
  }])
;
