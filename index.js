const accessKey = "yeT03wz7IZHLaBEspnAcDsfku_QMXjcqRKLAZUFHg8U" //API Key

const formEl = document.querySelector("form"); //so that I can store the form
const inputEl = document.getElementById("search-input"); //so that I can store input section
const searchResults = document.querySelector(".search-results"); //storing images
const showMore = document.getElementById("show-more-button");

let inputData = ""; //store the all input data in input (search bar)
let page = 1; //default page

async function searchImages() {
    inputData = inputEl.value;

// dynamic url based on input data
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

// fetch method as a response so that I can fetch the images based on the query
    const response = await fetch(url);

// convert all the response in to the json format and all the json format will be stored in the data variable
    const data = await response.json();

// getting results and those results will stored inside the result variable
    const results = data.results;

// using if condition so that if u refresh the page, defeault page will be on ur screen
    if (page === 1) {
        searchResults.innerHTML = ""; 
    }

// mapping the results 
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img'); //img tag
        image.src = result.urls.small;
        image.all = result.alt_description;
        const imageLink = document.createElement('a'); //anchor tag
        imageLink.href = result.links.html;
        imageLink.target = "_blank"; //will open new tab
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++; //increase the page number

    // this condition is for show more button because the display in css is none
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1;
    searchImages()
})

showMore.addEventListener("click", () => {
    searchImages()
})