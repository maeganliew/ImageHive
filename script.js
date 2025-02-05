const accessKey = "YOUR_ACCESS_KEY_HERE";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more");
const background = document.getElementById("background");


let keyword = "";
let page = 1;

window.onload = () => {
    background.style.backgroundImage = "url('default-background.jpg')";
};

async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;  /*use backticks ``` for template literals - embedded variables*/
    /* per_page specifies how many results (images) you want to be returned per page*/
    /*If page=1, it returns the first set of images (images 1 to 12).*/

    const response = await fetch(url); /* 'response' stores result of request, a Response object*/
    const data = await response.json(); /* await is to wait for code to complete before moving on to next line*/
    const results = data.results; /*data.results is an array → It contains multiple image objects from the API*/

    if (page === 1) { /*when starting a new search*/
        searchResult.innerHTML = '';
    }
    
    results.map((result) => {  /*code written here will be executed for each element of the array*/
        const image = document.createElement("img");
        image.src = result.urls.small; /* see from inspect*/

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image); /*image will be appended to imageLink*/ 
        searchResult.appendChild(imageLink);  
    })

    showMoreBtn.style.display = "block";

    /* to tackle background change 
    const backgroundUrl = results[10].urls.regular;
    background.style.backgroundImage = `url(${backgroundUrl})`; */

}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); /*prevents the form from reloading the page. Without JavaScript, submitting a form reloads the page*/
    page = 1;
    searchImage();
})

showMoreBtn.addEventListener("click", (e) => {
    page++;
    searchImage();
})

/* remarks: 

if search 'birds' then 'trees', without the section in line 20, 

then website will diplay pics of birds + trees,

although when form submitted the page variable is assigned to 1,

it still shows multiple results because the new set of results is appended to the already existing search results in search-result,

page is just to reference from api how many pages per pics etc,

content displayed on website depends on search-result*/
