"use strict";

/* ---------- Single Page Application ---------- */

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`${pageId}`).style.display = "block";
  showLoader(false);
}

// navigate to a new view/page by changing href
function navigateTo(pageId) {
  location.href = `${pageId}`;
}

//Creating a variable to reset the search input field on page change
let searchInput = document.querySelector('#search-field');

// set default page or given page by the hash url
// function is called 'onhashchange'
function pageChange() {
  showLoader(true);
  let page = "#home";
  if (location.hash) {
    page = location.hash;
  }
  searchInput.value = "";
  showPage(page);
}

pageChange(); // called by default when the app is loaded for the first time



/* ---------- Loading animation show/hide function ---------- */

function showLoader(show) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}



/* ---------- Burger menu function ---------- */

let isActive = false;

let iconArray = [
  '<img src="img/burger-icon.png" alt="Open menu"></img>',
  '<img src="img/cross-icon.png" alt="Close menu">'
];

document.getElementById("burger-icon").addEventListener("click", hideShowMenu);

//Function to hide and show the menu and changing the menu icon
function hideShowMenu() {
  
  if (isActive) {
    this.innerHTML = iconArray[0];
    document.getElementById("menu-options").style.display = "none";
    isActive = false;
  }
  else {
    this.innerHTML = iconArray[1];
    document.getElementById("menu-options").style.display = "block";
    isActive = true;
  }
}


/* ---------- Fetch json file ---------- */

let _games = [];

//Fetching the information from my json file
fetch('json/games.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    _games = json
    appendGames(json);
  });

//Displaying the fetched information
function appendGames(games) {
  let htmlTemplate = "";
  for (let game of games) {
    htmlTemplate += /*html*/`
    <a href="#game-page" id="${game.id}" onclick="changeGamePage('${game.id}')">
      <section class="game-section">
        <img src="${game.img}">
        <h2>${game.name}</h2>
        <div class="rating-number">
          <p>${game.rating}</p>
          <img class="star" src="img/star.png" alt="Rating">
        </div>
        <p class="home-categories">${game.category[0]} - ${game.category[1]}</p>
      </section>
    </a>
    `;
  }
  document.querySelector('#games-container').innerHTML = htmlTemplate;

  /*for (const game of _games) {
    document.querySelector("#" + game.id).addEventListener("click", changeGamePage(game.id));
  }*/
}



/* ---------- Search function ---------- */

//Filtering the games that has the given search value
function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredGames = [];
  for (let game of _games) {
    let name = game.name.toLowerCase();
    if (name.includes(searchQuery)) {
      filteredGames.push(game);
    }
    
    /*let brand = product.brand.toLowerCase();
    if (model.includes(searchQuery) || brand.includes(searchQuery)) {
      filteredProducts.push(product);
    }*/
  }
  appendFilteredGames(filteredGames);
}

//Displaying the games with the given search value
function appendFilteredGames (games) {
  let htmlTemplate = "";
  for (let game of games) {
    htmlTemplate += /*html*/`
    <section class="searched-game">
      <img src="${game.img}">
      <div class="searched-game-info">
        <h2>${game.name}</h2>
        <div class="rating-number">
          <p>${game.rating}</p>
          <img class="star" src="img/star.png" alt="Rating">
        </div>
        <p class="home-categories">${game.category[0]} - ${game.category[1]}</p>
      </div>
    </section>
    `;
  }
  document.querySelector('#search-results').innerHTML = htmlTemplate;
}

//Creating a function to hide the search results when the user is not no longer searching
let searchBox = document.querySelector('#search-results');
let burgerIcon = document.getElementById("burger-icon");

document.body.addEventListener("click", hideShowSearchResults);

function hideShowSearchResults () {
  let searchIsFocused = (document.activeElement === searchInput);

  if (searchIsFocused) {
    searchBox.style.display = "block";

    if (isActive) {
      burgerIcon.innerHTML = iconArray[0];
      document.getElementById("menu-options").style.display = "none";
      isActive = false;
    }
  } 
  else {
    searchBox.style.display = "none";
  }
}



/* ---------- Change Game Page container function ---------- */

function changeGamePage(gameId) {
  let theGame;
  let htmlTemplate = "";
  let categoriesHtmlTemplate = "";
  let previewHtmlTemplate = "";
  let feedbackHtmlTemplate = "";

  for (const game of _games) {
    if (game.id == gameId) {
      theGame = game;
    }
  }

  for (const category of theGame.category) {
    categoriesHtmlTemplate += /*html*/`
      <button href="#">${category}</button>
    `;
  }

  for (const preview of theGame.preview) {
    previewHtmlTemplate += /*html*/`
      <img src="${preview}">
    `;
  }

  for (const feedback of theGame.feedback) {
    feedbackHtmlTemplate += /*html*/`
      <div class="feedback">
        <p class="feedback-user-name">${feedback.userName}</p>
        <p class="feedback-posted-date">${feedback.postedDate}</p>
        <p class="feedback-content">${feedback.feedbackContent}</p>
      </div>
    `;
  }



  htmlTemplate = /*html*/`
    <section>
      <a href="#home" id="go-back-arrow"><img src="img/left-arrow.png" alt="Go back"></a>
      <div id="icon-info-flex" class="segment">
        <img id="icon" src="${theGame.img}">
        <div id="main-info">
          <h2>${theGame.name}</h2>
          <p id="developer">${theGame.developer}</p>
          <p id="release-date">${theGame.released}</p>
        </div>
      </div>
      <div id="popularity-info" class="segment">
        <div>
          <div id="rating-number">
            <p>${theGame.rating}</p>
            <img id="top-star" src="img/star.png" alt="Rating">
          </div>
          <p>${theGame.feedbackCount} feedback</p>
        </div>
        <div>
          <p id="played-count">${theGame.played}</p>
          <p>Times played</p>
        </div>
      </div>
      <h3>Description</h3>
      <div id="description-text">
        <p>${theGame.description}</p>
        <img id="description-arrow" src="img/right-arrow.png" alt="Show more">
      </div>
      <div id="category-buttons" class="segment">
        ${categoriesHtmlTemplate}
      </div>
      <div id="play-favorite" class="segment">
        <button id="play-button" href="#">PLAY</button>
        <button id="favorite-button"><img src="img/favorite-icon.png" alt="Add to favorite"></button>
      </div>
      <div id="preview-container" class="segment">
        ${previewHtmlTemplate}
      </div>
      <button id="feedback-button" class="segment" href="#">Write your feedback</button>
      <h3>Feedback (${theGame.feedbackCount})</h3>
      <div id="feedback-container">
        ${feedbackHtmlTemplate}
      </div>
    </section>
  `;

  document.querySelector('#game-page').innerHTML = htmlTemplate;
  
}



/* ---------- Category function ---------- */

