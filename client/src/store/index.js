import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
// import jsTPS from '../common/jsTPS'
import api from '../api'
// import MoveItem_Transaction from '../transactions/MoveItem_Transaction'
// import UpdateItem_Transaction from '../transactions/UpdateItem_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    // CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    // CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_TILESET: "CREATE_NEW_TILESET",
    DELETE_TILESET: "DELETE_TILESET",
    // SEARCH_LIST:"SEARCH_LIST",
    // SORT_LIST:"SORT_LIST",
    // LOAD_COMMUNITY_LISTS:"LOAD_COMMUNITY_LISTS"
    LOAD_TILESETS: "LOAD_TILESETS",
    LOADING_A_TILESET: "LOADING_A_TILESET",
    DELETING_A_TILESET: "DELETING_A_TILESET",
    PUBLISH_TILESET: "PUBLISH_TILESET",
    LOAD_RESOURCES: "LOAD_RESOURCES",
    LOADING_A_RESOURCE: "LOADING_A_RESOURCE",
    CLOSING_A_RESOURCE: "CLOSING_A_RESOURCE",
    
    // LOAD_MAPS: "LOAD_MAPS"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
// const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        tilesetList: [],
        currentTilesetId: null,
        currentTilesetName:null,
        TilesetIdForDelete: null,
        resourceList: [],
        currentResource: null,
        // maps: []
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.LOADING_A_RESOURCE: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTilesetId: store.currentTilesetId,
                    currentTilesetName: store.currentTilesetName,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: payload.Resource,
                })
            }
            case GlobalStoreActionType.CLOSING_A_RESOURCE: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTilesetId: store.currentTilesetId,
                    currentTilesetName: store.currentTilesetName,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: null,
                })
            }

            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_TILESETS: {
                return setStore({
                    tilesetList: payload,
                    currentTilesetId: store.currentTilesetId,
                    currentTilesetName: store.currentTilesetName,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                });
            }
            // GET ALL THE RESOURCE LIST
            case GlobalStoreActionType.LOAD_RESOURCES: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTilesetId: store.currentTilesetId,
                    currentTilesetName: store.currentTilesetName,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    resourceList: payload,
                    currentResource: store.currentResource,
                })
            }
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTilesetId: store.currentTilesetId,
                    currentTilesetName: store.currentTilesetName,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                })
            }
            case GlobalStoreActionType.DELETE_TILESET: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTilesetId: store.currentTilesetId,
                    currentTilesetName: store.currentTilesetName,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                })
            }
            case GlobalStoreActionType.LOADING_A_TILESET: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTilesetId: payload.id,
                    currentTilesetName: payload.name,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                })
            }
            case GlobalStoreActionType.DELETING_A_TILESET: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTilesetId: store.currentTilesetId,
                    currentTilesetName: store.currentTilesetName,
                    TilesetIdForDelete: payload,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                })
            }
            case GlobalStoreActionType.PUBLISH_TILESET: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTilesetId: store.currentTilesetId,
                    currentTilesetName: store.currentTilesetName,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                })
            }
            default:
                return store;
        }
    }
    // THIS FUNCTION WILL LOAD A SELECTED TILESET CARD FROM THE HOMEPAGE
    store.loadTilesetPage = async function(id) {
        try{
            console.log(id);
            let response = await api.getTilesetById(id);
            if (response.data.success){
                let tileset = response.data.data;  // these 2 lines can be deleted since the payload can just be id in this case
                let tilesetID = tileset._id;       // but whatever
                let tilesetName = tileset.Name;
                storeReducer({
                    type: GlobalStoreActionType.LOADING_A_TILESET,
                    payload: {id: tilesetID, name: tilesetName}
                })
            }
            console.log(response.data);
            history.push("/tileset-editor");
        }catch(err){
            console.log("err:"+err);
        }
    }

    // THIS FUNCTION WILL RETURN TILESET'S SOURCE BY ID
    store.loadTilesetResourceImage = async function(id){
        try{
            let response = await api.getTilesetById(id);
            let value = response.data.data.Source;
            return value;
        }catch(err){
            console.log("err:"+err);
        }
    }

    // THIS FUNCTION WILL SAVE THE TILESET CARD FROM THE TILESET EDITOR
    store.saveTilesetSpace = async function(id, src) {
        try{
            let response = await api.getTilesetById(id);
            // Tileset Found From Database
            if(response.data.success){
                let tileset = response.data.data;
                tileset.Source = src;
                // async function updateTileset(id, tileset){
                response = await api.updateTileset(id, tileset);
                if(response.data.sucess){
                    console.log("updated tileset src success");
                }
                // }
            }
        }catch(err){
            console.log("err:"+err);
        }
    }

    store.RenameTileset = async function (id,name){
        try{
            let response = await api.getTilesetById(id);
            if(response.data.success){
                let tileset = response.data.data;
                tileset.Name = name;
                // async function updateTileset(id, tileset){
                response = await api.updateTileset(id, tileset);
                if(response.data.sucess){
                    console.log("updated tileset src success");
                }
                store.loadTilesets();
            }
        }catch(err){
            console.log("err:"+err);
        }
    };


    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadTilesets = async function () {
        try{
            const response = await api.getTilesetLists();
            if (response.data.success) {
                let pairsArray = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_TILESETS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
            
        }catch(err){
            console.log("err:"+err);
        }
    }
    
    // THIS FUNCTION LOADS ALL NAME PAIRS FOR THE RESOURCE
    store.loadResources = async function () {
        try{
            const response = await api.getResourceLists();
            if(response.data.success){
                let pairsArray = response.data.idInfoPairs;
                // community's filter, sort, search by text should be written here
                console.log(pairsArray);
                console.log("fffkfkkfkfkfkf"+pairsArray.Source);
                storeReducer({
                    type: GlobalStoreActionType.LOAD_RESOURCES,
                    payload: pairsArray,
                })
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }catch(err){
            console.log("error msg: "+err);
        }
    }

    // THIS FUNCTION WILL LOAD A SELECTED RESOURCE CARD
    store.setCurrentResource = async function (id) {
        try{
            let response = await api.getResourceById(id);
            if(response.data.success){
                let resource = response.data.resource;
                let resourceID = resource._id;
                storeReducer({
                    type: GlobalStoreActionType.LOADING_A_RESOURCE,
                    payload: {Resource: resource}
                })
                history.push("/resource/"+resourceID);
            }
        }catch(err){
            console.log(err);
        }
    }

    // THIS FUNCTION WILL CLOSE THE CURRENT RESOURCE PAGE AND RETURN TO COMMUNITY PAGE
    store.closeCurrentResource = async function() {
        try{
            storeReducer({
                type: GlobalStoreActionType.CLOSING_A_RESOURCE,
                Payload: {}
            })
            //await store.loadResources();
            history.push("/community/");
        }catch(err){
            console.log(err);
        }
    }

    // THIS FUNCTION WILL POST A COMMENT TO A SPECIFIC RESOURCE BY ID
    store.postComment = async function(id, comment){
        try{
            let response = await api.getResourceById(id);
            if(response.data.success){
                let resource = response.data.resource;
                resource.Comments.push(comment)
                console.log("post comment id: " + id);
                console.log("post comment comment: " + comment);
                response = await api.updateResource(id, resource);
                if(response.data.success){
                    store.setCurrentResource(id);
                }
            }
        }catch(err){
            console.log(err);
        }
    }

    store.createNewTileset = async function () {
        let newTilesetName = "Untitled";
        let payload = {
            OwnerEmail:     auth.user.email,
            Name:           newTilesetName,
            Type:           "tileset",
            SharedList:     [],
            Columns:        0,
            Rows:           0,
            Spacing:        0,
            Tiles:          [],
            Source:         ""
        };
        const response = await api.createTileset(payload);
        console.log(response);
        if (response.data.success) {
            // tps.clearAllTransactions();
            let newTileset = response.data.tilesetList;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_TILESET,
                payload: newTileset
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/home");//////
            store.loadTilesets();
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    store.publishTileset = async function(id, text){
        const response = await api.getTilesetById(id);
        console.log(auth.user);
        if (response.data.success) {
            let tileset = response.data.data;
            let payload = {
                Type:           "tileset",
                Name:           tileset.Name,
                Author:         auth.user.userName,
                Image:          tileset.Source,
                Source:         tileset.Source,
                Like:           0,
                Downloads:      0,
                Comments:       [],
                PublishTime:    Date.now(),
                Description:    text,
            };
            const responseResource = await api.createResource(payload);
            if (responseResource.data.success) {
                let resource = responseResource.data.resource;
                storeReducer({
                    type: GlobalStoreActionType.PUBLISH_TILESET,
                    payload: resource
                });
                // history.push("/community");
                // store.loadTilesets();
            }
            else {
                console.log("API FAILED TO publish a tileset");
            }

        }
        else {
            console.log("API FAILED TO get a tileset");
        }
    }

    store.DeleteTilesetFile = async function(){
        let response = await api.deleteTileset(store.TilesetIdForDelete);
        if (response.data.success) {
            // storeReducer({
            //     type: GlobalStoreActionType.DELETING_A_TILESET,
            //     payload: null,
            // })
            store.TilesetIdForDelete = null;
            store.loadTilesets();
        }
    };

    store.MarkDeleteTileset = function (id){
        storeReducer({
            type: GlobalStoreActionType.DELETING_A_TILESET,
            payload:id,
        })
    };

    store.likeResource = async function(id, type){
        try{
            let response = await api.getResourceById(id);
            console.log(response);
            if(response.data.success){
                let resource = response.data.resource;
                console.log(resource);
                if(type=="+"){
                    resource.Like ++;
                }
                else if(type=="-"){
                    resource.Like --;
                }
                // async function updateTileset(id, tileset){
                response = await api.updateResource(id, resource);
                if(response.data.sucess){
                    console.log("updated tileset src success");
                }
            }
        }catch(err){
            console.log("err:"+err);
        }
    }

    store.handleDownload = async function(id){
        try{
            let response = await api.getResourceById(id);
            console.log("shugui ohoh");
            console.log(response);
            if(response.data.success){
                let resource = response.data.resource;
                console.log(resource);
                resource.Downloads ++;
                // async function updateTileset(id, tileset){
                response = await api.updateResource(id, resource);
                if(response.data.sucess){
                    console.log("updated tileset src success");
                }
                // store.loadResources();
            }
        }catch(err){
            console.log("err:"+err);
        }
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };