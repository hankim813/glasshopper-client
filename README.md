> **Note**: This web app is still a work in progress

GlassHopper (client)
==================

Ever find yourself stuck at a boring empty bar?
GlassHopper gives you a snapshot of the current state of bars around you via geolocation search. Get realtime data such as girl to guy ratio, number of people, noise level, and more!

###Dependencies: 
- Xcode: [https://developer.apple.com/xcode/downloads/](https://developer.apple.com/xcode/downloads/)
- Ionic: [http://ionicframework.com/getting-started/](http://ionicframework.com/getting-started/)
- AngularJS: [https://github.com/angular/angular.js](https://github.com/angular/angular.js)

###Initial Installation:
`````
$ npm install
$ bower install
$ ionic platform remove ios
$ gulp
$ gulp vendor
`````

###Usage

To view on the web:
````
$ ionic serve
```

To view in Xcode ios simulator: 
`````
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
````
