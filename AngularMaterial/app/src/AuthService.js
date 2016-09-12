/**
 * Auth Service
 * @author Routeflags,inc
 */

(function () {
	'use strict';
	angular
		.module('angular_material')
		.factory('AuthService', function ($q, $timeout, $http, $httpParamSerializerJQLike) {
			var _user = null;
			var reload = 800;
			return {
				isLogged: function () {
					return !!_user;
				},
				getUser: function () {
					return _user;
				},
				setUser: function (user) {
					_user = user;
				},
				login: function (email, password, hasCookie) {
					var deferred = $q.defer();
					if (hasCookie) {
						deferred.resolve();
						return deferred.promise;
					}
					$timeout(function () {
						$http({
							url: 'https://example.com/login',
							method: 'POST',
							data: {
								password: password,
								email: email
							},
							transformRequest: $httpParamSerializerJQLike
						})
							.success(function (data, status, headers, config) {
								if (data) {
									_user = data;
									deferred.resolve();
								} else {
									deferred.reject();
								}
							})
							.error(function (data, status, headers, config) {
								deferred.reject();
							});
					}, reload);
					return deferred.promise;
				},
				logout: function () {
					_user = null;
					return $q.all();
				}
			};
		})
		.run(function ($rootScope, $location, $route, AuthService) {
			$rootScope.$on('$routeChangeStart', function (ev, next) {
				if (window.location.pathname === '/form.html') return;
				if (next.controller == 'AuthController') {
					if (AuthService.isLogged()) {
						$location.path('/');
						$route.reload();
					}
				}
				else {
					if (AuthService.isLogged() === false) {
						$location.path('/login');
						$route.reload();
					}
				}
			});
		})
})();
