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
    console.log('Transferring to aboutus');
    $state.go('aboutus');
    console.log('Current state: '+$state.current.name+'.');
    $scope.currentUser = function(){
        return userFactory.currentUser;
    }
    $scope.isAdmin = function(){
        return userFactory.currentUser.admin;
    }
}])

.controller('photoFrameController', ['photoInfo', '$scope', 'galleryFactory', '$uibModalInstance', '$state', function(photoInfo, $scope, galleryFactory, $uibModalInstance, $state){
//    if (!$state.is('aboutus.photo.detail'))
    $state.go('detail', {eventId: photoInfo.currentEvent.id, photoId: photoInfo.currentPhoto.id});
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
            $state.go('detail', {eventId:$scope.currentEvent.id, photoId: $scope.currentPhoto.id});
        } else {
            photoIndex++;
            $scope.currentPhoto = $scope.currentEvent.photos[photoIndex];
            $state.go('detail', {eventId: $scope.currentEvent.id, photoId: $scope.currentPhoto.id});
        }
    };
    
    
    $scope.previousPhoto = function(){
        if (photoIndex == 0) {
           decrementEventIndex();
           $scope.currentEvent = galleryFactory.getGallery()[eventIndex];
            photoIndex = $scope.currentEvent.photos.length - 1;
            $scope.currentPhoto = $scope.currentEvent.photos[photoIndex];
            $state.go('detail', {eventId:$scope.currentEvent.id, photoId: $scope.currentPhoto.id});
        } else {
            photoIndex--;
            $scope.currentPhoto = $scope.currentEvent.photos[photoIndex];
            $state.go('detail', {eventId:$scope.currentEvent.id, photoId: $scope.currentPhoto.id});
        }
    };
    
//    End of Photo scroll functionality
}])


