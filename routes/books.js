// setting up express route in our project
var express= require('express')
var router= express.Router()

// exporting the book list from the resource file
var books= require('../resources/books')

// for adding books
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Add Books' });
});

// save books on save click and submit
router.post('/save', function(req, res, next){
    books.push({...req.body, _id:`00${books.length + 1}`})
    res.redirect('/')
})

// edit books, get id to edit the book
router.get('/edit/:_id', function(req, res, next){
    console.log(req.params._id)
    const book = books.find((book)=>book._id === req.params._id)
    res.render('edit', {title: "Edit Books", book})
    })
// post the edited book information
router.post('/saveEdited/:_id', function(req, res, next){
        const currIndex = books.findIndex(book => req.params._id === book._id)
        books.splice(currIndex, 1, {...req.body, _id: req.params._id})
        res.redirect('/')
 })

//  TODO: implement delete functionality

module.exports = router;