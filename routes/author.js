const express = require('express');
const router = express.Router();
// Controller asukoht
const authorController = require('../controllers/author');

router.get('/:id', authorController.getAllArticlesByAuthor);


module.exports = router;