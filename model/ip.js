// 定义 MongoDB collection 
Nodes = new Mongo.Collection("nodes");

// 添加 collection 权限
Nodes.allow({
    // 登录后才能添加
    insert: function(userId) {
        return userId;
    },
    // 登陆后才能更新
    update: function (userId) {
        return userId;
    },
    // 登陆后才能删除
    remove :function(userId) {
        return userId;
    }
});






