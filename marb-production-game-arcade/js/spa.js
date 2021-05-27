"use strict";

/*---------- Single Page Application ----------*/

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



/*---------- Loading animation show/hide function ----------*/

function showLoader(show) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}



/*---------- Fetch json file ----------*/

let _games = [];

fetch('json/games.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    console.log(json);
    _games = json
    appendProducts(json);
  });

//Appending the fetched information
function appendProducts(games) {
  let htmlTemplate = "";
  for (let game of games) {
    htmlTemplate += /*html*/`
    <section class="game-section">
      <img src="${game.img}">
      <h2>${game.name}</h2>
    </section>
    `;
  }
  document.querySelector('#games-container').innerHTML = htmlTemplate;
}



/*---------- Search function ----------*/

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
  appendProducts(filteredGames);
}



/*---------- Category function ----------*/

