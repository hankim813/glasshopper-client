angular.module('settingsRoutes', ['ionic', 'settingsModel'])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('app.settings', {
		url     : "/settings",
		views		: {
			'menuContent': {
				templateUrl: "user_settings/settings.tpl.html",
				controller : 'SettingsController'
			}
		}
	})
});