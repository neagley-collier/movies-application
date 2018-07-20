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

function titleCase(input) {

    input = input.toLowerCase();
    let strArr = input.split(' ');

    for (let i = 0; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }
    return strArr.join(' ');
}

function render(){
    if (!$('.container').hasClass('container2')) {
        $('.container').addClass('container2');
    }
  $('#bodyText').html('<div class="col display-1"><img src="loader.gif">\n</div>');
  getMovies().then((movies)=> {
    let output = '';
    movies.forEach(({title, rating, id, genre}) =>{
        output += '<div class="movieStats col-sm-3 border border-dark"><p>Title: ' + title + '</p>';
        output += '<p>Rating: ' + rating + '</p>';
        output += '<p>ID: ' + id + '</p>';
        output += '<p>Genre: ' + genre + '</p>';
        output += '<button class="editBtn text-hide" data-toggle="modal" data-target="#editModal"><img src="edit.png"></button>';
        output += '<button class="deleteBtn btn"><img src="delete.png"></button></div>'
    });

    $('#bodyText').html(output);

      $('.editBtn').click(function() {
          let title = $(this).parent().children().first().html();
          let rating = $(this).parent().children().next().html();
          let movieId = $(this).parent().children().next().next().html();

         let formattedTitle = title.slice(7);
         let formattedRating = rating.slice(8);
         let formattedId = movieId.slice(4);

          $('#editTitle').val(formattedTitle);
          $('#editRating').val(formattedRating);
          $('#editId').val(formattedId);

      });

      $('.deleteBtn').click(function () {
          let movieId = $(this).parent().children().next().next().html().slice(4);
          $(this).parent().fadeOut("slow");
          // $('#edit').css('display', 'none');

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
    let newMovie = {
      "title": movieTitle,
      "rating": movieRating,
        "genre": movieGenre
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
        ).then(getMovies)
        .then(render);
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


