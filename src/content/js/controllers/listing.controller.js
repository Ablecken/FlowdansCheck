const angular = require('angular');

angular.module('flowdan')
	.controller('listingCtrl', function($rootScope, $scope, $queue, $sce, BattleApiService) {
		$scope.ranks = ['GM', 'Officer', 'Raider', 'Banker', 'Trial', '5', '6', '7'];
		$scope.roster = [];
		const gearEnchantSlots = ['neck', 'back', 'finger1', 'finger2'];

		const processQueueItem = function(toon) {
			BattleApiService.pullToonGear(toon.name, function(ret) {
				const items = ret.items;
				toon.gearLevel = items.averageItemLevel;
				angular.forEach(items, function(gear, slot) {
					if (gear.hasOwnProperty('id')) {
						// enchant
						if (gearEnchantSlots.indexOf(slot) >= 0 && !gear.tooltipParams.hasOwnProperty('enchant')) {
							toon.missingEnchants.push(`Missing enchant on ${slot}`);
						}
						// gem
						if (gear.bonusLists.indexOf(1808) >= 0 && !gear.tooltipParams.hasOwnProperty('gem0')) {
							toon.missingGems.push(`Missing gem on ${slot}`);
						}
					}
				});
				toon.processed = true;
			});
		};
		const options = {
			delay: 100
		};
		const $q = $queue.queue(processQueueItem, options);

		$scope.pullRoster = function() {
			BattleApiService.pullRoster(function(ret) {
				$scope.roster = ret;
				$q.addEach(ret);
			});			
		};
		$scope.pullRoster();

		$rootScope.loading = false;
	});