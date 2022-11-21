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
    LOAD_MAPS: "LOAD_MAPS",
    LOADING_A_MAP: "LOADING_A_MAP",
    DELETING_A_MAP: "DELETING_A_MAP",
    LOAD_HOMESCREEN: "LOAD_HOMESCREEN",
    LOAD_LAYERS: "LOAD_LAYERS",

}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
// const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        tilesetList: [],
        currentTileset: null,
        currentMap: null,
        TilesetIdForDelete: null,
        MapIdForDelete: null,
        resourceList: [],
        currentResource: null,
        mapList: []
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
                    currentTileset: store.currentTileset,
                    currentMap: store.currentMap,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    MapIdForDelete: store.MapIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: payload.Resource,
                    mapList: store.mapList,
                })
            }
            case GlobalStoreActionType.CLOSING_A_RESOURCE: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTileset: store.currentTileset,
                    currentMap: store.currentMap,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    MapIdForDelete: store.MapIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: null,
                    mapList: store.mapList,
                })
            }

            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_TILESETS: {
                return setStore({
                    tilesetList: payload,
                    currentTileset: store.currentTileset,
                    currentMap: store.currentMap,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    MapIdForDelete: store.MapIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                    mapList: store.mapList,
                });
            }
            // GET ALL THE RESOURCE LIST
            case GlobalStoreActionType.LOAD_RESOURCES: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTileset: store.currentTileset,
                    currentMap: store.currentMap,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    MapIdForDelete: store.MapIdForDelete,
                    resourceList: payload,
                    currentResource: store.currentResource,
                    mapList: store.mapList,
                })
            }
            case GlobalStoreActionType.DELETE_TILESET: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTileset: store.currentTileset,
                    currentMap: store.currentMap,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    MapIdForDelete: store.MapIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                    mapList: store.mapList,
                })
            }
            case GlobalStoreActionType.LOADING_A_TILESET: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTileset: payload.ctileset,
                    currentMap: store.currentMap,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    MapIdForDelete: store.MapIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                    mapList: store.mapList,
                })
            }
            case GlobalStoreActionType.LOADING_A_MAP: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTileset: store.currentTileset,
                    currentMap: payload.cmap,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    MapIdForDelete: store.MapIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                    mapList: store.mapList,
                })
            }
            case GlobalStoreActionType.DELETING_A_TILESET: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTileset: store.currentTileset,
                    currentMap: store.currentMap,
                    TilesetIdForDelete: payload,
                    MapIdForDelete: store.MapIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                    mapList: store.mapList,
                })
            }
            case GlobalStoreActionType.DELETING_A_MAP: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTileset: store.currentTileset,
                    currentMap: store.currentMap,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    MapIdForDelete: payload,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                    mapList: store.mapList,
                })
            }
            case GlobalStoreActionType.PUBLISH_TILESET: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTileset: store.currentTileset,
                    currentMap: store.currentMap,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    MapIdForDelete: store.MapIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                    mapList: store.mapList,
                })
            }
            case GlobalStoreActionType.LOAD_MAPS: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTileset: store.currentTileset,
                    currentMap: store.currentMap,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    MapIdForDelete: store.MapIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                    mapList: payload,
                })
            }
            case GlobalStoreActionType.LOAD_HOMESCREEN: {
                return setStore({
                    tilesetList: payload.tileset,
                    currentTileset: store.currentTileset,
                    currentMap: store.currentMap,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    MapIdForDelete: store.MapIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                    mapList: payload.map,
                })
            }
            case GlobalStoreActionType.LOAD_LAYERS: {
                return setStore({
                    tilesetList: store.tilesetList,
                    currentTileset: store.currentTileset,
                    currentMap: store.currentMap,
                    TilesetIdForDelete: store.TilesetIdForDelete,
                    MapIdForDelete: store.MapIdForDelete,
                    resourceList: store.resourceList,
                    currentResource: store.currentResource,
                    mapList: store.mapList,
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
                let tileset = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.LOADING_A_TILESET,
                    payload: {ctileset: tileset}
                })
            }
            console.log(response.data);
            history.push("/tileset-editor");
        }catch(err){
            console.log("err:"+err);
        }
    }

    store.loadMapPage = async function(id) {
        try{
            let response = await api.getMapById(id);
            if (response.data.success){
                let map = response.data.map;
                storeReducer({
                    type: GlobalStoreActionType.LOADING_A_MAP,
                    payload: {cmap: map}
                })
            }
            history.push("/map/");
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

    store.RenameMap = async function (id,name){
        try{
            let response = await api.getMapById(id);
            if(response.data.success){
                let map = response.data.map;
                map.Name = name;
                // async function updateTileset(id, tileset){
                response = await api.updateMap(id, map);
                if(response.data.sucess){
                    console.log("updated tileset src success");
                }
                store.loadMaps();
            }
        }catch(err){
            console.log("err:"+err);
        }
    };

    store.RenameLayer = async function (id,name){
        try{
            let response = await api.getLayerById(id);
            if(response.data.success){
                let layer = response.data.layer;
                layer.Name = name;
                response = await api.updateLayer(id, layer);
                if(response.data.sucess){
                    console.log("updated tileset src success");
                }

                let layers = store.currentMap.Layers;

                for( var i = 0; i < layers.length; i++){ 
                    if ( layers[i]._id === id) { 
                        layers[i].Name = name; 
                    }
                }
                let map = store.currentMap;
                map.Layers = layers;
                store.currentMap.Layers = layers;
                const responseMap = await api.updateMap(map._id, map);
                store.loadLayers();
            }
        }catch(err){
            console.log("err:"+err);
        }
    };


    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadTilesets = async function () {
        try{
            const response = await api.getTilesetLists(auth.user._id);
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

    store.loadMaps = async function () {
        try{
            const response = await api.getMapLists(auth.user._id);
            console.log(response);
            if (response.data.success) {
                let pairsArray = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_MAPS,
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

    store.loadLayers = async function () {
        try{
            const response = await api.getLayerLists(auth.user._id);
            if (response.data.success) {
                let layers = response.data.data;
                let new_map = store.currentMap;
                new_map.Layers = layers;

                storeReducer({
                    type: GlobalStoreActionType.LOAD_LAYERS,
                    payload: new_map
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }catch(err){
            console.log("err:"+err);
        }
    }

    store.loadHomeScreen = async function(){
        try{
            const response_tileset = await api.getTilesetLists();
            const response_map = await api.getMapLists();
            if (response_tileset.data.success && response_map.data.success) {
                let pairsArray_tileset = response_tileset.data.data;
                let pairsArray_map = response_map.data.data;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_HOMESCREEN,
                    payload: {tileset: pairsArray_tileset, map: pairsArray_map}
                });
            }else {
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

    store.updateLayer = async function (name = "untiled", height = 32, width = 32) {
        let newLayer = await store.createLayer("layer", height, width);
        let map = store.currentMap;
        map.Layers.push(newLayer);
        store.currentMap = map;
        const response = await api.updateMap(map._id,map);
        store.loadLayers();
    }

    // this method will create a new layer
    store.createLayer = async function (name = "layer", height = 32, width = 32){
        let payload = {
            Name: name,
            Type: "layer",
            Height: height,
            Width: width,
            Content: [],
            Locked: false,
            Opacity: 1,
            Visible: false,
            X: 0,
            Y: 0
        };
        const response = await api.createLayer(payload);
        if(response.data.success){
            console.log(response.data.layer);
            return response.data.layer;
        }
    }

    // this method will create a new map
    store.createMap = async function (name = "untiled", height = 32, width = 32){
        let newLayer = await store.createLayer("layer", height, width);
        let layers = [];
        layers.push(newLayer);
        let payload = {
            OwnerEmail: auth.user.email,
            Name: name,
            Type: "map",
            ShareList: [],
            Source: "",
            Height: height,
            Width: width,
            Layers: layers,
            Tileset: "",
        }
        const response = await api.createMap(payload);
        if (response.data.success) {
            console.log(response.data.map);
            history.push("/home");
            store.loadMaps();
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
            history.push("/home");
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

    store.DeleteMapFile = async function(){
        // let response_map = await api.getMapById(store.MapIdForDelete);
        // console.log(response_map);
        let response_delete = await api.deleteMap(store.MapIdForDelete);
        if (response_delete.data.success) {
            store.MapIdForDelete = null;
            store.loadMaps();
        }
    };

    store.DeleteLayer = async function (id){
        let layers = store.currentMap.Layers;

        for( var i = 0; i < layers.length; i++){ 
            if ( layers[i]._id === id) { 
                layers.splice(i, 1); 
            }
        }
        let map = store.currentMap;
        map.Layers = layers;
        store.currentMap.Layers = layers;
        const response = await api.updateMap(map._id, map);
        let response_deleteLayer = await api.deleteLayer(id);
        store.loadLayers();
    };

    store.MarkDeleteTileset = function (id){
        storeReducer({
            type: GlobalStoreActionType.DELETING_A_TILESET,
            payload:id,
        })
    };

    store.MarkDeleteMap = function (id){
        storeReducer({
            type: GlobalStoreActionType.DELETING_A_MAP,
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
                if(type==="+"){
                    resource.Like ++;
                }
                else if(type==="-"){
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

    store.arrowUpward =async function(id){
        let layers = store.currentMap.Layers;
        for( var i = 1; i < layers.length; i++){ 
            if ( layers[i]._id === id) { 
                var temp = layers[i];
                layers[i] = layers[i-1];
                layers[i-1] = temp;
                break;
            }
        }
        let map = store.currentMap;
        map.Layers = layers;
        store.currentMap = map;
        const response = await api.updateMap(map._id, map);
        history.push("/map/");
    }

    store.arrowDownward =async function(id){
        let layers = store.currentMap.Layers;
        for( var i = 0; i < layers.length-1; i++){ 
            if ( layers[i]._id === id) { 
                var temp = layers[i];
                layers[i] = layers[i+1];
                layers[i+1] = temp;
                break;
            }
        }
        let map = store.currentMap;
        map.Layers = layers;
        store.currentMap = map;
        const response = await api.updateMap(map._id, map);
        history.push("/map/");
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