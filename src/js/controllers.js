angular.module('kiddsapp.controllers', [])
.controller('menubarController', ['$scope', '$uibModal', 'userFactory', function($scope, $uibModal, userFactory){
    userFactory.updateCurrentUser();
    var modalInstance;  
    $scope.openLoginModal = function(){
       
        modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'views/login.html',
              controller: 'loginModalController'
        })
    }
   
    $scope.currentUser = function(){
        return userFactory.currentUser;
    }
    $scope.doLogOut = function () {
        userFactory.logoutUser();
    }
    
}])

.controller('indexController', ['$scope', '$state', '$uibModal', 'userFactory', '$anchorScroll', '$location', function($scope, $state, $uibModal, userFactory, $anchorScroll, $location){
    console.log('Index controller loaded...');
    $scope.currentUser = function(){
        return $localStorage.getObject('currentUser', {username:'', admin:false});
    }
    
    $scope.scrollToAnchor = function(anchor){
        $location.hash(anchor);
        $anchorScroll();
    }
       
}])

.controller('loginModalController', ['$scope', '$uibModalInstance', 'userFactory', function($scope, $uibModalInstance, userFactory){
    $scope.closeModal = function(){
        $uibModalInstance.dismiss('cancel');
    }
    $scope.loginError = false;
    $scope.loginErrorText = '';
    $scope.signInError = false;
    $scope.signInErrorText = '';
    $scope.adminCode = {textCode:''};
    $scope.newUser = {username:'', email:'', password:'', admin:'false'};
    $scope.user = {input:'', password: ''}
    
    $scope.doLogIn = function(){
        $scope.loginError = false;
        var result;
        if ($scope.user != '' && $scope.user.password != '') {
            result = userFactory.loginUser($scope.user);
        }
        if (!result.loggedIn) {
            $scope.loginError = true;
            $scope.loginErrorText = result.status;
        } else {
            $scope.closeModal();
        }
        console.log('Logged In: '+result.loggedIn+'; '+'Status: '+result.status);
        userFactory.printCurrentUser();
    }
    $scope.doSignIn = function(){
        $scope.signInError = false;
        if ($scope.newUser.username != '' && $scope.newUser.password != '' && $scope.newUser.email != '') {
            if (userFactory.userNameExists($scope.newUser.username)) {
                $scope.signInError = true;
                $scope.signInErrorText = 'Користувач із таким іменем у нас вже є';
                console.log('Duplicate username');
                return;
            }
            if (userFactory.emailExists($scope.newUser.email)) {
                $scope.signInError = true;
                $scope.signInErrorText = 'Користувач із такою поштою у нас вже є';
                console.log('Duplicate email');
                return;
            }
            if ($scope.adminCode.textCode != "") {
                console.log('Admin code: '+$scope.adminCode.textCode)
                if (!userFactory.checkAdminCode($scope.adminCode.textCode)) {
                    $scope.signInError = true;
                    $scope.signInErrorText = 'Ви вказали неправильний код для отримання прав адміністратора';
                    console.log('Invalid admincode');
                    return;
                } else {
                    $scope.newUser.admin = true;
                    userFactory.addUser($scope.newUser);
                    console.log('New admin user successfully registered!');
                    console.log($scope.newUser);
                    userFactory.printAllUsers();
                    return;
                }
            }
            console.log('Admin code: '+$scope.adminCode)
            userFactory.addUser($scope.newUser);
            console.log('New user successfully registered!');
            console.log($scope.newUser);
            userFactory.printAllUsers();
            
        }
    }
    
}])

