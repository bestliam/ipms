ipms.controller('LoginCtrl', ['$meteor','$state', function($meteor,$state){
    document.title = "管理员登陆";     
    var vm = this ;

    vm.credentials={
        username:'',
        password:''
    }
    vm.msg='';
    vm.login=function () {
        // 通过用户名和密码是否匹配来判断登陆
        $meteor.loginWithPassword(vm.credentials.username,vm.credentials.password)
        .then(function () {
            $state.go('root.admin');
        },function (err) {
            vm.msg = '登陆失败';
            vm.credentials={};
            console.error(vm.msg)
        })
    }
}]);