.controller('loginController', [function(){
    
}])
.controller('servicesController', ['$state', 'userFactory', '$scope', function($state, userFactory, $scope){
    
}])
.controller('passTestController', ['$state', 'userFactory', '$scope', function($state, userFactory, $scope){
    $state.go('passtest_initial');
}])
.controller('passTestInitialController', ['$scope', 'tests', '$state', function($scope, tests, $state){
    $scope.tests = tests;
    $scope.testDetails = {
        test_name: '',
        remember: false,
        username: '',
        result_code: '',
        date: new Date()
    }
    $scope.printRemember = function(){
        console.log($scope.testDetails.remember);
    }
    
    function generateTestResultCode(){
        var controlText = 'abcdefghijklmnopqrstuvwxyz';
        var now = new Date();
        var millis = now.getMilliseconds();
        var length = controlText.length;
        var code = '';
        for (var i = 0; i < 5; i++){
            var pos = Math.floor(Math.random()*(length-1))
            code += controlText.slice(pos, pos+1);
        }
        code += millis;
        return code;
    }
    
    $scope.generateTest = function(alias, testname){
        $scope.testDetails.test_name = testname;
        $scope.testDetails.result_code = generateTestResultCode();
        $state.go('passtest_test', {alias: alias, testDetails: $scope.testDetails}); 
    }
    
    
    
}])
.controller('passTestTestController', ['testDetails', 'test', '$scope', '$state', function(testDetails, test, $scope, $state){
    var test = test;
    var questionCycleCounter = 0;
    var shouldCheckLevel = false;
    $scope.testDetails = testDetails;
    $scope.testDetails.level = 0;
    $scope.testDetails.grammar = {total:0, scored:0};
    $scope.testDetails.lexis = {total:0, scored:0};
    $scope.testDetails.reading = {total:0, scored:0};
    $scope.testDetails.listening = {total:0, scored:0};
    $scope.testDetails.questions = [];
    $scope.currentQuestion = {};
  
    
    $scope.saveAndNext = function(){
        $scope.testDetails.questions.push($scope.currentQuestion);
        if ($scope.currentQuestion.target == 'Grammar') {
            $scope.testDetails.grammar.total++;
            $scope.testDetails.grammar.scored += $scope.currentQuestion.result;
        }
        if ($scope.currentQuestion.target == 'Lexis') {
            $scope.testDetails.lexis.total++;
            $scope.testDetails.lexis.scored += $scope.currentQuestion.result;
        }
        if ($scope.currentQuestion.target == 'Reading') {
            $scope.testDetails.reading.total++;
            $scope.testDetails.reading.scored += $scope.currentQuestion.result;
        }
        if ($scope.currentQuestion.target == 'Listening') {
            $scope.testDetails.listening.total++;
            $scope.testDetails.listening.scored += $scope.currentQuestion.result;
        }
        assignQuestion();
       
        
        //debug
        console.log($scope.currentQuestion);
    }
    
    function assignQuestion(){
        console.log('Current overall level:');
        calculateStatistics();
        console.log($scope.testDetails.overallRating);
        if (currentLevelEmpty()) {
            console.log('Current level is empty!');
            $scope.printResult();
            return;
        }
        do {
            pickAQuestion();
            questionCycleCounter++;
        } while ($scope.currentQuestion == null)
        if ($scope.currentQuestion.type == 'oddWordOut')
             $scope.currentQuestion.a = ''
        else
            $scope.currentQuestion.a = [];
    }
    
    function currentLevelEmpty(){
        var empty = true;
        if (test.levels[$scope.testDetails.level].grammar.length != 0) empty = false;
        if (test.levels[$scope.testDetails.level].matchQuestions.length != 0) empty = false;
        if (test.levels[$scope.testDetails.level].textTrueOrFalseQuestions.length != 0) empty = false;
        if (test.levels[$scope.testDetails.level].listeningTrueOrFalseQuestions.length != 0) empty = false;
        if (test.levels[$scope.testDetails.level].oddWordOutQuestions.length != 0) empty = false;
        return empty;
    }
    
    function pickAQuestion(){
        if (questionCycleCounter < 4) {
            if (shouldCheckLevel) checkLevel();
            var topicArray = popRandomArrayElement(test.levels[$scope.testDetails.level].grammar);
            $scope.currentQuestion = popRandomArrayElement(topicArray);
        } else if (questionCycleCounter < 6) {
            if (shouldCheckLevel) checkLevel();
            $scope.currentQuestion = pickRandomLexisQuestion();
        } else if (questionCycleCounter == 6) {
            if (shouldCheckLevel) checkLevel();
            $scope.currentQuestion = popRandomArrayElement(test.levels[$scope.testDetails.level].listeningTrueOrFalseQuestions);
        } else if (questionCycleCounter == 7) {
            if (shouldCheckLevel) checkLevel();
            $scope.currentQuestion = popRandomArrayElement(test.levels[$scope.testDetails.level].textTrueOrFalseQuestions);
        } else if (questionCycleCounter == 8) {
            questionCycleCounter = 0;
            if (shouldCheckLevel) {$scope.printResult();}
            else checkLevel();
        }
         console.log(questionCycleCounter);
    }
    
    //testing and debugging
    assignQuestion();
    console.log($scope.currentQuestion);
    
    function checkLevel(){
        console.log('Checking level...');
        if (eligibleForNextLevel && $scope.testDetails.level == 2) {
            $scope.testDetails.level = 3;
            $scope.printResult();
            return;
        }
        if (eligibleForNextLevel()) {
           $scope.testDetails.level++;
            questionCycleCounter = 0;
            shouldCheckLevel = false;
            assignQuestion();
            
        } else if (shouldCheckLevel){
            
        } else {
            shouldCheckLevel = true;
            assignQuestion();
        }
        
    }
    
    function eligibleForNextLevel(){
        calculateStatistics();
        if ($scope.testDetails.overallRating >= 80) {
            console.log('Overall rating: '+$scope.testDetails.overallRating);
            console.log('Eligible for next level');
            return true
        }   else {
            console.log('Overall rating: '+$scope.testDetails.overallRating);
            console.log('Not Eligible for next level');
            return false;
        }
    }
    
    function calculateStatistics(){
            $scope.testDetails.grammar.rating = Math.round(($scope.testDetails.grammar.scored / $scope.testDetails.grammar.total)*100);
            if (isNaN($scope.testDetails.grammar.rating)) $scope.testDetails.grammar.rating = 0;
            $scope.testDetails.lexis.rating = Math.round(($scope.testDetails.lexis.scored / $scope.testDetails.lexis.total)*100);
            if (isNaN($scope.testDetails.lexis.rating)) $scope.testDetails.lexis.rating = 0;
            $scope.testDetails.reading.rating = Math.round(($scope.testDetails.reading.scored / $scope.testDetails.reading.total)*100);
            if (isNaN($scope.testDetails.reading.rating)) $scope.testDetails.reading.rating = 0;
            $scope.testDetails.listening.rating = Math.round(($scope.testDetails.listening.scored / $scope.testDetails.listening.total)*100);
            if (isNaN($scope.testDetails.listening.rating)) $scope.testDetails.listening.rating = 0;
            $scope.testDetails.overallRating = Math.round(($scope.testDetails.grammar.rating + $scope.testDetails.lexis.rating +
            $scope.testDetails.reading.rating + $scope.testDetails.listening.rating) / 4)
    }
    
    
    function pickRandomLexisQuestion(){
        var random = Math.random()*10;
        if (random < 5) return popRandomArrayElement(test.levels[$scope.testDetails.level].oddWordOutQuestions);
        else return popRandomArrayElement(test.levels[$scope.testDetails.level].matchQuestions);
    }
    
    function popRandomArrayElement(array){
        if (array == null) return null;
        if (array.length == 0) return null;
        var ind = Math.floor(Math.random()*array.length);
        var element = array[ind];
        array.splice(ind, 1);
        return element;
    }
    
    
    //test Match question
    $scope.matchQuestion = {
        id: 120,
        type: 'match',
        task: 'Match words in left column with their antonyms in the right column',
        left: [
            'pretty',
            'tall',
            'kind',
            'smooth',
            'good'
        ],
        right: [
            'evil',
            'rough',
            'bad',
            'ugly',
            'short'
        ],
        checkedLeft: function(item) {
            return this.userInput[0].indexOf(item) != -1
        },
        checkedRight: function(item) {
            return this.userInput[1].indexOf(item) != -1
        },
        c: [
            [
               'good',
                'pretty',
                'kind',
                'tall',
                'smooth'
            ],
            [
               'bad',
                'ugly',
                'evil',
                'short',
                'rough'
            ]
        ],
        userInput: [
            [],
            []
        ],
        result: []
    }
    
    
    var lookingForRightCounterPart = false;
    var lookingForLeftCounterPart = false;
    $scope.highlight = '';
    var colors = ["AliceBlue", "Aqua", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"]
    
   $scope.checkedLeft = function(item){
       return $scope.currentQuestion.userInput[0].indexOf(item) != -1
   }
   
   $scope.checkedRight = function(item){
        return $scope.currentQuestion.userInput[1].indexOf(item) != -1
   }
   
    $scope.getColorLeft = function(item){
        var leftAnswers = $scope.currentQuestion.userInput[0];
        var colorInd = leftAnswers.indexOf(item);
        if (colorInd == -1) return 'Black'
        else return colors[colorInd];
    }
    
    $scope.getColorRight = function(item){
        var rightAnswers = $scope.currentQuestion.userInput[1];
        var colorInd = rightAnswers.indexOf(item);
        if (colorInd == -1) return 'Black'
        else return colors[colorInd];
    }
    
    $scope.handleLeftClick = function(item){
        var leftAnswers = $scope.currentQuestion.userInput[0];
        var rightAnswers = $scope.currentQuestion.userInput[1];
        var index = leftAnswers.indexOf(item);
        if (!lookingForRightCounterPart) {
            if (index == -1) {
                leftAnswers.push(item);
                if (!lookingForLeftCounterPart) lookingForRightCounterPart = true;
            }
            else {
                leftAnswers.splice(index, 1);
                if (index < rightAnswers.length) rightAnswers.splice(index, 1);
            }
            lookingForLeftCounterPart = false;
        } else {
            if (index == -1) {
                leftAnswers.pop();
                leftAnswers.push(item);
            } else {
                leftAnswers.splice(index, 1);
                if (index < rightAnswers.length) rightAnswers.splice(index, 1);
            }
            
        }
    }
    
    
    $scope.handleRightClick = function(item){
        var leftAnswers = $scope.currentQuestion.userInput[0];
        var rightAnswers = $scope.currentQuestion.userInput[1];
        var index = rightAnswers.indexOf(item);
        
         if (!lookingForLeftCounterPart)   {
                if (index == -1) {
                    rightAnswers.push(item);
                    if (!lookingForRightCounterPart) lookingForLeftCounterPart = true;
                }
                else {
                    rightAnswers.splice(index, 1);
                    if (index < leftAnswers.length) leftAnswers.splice(index, 1);
                }
                lookingForRightCounterPart = false;
                
            } else {
                if (index == -1) {
                    rightAnswers.pop();
                    rightAnswers.push(item);
                } else {
                    rightAnswers.splice(index, 1);
                    if (index < leftAnswers.length) leftAnswers.splice(index, 1);
                }
            }
        
    }
    
    $scope.printResult = function(){
        calculateStatistics();
        console.log($scope.testDetails);
        $state.go('passtest_result', {testDetails: $scope.testDetails});  
    }
    //end of test MatchQuestion
    
    //text TrueOrFalseQuestion
    $scope.textTrueOrFalseQuestion = {
        id: 143,
        type: 'textTrueOrFalse',
        task: 'Read the text and mark the statements below that are TRUE.',
        text: 'Brian sat down for dinner. He sat down in the chair. He sat down at the table. He looked at his white plate. He looked at his silver fork. He looked at his silver spoon. His dad said, "Pass me your plate, Brian." His dad put white rice on the plate. His dad put yellow corn on the plate. His dad put green peas on the plate. He gave the plate back to Brian. "This looks delicious," Brian said. "It is delicious," his dad said. Brian wondered why corn was yellow. He wondered why peas were green. He wondered if there were yellow peas and green corn.',
        q: [
            {id: 0, statement: 'Brian uses a spoon, a knife and a fork for eating.', add: false},
            {id: 1, statement: 'Brian didn\'t like his food.', add: false},
            {id: 2, statement: 'Brian wasn\'t going to eat alone.', add: false},
            {id: 3, statement: 'Brian\'s spoon was made of the same metal as his fork.', add: false},
            {id: 4, statement: 'Brian is most likely an adult.', add: false},
           ],
        c: [2, 3],
        a: [],
        result: 0
    }
    
    //End of text TrueOrFalseQuestion
    
    //Odd word out question
    $scope.oddWordOutQuestion = {
        id: 167,
        type: 'oddWordOut',
        task: 'Select the word that doesn\'t fit with the other words.',
        wordlist: [
            'dog',
            'cat',
            'squirrel',
            'rat',
            'wolf',
            'spaghetti'
        ],
        odd: 'spaghetti',
        a: '',
        result: false
    }
    
    $scope.printOdd = function(){
        console.log($scope.oddWordOutQuestion.a);
    }
    //End of odd word out question
    
    
    //Listening question
    $scope.listeningTrueOrFalseQuestion = {
        id:352,
        type: 'listeningTrueOrFalse',
        task: 'Listen to the audio and mark only TRUE statements below.',
        audio: 'assets/audio/test.mp3',
        q: [
            {id: 0, statement: 'This might be a conversation between a father and a daughter.', add: false},
            {id: 1, statement: 'The girl went to the cinema last night.', add: false},
            {id: 2, statement: 'The girl was about to go to school, when the conversation happened.', add: false},
            {id: 3, statement: 'The man asked the girl, if she wanted anything to eat.', add: false},
            {id: 4, statement: 'The girl didn\'t want any coffee as of the moment of the conversation.', add: false}
            
        ],
        c: [0, 2, 3, 4],
        a: [],
        result: 0
    }
    //End of listening question
    
    $scope.processTrueOrFalseClick = function(question, option){
        if(option.add == true) {
            question.a.push(option.id);
        } else {
            var ind = question.a.indexOf(option.id);
            question.a.splice(ind, 1);
        }
        console.log('Answers for '+question.type+':');
        console.log(question.a);
    }
    
    $scope.checkTrueOrFalse = function(question) {
        var incr = 1 / question.q.length;
        var result = 0;
        for(var i = 0; i < question.q.length; i++) {
            var id = question.q[i].id;
            if (question.c.indexOf(id) == -1 && question.a.indexOf(id) == -1) {result += incr; continue} 
            else {
                if (question.c.indexOf(id) != -1 && question.a.indexOf(id) != -1) {
                    result += incr;
                    continue;
                }
                result -= incr;
            }
        }
        if (result < 0) result = 0;
        question.result = result;
        $scope.saveAndNext();    
    }
      $scope.checkMatchQuestion = function(question) {
         var incr = 1 / question.left.length;
         var result = 0;
         for (var i = 0; i < question.left.length; i++) {
            if (question.userInput[0].indexOf(question.c[0][i]) == -1) 
                result -= incr; else {
                    if (question.userInput[1][question.userInput[0].indexOf(question.c[0][i])]
                       == question.c[1][i])
                    result += incr; else result -= incr; 
                }
        }
        if (result < 0) result = 0;
        question.result = result;
        $scope.saveAndNext();
     }
    
    $scope.checkOddWordOutQuestion = function(question){
        if (question.odd == question.a)
            question.result = 1;
        else
            question.result = 0;
        $scope.saveAndNext();
    }
    
    
    
}])
.controller('passTestResultController', ['$scope', 'testDetails', function($scope, testDetails){
    $scope.testDetails = testDetails;
    $scope.getTextLevel = function(level_id) {
        if (level_id == 0) return 'Незайманий'
        if (level_id == 1) return 'Початковий'
        if (level_id == 2) return 'Середній'
        if (level_id == 3) return 'Високий'
    } 
}])

.controller('contactusController', ['$state', 'userFactory', '$scope', function($state, userFactory, $scope){
    
}])
