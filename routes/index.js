var express = require('express');
var router = express.Router();
var Posts = require('./controllers/Posts');
var Somethings = require('./controllers/Somethings');

/* GET the last hundred posts */
router.get('/posts', (req, res, next) => {
    Posts.getAll(req, res, next);
});

/* GET a post by ID */
router.get('/posts/:id', (req, res, next) => {
    Posts.getOne(req, res, next);
});

/* POST new */
router.post('/posts/new', (req, res, next) => {
    Posts.newPost(req, res, next);
});

router.get('/something', (req, res, next) => {
    Somethings.getSomething(req, res, next);
});

module.exports = router;