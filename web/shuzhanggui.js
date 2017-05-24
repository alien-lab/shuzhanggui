/**
 * Created by CANONYANG on 2017/5/7.
 */
var shuzhangguiApp = angular.module('shuzhangguiApp',['ui.router']);
shuzhangguiApp.config(function($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise('/index');
   $stateProvider
      .state('index', {
         url: '/index',
         views: {
            '': {
               templateUrl: 'views/index.html'
            },
            'topbar@index': {
               templateUrl: 'views/topbar.html'
            },
            'main@index': {
               templateUrl: 'views/home.html',

            }
         }
      })
      .state('index.home',{
         url:'/home',
         views:{
            'main@index':{
               templateUrl:'views/home.html',
               controller:'homeController'
            }
         }
      })

      .state('index.home.wenhua',{
         url:'/wenhua',
         templateUrl:'views/wenhua.html'
      })
      .state('index.home.jingguan',{
         url:'/jingguan',
         templateUrl:'views/jingguan.html'
      })
      .state('index.home.yishu',{
         url:'/yishu',
         templateUrl:'views/yishu.html'
      })
      .state('index.home.wenxue',{
         url:'/wenxue',
         templateUrl:'views/wenxue.html'
      })
      .state('index.home.keji',{
         url:'/keji',
         templateUrl:'views/keji.html'
      })
      .state('index.home.shenghuo',{
         url:'/shenghuo',
         templateUrl:'views/shenghuo.html'
      })
      .state('index.home.qingchun',{
         url:'/qingchun',
         templateUrl:'views/qingchunlizhi.html'
      })
      .state('index.home.more',{
         url:'/more',
         templateUrl:'views/more.html'
      })


      .state('index.find', {
         url: '/find',
         views: {
            'main@index': {
               templateUrl: 'views/find.html',
               controller: 'findController'
            }
         }
      })
      .state('index.find.classicbook',{
         url:'/classicbook',
         templateUrl:'views/classicbook.html'
      })
      .state('index.find.listbook',{
         url:'/listbook',
         templateUrl:'views/listbook.html'
      })


      .state('index.personal', {
         url: '/personal',
         views: {
            'main@index': {
               templateUrl: 'views/personal.html',
               controller: 'personalController'
            }
         }
      })
})