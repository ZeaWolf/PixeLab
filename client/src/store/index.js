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
    // CREATE_NEW_LIST: "CREATE_NEW_LIST",
    // LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    // MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    // UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    // SET_CURRENT_LIST: "SET_CURRENT_LIST",
    // SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    // SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    // SEARCH_LIST:"SEARCH_LIST",
    // SORT_LIST:"SORT_LIST",
    // LOAD_COMMUNITY_LISTS:"LOAD_COMMUNITY_LISTS"
    LOAD_TILESETS: "LOAD_TILESETS"
    // LOAD_MAPS: "LOAD_MAPS"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
// const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        tilesetList: []
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
                    tilesetList: payload
                    // maps: null
                });
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


    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadTilesets = async function () {
        try{
            console.log("kkkkkkkkkkkkkkk ");
            // console.log(action);
            const response = await api.getTilesetLists();
            console.log("response:111111111 "+response);
            if (response.data.success) {
                let pairsArray = response.data.user.tilesetList;
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

    // store.loadMaps = async function (criteria) {
    //     try{
    //         const response = await api.getMapLists();
    //         console.log("response:111111111 "+response.data.user.mapList);
    //         if (response.data.success) {
    //             let pairsArray = response.data.user.maps;
    //             console.log("tilesetsssssss: "+pairsArray);
    //             storeReducer({
    //                 type: GlobalStoreActionType.LOAD_MAPS,
    //                 payload: pairsArray
    //             });
    //         }
    //         else {
    //             console.log("API FAILED TO GET THE LIST PAIRS");
    //         }
            
    //     }catch(err){
    //         console.log("err");
    //     }
    // }

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