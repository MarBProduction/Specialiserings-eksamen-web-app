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
  setActiveTab(pageId);
  showLoader(false);
}

// sets active toolbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".toolbar a");
  for (let page of pages) {
    if (`${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  }
}

// navigate to a new view/page by changing href
function navigateTo(pageId) {
  location.href = `${pageId}`;
}

// set default page or given page by the hash url
// function is called 'onhashchange'
function pageChange() {
  let page = "#home";
  if (location.hash) {
    page = location.hash;
  }
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

var iconArray = [
  '<img src="img/burger-icon.png" alt="Open menu"></img>',
  '<img src="img/cross-icon.png" alt="Close menu">'
];

document.getElementById("burger-icon").addEventListener("click", hideShowMenu);

function myFunction () {
  
}

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

fetch('json/games.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    console.log(json);
    _games = json
    appendGames(json);
  });

//Appending the fetched information
function appendGames(games) {
  let htmlTemplate = "";
  for (let game of games) {
    htmlTemplate += /*html*/`
    <section class="game-section">
      <img src="${game.img}">
      <h2>${game.name}</h2>
      <div class="rating-number">
        <p>${game.rating}</p>
        <img class="star" src="img/star.png" alt="Rating">
      </div>
      <p class="home-categories">${game.category[0]} - ${game.category[1]}</p>
    </section>
    `;
  }
  document.querySelector('#games-container').innerHTML = htmlTemplate;
}



/* ---------- Search function ---------- */

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
  appendGames(filteredGames);
}



/* ---------- Category function ---------- */

