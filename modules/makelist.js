export function makeList(movies) {
    // 구조분해할당
    for (let i in movies) {
        const { id, title, poster_path, overview, vote_average } = movies[i];

        // 생성
        const cardList = document.getElementById("cardList");
        const outerDiv = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const p1 = document.createElement("p");
        const p2= document.createElement("p");

    
        // 생성 속성 부여
        outerDiv.setAttribute("class", "movie-card");
        outerDiv.setAttribute("id", id);
        img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${poster_path}`);
        img.setAttribute("alt", "title");
        h3.setAttribute("class", "info-title");
        p1.setAttribute("class", "info-overview");
        p2.setAttribute("class", "info-vote_average");

        h3.innerText = title;
        p1.innerText = overview;
        p2.innerText = vote_average;

        // 태그 위치를 조립.
        outerDiv.appendChild(img);
        outerDiv.appendChild(h3);
        outerDiv.appendChild(p1);
        outerDiv.appendChild(p2);
        cardList.appendChild(outerDiv);
      }
}
