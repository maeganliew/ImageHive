const accessKey = "brr4e9i7BkpHvv9ytEGRq5G1CmkIoWs5qhKzZH5iUUY";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more");

let keyword = "";
let page = 1;

async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;  /*use backticks ``` for template literals - embedded variables*/
    /* per_page specifies how many results (images) you want to be returned per page*/
    /*If page=1, it returns the first set of images (images 1 to 12).*/

    const response = await fetch(url); /* 'response' stores result of request, a Response object*/
    const data = await response.json(); /* await is to wait for code to complete before moving on to next line*/

    const results = data.results; /*data.results is an array → It contains multiple image objects from the API*/

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