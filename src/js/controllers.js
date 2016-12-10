angular.module('kiddsApp.controllers', [])
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

.controller('teachersController', ['$scope', 'teachersFactory', '$timeout', function($scope, teachersFactory, $timeout){
    $scope.teachers = teachersFactory;
    $scope.current = 0;
    $scope.teacherOne = $scope.teachers[0];
    $scope.teacherTwo = $scope.teachers[1];
    $scope.teacherThree = $scope.teachers[2];
    $scope.moveLeft = false;
    $scope.moveRight = false;
    
    $scope.scrollTeacherNext = function(){
        $scope.moveRight = true;
        var noOfTeachers = $scope.teachers.length;
       if($scope.current - 1 < 0) {
           $scope.current = noOfTeachers -1;
           $scope.teacherOne = $scope.teachers[$scope.current];
       } else {
          $scope.teacherOne = $scope.teachers[--$scope.current]; 
       }
      console.log('Teacher 1 '+$scope.teacherOne.lastName);
       if ($scope.current + 1 >= noOfTeachers) {
           $scope.teacherTwo = $scope.teachers[0];
           $scope.teacherThree = $scope.teachers[1];
           
           $scope.moveRight = false;
            return;
        } else {
           $scope.teacherTwo = $scope.teachers[$scope.current + 1];
        }
        console.log('Teacher 2 '+$scope.teacherTwo.lastName);
        if ($scope.current + 2 >= noOfTeachers) {
           $scope.teacherThree = $scope.teachers[0]; 
        } else {
           $scope.teacherThree = $scope.teachers[$scope.current + 2];
        }
       console.log('Teacher 3 '+$scope.teacherThree.lastName);
        console.log('Current: '+$scope.current);
        $scope.moveRight = false;
       
        
    }
    
    
  $scope.scrollTeacherPrevious = function(){
      $scope.moveLeft = true;
      var noOfTeachers = $scope.teachers.length;
        if (($scope.current + 1) >= noOfTeachers) {
            $scope.current = 0;
            $scope.teacherOne = $scope.teachers[$scope.current];
        } else {
            $scope.teacherOne = $scope.teachers[++$scope.current];
        }
         console.log('Teacher 1 '+$scope.teacherOne.lastName);
        if ($scope.current + 1 >= noOfTeachers) {
           $scope.teacherTwo = $scope.teachers[0];
           $scope.teacherThree = $scope.teachers[1];
            setTimeout(function(){
            $scope.moveLeft = false;
            }, 600);
            return;
        } else {
           $scope.teacherTwo = $scope.teachers[$scope.current + 1];
        }
        console.log('Teacher 2 '+$scope.teacherTwo.lastName);
        if ($scope.current + 2 >= noOfTeachers) {
           $scope.teacherThree = $scope.teachers[0]; 
        } else {
           $scope.teacherThree = $scope.teachers[$scope.current + 2];
        }
        console.log('Teacher 3 '+$scope.teacherThree.lastName);
        console.log('Current: '+$scope.current);
      setTimeout(function(){
            $scope.moveLeft = false;
        }, 600);
  }
}])