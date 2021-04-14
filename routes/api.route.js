const router = require('express').Router();
// IMPORT Controllers 
const {
    create,
    read,
    show,
    update,
    destroy,
    bulk
} = require('../controller/crud.controller');

// Import Route Base Middleware

// POST http://example.com/api/create
router.post('/create', create);

// GET http://example.com/api/read
router.get('/read', read);

// GET http://example.com/api/show/69788abc545454
router.get('/show/:id', show);

// PUT http://example.com/api/update/69788abc545454
router.put('/update/:id', update);

// DELETE http://example.com/api/delete/69788abc545454
router.delete('/delete/:id', destroy);

// DELETE http://example.com/api/bulk
router.delete('/delete/bulk', bulk);

module.exports = router;