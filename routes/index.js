var express = require('express');
var router = express.Router();
var db = require('../queries');

// Favorites

router.post('/', db.addFavorites); 			// Create
router.get('/', db.getAllFavorites); 		// Read All
router.get('/:genre', db.getOneFavorite); 	// Read One Genre
router.patch('/:id', db.editFavorites); 	// Update
router.delete('/:id', db.deleteFavorites); 	// Delete

module.exports = router;