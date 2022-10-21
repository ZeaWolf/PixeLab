const Resource = require('../models/resource-model');
const User = require('../models/user-model');

// posting the resource to community => create a new resource in the server
createResource = (req, res) => {
    // check if it is correct format
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success: false,
            error: 'You must provide correct format for resource',
        });
    }

    // create a Resource based on the request's body
    const resource = new Resource(body);
    console.log("creating top5List: " + JSON.stringify(resource));
    
    // if creation of the Resource not success
    if(!resource){
        return res.status(400).json({success: false, error: err});
    }

    // if success
    resource
    .save()
    .then(() =>{
        return res.status(201).json({
            success: true,
            resource: resource,
            message: 'resource success posted to the community'
        })

    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'resource is not post to the community'
        })
    })
}

// updating the number of likes and comments to the 
//updateResource