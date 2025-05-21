var express = require('express');
var router = express.Router();
const Book = require('../models/book.model.js')


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const books = await Book.find({});
    res.render('index', { title: 'Book App' , bookList : books});
  } catch(error) {
    res.status(500).json({message: error.message})
  }
});

module.exports = router;
