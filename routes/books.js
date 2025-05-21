// setting up express route in our project
var express= require('express')
var router= express.Router()
const Book = require('../models/book.model.js')

// exporting the book list from the resource file
var books= require('../resources/books')

// for adding books
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Add Books' });
});

// save books on save click and submit
router.post('/save', async function(req, res, next){
  try{
    const book = await Book.create(req.body)
    res.status(200).redirect('/')
  } catch {
    res.status(500).json({message: error.message})
  }
})

// edit books, get id to edit the book
router.get('/edit/:_id', async function(req, res, next){
  try{
    const id = req.params._id
    const book = await Book.findById(id)
  if (!book) {
    return res.status(404).json({message: "Book not found"})
  }
  res.render('edit', {title: "Edit Books", book})

  } catch (error){
    res.status(500).json({message: error.message})
  }
    })
    
// post the edited book information
router.post('/saveEdited/:_id', async function(req, res, next){
  const id = req.params._id
  const book = await Book.findByIdAndUpdate(id, req.body)
  if (!book) {
    return res.status(404).json({message: "Error updating book"})
  }
  res.redirect('/')
 })

//  TODO: implement delete functionality

module.exports = router;