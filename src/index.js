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




function render(){
    if (!$('.container').hasClass('container2')) {
        $('.container').addClass('container2');
    }
  $('#bodyText').html('<div class="col display-1"><img src="loader.gif">\n</div>');
  getMovies().then((movies)=> {

    let output = '';

    movies.forEach(({title, rating, id}) =>{

        output += '<div class="movieStats col-sm-3 border border-dark"><p>Title: ' + title + '</p>';
        output += '<p>Rating: ' + rating + '</p>';
        output += '<p>ID: ' + id + '</p>';
        output += '<button class="editBtn btn" >Edit</button></br>';
        output += '<button class="deleteBtn btn" >Delete</button></div>'


    });


    $('#bodyText').html(output);

      $('.editBtn').click(function() {
          let title = $(this).parent().children().first().html();
          let rating = $(this).parent().children().next().html();
          let movieId = $(this).parent().children().next().next().html();

         let formattedTitle = title.slice(7);
         let formattedRating = rating.slice(8);
         let formattedId = movieId.slice(4);
         console.log(formattedId);

          $('#editTitle').val(formattedTitle);
          $('#editRating').val(formattedRating);
          $('#editId').val(formattedId);

          $('#edit').css('display', 'block');


      });

      $('.deleteBtn').click(function () {

          let movieId = $(this).parent().children().next().next().html().slice(4);

          return fetch(`./api/movies/${movieId}`, {
              method: 'DELETE',}
          ).then(getMovies)
              .then(render);

      });
  });
    $(".container").removeClass(' container2 ')

}
document.getElementsByTagName('body')[0].onload = render();






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
     .then(render);
};

const editMovie = (e) => {
    e.preventDefault();

    let movieTitle = $('#editTitle').val();
    let movieRating = $('#editRating').val();
    let movieId = $('#editId').val();
    let newMovie = {
        "title": movieTitle,
        "rating": movieRating,
    };
    $('#edit').css('display', 'none');
    return fetch(`./api/movies/${movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie)}
        ).then(getMovies)
        .then(render);

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
