ipms.controller('index',function ($scope,$reactive) {

    document.title = "前端演示项目";  

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
    

});
