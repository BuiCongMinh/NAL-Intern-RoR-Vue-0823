const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    clickCounter++;
    if (itemNumber - (4 + clickCounter) >= 0) {
      movieLists[i].style.transform = `translateX(
                ${
                  movieLists[i].computedStyleMap().get("transform")[0].x.value -
                  300
                }px
                )`;
    } else {
      movieLists[i].style.transform = `translateX(0)`;
      clickCounter = 0;
    }
  });
  console.log(movieLists[i].querySelectorAll("img"));
});

const ball = document.querySelector(".toggle");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle-ball"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzk0YzAwMjg4MjU3NjY2YjUzYWMyZmJiMjNjZDRlYiIsInN1YiI6IjY0ZTczOGI4OTBlYTRiMDBjNzM4ZWNiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ozpqUdpWiYkuz8hf7-0bDXMoRfM6VB4qxLGkZppdeJ4",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(51,response))
  .catch((err) => console.error(err));

console.log(54,res)

