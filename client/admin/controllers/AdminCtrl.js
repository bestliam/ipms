ipms.controller('AdminCtrl', function($scope,$reactive) {
        
        document.title = "管理列表";

        $scope.paginationConf = {
            currentPage: 1,
            // totalItems: 10,
            itemsPerPage: 10,
        };

        $reactive(this).attach($scope);

        this.sort = {
                name: 1
            };

            this.searchText = '';

            this.helpers({
                nodes: () => {
                    return Nodes.find({},{sort: this.getReactively('sort')});
                },
                nodesCount: () => {
                    return Counts.get('numberOfNodes');
                }
            });


            this.subscribe('nodes', () => {
                return [
                  {
                    limit: parseInt($scope.getReactively('paginationConf.itemsPerPage')),
                    skip: parseInt(($scope.getReactively('paginationConf.currentPage') - 1) * parseInt($scope.getReactively('paginationConf.itemsPerPage'))),
                    sort: this.getReactively('sort')
                  },
                  this.getReactively('searchText')
                ]
            });

            this.autorun(() => {
                if (this.getReactively('nodesCount')>0) {
                    let cc = this.getReactively('nodesCount');
                    if(!$scope.$$phase) {
                      $scope.$apply(function () {
                     　　$scope.paginationConf.totalItems = cc;
                        });
                    }
                    
                }
            });

        // 删除
        this.remove = (node) => {
            if (confirm("确定删除吗？该操作不可恢复！")) {   
                Nodes.remove({_id:node._id});
            }
        };
       });

// 添加ip节点控制器
ipms.controller('AddipCtrl', ['$meteor', '$state', '$scope',
    function($meteor, $state, $scope) {
        document.title = "增加系统";   
        // 创建作用域数据并绑定后台数据
        
        $scope.nodes = $meteor.collection(Nodes);

        // 保存方法
        $scope.save = function (newNode) {
            if (Nodes.find({ip:newNode.ip}).count()<1) {
                $scope.nodes.push(newNode);
            }else{
                console.error("错误","记录重复");
            }
        }

    }
]);
