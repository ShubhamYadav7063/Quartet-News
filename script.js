// API for trending news
const url = 'https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw';
const options = {
    method: 'GET',
    headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '828b3c17cdmsh756ef52a83f818bp15f5c0jsnd53599f8325f',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
};

async function fetchData() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        bindData(result.value);
    } catch (error) {
        console.error(error);
    }
}
fetchData();

// ---------- ************* ---------------

function reload() {
    window.location.reload();
}

function bindData(values) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card')

    cardsContainer.innerHTML = '';

    values.forEach(value => {
        if (!value.image.thumbnail.contentUrl) return;

        const cardClone = newsCardTemplate.content.cloneNode(true)
        fillDataInCard(cardClone, value);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, value) {
    const newsImg = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = value.image.thumbnail.contentUrl;
    newsTitle.innerHTML = value.name;
    newsDesc.innerHTML = value.description;

    const date = new Date(value.datePublished).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })

    newsSource.innerHTML = `${value.provider.name} • ${date}`

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(value.url, "_blank")
    })
}


// API for search button 



const link = 'https://bing-news-search1.p.rapidapi.com/news/search?q=';
const link2 = '&freshness=Day&textFormat=Raw&safeSearch=Off';
const search = {
    method: 'GET',
    headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '828b3c17cdmsh756ef52a83f818bp15f5c0jsnd53599f8325f',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
};


async function searchNews(query) {
    try {
        const response = await fetch(`${link}${query}${link2}`, options);
        const result = await response.json();
        console.log(result);
        bindData(result.value);

    } catch (error) {
        console.error(error);
    }
}




// ----------- ******** --------------


let curSelectedNav = null
const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('search-text')

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    searchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})



function onNavItemClick(id) {
    searchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active')
}

