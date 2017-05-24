/**
 * Created by CANONYANG on 2017/5/4.
 */
var bookDetails = angular.module('bookDetails',[])
   .controller('bookDetailsController',function ($scope,$http) {
       //$scope.id=$stateParams.id;
       //$scope.name.$stateParams.name;

       /*star star*/
       $scope.max = 5;
       $scope.readonly = true;  //无法被选
       var id = 1;
       $http({
           method: 'GET',
           url: 'http://localhost:8080/selBooksById/'+id
       }).success(function (data) {
           $scope.bookdetail = data;
       });

     /* var bookdetails=[
         {
            id:'1',
            title:'追疯子的人',
            img:'../static/img/find_bookIcon_hot01.jpg',
            author:'[阿富汗] 卡勒德·胡赛尼',
            publisher:'上海人民出版社',
            pubdate:'2006-05-01',
            price:' 29.00',
            star_mark:'4',
            binding:'平装',
            pages:'362',
            series:'',
            isbn13:'9787208061644',
            originalname:'',
            translator:'李继宏 ',
            alreadylent:'5',
            borrowtimes:'5',
            library:'南工院图书馆',
            booklocation:'I242.4/433:3',
            desc:'12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。',
            authorinfo:'卡勒德·胡赛尼（Khaled Hosseini），1965年生于阿富汗喀布尔市，后随父亲迁往美国。胡赛尼毕业于加州大学圣地亚哥医学系，现居加州。“立志拂去蒙在阿富汗普通民众面孔的尘灰，将背后灵魂的悸动展示给世人。”著有小说《追风筝的人》(The Kite Runner，2003）、《灿烂千阳》(A Thousand Splendid Suns，2007)、《群山回唱》（And the Mountains Echoed,2013）。作品全球销量超过4000万册。2006年，因其作品巨大的国际影响力，胡赛尼获得联合国人道主义奖，并受邀担任联合国难民署亲善大使。'

         }

      ];*/
      /*console.log($scope.bookdetails);*/

      /*返回上一页*/
      $scope.book_details_back=function () {
         window.history.back();
      }

      $scope.mulu_hide_val=true;//默认隐藏目录
      $scope.hideORshow='展开';
      //$scope.bookSectionUp=false;
     // $scope.bookSectionDown=false;
      $scope.book_hide=function () {
         $scope.mulu_hide_val=!$scope.mulu_hide_val;
            if( $scope.hideORshow=='展开' ){
               //$scope.bookSectionUp=false;
               //$scope.bookSectionDown=true;
               $scope.hideORshow='收起';
            }else{
               //$scope.bookSectionUp=true;
               //$scope.bookSectionDown=false;
               $scope.hideORshow='展开';
            }
      }

   })

   /*.state('app.bookDetails',{
      url:'/bookDetails',
      params:{
         "id":null,
         "name":null
      },
      templateUrl:'morehotArticle/bookDetails.html',
      controller:'bookDetailsController',
      resolve:{
         deps:['uiLode',
            function (uiLode) {
               return uiLode.load([

               ])
            }]
      }
   })
*/

/*star star*/
bookDetails.directive('star', function () {
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

