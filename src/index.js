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
  $('#bodyText').text('Loading...');
  getMovies().then((movies)=> {

    let output = '';

    movies.forEach(({title, rating, id}) =>{

        output += '<div class="movieStats"><span>Title: ' + title + '</span></br>';
        output += '<span>Rating: ' + rating + '</span></br>';
        output += '<span>ID: ' + id + '</br></br></span>';
        output += '<button class="editBtn" >Edit</button></div>'

        });


    $('#bodyText').html(output);
      $('.editBtn').click(function() {
          let title = $(this).parent().children().first().html();
          let rating = $(this).parent().children().next().html();
          
      });
  })

}
document.getElementsByTagName('body')[0].onload = onload();


$('#formSubmit').click(saveNewMovie);



$('#editTitle').val("test Value");


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
    }).then(onload);
};







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
