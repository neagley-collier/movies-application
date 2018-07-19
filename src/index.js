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

    movies.forEach(({title, rating, id}) =>

        output += title
    );

    document.getElementById('bodyText').innerText = output;
  })

};
document.getElementsByTagName('body')[0].onload = onload();


const saveNewMovie = (e) => {
  e.preventDefault();

  let movieTitle = document.getElementById('newTitle').value;
  let movieRating = document.getElementById('titleRating').value;
  let newMovie = {
      "title": movieTitle,
      "rating": movieRating,
  };

 return fetch('/api/movies', {
    method: 'POST',
     body: JSON.stringify(newMovie)
    })
};





document.getElementById('formSubmit').addEventListener('click', saveNewMovie);

// Original code

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
