import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// User part
export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post(`/login/`, payload)
export const logoutUser = () => api.get(`/logout/`)
export const forgotPassword = (payload) => api.post(`/forgot-password/`, payload)
//export const resetPassword = () => api.put(`/reset-password/`)
// export const forgetPassword
// export const updateLists

//resource part
export const createResource = (payload) => api.post('/resource', payload)
export const updateResource = (id,payload) => api.put('/resource/${id}', payload)
export const getResourceById = (id) => api.get('/resource/${id}')
export const getResourceLists = () => api.get('/resources')

//map part
export const createMap = (payload) => api.post('/map', payload)
export const updateMap = (id, payload) => api.put('/map/${id}',payload)
export const deleteMap = (id) => api.delete('/map/${id}')
export const getMapById = (id) => api.get('/map/${id}')
export const getMapLists = () => api.get('/maps')

//Layer part
export const createLayer = (payload) => api.post('/layer',payload)
export const updateLayer = (id, payload) => api.put('/layer/${id}',payload)
export const deleteLayer = (id) => api.delete('/layer/${id}')
export const getLayerById = (id) => api.get('/layer/${id}')
export const getLayerLists = () => api.get('/layers')

//tileset part
export const createTileset = (payload) => api.post('/Tileset',payload)
export const updateTileset = (id, payload) => api.put('/Tileset/${id}',payload)
export const deleteTileset = (id) => api.delete('/Tileset/${id}')
export const getTilesetById = (id) => api.get('/Tileset/${id}')
export const getTilesetLists = () => api.get('/Tilesets')

//tile part
export const createTile = (payload) => api.post('/Tile',payload)
export const getTileById = (id) => api.get('/Tile/${id}')
export const updateTile = (id, payload) => api.put('/Tile/${id}',payload)

const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,

    createResource,
    updateResource,
    getResourceById,
    getResourceLists,

    createMap,
    updateMap,
    deleteMap,
    getMapById,
    getMapLists,

    createLayer,
    updateLayer,
    deleteLayer,
    getLayerById,
    getLayerLists,

    createTileset,
    updateTileset,
    deleteTileset,
    getTilesetById,
    getTilesetLists,

    createTile,
    getTileById,
    updateTile,

}

export default apis