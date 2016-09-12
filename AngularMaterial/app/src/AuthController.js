/**
 * AuthController Controller
 * @author Routeflags,inc
 */
(function () {
	'use strict';
	angular
		.module('angular_material')
		.controller('AuthController', [
			'$cookies', '$scope', 'AuthService',
			AuthController
		]);

	function AuthController($cookies, $scope, AuthService) {
		/**
		 * get Cookie
		 * @inner email
		 * @inner password
		 */
		$scope.getCookie = function () {
			if ($cookies.get('angular_material') == undefined) {
				return;
			}
			AuthService.setUser({account_id: parseInt($cookies.get('angular_material'))});
			AuthService.login($scope.email, $scope.password, true)
				.then(function () {
				})
				.catch(function () {
				})
				.finally(function () {
				});
		};

		/**
		 * login
		 * @inner email
		 * @inner password
		 */
		$scope.login = function () {
			$scope.disabled = true;
			$scope.keepLogin = this.keepLogin;
			AuthService.login($scope.email, $scope.password, false)
				.then(function () {
					var usr = AuthService.getUser();
					if ($scope.keepLogin) {
						$cookies.put('angular_material', usr['account_id']);
					}
				})
				.catch(function () {
				})
				.finally(function () {
				});
		};

		$scope.toastPosition = angular.extend({}, last);
		
		$scope.getToastPosition = function () {
			sanitizePosition();
			return Object.keys($scope.toastPosition)
				.filter(function (pos) {
					return $scope.toastPosition[pos];
				})
				.join(' ');
		};

		function sanitizePosition() {
			var current = $scope.toastPosition;
			if (current.bottom && last.top) current.top = false;
			if (current.top && last.bottom) current.bottom = false;
			if (current.right && last.left) current.left = false;
			if (current.left && last.right) current.right = false;
			last = angular.extend({}, current);
		}
	}
})();
