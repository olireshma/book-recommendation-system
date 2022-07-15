const express = require('express');
const router = express.Router();
const resources = require('../controllers/resources');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateResource } = require('../middleware');

const Resource = require('../models/resource');

router.route('/')
    .get(catchAsync(resources.index))
    .post(isLoggedIn, validateResource, catchAsync(resources.createResource))

router.get('/new', isLoggedIn, resources.renderNewForm)

router.route('/:id')
    .get(catchAsync(resources.showResource))
    .put(isLoggedIn, isAuthor, validateResource, catchAsync(resources.updateResource))
    .delete(isLoggedIn, isAuthor, catchAsync(resources.deleteResource));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(resources.renderEditForm))



module.exports = router;


