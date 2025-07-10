let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndappendSearchResult(results) {
    let {
        link,
        title,
        description
    } = results;
    //div container----- result-item
    let resultItemEl = document.createElement('div');
    resultItemEl.classList.add('result-item');
    searchResultsEl.appendChild(resultItemEl);
    //  anchor----- result-title 
    let resultTitleEl = document.createElement('a');
    resultTitleEl.classList.add('result-title');
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);
    //creating break element 
    let titleBreakEl = document.createElement('br');
    resultItemEl.appendChild(titleBreakEl);
    //anchor----- result-url
    let urlEl = document.createElement("a");
    urlEl.classList.add('result-url');
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = '_blank';
    resultItemEl.appendChild(urlEl);
    //creating break element
    let lineBreakEl = document.createElement('br');
    resultItemEl.appendChild(lineBreakEl);
    //anchor----- line-description 
    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add('line-description');
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);


}

function displayResults(search_results) {
    spinnerEl.classList.toggle('d-none');
    for (let results of search_results) {
        createAndappendSearchResult(results);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = '';
        spinnerEl.classList.toggle('d-none');
        let searchInput = searchInputEl.value;
        let url = 'https://apis.ccbp.in/wiki-search?search=' + searchInput;
        let options = {
            method: 'GET'
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener('keydown', searchWikipedia);