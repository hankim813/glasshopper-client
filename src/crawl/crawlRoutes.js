 angular.module('crawlRoutes', ['ionic', 'crawlFactories'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.crawls', {
    url     : "/crawls",
    views   : {
      'menuContent' : {
        templateUrl   : "crawl/index.tpl.html",
        controller    : 'CrawlController'
      }
    }
  })

  .state('app.crawlHistory', {
    cache   : false,
    url     : "/crawls/history",
    resolve : {
      crawls: function(crawlFactory) {
        return crawlFactory.getAll();
      }
    },
    views   : {
      'menuContent' : {
        templateUrl : "crawl/history.tpl.html",
        controller  : "CrawlHistoryController"
      }
    }
  })

  .state('app.currentCrawl', {
    cache   : false,
  	url 		: "/crawls/:crawlId",
  	views	  : {
  		'menuContent'	: {
  			templateUrl : "crawl/show.tpl.html",
  			controller  : "CurrentCrawlController"
  		}
  	}
  });
});