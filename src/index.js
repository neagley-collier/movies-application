/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');
 import $ from "jquery";

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

const APIFront = 'http://www.omdbapi.com/?t=';
const APIBack = '&apikey=d18aa323';


function renderMovies() {
    getMovies().then((movies) => {


            movies.forEach((movies) => {

                let title = movies.title;
                let id = movies.id;
                let rating = movies.rating;
                let genre = movies.genre;

                $.ajax(APIFront + title + APIBack).done((data) => {
                    let updatedMovie = {

                        "image": data.Poster,
                        "id": id,
                        "rating": rating,
                        "genre": genre,
                        "title": title
                    };

                    fetch(`./api/movies/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedMovie)
                        }
                    ).then(getMovies)
                        .then(render);

                });


            })

        }
    );
}


function render(){
    if (!$('.container').hasClass('container2')) {
        $('.container').addClass('container2');
    }
  $('#bodyText').html('<div class="col display-1"><img src="loader.gif">\n</div>');
  getMovies().then((movies)=> {
    let output = '';
    movies.forEach(({title, rating, id, genre, image}) =>{
        output += '<div class="movieStats col-sm-3 border border-dark p-0"><p>Title: ' + title + '</p>';
        output += '<p>Rating: ' + rating + '</p>';
        output += '<p>Genre: ' + genre + '</p>';
        output += '<p>ID: ' + id + '</p>';
        output += '<button class="editBtn text-hide" data-toggle="modal" data-target="#editModal"><img src="edit.png"></button>';
        output += '<button class="deleteBtn btn"><img src="delete.png"></button><br>';
        output += `<img class="poster" src="${image}"></div>`;



    });

    $('#bodyText').html(output);


      $('.editBtn').click(function() {
          let title = $(this).parent().children().first().html();
          let rating = $(this).parent().children().next().html();
          let movieId = $(this).parent().children().next().next().next().html();

         let formattedTitle = title.slice(7);
         let formattedRating = rating.slice(8);
         let formattedId = movieId.slice(4);

          $('#editTitle').val(formattedTitle);
          $('#editRating').val(formattedRating);
          $('#editId').val(formattedId);

      });

      $('.deleteBtn').click(function () {
          let movieId = $(this).parent().children().next().next().next().html().slice(4);
          $(this).parent().fadeOut("slow");
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
  let movieGenre = $('#addGenre').val();

  // let posterURL = $.ajax(APIFront + movieTitle + APIBack).done((data) =>{
  //     console.log(data, data.Poster);
  //     return(data.Poster);
  // });

    let newMovie = {
      "title": movieTitle,
      "rating": movieRating,
        "genre": movieGenre,
        // "image": posterURL
  };

 fetch('/api/movies', {
    method: 'POST',
     headers: {
         'Content-Type': 'application/json',
     },
     body: JSON.stringify(newMovie)
    })
     .then(renderMovies);
};

const editMovie = (e) => {
    e.preventDefault();
    let movieTitle = $('#editTitle').val();
    let movieRating = $('#editRating').val();
    let movieId = $('#editId').val();
    let movieGenre = $('#editGenre').val();
    let newMovie = {
        "title": movieTitle,
        "rating": movieRating,
        "genre": movieGenre
    };
    return fetch(`./api/movies/${movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie)}
        )
        .then(renderMovies);
};


$('#formSubmit').click(saveNewMovie);

$('#editSubmit').click(editMovie);

$('#sortBy').change(function () {
    getMovies().then((movies) => {


        movies.sort(function (a, b) {

            let c = $('#sortBy').val();

            if (c === 'title') {

                let nameA = a.title.toUpperCase();
                let nameB = b.title.toUpperCase();

                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                } else return 0;
            }else if (c === 'rating') {

                let nameA = a.rating.toUpperCase();
                let nameB = b.rating.toUpperCase();

                if (nameA < nameB) {
                    return 1;
                } else if (nameA > nameB) {
                    return -1;
                } else return 0;
            }
            else if (c === 'genre'){

                let nameA = a.genre.toUpperCase();
                let nameB = b.genre.toUpperCase();

                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                } else return 0;
            }
        });

        let output = '';

        movies.forEach(({title, rating, id, genre}) =>{

            output += '<div class="movieStats col-sm-3 border border-dark"><p>Title: ' + title + '</p>';
            output += '<p>Rating: ' + rating + '</p>';
            output += '<p>ID: ' + id + '</p>';
            output += '<p>Genre: ' + genre + '</p>';
            output += '<button class="editBtn text-hide" data-toggle="modal" data-target="#editModal"><img src="edit.png"></button>';
            output += '<button class="deleteBtn btn"><img src="delete.png"></button></div>';

            $('#bodyText').html(output);

        });
        }
    )
});


// Original code


