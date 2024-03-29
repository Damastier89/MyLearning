"use strict"
const personalMovieDB = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  privat: false,

  start: function() {
    personalMovieDB.count = +prompt(`Сколько фильмов вы фильм восмотрели?`, "");

    while(personalMovieDB.count == "" || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
      personalMovieDB.count = +prompt(`Сколько фильмов вы фильм восмотрели?`, "");
    }
  },

  rememberMyFilms: function() {
    for( let i = 0; i < 1; i++) {
      const a = prompt('Один из ваших любиных фильмов?', ""),
            b = +prompt('Оцените его?', "");

      if(a != "" && b != "" && a != null && b != null && a.length < 50) {
        personalMovieDB.movies[a] = b;
      } else {
        i--
      };  
    };
  },

  detectPersonalLevel: function() {
    if(personalMovieDB.count < 10) {
      alert(`Просмотренно мало фильмов (:`);
    } else if (personalMovieDB.count >= 10 || personalMovieDB.count <= 30) {
      alert(`Вы хороший зритель!`);
    } else if (personalMovieDB.count > 30) {
      alert(`Вы киноман`)
    } else {
      alert(`Error`)
    }
  },

  showMyDB: function(hidden) {
    if (!hidden) {
      console.log(personalMovieDB);
    }
  },

  toggleVisibleMyDB : function() { 
    personalMovieDB.privat ? personalMovieDB.privat = false : personalMovieDB.privat = true;
  },

  writeYourGenres: function() {
    for( let i = 1; i <= 3; i++) {
      let genres = prompt(`Ваш любимый жанр под номером ${i}`).toLowerCase();
      if (genres == "" || genres == null) {
        i--;
      } else {
        personalMovieDB.genres[i - 1] = genres;
        personalMovieDB.genres.sort();
      };
    };
    personalMovieDB.genres.forEach((element, i) => {
      console.log(`Ваш любымый жанр под номером ${i + 1} ${element}`);
    });
  },

};

personalMovieDB.start();
personalMovieDB.rememberMyFilms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.showMyDB(personalMovieDB.privat);
personalMovieDB.writeYourGenres();

console.log(personalMovieDB);

//////////////////////////////////////////////////////////////////////
/* let i = 2;
while (i > 0) {
    const a = prompt('One of the most recently viewed movies?', ""),
        b = +prompt('Rate the movies?', "");

    if (a != null && b != null && a != '' && b != '' && a.length < 50) {
        personalMovieDB.movies[a] = b;
        console.log('done');
        i--;
    } else {
        console.log('error');
    }

} */
////////////////////////////////////////////////////////////////////

const btn = document.querySelector('.btn');

function changeColor() {
    const block = document.querySelectorAll('.color');
    block.forEach(item => {
        item.classList.toggle('red');
        /* item.classList.add('red'); */
    });
}

btn.addEventListener('click', changeColor);