.controller('newsController', ['$scope', 'newsFactory', 'userFactory', '$localStorage', '$uibModal', function($scope, newsFactory, userFactory, $localStorage, $uibModal){
    userFactory.updateCurrentUser();
    $scope.blankNews = {
        title: '',
        date: '',
        photo: 'assets/news/blank.png',
        text: '',
    }
    $scope.current = 0;
    $scope.initialize = function(){
        $scope.news = newsFactory.news;  
        $scope.newsOne = $scope.news[$scope.current] || $scope.blankNews;
        $scope.newsTwo = $scope.news[$scope.current+1] || $scope.blankNews;
        $scope.newsThree = $scope.news[$scope.current+2] || $scope.blankNews;
        if ($scope.detailedIndex > 0) $scope.detailedNews = newsFactory.getNewsById($scope.detailedNews.id);
    }
    
    $scope.initialize();    
    $scope.detailedIndex = 0;
    $scope.detailedNews = {};
    var newsAddModalInstance;
    
    $scope.openNewsAddModal = function(){
       var newsAddModalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'views/addnews.html',
              controller: 'newsAddModalController'
        });
        newsAddModalInstance.result.then(function(newsToAdd){
            console.log('Adding news:');
            console.log(newsToAdd);
            newsFactory.addNews(newsToAdd);
            
        }, function(message){
            console.log(message);
        })
    }
    
    $scope.openNewsChangeModal = function(newsId) {
        var newsChangeModalInstance = $uibModal.open(
            {
                animation: true,
                templateUrl: 'views/changenews.html',
                controller: 'newsChangeModalController',
                resolve: {
                    newsToChange: ['newsFactory', function(newsFactory){
                        var nt = newsFactory.getNewsById(newsId);
                        var newsToChange = {};
                        newsToChange.id = nt.id;
                         newsToChange.title = nt.title;
                        newsToChange.author = nt.author;
                        newsToChange.date = nt.date;
                        newsToChange.position = nt.position;
                        newsToChange.text = nt.text;
                         newsToChange.photo = nt.photo;
                        return newsToChange;
                    }]
                }
            });
    
        newsChangeModalInstance.result.then(function(newNews){
            if (newNews.delete) {
                 console.log('Deleting news with id: '+newNews.id);
                newsFactory.deleteNews(newNews.id);
                $scope.initialize();
                return;
            }
            console.log('Changing news with id: '+newNews.id);
            newsFactory.changeNews(newNews.id, newNews);
            $scope.initialize();
        }, function(message){
            console.log(message);
        })
        
    }
    
    
    
    $scope.showDetailed = function(index){
        if (index == 1) {
            $scope.detailedNews = $scope.newsOne;
            $scope.detailedIndex = 1;
        }
        if (index == 2) {
            $scope.detailedNews = $scope.newsTwo;
            $scope.detailedIndex = 2;
        }
        if (index == 3) {
            $scope.detailedNews = $scope.newsThree;
            $scope.detailedIndex = 3;
        }
    }
    $scope.resetDetailed = function(){
         $scope.detailedIndex = 0;
         $scope.detailedNews = {};
    }
    
    
    $scope.currentUser = function(){
        return userFactory.currentUser;
    }
    
    $scope.isAdmin = function(){
        return userFactory.currentUser.admin;
    }

    
    $scope.scrollNext = function(){
        console.log('scrollNext clicked');
        console.log('News one title: '+$scope.newsOne.title);
        var newsSize = $scope.news.length;
        console.log('News length: '+$scope.news.length);
        
        if ($scope.current + 3 >= newsSize) {
            $scope.current = 0;
            $scope.newsOne = $scope.news[$scope.current] || $scope.blankNews;
        } else {
            $scope.current += 3;
            $scope.newsOne = $scope.news[$scope.current] || $scope.blankNews;
        }
        $scope.newsTwo = $scope.news[$scope.current+1] || $scope.blankNews;
        $scope.newsThree = $scope.news[$scope.current+2] || $scope.blankNews;  
    }
    
    $scope.scrollPrevious = function(){

        console.log('News length: '+$scope.news.length);
        
        if ($scope.current - 3 <= 0) {
            $scope.current = 0;
            $scope.newsOne = $scope.news[$scope.current] || $scope.blankNews;
        } else {
            $scope.current -= 3;
            $scope.newsOne = $scope.news[$scope.current] || $scope.blankNews;
        }
        console.log('current: '+$scope.current);
        console.log('current title: '+$scope.news[$scope.current].title);
            $scope.newsTwo = $scope.news[$scope.current+1] || $scope.blankNews;
            $scope.newsThree = $scope.news[$scope.current+2] || $scope.blankNews;
        
    }
    
    
}])

.controller('newsAddModalController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance){
    $scope.newsToAdd = {title:'', author:'', position: '', date: '', photo:'', text:''};
    $scope.closeModal = function(){
        $uibModalInstance.dismiss('Dismissed by user');
    }
    $scope.saveNews = function(){
        $uibModalInstance.close($scope.newsToAdd);
    }
}])

