// 配置客户端禁止注册新账户
Accounts.config({forbidClientAccountCreation: true});

if (Meteor.users.find().count()===0) {
    var admin={
        username:'admin',
        password:'3908638'
    };
    Accounts.createUser(admin);
}