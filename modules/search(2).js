function handleSearch(event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const searchInput = document.getElementById('search-input');
    const query = searchInput.value;

    // 검색어가 비어있을 경우 처리
    if (query.trim() === '') {
        alert('검색어를 입력해주세요.');
        return;
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmM2ODZkMDdhMTcxNDUyZWUyYzM2MGUwODFjNjAxMyIsInN1YiI6IjY0NzRjMGFhNWNkMTZlMDBiZjEyNDQ2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qgYpZS6S6GHYU8eq2rRevqoZz5g80tZ7hZ5KJ3soHVU'
        }
    };
    // const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    // const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&query=${query}`;
    const url = `https://api.themoviedb.org/3/search/movie?language=en-US&page=1&query=${query}`;


    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const searchResults = data['results'];

            if (searchResults.length === 0) {
                alert('검색 결과가 없습니다.');
            } else {
                const cardList = document.querySelector('.card-list');
                cardList.innerHTML = '';

                searchResults.forEach((result) => {
                    const title = result['title'];
                    const overview = result['overview'];
                    const posterPath = result['poster_path'];
                    const voteAverage = result['vote_average'];
                    const id = result['id'];

                    const temp_html = `
                        <div class="movie-card" data-id="${id}">
                        <img src="https://image.tmdb.org/t/p/w500${posterPath}">
                            <h3>${title}</h3>
                            <p>${overview}</p>
                            <p>Rating: ${voteAverage}</p>
                        </div>
                    `;
                    cardList.insertAdjacentHTML('beforeend', temp_html);
                });

                // 클릭 이벤트 핸들러 추가
                const movieCards = document.querySelectorAll('.movie-card');
                movieCards.forEach(card => {
                    card.addEventListener('click', function () {
                        let movieId = this.getAttribute('data-id');
                        alert(`You clicked on movie ID: ${movieId}`);
                    });
                });
            }
        })
        .catch(err => console.error(err));
}
