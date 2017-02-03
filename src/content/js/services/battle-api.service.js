const angular = require('angular');
angular.module('flowdan.services', [])
	.factory('BattleApiService', function($http) {
		const apiKey = '6mkt4p99yyjkdpq6gjszw8stbvjyycbq';
		const serverName = 'Stormreaver';
		const guildName = 'Flowdans%20Lounge';
		const minLevel = 110;
		const maxRank = 4;
		return {
			pullRoster(cb) {
				const url = `https://us.api.battle.net/wow/guild/${serverName}/${guildName}?fields=members&locale=en_US&apikey=${apiKey}`;
				$http.get(url, {})
					.then(function success(ret) {
						const listings = ret.data.members;
						const roster = listings
							.filter(function(listing) {
								return listing.character.level >= minLevel && listing.rank <= maxRank;
							})
							.map(function(listing) {
								return {
									name: listing.character.name,
									class: listing.character.class,
									level: listing.character.level,
									spec: listing.character.spec ? listing.character.spec.name : 'unknown',
									rank:  listing.rank,
									missingEnchants: [],
									missingGems: [],
									legendaryCount: 0,
									processed: false,
									raw: '',
									showRaw: false
								};
							});
						cb(roster);
					}, function error() {
						// noop
					});
			},
			pullToonGear(toonName, cb) {
				const itemsUrl = `https://us.api.battle.net/wow/character/${serverName}/${toonName}?fields=items&locale=en_US&apikey=${apiKey}`;
				$http.get(itemsUrl, {})
					.then(function success(ret) {
						cb(ret.data);
					}, function error() {
						// noop
					});
			}
		};
	});