/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

function onload(){
  document.getElementById('bodyText').innerText = 'Loading...';
  getMovies().then((movies)=> {

    let output = '';

    movies.forEach(({title, rating, id}) =>{

        output += '<p class="movieStats">Title: ' + title + '</br>';
        output += 'Rating: ' + rating + '</br>';
        output += 'ID: ' + id + '</br></br>';
        output += '<button class = "editBtn">Edit</button></p>'
        }
    );

    document.getElementById('bodyText').innerHTML = output;
  })

}
document.getElementsByTagName('body')[0].onload = onload().then(()=>{

    document.getElementById('formSubmit').addEventListener('click', saveNewMovie);

    document.getElementsByClassName('editBtn').addEventListener('click', function(){


        document.getElementById('editTitle').value = "test Value"

    });

});


const saveNewMovie = (e) => {
  e.preventDefault();

  let movieTitle = document.getElementById('newTitle').value;
  let movieRating = document.getElementById('titleRating').value;
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
