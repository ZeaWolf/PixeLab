const express = require('express')
const router = express.Router()

const auth = require('../auth')
const UserController = require('../controllers/user-controller')
const ResourceController = require('../controllers/resource-controller')
const MapController = require('../controllers/map-controller')
const TilesetController = require('../controllers/map-controller')

//For user controllers
router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.get('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)
router.post('/forgot-password', UserController.forgotPassword)
router.put('/reset-password', auth.isResetTokenValid, UserController.resetPassword)
router.put('/lists', auth.verify, UserController.updateLists)

//For resource controllers
router.post('/resource',auth.verify, ResourceController.createResource)
router.put('/resource/:id', auth.verify, ResourceController.updateResource)
router.get('/resource/:id', ResourceController.getResourceById)
router.get('/resources', ResourceController.getResourceLists)

//For map controllers
router.post('/map', auth.verify, MapController.createMap)
router.put('/map/:id', auth.verify, MapController.updateMap)
router.delete('/map/:id', auth.verify, MapController.deleteMap)
router.get('/map/:id', auth.verify, MapController.getMapById)
router.get('/maps', auth.verify, MapController.getMapLists)

//For tileset controllers
router.post('/tileset', auth.verify, TilesetController.createTileset)
router.put('/tileset/:id', auth.verify, TilesetController.updateTileset)
router.delete('/tileset/:id', auth.verify, TilesetController.deleteTileset)
router.get('/tileset/:id', auth.verify, TilesetController.getTilesetById)
router.get('/tilesets', auth.verify, TilesetController.getTilesetLists)


module.exports = router