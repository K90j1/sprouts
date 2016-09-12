/**
 * Config
 * @license Material Design icons by Google licensed under the CC 3.0 BY
 * @author Routeflags,inc
 */
(function () {
	'use strict';
	//noinspection JSUnresolvedFunction,JSUnresolvedVariable
	angular
		.module('angular_material', ['ngMaterial', 'ngCookies', 'ngRoute'])
		.config(function ($mdThemingProvider, $routeProvider, $compileProvider) {
			//noinspection JSUnresolvedFunction
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|javascript|mailto|http):/);
			//noinspection JSUnresolvedFunction
			$mdThemingProvider.theme('default')
				.primaryPalette('blue')
				.accentPalette('red');
			//noinspection JSUnresolvedFunction
			$routeProvider
				.otherwise({
					redirectTo: '/'
				});
		})
		.controller('formController', function ($window, $location, $scope, $mdToast) {
			//noinspection JSUnresolvedFunction
			$scope.input = {};
			$scope.input.name = "";
			$scope.input.password = "";
			$scope.input.birth_day = new Date();
			$scope.input.postcode = "";
			$scope.input.prefecture = "";
			$scope.input.address = "";
			$scope.input.confirm = false;
			$scope.input.prefectures = [
				"北海道"
				, "青森県"
				, "岩手県"
				, "宮城県"
				, "秋田県"
				, "山形県"
				, "福島県"
				, "茨城県"
				, "栃木県"
				, "群馬県"
				, "埼玉県"
				, "千葉県"
				, "東京都"
				, "神奈川県"
				, "新潟県"
				, "富山県"
				, "石川県"
				, "福井県"
				, "山梨県"
				, "長野県"
				, "岐阜県"
				, "静岡県"
				, "愛知県"
				, "三重県"
				, "滋賀県"
				, "京都府"
				, "大阪府"
				, "兵庫県"
				, "奈良県"
				, "和歌山県"
				, "鳥取県"
				, "島根県"
				, "岡山県"
				, "広島県"
				, "山口県"
				, "徳島県"
				, "香川県"
				, "愛媛県"
				, "高知県"
				, "福岡県"
				, "佐賀県"
				, "長崎県"
				, "熊本県"
				, "大分県"
				, "宮崎県"
				, "鹿児島県"
				, "沖縄県"
			];
			var alertTime = 5000;
			$scope.$watch('input.address', function (value) {

			});
			var last = {
				bottom: false,
				top: true,
				left: false,
				right: true
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

			function setMessage(result) {
				if (!result) return;
				$mdToast.show(
					$mdToast.simple()
						.textContent(msgError)
						.position($scope.getToastPosition())
						.hideDelay(alertTime)
						.parent("#toast-container")
				);
			}

		});
})();
