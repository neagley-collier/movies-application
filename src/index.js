/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');
import $ from "jquery";

/**
 * require style imports
 */
const {getMovies} = require('./api.js');




function onload(){
    if (!$('.container').hasClass('container2')) {
        $('.container').addClass('container2');
    }
  $('#bodyText').html('<div class="col display-1">Loading...</div>');
  getMovies().then((movies)=> {

    let output = '';

    movies.forEach(({title, rating, id}) =>{

        output += '<div class="movieStats col-sm-3 border border-dark"><p>Title: ' + title + '</p>';
        output += '<p>Rating: ' + rating + '</p>';
        output += '<p>ID: ' + id + '</p>';
        output += '<button class="editBtn btn" >Edit</button></div>'

        });


    $('#bodyText').html(output);

      $('.editBtn').click(function() {
          let title = $(this).parent().children().first().html();
          let rating = $(this).parent().children().next().next().html();

          let formattedTitle = title.split('');

          formattedTitle = formattedTitle.splice(7);

          formattedTitle = formattedTitle.join('');

          let formattedRating = rating.split('');

          formattedRating = formattedRating.splice(8);

          formattedRating = formattedRating.join('');

          $('#editTitle').val(formattedTitle);
          $('#editRating').val(formattedRating);

          $('#edit').css('display', 'block');

      });
  });
    $(".container").removeClass(' container2 ')

}
document.getElementsByTagName('body')[0].onload = onload();






const saveNewMovie = (e) => {
  e.preventDefault();

  let movieTitle = $('#newTitle').val();
  let movieRating = $('#titleRating').val();
  let newMovie = {
      "title": movieTitle,
      "rating": movieRating,
  };

 fetch('/api/movies', {
    method: 'POST',
     headers: {
         'Content-Type': 'application/json',
     },
     body: JSON.stringify(newMovie)
    }).then(getMovies)
     .then(onload);
};

const editMovie = (e) => {
    e.preventDefault();

    let movieTitle = $('#editTitle').val();
    let movieRating = $('#editRating').val();
    let newMovie = {
        "title": movieTitle,
        "rating": movieRating,
    };
    $('#edit').css('display', 'none');
    return fetch('./api/movies', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie)}
        )

};


$('#formSubmit').click(saveNewMovie);

$('#editSubmit').click(editMovie);


// Original code

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
