var models = require('../../db').models;

const getHash = (value) => {
    var hash = 0;
    if (value.length == 0) {
        return hash;
    }
    for (var i = 0; i < value.length; i++) {
        var char = value.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
};

const getAll = (req, res, next) => {
    models.Post.find((err, docs) => {
        if (err) res.status(500).json({ error: err });
        res.status(200).json({
            status: res.statusCode,
            posts: docs
        });
    }).sort("-date").limit(50);
    next();
};

const getOne = (req, res, next) => {
    models.Post.findOne({ _id: req.params.id }, (err, doc) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
        res.status(200).json({
            status: res.statusCode,
            post: doc
        });
    });
    next();
};

const newPost = (req, res, next) => {
    console.log("New post:");
    console.log(req.body);
    console.log("ID:");
    console.log(getHash(req.ip));
    models.Post.create({
        name: getHash(req.ip),
        text: req.body.text,
        date: req._startTime
    }, (err, doc) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
        res.status(200).json({
            status: res.statusCode,
            doc
        });
    });
    next();
};

module.exports = {
    getAll,
    getOne,
    newPost
};