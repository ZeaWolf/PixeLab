const express = require('express')
const router = express.Router()

const auth = require('../auth')
const UserController = require('../controllers/user-controller')
const ResourceController = require('../controllers/resource-controller')
const MapController = require('../controllers/map-controller')

//For user controllers
router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.get('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)
router.post('/forgot-password', UserController.forgotPassword)
router.put('/reset-password', auth.isResetTokenValid, UserController.resetPassword)
router.put('/lists', auth.verify, UserController.updateLists)

//For resource controllers
router.post('/resource', ResourceController.createResource)
router.put('/resource/:id', ResourceController.updateResource)
router.get('/resource/:id', ResourceController.getResourceById)
router.get('/resources', ResourceController.getResourceLists)

//For map controllers
router.post('/map', MapController.createMap)
router.put('/map/:id', MapController.updateMap)
router.get('/map/:id', MapController.getMapById)
router.get('/maps', MapController.getMapLists)

module.exports = router