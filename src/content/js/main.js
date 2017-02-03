const angular = require('angular');
angular
	.module('flowdan', ['flowdan.services', 'ngQueue'])
	.run(function($rootScope) {
		// simple app
		$rootScope.version = '0.1.0';
		$rootScope.madeWith = '';
		$rootScope.loading = true;
	});