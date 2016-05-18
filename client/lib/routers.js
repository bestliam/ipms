// 路由配置
ipms.config(function($urlRouterProvider,$stateProvider,$locationProvider) {
    $locationProvider.html5Mode(true);

    // 布局
    $stateProvider.state('root', {
    abstract: true,
    url: '',
    views: {
        //头部模块
        'header': { 
            templateUrl: 'client/layout/header.ng.html',
        },
        //侧边栏模块
        'sidebar': {
            templateUrl: 'client/layout/sidebar.ng.html'
        }        
    } 
});


    $stateProvider
    // 浏览首页
    .state('root.index',{
        url:'/',
        views:{
            'sidebar@':{},
            'breadcrumb@': {},
            'main@': {
            // 指定模板文件，必须以.ng.html为后缀
            templateUrl:'client/frontend/views/index.ng.html',
            controllerAs: 'nodesList',
            controller:'index'
            }
        }
    })
    // 首页浏览详情
    .state('root.detail',{
        url:'/detail/:id',
        views:{
            'sidebar@':{},
            'breadcrumb@': {},
            'main@':{
                templateUrl:'client/frontend/views/detail.ng.html',
                controller:'detailCtrl',
                controllerAs:'dc'
            }
        }
    })
    // 登陆
    .state('root.login',{
        url:'/login',
        views: {
        'sidebar@': {},
        'breadcrumb@': {},
        'main@': {
        // 指定模板文件，必须以.ng.html为后缀
            templateUrl:'client/user/views/login.ng.html',
            controller:'LoginCtrl',
            controllerAs:'lc'
            }
        },
    })
    // 管理员首页
    .state('root.admin',{
        // 定义url
        url:'/admin',
        data: {loginCheck: true},
        views: {
        'main@': {
        // 指定模板文件，必须以.ng.html为后缀
            templateUrl:'client/admin/views/admin.ng.html',
            controller:'AdminCtrl',
            controllerAs:'ac'
        },
    } 
        // 指定控制器
    })
    //添加系统
    .state('root.add',{
        url:'/admin/add',
        data: {loginCheck: true},
        views: {
        'main@': {
        // 指定模板文件，必须以.ng.html为后缀
            templateUrl:'client/admin/views/add.ng.html',
            controller:'AddipCtrl'
        }
    }
    })
    // 修改节点
    .state('root.admin.edit',{
        url:'/edit/:id',
        data: {loginCheck: true},
        views:{
            'main@':{
                templateUrl:'client/admin/views/edit.ng.html',
                controller:'editCtrl',
                controllerAs:'ec'
            }
        }
    })
    // 退出系统
    .state('logout',{
        url:'/logout',
        resolve:['$meteor','$state',function ($meteor,$state) {
            return $meteor.logout().then(function () {
                $state.go('root.index');
            },function (err) {
                console.error('注销失败:',err);
            });
        }]
    });

    // 浏览器没有匹配到以上url时，转到此url
    $urlRouterProvider.otherwise('/');


});

ipms.run(['$rootScope','$location',function  ($rootScope,$location) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (toState.data!=null){
            if (toState.data.loginCheck && !Meteor.userId()) {
                $location.path('/');
            }
        }
    });
}]);