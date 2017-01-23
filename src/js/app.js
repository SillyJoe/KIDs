
//'use strict'
angular.module('kiddsapp', ['kiddsapp.controllers', 'kiddsapp.services', 'ui.router', 'ngAnimate', 'ui.bootstrap'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
    
    .state('app', {
        url: '/',
        params: {
            scrollTo: ''
        },
        onEnter: [function(){
            console.log('Entered main state');
        }],
        views: {
            'header': {
                templateUrl: 'views/index-header.html',
                controller: 'indexController'
            },
            'mainContent': {
                templateUrl: 'views/index-content.html',
                controller: 'newsController'
            },
            'footer': {
                templateUrl: 'views/footer.html'
            }
        },
        resolve: {
            scrollTo: ['$stateParams', function($stateParams){
                return $stateParams.scrollTo
            }]
        }
        
    })
    
        
    .state('app.aboutus', {
        url: 'aboutus',
        params: {
            scrollTo: ''
        },
        views: {
            'header@': {
                templateUrl: 'views/common-header.html',
            },
            'mainContent@': {
                templateUrl: 'views/aboutus-content.html',
                controller: 'aboutusController'
            }
        },
        resolve: {
            scrollTo: ['$stateParams', function($stateParams){
                return $stateParams.scrollTo;
            }]
        }
        
    })
    
    
    .state('app.aboutus.general', {
        params: {
            scrollTo: ''
        },
        onEnter: ['scrollTo', '$anchorScroll', '$location', '$timeout', function(scrollTo, $anchorScroll, $location, $timeout){
                console.log('Entered aboutus general. Will scroll to '+scrollTo)
                 if(scrollTo != '') {
                    $timeout(function(){
                        $location.hash(scrollTo);
                        $anchorScroll();
                        $location.hash('');
                }, 500);
                }                
                
            }],
        url: '/',
        views: {
           'teacherFrame' : {
                templateUrl: 'views/teachers.html',
           },
            'galleryFrame': {
                templateUrl: 'views/gallery.html',
            }
       },
        resolve: {
            scrollTo: ['$stateParams', function($stateParams){
                return $stateParams.scrollTo;
            }]
        }
        
    })
    
    
    
    .state('app.aboutus.teacher', {
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
    
    
    .state('app.aboutus.event', {
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
    
    .state('app.aboutus.photo', {
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
                 if (previousState.name == "app.aboutus.event") $state.go('app.aboutus.event', {eventId: eventId});
                 else $state.go('app.aboutus.general', {scrollTo:'gallery'});
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
    
    .state('app.aboutus.detail', {
       url: '/gallery/:eventId/:photoId',
        onEnter: ['previousState', '$state', 'photoInfo', function(previousState, $state, photoInfo){
            console.log('This is previous state:')
            console.log(previousState);
            if (previousState.name != 'app.aboutus.photo' && previousState.name != 'app.aboutus.detail') $state.go('app.aboutus.photo', {
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
    
    .state('app.services', {
        url: 'services',
        params: {
            scrollTo: ''
        },
        views: {
            'header@': {
                templateUrl: 'views/common-header.html'
            },
            'mainContent@': {
                templateUrl: 'views/services-content.html',
                controller: 'servicesController'
            },
        },
        resolve: {
            scrollTo: ['$stateParams', function($stateParams){
               return $stateParams.scrollTo; 
            }]
        }
    })
    
    .state('app.contactus', {
        url: 'contactus',
        //debug
        onEnter: [function(){
            console.log('Entered contactus state');
        }],
        views: {
            'header@': {
                templateUrl: 'views/common-header.html',
            },
            'mainContent@': {
                templateUrl: 'views/contactus-content.html',
                controller: 'contactusController'
            }
        }
    })
    
    .state('app.passtest_initial', {
        url: '/passtest',
        views: {
            'header@': {
                templateUrl: 'views/common-header.html',
            },
           'mainContent@' : {
               templateUrl: 'views/passtest-initial.html',
               controller: 'passTestInitialController'  
           }
        },
        resolve: {
            tests: ['passTestFactory', function(passTestFactory){
                return passTestFactory.getTests();
            }]
        }
    })
    
    .state('app.passtest_test', {
        url: '/:alias',
        params: {
            testDetails: null
        },
        views: {
            'header@': {
                templateUrl: 'views/common-header.html',
            },
           'mainContent@' : {
               templateUrl: 'views/passtest-test.html',
               controller: 'passTestTestController'  
           }
        },
        resolve: {
            testDetails: ['$stateParams', function($stateParams, passTestFactory){
                return $stateParams.testDetails;
            }],
            test: ['$stateParams', 'passTestFactory', function($stateParams, passTestFactory){
                var tests = passTestFactory.getTests();
                var test;
                var test_copy = {};
                for (var i = 0; i < tests.length; i++) {
                    if (tests[i].alias == $stateParams.alias) {
                        test =  tests[i];
                    }
                }
                
                //Revise later
                
//                function objectDeepCopy(original, copy) {
//                    for (var attr in original) {
//                        if (original.hasOwnProperty(attr))
//                        propertyCopy(original, copy, original[attr], attr)
//                        console.log(Array.isArray(test[attr]))
//                    }
//                }
//                
//                function propertyCopy(from, to, value, attr) {
//                    if (typeof value == 'string' || typeof value == 'number' || typeof value == 'boolean' ) {
//                        console.log('Copying immutable property');
//                        to[attr] = value;
//                        return
//                    }
//                    if (Array.isArray(value)) {
//                        console.log('Start copying array');
//                        to[attr] = [];
//                        for (var elem in value) {
//                            propertyCopy(from[attr], to[attr], );
//                        }
//                    }
//                    
//                }
//                
//                for (var attr in test) {
//                    if (test.hasOwnProperty(attr)) test_copy[attr] = test[attr];
//                    console.log(Array.isArray(test[attr]))
//                }

                
                return test;
                
                
            }]
        }
    })
    
    .state('app.passtest_result', {
        url: '/results/:resultCode',
        params: {
            testDetails: null
        },
        views: {
            'header@': {
                templateUrl: 'views/common-header.html',
            },
            'mainContent@' : {
                templateUrl: 'views/passtest-result.html',
                controller: 'passTestResultController'
            }
        },
        resolve: {
            testDetails: ['$stateParams', function($stateParams){
               return $stateParams.testDetails; 
            }]
        }
    })
    
    
    
   $urlRouterProvider.otherwise('/');
    
}])
.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});