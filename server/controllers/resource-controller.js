const Resource = require('../models/resource-model');
const User = require('../models/user-model');

// posting the resource to community => create a new resource in the server
createResource = async(req, res) => {
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

// updating the number of likes and comments of the 
updateResource = async(req, res) => {
    const body = req.body;
    console.log("updateResource: " + JSON.stringify(body));
    if(!body){
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update'
        })
    }
    // find the resource based on _id
    Resource.findOne({ _id: req.params.id}, (err, resource) => {
        console.log("resource found: " + JSON.stringify(resource));
        if(err){
            return res.status(404).json({
                err,
                message: 'Resource not found!'
            })
        }
        
        resource.Type = body.Type;
        resource.Name = body.Name;
        resource.Author = body.Author;
        resource.Image = body.Image;
        resource.Source = body.Source;
        resource.Like = body.Like;
        resource.Comments = body.Comments;
        resource.PublishTime = body.PublishTime;
        resource.Description = body.Description;

        resource
            .save()
            .then(() => {
                console.log("SUCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: resource._id,
                    message: 'Resource updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: "Resource not updated"
                })
            })
    })
}

// get resource by ID
getResourceById = async (req, res) => {
    await Resource.findById({_id: req.params.id}, (err, resourceByID) => {
        if(err){
            return res.status(400).json({success: false, error: err})
        }
        return res.status(200).json({success: true, resource: resourceByID})
    }).catch(err => console.log(err))
}

// get resourceLists
getResourceLists = async (req, res) => {
    await Resource.find({}, (err, resources) => {
        if(err){
            return res.status(400).json({ success: false, error: err})
        }
        if(!resources){
            console.log("no resource");
            return res
                .status(404)
                .json({success: false, error: 'Resources not found'})
        }
        else{
            let pairs = [];
            for(let key in resources){
                let list = resources[key];
                let pair = {
                    _id: list._id,
                    Type: list.Type,
                    Name: list.Name,
                    Author: list.Author,
                    Image: list.Image,
                    Like: list.Like,
                    Comments: list.Comments,
                    PublishTime: list.PublishTime,
                    Description: list.Description
                };
                pairs.push(pair);
            }
            return res.status(200).json({success: true, idInfoPairs: pairs})
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createResource,
    updateResource,
    getResourceById,
    getResourceLists
}
