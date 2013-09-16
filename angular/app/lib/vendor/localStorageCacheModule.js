/* Start angularLocalStorageCache */

var angularLocalStorageCache = angular.module('LocalStorageCacheModule', ['LocalStorageModule']);

angularLocalStorageCache.constant('expiration', { expire: true, days: 30} );

angularLocalStorageCache.service('localStorageCacheService', ['expiration', 'localStorageService', function (expiration, localStorageService) {
  var remove = function (key) {
    if (expiration.expire) {
      localStorageService.remove(key + '__expiration');
    };
    localStorageService.remove(key);
  };

  var get = function (key) {
    if (expiration.expire) {
      var isExpirationKey = key.match(/__expiration$/) != null;
      if (!isExpirationKey && isExpired(key)) {
        remove(key);
        return null;
      };
    };
    return localStorageService.get(key);
  };

  // Check if the data associated to the current key is expired.
  var isExpired = function (key) {
    var expirationDate = localStorageService.get(key + '__expiration');
    if (!expirationDate) {
      return false;
    };
    var now = new Date();
    var expiration = new Date(expirationDate);
    return expiration > now;
  };

  // Ovewrite add function to insert expiration date.
  var add = function (key, value) {
    var isExpirationKey = key.match(/__expiration$/) != null;
    if (expiration.expire && !isExpirationKey) {
      var now = new Date();
      var exp = new Date(now.getTime() + (expiration.days * 1000 * 60 * 60 * 24));
      localStorageService.add(key + '__expiration', exp.toString());
    };
    localStorageService.add(key, value);
  };
  
  return {
    add: add, 
    get: get,
    remove: remove
  };

}]);