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
        var newsSize = $scope.news.length;
        console.log('News length: '+$scope.news.length);
        
        if ($scope.current + 3 >= newsSize) {
            $scope.current = 0;
            $scope.newsOne = $scope.news[$scope.current];
        } else {
            $scope.current += 3;
            $scope.newsOne = $scope.news[$scope.current];
        }
        console.log('current: '+$scope.current);
        console.log('current title: '+$scope.news[$scope.current].title);
        
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