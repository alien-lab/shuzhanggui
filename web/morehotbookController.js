/**
 * Created by CANONYANG on 2017/5/3.
 */
var morehotbook = angular.module('morehotbook',['infinite-scroll']);
morehotbook.controller('morehotbookController',function ($scope,$http) {
   /*返回上一页*/
   $scope.hot_book_back=function () {
      window.history.back();
   }

   /*star star*/
   $scope.max = 5;
   $scope.readonly = true;  //无法被选

    $http({
        method: 'GET',
        url: 'http://localhost:8080/selHotBooks'
    }).success(function (data) {
        $scope.hotArticles = data;
    });
   
   /*/!*图书数据*!/
   var hotArticles = [
      {
         id:'1',
         title:'追疯子的人',
         img:'../static/img/find_bookIcon_hot01.jpg',
         author:'[阿富汗] 卡勒德·胡赛尼',
         publisher:'上海人民出版社',
         pubdate:'2006-05-01',
         price:' 29.00',
         star_mark:'4',
         desc:'12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。'

      },
      {
         id:'2',
         title:'红楼梦',
         img:'../static/img/find_bookIcon_hot04.jpg',
         author:'曹雪芹 / 高鹗 ',
         publisher:'岳麓书社',
         pubdate:'1999-11-1',
         price:' 18.50',
         star_mark:'3',
         desc:'《红楼梦》是一部中国末期封建社会的百科全书。小说以上层贵族社会为中心图画，真实、生动地描写了十八世纪上半叶中国末期封建社会的全部生活，是这段历史生活的一面镜子和缩影，是中国古老封建社会已经无可挽回地走向崩溃的真实写照。《红楼梦》之所以成为“中国小说文学难以征服的顶峰”，不仅仅是因为它具有很高的思想价值，还在于它非凡的艺术成就。全书规模宏伟，结构严谨，人物生动，语言优美。此外还有一些明显的艺术特点值得后人品味、鉴赏。《红楼梦》一书，通过对“贾、史、王、薛”四大家族荣衰的描写，展示了广阔的社会生活视野，森罗万象，囊括了多姿多彩的世俗人情。人称《红楼梦》内蕴着一个时代的历史容量，是封建末世的百科全书。'

      },
      {
         id:'3',
         title:'解忧杂货店',
         img:'../static/img/find_bookIcon_hot02.jpg',
         author:'东野圭吾 ',
         publisher:'南海出版公司',
         pubdate:'2014-5',
         price:'39.50',
         star_mark:'5',
         desc:'现代人内心流失的东西，这家杂货店能帮你找回——僻静的街道旁有一家杂货店，只要写下烦恼投进卷帘门的投信口，第二天就会在店后的牛奶箱里得到回答。因男友身患绝症，年轻女孩静子在爱情与梦想间徘徊；克郎为了音乐梦想离家漂泊，却在现实中寸步难行；少年浩介面临家庭巨变，挣扎在亲情与未来的迷茫中……他们将困惑写成信投进杂货店，随即奇妙的事情竟不断发生。生命中的一次偶然交会，将如何演绎出截然不同的人生？如今回顾写作过程，我发现自己始终在思考一个问题：站在人生的岔路口，人究竟应该怎么做？我希望读者能在掩卷时喃喃自语：我从未读过这样的小说。——东野圭吾'

      }

   ];
   $scope.hotArticles=hotArticles;*/

   //滚动加载
   $scope.loadEnd=false;
   $scope.hot_book_data=function () {
      $scope.loadmore=true;
      console.log($scope.hotArticles);
      if($scope.hotArticles.length == 0 ){
         $scope.loadEnd=true;
      }else {
         var last = $scope.hotArticles[$scope.hotArticles.length - 1];
         for(var i = 0 ; i<=3 ; i++ ){
            $scope.hotArticles.push(last+i);
         }
         $scope.loadmore=false;
      }

   }
})

/*star star*/
morehotbook.directive('star', function () {
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

