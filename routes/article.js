
const express = require('express');
// get using express router
const router = express.Router();
// define article controller and export it for this file
const articleController = require('../controllers/article');

// use controller functions according to the specified route

router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);

module.exports = router;