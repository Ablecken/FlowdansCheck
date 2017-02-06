const angular = require('angular');
angular
	.module('flowdan', ['flowdan.services', 'ngQueue'])
	.run(function($rootScope) {
		// simple app
		$rootScope.version = '0.2.0';
		$rootScope.madeWith = 'NodeJs, AngularJS running on Apache2';
		$rootScope.loading = true;
	});