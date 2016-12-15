
//'use strict'
angular.module('kiddsapp', ['kiddsapp.controllers', 'kiddsapp.services', 'ui.router', 'ui.bootstrap'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
    
    .state('aboutus', {
        url: '/aboutus',
        views: {
           'teacherFrame' : {
                templateUrl: 'views/teachers.html',
                controller: 'teachersController'
           },
            'galleryFrame': {
                templateUrl: 'views/gallery.html',
                controller: 'galleryController'
            }
       }
    })
    
    
    .state('teacher', {
        url: '/teachers/:teacherId',
        views: {
           'teacherFrame' : {
                templateUrl: 'views/teacher-detail.html',
                controller: 'teacherDetailController'
           },
            'galleryFrame': {
                templateUrl: 'views/gallery.html',
                controller: 'galleryController'
            }
           
       },
        resolve: {
            teacher: ['$stateParams', 'teachersFactory', function($stateParams, teachersFactory){
                return teachersFactory.getTeacherById(parseInt($stateParams.teacherId, 10));
            }]
        }
    })
    
    
    .state('event', {
        url: '/gallery/:eventId',
        views: {
            'teacherFrame' : {
                templateUrl: 'views/teachers.html',
                controller: 'teachersController'
           },
           'galleryFrame' : {
                templateUrl: 'views/event-detail.html',
                controller: 'eventDetailController'
           }
       },
        resolve: {
            event: ['$stateParams', 'galleryFactory', function($stateParams, galleryFactory){
                var event = galleryFactory.getEventById(parseInt($stateParams.eventId, 10));
                console.log('Resolved to event: '+event.name);
                return event;
            }]
        }
    })
    
    
    
    
    
}])
.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});