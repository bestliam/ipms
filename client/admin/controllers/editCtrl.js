//修改节点控制器
ipms.controller('editCtrl',function ($scope,$stateParams,$reactive) {

    $reactive(this).attach($scope);

    this.subscribe('nodes');

    this.isedit = 1;

    this.helpers({
        node: () => {
            return Nodes.findOne({_id:$stateParams.id});
        },
        is: () => {
            return this.getReactively('isedit');
        }
    });
    // 修改方法
    this.edit = () => {
        Nodes.update({_id: $stateParams.id},{
            $set: {
                name: this.node.name,
                ip: this.node.ip,
                manager: this.node.manager,
                tel: this.node.tel,
                description: this.node.description,
            }
        },(error) => {
            if (error) {
                console.log('失败');
                this.isedit = 0;
            }else{
                console.log('成功');
                this.isedit = 99;
            }
        });
        this.isedit = 99 ;
    };
});