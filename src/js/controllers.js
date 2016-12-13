angular.module('kiddsapp.controllers', [])
.controller('indexController', ['$scope', 'stateChange', '$state', function($scope, stateChange, $state){
    console.log('Index controller loaded...');
    $scope.stateChange = stateChange;
    $scope.changeStateTo = function(newState) {
        $state.go(newState);
    }
}])
.controller('newsController', ['$scope', 'newsFactory', function($scope, newsFactory){
    
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

.controller('aboutusController', ['$state', function($state){
    $state.go('aboutus');
}])