.controller('newsChangeModalController', ['$scope', '$uibModalInstance', 'newsToChange', function($scope, $uibModalInstance, newsToChange){
    $scope.newsToChange = newsToChange;
    $scope.oldNews = newsToChange;
    console.log($scope.newsToChange);
    $scope.saveChanges = function(){
        $uibModalInstance.close($scope.newsToChange);
    }
    $scope.dismissChanges = function(){
        $scope.newsToChange.title = $scope.oldNews.title;
        $scope.newsToChange.author = $scope.oldNews.author;
        $uibModalInstance.dismiss('Dismissed changes by user');
    }
    $scope.deleteNews = function() {
        $scope.newsToChange.delete = true;
        $uibModalInstance.close($scope.newsToChange);
    }
}])

.controller('teachersController', ['$scope', 'teachersFactory', '$timeout', '$state', '$window', '$uibModal', function($scope, teachersFactory, $timeout, $state, $window, $uibModal){
//    $state.go('aboutus.teachers');
    
//    Teacher scroll functionality 
    
    console.log('Teachers controller loaded!!!');
    var teachers = [];
    var blocks = ['minus', 'one', 'two', 'three', 'plus'];
    var teacherDisplay = [];
    var counter = 0;
    var leftCounter = 0;
    var smCounter = 0;
    $scope.teacherMinus = {};
    $scope.teacherPlus = {};
    $scope.teacherOne = {};
    $scope.teacherTwo = {};
    $scope.teacherThree = {};
    $scope.teacherCur = teachers[smCounter];
    initialize()
    
    
   function initialize() {
        counter = 0;
        leftCounter = 0;
        smCounter = 0;
        teachers = teachersFactory.teachers;
        $scope.teacherCur = teachers[smCounter];
        teacherDisplay = [];
        populate();
    }
    
    
    function incrementCur(){
        if (smCounter == teachers.length-1) smCounter = 0;
        else smCounter++;
        $scope.teacherCur = teachers[smCounter];
    }
    
    function decrementCur(){
        if (smCounter == 0) smCounter = teachers.length-1;
        else smCounter--;
        $scope.teacherCur = teachers[smCounter];
    }
    
    function populate(){
        for (var i = 0; i < 5; i++){
            teacherDisplay[i] = teachers[counter];
            incrementCounter();
        }
        console.log('Counter:');
        console.log(counter);
        $scope.teacherMinus = teacherDisplay[blocks.indexOf('minus')];
        $scope.teacherOne = teacherDisplay[blocks.indexOf('one')];
        $scope.teacherTwo = teacherDisplay[blocks.indexOf('two')];
        $scope.teacherThree = teacherDisplay[blocks.indexOf('three')];
        $scope.teacherPlus = teacherDisplay[blocks.indexOf('plus')];
        
    }
    
    function populateTeacherByAlias(alias) {
        if (alias == 'minus') $scope.teacherMinus = teacherDisplay[blocks.indexOf('minus')];                   
        if (alias == 'one') $scope.teacherOne = teacherDisplay[blocks.indexOf('one')];
        if (alias == 'two')  $scope.teacherTwo = teacherDisplay[blocks.indexOf('two')];
        if (alias == 'three') $scope.teacherThree = teacherDisplay[blocks.indexOf('three')];
        if (alias == 'plus') $scope.teacherPlus = teacherDisplay[blocks.indexOf('plus')];
    }
    
    
    
    function incrementCounter(){
        if (counter + 1 < teachers.length) counter++;
        else counter = 0;
    }
    
    function incrementLeftCounter(){
        if (leftCounter + 1 < teachers.length) leftCounter++;
        else leftCounter = 0;
    }
    
    function decrementLeftCounter(){
        if (leftCounter == 0) leftCounter = teachers.length - 1;
        else --leftCounter;
        console.log('Left counter: '+leftCounter);
    }
    
    $scope.scrollTeacherNext = function(){
       incrementCur();       
       console.log('---------------Next scroll triggered------------')
       blocks.push(blocks.shift());
       console.log('Blocks:');
       console.log(blocks);
       teacherDisplay.shift();
       teacherDisplay.push(teachers[counter]);
       incrementLeftCounter();
       incrementCounter();
       console.log('Teacher display:');
       console.log(teacherDisplay);
       populateTeacherByAlias(blocks[blocks.length-1]);
    }
    
    
  $scope.scrollTeacherPrevious = function(){
      decrementCur(); 
      console.log('---------------Previous scroll triggered------------')
      blocks.unshift(blocks.pop());
      console.log('Blocks:');
      console.log(blocks);
      decrementLeftCounter();
      teacherDisplay.pop();
      teacherDisplay.unshift(teachers[leftCounter]);
      populateTeacherByAlias(blocks[0]);
  }
  //    End of teacher scroll functionality 
  
  
  
//  Edit teachers functionality
    $scope.openTeacherEditModal = function(){
        var teacherEditModalIstance = $uibModal.open({
            templateUrl: 'views/editteacher.html',
            controller: 'teacherEditModalController',
            resolve: {
                teachers: ['teachersFactory', function(teachersFactory){
                    var teacherSnapShot = teachersFactory.teachers.slice(0, teachersFactory.teachers.length);
                    return teacherSnapShot;
                }]
            }
        });
        teacherEditModalIstance.result.then(function(newTeachers){
            console.log('Replacing teachers with:');
            console.log(newTeachers);
            teachersFactory.replaceTeachers(newTeachers);
            console.log(teachersFactory.teachers);
            initialize();
        }, function(message){
            console.log(message);
        });
    }
//  End of edit teachers functionality
  
}])

