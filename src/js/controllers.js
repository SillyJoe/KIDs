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

.controller('indexController', ['$scope', '$state', '$uibModal', 'userFactory', '$localStorage', function($scope, $state, $uibModal, userFactory){
    console.log('Index controller loaded...');
    $scope.currentUser = function(){
        return $localStorage.getObject('currentUser', {username:'', admin:false});
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
    $scope.news = newsFactory.news;  
    $scope.current = 0;
    $scope.newsOne = $scope.news[$scope.current];
    $scope.newsTwo = $scope.news[$scope.current+1];
    $scope.newsThree = $scope.news[$scope.current+2];
    $scope.blankNews = {
        title: '',
        date: '',
        photo: 'assets/news/blank.png',
        text: '',
    }
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
        var newsSize = $scope.news.length;
        console.log('News length: '+$scope.news.length);
        
        if ($scope.current + 3 >= newsSize) {
            $scope.current = 0;
            $scope.newsOne = $scope.news[$scope.current];
        } else {
            $scope.current += 3;
            $scope.newsOne = $scope.news[$scope.current];
        }
        
        if ($scope.current + 1 >= newsSize) {
            $scope.newsTwo =  $scope.blankNews;
        } else {
            $scope.newsTwo = $scope.news[$scope.current+1];
        }
        
        if ($scope.current + 2 >= newsSize) {
            $scope.newsThree =  $scope.blankNews;
        } else {
            $scope.newsThree = $scope.news[$scope.current+2];
        }
        
    }
    
    $scope.scrollPrevious = function(){

        console.log('News length: '+$scope.news.length);
        
        if ($scope.current - 3 <= 0) {
            $scope.current = 0;
            $scope.newsOne = $scope.news[$scope.current];
        } else {
            $scope.current -= 3;
            $scope.newsOne = $scope.news[$scope.current];
        }
        console.log('current: '+$scope.current);
        console.log('current title: '+$scope.news[$scope.current].title);
        
        
            $scope.newsTwo = $scope.news[$scope.current+1];
        
            $scope.newsThree = $scope.news[$scope.current+2];
        
    }
    
    $scope.initialize = function(){
        
        console.log('Loaded news:');
        console.log($scope.newsOne.title); 
        
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

.controller('teachersController', ['$scope', 'teachersFactory', '$timeout', '$state', '$window', function($scope, teachersFactory, $timeout, $state, $window){
//    $state.go('aboutus.teachers');
    console.log('Teachers controller loaded!!!');
    var teachers = teachersFactory.teachers;
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
    populate();
    
    
    
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

.controller('loginController', [function(){
    
}])
.controller('servicesController', ['$state', 'userFactory', '$scope', function($state, userFactory, $scope){
    
}])
.controller('passTestController', ['$state', 'userFactory', '$scope', function($state, userFactory, $scope){
    
}])
.controller('contactusController', ['$state', 'userFactory', '$scope', function($state, userFactory, $scope){
    
}])
