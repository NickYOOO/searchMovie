document.addEventListener('DOMContentLoaded', function() {
    searchMovies();

    // function handleSearch(event) {
    //     event.preventDefault();
    //     const searchInput = document.getElementById('search-input').value;
    //     if (searchInput.trim() !== '') {
    //         searchMovies(searchInput);
    //     }
    // }
    
    function searchMovies() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmM2ODZkMDdhMTcxNDUyZWUyYzM2MGUwODFjNjAxMyIsInN1YiI6IjY0NzRjMGFhNWNkMTZlMDBiZjEyNDQ2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qgYpZS6S6GHYU8eq2rRevqoZz5g80tZ7hZ5KJ3soHVU'
            }
        };
    
        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(response => response.json())
            .then(data => {
                let rows = data['results'];
                const cardList = document.querySelector('.card-list');
                cardList.innerHTML = '';

                rows.forEach((a) => {
                    let _title = a['title'];
                    let _overview = a['overview'];
                    let _poster_path = a['poster_path'];
                    let _vote_average = a['vote_average'];
                    let _id = a['id'];

                    let temp_html = `
                        <div class="movie-card" data-id="${_id}">
                            <img src="https://image.tmdb.org/t/p/w500${_poster_path}">
                            <h3>${_title}</h3>
                            <p>${_overview}</p>
                            <p>Rating: ${_vote_average}</p>
                        </div>
                    `;
                    cardList.insertAdjacentHTML('beforeend', temp_html);
                });

                // 클릭 이벤트 핸들러 추가 -> alert id
                const movieCards = document.querySelectorAll('.movie-card');
                movieCards.forEach(card => {
                    card.addEventListener('click', function() {
                        let movieId = this.getAttribute('data-id')
                        console.log('영화 아이디->', this)
                        alert(`영화 id: ${movieId}`);
                    });
                });
            })
            .catch(err => console.error(err));
    }

});



// *********************실수로 만든 jquery 를 이용한 코드 ************************

//  $(document).ready(function () {
//         listing();
//     });

// function listing() {

// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmM2ODZkMDdhMTcxNDUyZWUyYzM2MGUwODFjNjAxMyIsInN1YiI6IjY0NzRjMGFhNWNkMTZlMDBiZjEyNDQ2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qgYpZS6S6GHYU8eq2rRevqoZz5g80tZ7hZ5KJ3soHVU'
//     }
//   };
  
//   fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(data => {
//         let rows = data.results;
//         $('.card-list').empty();

//         rows.forEach(movie => {
//             let title = movie.title;
//             let overview = movie.overview;
//             let poster_path = movie.poster_path;
//             let vote_average = movie.vote_average;
    
//             let temp_html = ` 
//             <div class="movie-card">
//             <img src="https://image.tmdb.org/t/p/w500${poster_path}">
//             <h3>${title}</h3>
//             <p>${overview}</p>
//             <p>Rating: ${vote_average}</p>
//             </div>
//              `;
//             $('.card-list').append(temp_html);
//         });
//     })
//     .catch(err => console.error(err));
// };