.controller('teacherEditModalController', ['teachers', '$uibModalInstance', '$scope', function(teachers, $uibModalInstance, $scope){
    $scope.teachers = teachers;
    $scope.editedTeacher = {};
    $scope.teacherForAdd = {firstName: '', lastName: '', position: '', photo: '', description: ''};
    $scope.showAddTeacherForm = false;
    $scope.editIndex = -1;
    
    $scope.openAddTeacherForm = function(){
        $scope.showAddTeacherForm = true;
    }
    
    $scope.addTeacher = function(){
        var id = $scope.teachers.length > 0 ? $scope.teachers[$scope.teachers.length-1] + 1 : 0;
         $scope.teacherForAdd.id = id;
         $scope.teachers.push($scope.teacherForAdd);
         $scope.teacherForAdd = {firstName: '', lastName: '', position: '', photo: '', description: ''};
         $scope.showAddTeacherForm = false;
    }
    
    $scope.cancelTeacherAdd = function(){
        $scope.showAddTeacherForm = false;
        $scope.teacherForAdd = {firstName: '', lastName: '', position: '', photo: '', description: ''};
    }
    
    $scope.openTeacherEditForm  = function(teacherId) {
        
        $scope.editIndex = teacherId;
         for(var i = 0; i < $scope.teachers.length; i++){
             
           if ($scope.teachers[i].id == teacherId) {
               console.log('Preparing teacher information...');
               $scope.editedTeacher.id = $scope.teachers[i].id;
               $scope.editedTeacher.firstName = $scope.teachers[i].firstName;
               $scope.editedTeacher.lastName = $scope.teachers[i].lastName;
               $scope.editedTeacher.photo = $scope.teachers[i].photo;
               $scope.editedTeacher.position = $scope.teachers[i].position;
               $scope.editedTeacher.description = $scope.teachers[i].description;
               return;
           }
             console.log('Opened teacher editing form for:');
             console.log($scope.editedTeacher);
            
        }
    }
    
    $scope.saveTeacherChanges = function(teacherId){
         for(var i = 0; i < $scope.teachers.length; i++){
           if ($scope.teachers[i].id == teacherId) {
               $scope.teachers[i].firstName = $scope.editedTeacher.firstName;
               $scope.teachers[i].lastName = $scope.editedTeacher.lastName;
               $scope.teachers[i].photo = $scope.editedTeacher.photo;
               $scope.teachers[i].position = $scope.editedTeacher.position;
               $scope.teachers[i].description = $scope.editedTeacher.description;
               console.log('Information about teacher updated. New teacher:');
               console.log($scope.teachers[i]);
           }
        }
        $scope.editedTeacher = {};
        $scope.editIndex = -1;
    }
    
    $scope.cancelTeacherChanges = function(teacherId){
        $scope.editedTeacher = {};
        $scope.editIndex = -1;
    }
    
    $scope.closeModal = function(){
        $uibModalInstance.dismiss('Teacher edit dismissed by user');
    }
    $scope.deleteTeacher = function(teacherId){
        for(var i = 0; i < $scope.teachers.length; i++){
           if ($scope.teachers[i].id == teacherId) $scope.teachers.splice(i, 1);
        }
    }
    $scope.saveTeacherChangesById = function(teacherId, newTeacher){
        for(var i = 0; i < $scope.teachers.length; i++){
           if ($scope.teachers[i].id == teacherId) $scope.teachers.splice(i, 1, newTeacher);
        }
    }
    
    $scope.saveChanges = function() {
        $uibModalInstance.close($scope.teachers);
    }
}])

