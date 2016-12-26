
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
    
    .state('photo', {
        url: '/',
        params: {
            eventId: null,
            photoId: null
        },
         onEnter: ['$uibModal', 'galleryFactory', '$state', '$stateParams', 'previousState', function($uibModal, galleryFactory, $state, $stateParams, previousState){
             var eventId = parseInt($stateParams.eventId, 10);
             var photoId = parseInt($stateParams.photoId, 10);
             $uibModal.open({
                 animation: true,
                 size: 'lg',
                 templateUrl: 'views/photo-frame.html',
                 controller: 'photoFrameController', 
                 resolve: {
                     photoInfo: ['galleryFactory', function(galleryFactory){
                         return galleryFactory.getPhotoInfo(eventId, photoId);
                     }]
                 }
             }).result.finally(function(){
                 if (previousState.name == "event") $state.go('event', {eventId: eventId}); else $state.go('aboutus');
             })
         }],
        resolve: {
            previousState: ['$state', function($state){
                var currentStateData = {
                            name: $state.current.name,
                            params: $state.params,
                            URL: $state.href($state.current.name, $state.params)
                        };
                return currentStateData;
            }]
        }
        
    })
    
    .state('detail', {
       url: '/gallery/:eventId/:photoId',
        onEnter: ['previousState', '$state', 'photoInfo', function(previousState, $state, photoInfo){
            console.log('This is previous state:')
            console.log(previousState);
            if (previousState.name != 'photo' && previousState.name != 'detail') $state.go('photo', {
                eventId: photoInfo.currentEvent.id,
                photoId: photoInfo.currentPhoto.id
            })
            
            
        }],
        resolve: {
            photoInfo: ['galleryFactory', '$stateParams',  function(galleryFactory, $stateParams){
                var eventId = parseInt($stateParams.eventId, 10);
                var photoId = parseInt($stateParams.photoId, 10);
                return galleryFactory.getPhotoInfo(eventId, photoId);
            }],
            previousState: ['$state', function($state){
                var currentStateData = {
                            name: $state.current.name,
                            params: $state.params,
                            URL: $state.href($state.current.name, $state.params)
                        };
                return currentStateData;
            }]
        }
    })
    
    
    
    
    
    
}])
.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});