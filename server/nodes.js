Meteor.publish("nodes", function (options,searchString) {
    if (!searchString || searchString == null) {
        searchString = '';
    }

    let selector = {
        $or:[
            {name: {'$regex' : '.*' + searchString || '' + '.*', '$options' : 'i'}},
            {ip: {'$regex' : '.*' + searchString || '' + '.*', '$options' : 'i'}},
        ]
    }

    Counts.publish(this,'numberOfNodes',Nodes.find(selector),{noReady:true});

    return Nodes.find(selector,options);
});