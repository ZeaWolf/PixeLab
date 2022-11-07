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
    // LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    // MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    // UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    // SET_CURRENT_LIST: "SET_CURRENT_LIST",
    // SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    // SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    // SEARCH_LIST:"SEARCH_LIST",
    // SORT_LIST:"SORT_LIST",
    // LOAD_COMMUNITY_LISTS:"LOAD_COMMUNITY_LISTS"
    LOAD_TILESETS: "LOAD_TILESETS",
    LOADING_A_TILESET: "LOADING_A_TILESET",
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
        newTilesetCounter: 0,
        currentTilesetId: null,
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
            
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_TILESETS: {
                return setStore({
                    tilesetList: payload,
                    newTilesetCounter: store.newTilesetCounter,
                    currentTilesetId: store.currentTilesetId,
                });
            }
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    tilesetList: store.tilesetList,
                    newTilesetCounter: store.newTilesetCounter + 1,
                    currentTilesetId: store.currentTilesetId,
                })
            }
            case GlobalStoreActionType.DELETE_TILESET: {
                return setStore({
                    tilesetList: store.tilesetList,
                    newTilesetCounter: store.newTilesetCounter,
                    currentTilesetId: store.currentTilesetId,
                })
            }
            case GlobalStoreActionType.LOADING_A_TILESET: {
                return setStore({
                    tilesetList: store.tilesetList,
                    newTilesetCounter: store.newTilesetCounter,
                    currentTilesetId: payload,
                })
            }
            // case GlobalStoreActionType.LOAD_MAPS: {
            //     return setStore({
            //         tilesets: payload.tilesets,
            //         // maps: null
            //     });
            // }

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
                storeReducer({
                    type: GlobalStoreActionType.LOADING_A_TILESET,
                    payload: tilesetID
                })
            }
            console.log(response.data);
        }catch(err){
            console.log("err:"+err);
        }
    }

    // THIS FUNCTION WILL RETURN TILESET'S SOURCE BY ID
    store.loadTilesetResourceImage = async function(id){
        try{
            let response = await api.getTilesetById(id);
            console.log("wtf");
            let value = response.data.data.Source;
            console.log(typeof response.data.data.Source);
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


    store.createNewTileset = async function () {
        let newTilesetName = "Untitled" + store.newTilesetCounter;
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
            // store.loadTilesets();
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
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