.controller('teacherDetailController',  ['$scope', 'teacher', function($scope, teacher){
    $scope.teacher = teacher;
    
}])
.controller('galleryController',  ['$scope', '$state', 'galleryFactory', function($scope, $state, galleryFactory){
    $scope.gallery = galleryFactory.getGallery();
}])

.controller('eventDetailController',  ['$scope', 'event', function($scope, event){
    $scope.event = event;
    var photos = event.photos;
    var middle = Math.ceil(photos.length/2);
    $scope.upperPortion = photos.slice(0, middle);
    $scope.lowerPortion = photos.slice(middle, photos.length);
    
}])

.controller('aboutusController', ['$state', 'userFactory', '$scope', function($state, userFactory, $scope){
    userFactory.updateCurrentUser();
    $state.go('aboutus');
    $scope.currentUser = function(){
        return userFactory.currentUser;
    }
    $scope.isAdmin = function(){
        return userFactory.currentUser.admin;
    }
}])

.controller('photoDetailController', ['photoInfo', '$scope', 'galleryFactory', '$uibModalInstance', function(photoInfo, $scope, galleryFactory, $uibModalInstance){
    $scope.currentPhoto = photoInfo.currentPhoto;
    $scope.currentEvent = photoInfo.currentEvent;
    console.log(photoInfo);
    console.log($scope.currentPhoto);
    $scope.closeModal = function() {
        $uibModalInstance.dismiss();
    }
//     Photo scroll functionality
    var eventIndex = photoInfo.eventIndex;
    var photoIndex = photoInfo.photoIndex;
    
    
    function incrementEventIndex() {
        eventIndex = eventIndex >= galleryFactory.getGallery().length - 1 ? 0 : ++eventIndex;
        console.log('Incremented event index: '+eventIndex);
    };
    
    function decrementEventIndex() {
        eventIndex = eventIndex == 0 ? galleryFactory.getGallery().length-1 : --eventIndex;
        console.log('Decremented event index: '+eventIndex);
    };
    
    $scope.nextPhoto = function() {
        var photosInCurrentEvent = $scope.currentEvent.photos.length;
        if (photoIndex >= photosInCurrentEvent-1) {
            incrementEventIndex();
            $scope.currentEvent = galleryFactory.getGallery()[eventIndex];
            photoIndex = 0;
            $scope.currentPhoto = $scope.currentEvent.photos[photoIndex];
        } else {
            photoIndex++;
            $scope.currentPhoto = $scope.currentEvent.photos[photoIndex];
        }
    };
    
    
    $scope.previousPhoto = function(){
        if (photoIndex == 0) {
           decrementEventIndex();
           $scope.currentEvent = galleryFactory.getGallery()[eventIndex];
            photoIndex = $scope.currentEvent.photos.length - 1;
            $scope.currentPhoto = $scope.currentEvent.photos[photoIndex]; 
        } else {
            photoIndex--;
            $scope.currentPhoto = $scope.currentEvent.photos[photoIndex];
        }
    };
    
//    End of Photo scroll functionality
}])

.controller('loginController', [function(){
    
}])
.controller('servicesController', ['$state', 'userFactory', '$scope', function($state, userFactory, $scope){
    
}])
.controller('passTestController', ['$state', 'userFactory', '$scope', function($state, userFactory, $scope){
    
}])
.controller('contactusController', ['$state', 'userFactory', '$scope', function($state, userFactory, $scope){
    
}])
