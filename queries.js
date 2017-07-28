/* Favorite Database */

var promise = require('bluebird');
var options = { promiseLib: promise };

var pgp = require('pg-promise')(options);

// var connectionString = 'postgres://localhost:5432/moviedb';
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

// FAVORITES

// Create 
function addFavorites(req, res, next) {
	db.none('INSERT INTO favorites (title, release, genre, raiting, comment)' +
          'VALUES (${title}, ${release}, ${genre}, ${raiting}, ${comment})', req.body)
    .catch(function (err) {
       return next(err);
})};

// Read All
function getAllFavorites(req, res, next) {
  db.any('SELECT * FROM favorites')
  .then(function (data) {
    res.render('index', {         
        title: "Movie Finder", 
        data: data
})})};

// Read One (Filter by genre is not working...)
function getOneFavorite(req, res, next) {
  let genre = req.query.genre;
  db.any('SELECT * FROM favorites WHERE genre LIKE $1', [`'%`+genre+`%'`])
  .then(function (data) {
    res.render('index', {         
        title: "Movie Finder", 
        data: data
})})};

// Update (Users only update the comment.)
function editFavorites(req, res, next) {
  let id = parseInt(req.params.id);
  let comment = req.body.comment;
  db.none('UPDATE favorites SET comment = $1 WHERE id = $2', [comment, id])
    .then(function(){
    res.status(200)
})};

// Delete
function deleteFavorites(req, res, next){
  let id = parseInt(req.params.id);
  db.result('DELETE FROM favorites WHERE id = $1', id)
};

module.exports = {
    addFavorites: addFavorites,
    getAllFavorites: getAllFavorites,
    getOneFavorite: getOneFavorite,
    editFavorites: editFavorites,
    deleteFavorites: deleteFavorites,
}