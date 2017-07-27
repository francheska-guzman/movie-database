// Francheska Guzman
console.log("Form is working.");

// API
let baseURL = "https://api.themoviedb.org/3/search/movie?api_key=a1e01fca0d78915b537084765108b730&query=";

$('#searchButton').on('click', function(){
let input = $('#search').val(); // The user's input.
// console.log(input);

	$.ajax({
	url: baseURL + input
	}).done(function(data){
	// console.log(data.results[0]);
	
		// Using DOM to display the movie information in the browser.
		$('#title').empty().append(data.results[0].title);
		$('#release').empty().append(data.results[0].release_date);
		$('#plot').empty().append(data.results[0].overview);
		$('#voteAverage').empty().append(data.results[0].vote_average);
		$('#voteTotal').empty().append("Total Votes: " + data.results[0].vote_count);
	
		let posterImg = "http://image.tmdb.org/t/p/original" + data.results[0].poster_path;
		$('#posterImg').attr('src', posterImg);
		// debugger;
		getGenreNames(data.results[0].genre_ids);
	})
	.always(function(){
	console.log('Run after all is done.');
})});

// Favorites

$('#addFavorites').on('click', function(){

let title = $('#title').text();
// console.log(title);
let release = $('#release').text();
// console.log(release);
let genre = $('#genres').text();
// console.log(genre);
let raiting = $('#voteAverage').text();
// console.log(raiting);

	if(title === '') {
		alert('Movie not found. Use the search bar provided to find movies.');
	}

	else {
	let comment = window.prompt('What is your favorite part of this movie?');
	// console.log(comment);

	axios({
	  method: 'POST',
	  url: '/',
	  data: {
	    title: title,
	    release: release,
	    genre: genre,
	    raiting: raiting,
	    comment: comment
		}})
	location.reload();
  	}
});

// Convert the genre ID to the corresponding genre name.
// I called this function in Search, to display all the genres of 'x' movie.
function getGenreNames(array) {		
let genre_names = [];
// console.log(genre_names);

	for(let i = 0; i < array.length; i += 1){
		if (array == 28) {
		genre_names.push(" Action");
		}
		else if (array[i] == 12) {
		genre_names.push(" Adventure");
		}
		else if (array[i] == 16) {
		genre_names.push(" Animation");	
		}
		else if (array[i] == 35) {
		genre_names.push(" Comedy");
		}
		else if (array[i] == 80) {
		genre_names.push(" Crime");
		}
		else if (array[i] == 99) {
		genre_names.push(" Documentary");
		}
		else if (array[i] == 18) {
		genre_names.push(" Drama");
		}
		else if (array[i] == 10751) {
		genre_names.push(" Family");
		}
		else if (array[i] == 14) {
		genre_names.push(" Fantasy");
		}
		else if (array[i] == 36) {
		genre_names.push(" History");
		}
		else if (array[i] == 27) {
		genre_names.push(" Horror");
		}
		else if (array[i] == 10402) {
		genre_names.push(" Music");
		}
		else if (array[i] == 9648) {
		genre_names.push(" Mystery");
		}
		else if (array[i] == 10749) {
		genre_names.push(" Romance");
		}
		else if (array[i] == 878) {
		genre_names.push(" Science Fiction");
		}
		else if (array[i] == 10770) {
		genre_names.push(" TV Movie");
		}
		else if (array[i] == 53) {
		genre_names.push(" Thriller");
		}
		else if (array[i] == 10752) {
		genre_names.push(" War");
		}
		else if (array[i] == 37) {
		genre_names.push(" Western");
	}}

	let genres = genre_names.toString();
	$('#genres').empty().append(genres);

};

$('.delete').on('click', function() {
	let id = $(this).parent().attr('data-id')
	axios.delete("/" + id)
	// Remove from the DOM.
	location.reload();
});

$('.edit').on('click', function() {
	$(this).closest('td').prevAll('td').find('input[type=text]').removeAttr('readonly');
	$(this).prev().focus();
});

$('.e').on('change', function() {
	let id = parseInt($(this).attr('data-id'));
	// console.log(id);
	let comment = $(this).val();
	// console.log(comment);
	$(this).attr('readonly', true);

	axios({
	  method: 'PATCH',
	  url: '/' + id,
	  data: {
	  	id: id,
	    comment: comment
	}});
});