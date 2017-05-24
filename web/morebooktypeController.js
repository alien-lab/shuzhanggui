/**
 * Created by CANONYANG on 2017/4/29.
 */
var morebooktype = angular.module('morebooktype',[]);
morebooktype.controller('morebooktypeController',function ($scope,$http) {
   /*返回上一页*/
   $scope.book_type_back=function () {
      window.history.back();
   }

   /*搜索*/
   $scope.more_book_type_content=true;
   $scope.more_book_type_oye=false;
   $scope.book_type_search_focus=function () {
      $scope.more_book_type_content=false;
      $scope.more_book_type_oye=true;
   }
   $scope.book_type_search_blur=function () {
      $scope.more_book_type_content=true;
      $scope.more_book_type_oye=false;
   }

    $http({
        method: 'GET',
        url: 'http://localhost:8080/selAllTypes'
    }).success(function (data) {
        $scope.bookTypes = data;
    });

})



/*
/!*过滤器*!/
morebooktype.filter('filterPinyin',function(){
   return function(inputArray,value){
      var array = [];    //定义返回的新数组；
      if(value==undefined||value==null){
         array=inputArray;    //当过滤条件为空的时候返回全部的内容；
      }
      else{
         for(var i=0;i<inputArray.length;i++){
            if(inputArray[i].book_typeContent.indexOf(value)!= -1){
               array.push(inputArray[i]);//过滤第一个字段，如果不符合条件则判断第二个字段
            }
            else{
               if(inputArray[i].spelling.indexOf(value)!= -1){
                  array.push(inputArray[i]);
               }
            }
         }
      }
      return array;
   }
});*/
