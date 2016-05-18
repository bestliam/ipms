ipms.controller('detailCtrl', function($scope,$stateParams,$reactive){
    document.title = "系统详情";  

    $reactive(this).attach($scope);

    // 订阅服务端数据
    this.subscribe('nodes');

    this.helpers({
        node: () => {
            return Nodes.findOne({_id:$stateParams.id});
        }
    });

});