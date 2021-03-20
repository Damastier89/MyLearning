const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function () {
        personalMovieDB.count = +prompt('How many movies have you watched?', "");

        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt('How many movies have you watched?', "");
        }
    },
    rememberMyFilms: function () {
        for (let i = 0; i < 2; i++) {
            const a = prompt('One of the most recently viewed movies?', ""),
                b = +prompt('Rate the movies?', "");

            if (a != null && b != null && a != '' && b != '' && a.length < 50) {
                personalMovieDB.movies[a] = b;
                console.log('done in movies');
            } else {
                console.log('error in movies');
                i--;
            }
        }
    },
    detectPersonalLevel: function () {
        if (personalMovieDB.count < 10) {
            alert('You have not watched many movies');
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            alert('You are good viewer');
        } else if (personalMovieDB.count >= 30) {
            alert('You are super viewer!');
        } else {
            alert('Error');
        }
    },
    showMyDB: function (hidden) {
        if (!hidden) {
            console.log(personalMovieDB);
        }
    },
    toggleVisibleMyDB: function () {
        if (personalMovieDB.privat) {
            personalMovieDB.privat = false;
        } else {
            personalMovieDB.privat = true;
        }
    },
    writeYourGenres: function () {
        for (let i = 1; i < 2; i++) {
            let genres = prompt(`Your favorite genre separated by commas`).toLowerCase();
            if (genres === '' || genres === null) {
                console.log('Your enter incorrect dates');
                i--;
            } else {
                personalMovieDB.genres = genres.split(', ');
                personalMovieDB.genres.sort();
            }
        }
        personalMovieDB.genres.forEach((element, i) => {
            console.log(`Your favorit ganre ${i + 1} is ${element}`);
        });
    }
};
personalMovieDB.start();
personalMovieDB.rememberMyFilms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.showMyDB(personalMovieDB.privat);
personalMovieDB.writeYourGenres();

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