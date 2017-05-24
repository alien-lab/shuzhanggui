/**
 * Created by CANONYANG on 2017/4/29.
 */
shuzhangguiApp.controller('findController', function ($scope,$http) {

   /*star star*/
   $scope.max = 5;
   $scope.readonly = true;//无法被选

   /*搜索*/
   $scope.find_oye=false;
   $scope.search_panel = function () {
      $scope.find_oye=true;
   }
   $scope.find_searchCancel=function () {
      $scope.find_oye=false;
   }

    $http({
        method: 'GET',
        url: 'http://localhost:8080/selAllTypes'
    }).success(function (data) {
        $scope.bookTypes = data;
    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/selNewBooks'
    }).success(function (data) {
        $scope.ListArticles = data;
    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/selectClassicsBooks'
    }).success(function (data) {
        $scope.classicsArticles = data;
    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/selHotBooks'
    }).success(function (data) {
        $scope.hotArticles = data;
    });

})

/*star star*/
shuzhangguiApp.directive('star', function () {
   return {
      template: '<ul class="rating">' +
      '<li ng-repeat="star in stars" ng-class="star">' +
      '\u2605' +
      '</li>' +
      '</ul>',
      scope: {
         ratingValue: '=',
         max: '=',
         readonly: '@'
      },
      controller: function($scope){
         $scope.ratingValue = $scope.ratingValue || 0;
         $scope.max = $scope.max || 5;

      },
      link: function (scope, elem, attrs) {
         elem.css("text-align", "center");
         var updateStars = function () {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
               scope.stars.push({
                  filled: i < scope.ratingValue
               });
            }
         };
         updateStars();

         scope.$watch('ratingValue', function (oldVal, newVal) {
            if (newVal) {
               updateStars();
            }
         });
         scope.$watch('max', function (oldVal, newVal) {
            if (newVal) {
               updateStars();
            }
         });
      }
   };
});

/*


 var app = module('index',['infinite-scroll'])
 .controller('FindController',function ($scope) {
 $scope.loadMore = function () {
 var last = $scope.scroll.hotArticles[$scope.scroll.hotArticles.length - 1];
 for(var i = 1 ; i<=3 ; i++ ){
 $scope.scroll.hotArticles.push(last+i);
 }
 }
 });
 */
