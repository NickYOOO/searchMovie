import { URL } from "./fetchurl.js";
import { OPTIONS } from "./option.js";
import { makeList } from "./makelist.js";


// fetch
const fetchMovie = async function () {
  const response = await fetch(URL, OPTIONS);
  const data = await response.json();
  const movies = data.results;
  return movies;
};

// card list 카드 목록 처리
async function cardList(arr) {
  const movies = await fetchMovie();
  if (!arr) {
    makeList(movies);
  } else {
    const cardList = document.getElementById("cardList");
    cardList.innerHTML = "";
    makeList(arr);
  }
}
cardList();

//  Search movie 검색기능 처리
const $frm = document.search;
$frm.addEventListener("submit", findMovie);
async function findMovie(e) {
  e.preventDefault();
  const movies = await fetchMovie();

  const userInput = $frm.searchInput.value.toLowerCase();
  const userMovieTitle = userInput.replace(/(\s*)/g, "");
  const matchMovies = movies.filter((item) => {
    let titles = item.title.toLowerCase().replace(/(\s*)/g, "");  //split(' ').join('')
    return titles.includes(userMovieTitle);
  });

  if (matchMovies.length === 0) {
    alert("검색어를 확인해 주세요.");
  } else if (userMovieTitle === ""){
    alert("검색어를 입력해 주세요.")
  } else {
    cardList(matchMovies);
  }
}

//  click logo
const img = document.querySelector("header img");
img.addEventListener("click", () => {
  window.location.reload();
});

//  Click card
const clickCard = document.getElementById("cardList");
clickCard.addEventListener("click", (e) => {
  let card = e.target.parentNode;
  if (card.className !== "movie-card") {
    card = card.parentNode;
  }

  const contentId = card.getAttribute("id");
  if (!contentId) {
    return false;
  }
  alert("영화 id: " + contentId);
});



// Enter Key
// function press(f){
//   if(f.keyCode == "enter"){ //javascript에서는 13이 enter키를 의미
//       search.submit();
//   };
// }
// key code 메소드 단점