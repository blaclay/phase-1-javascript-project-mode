let apiKey = 'StRnwuvLrlzl1qT0szS7CAKPI2NGEJ65';
const sectionUrl = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${apiKey}`;

// Event Listener: Click Event on Article Image
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('article-image')) {
        let articleURL = event.target.dataset.articleUrl;
        window.open(articleURL, '_blank');
    }
});

// Function to fetch articles from the API
function fetchArticles() {
    //   let url = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${apiKey}&offset=${currentOffset}`;
    section = this.value
    url = `https://api.nytimes.com/svc/news/v3/content/nyt/${section}.json?api-key=${apiKey}`;


    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayArticles(data.results);
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

// Function to display the articles on the page
function displayArticles(articles) {
    let articleList = document.getElementById('article-list');
    articleList.innerHTML = '';

    articles.forEach(article => {
        let articleDiv = document.createElement('div');
        articleDiv.className = 'article';

        articleImageThumbnail(article, articleDiv);

        articleDiv.addEventListener('mouseover', () => {
            // articleImage.src = article.multimedia[2].url;
            // articleImage.className = 'article-image';
            articleImageFull(article, articleDiv);
        });

        articleImage.addEventListener('mouseout', () => {
            // articleImage.src = article.thumbnail_standard
            articleImageThumbnail(article, articleDiv);
        });
    });
}

function articleImageThumbnail(article, articleDiv) {
    let articleImage = document.createElement('img');
    articleImage.src = article.thumbnail_standard;
    articleImage.alt = article.title;
    articleImage.dataset.articleUrl = article.url;
    articleImage.className = 'article-thumbnail';

    let articleTitle = document.createElement('h3');
    articleTitle.textContent = article.title;

    let moreInfoButton = document.createElement('button');
    moreInfoButton.textContent = 'Show More Info';
    moreInfoButton.dataset.articleAbstract = article.abstract;
    moreInfoButton.className = 'more-info-button';
    articleDiv.innerHTML = '';

    articleDiv.appendChild(articleImage);
    articleDiv.appendChild(articleTitle);
    articleDiv.appendChild(moreInfoButton);
    articleList.appendChild(articleDiv);
}

function articleImageFull(article, articleDiv) {
    let articleImage = document.createElement('img');
    articleImage.src = article.multimedia[2].url;
    articleImage.alt = article.title;
    articleImage.dataset.articleUrl = article.url;
    articleImage.className = 'article-image';

    let articleTitle = document.createElement('h3');
    articleTitle.textContent = article.title;

    let moreInfoButton = document.createElement('button');
    moreInfoButton.textContent = 'Show More Info';
    moreInfoButton.dataset.articleAbstract = article.abstract;
    moreInfoButton.className = 'more-info-button';
    articleDiv.innerHTML = '';

    articleDiv.appendChild(articleImage);
    articleDiv.appendChild(articleTitle);
    articleDiv.appendChild(moreInfoButton);
    articleList.appendChild(articleDiv);
}

// Initial fetch to load the first page of articles
fetch(sectionUrl)
    .then(res => res.json())
    .then(data => {
        let article = ''
        console.log(data)
        data.results.forEach(item => {
            article += `<option value="${item.section}">${item.display_name}</option>`
        })
        const sectionSelect = document.querySelector('#sectionSelect')
        sectionSelect.innerHTML = article
        sectionSelect.addEventListener("change", fetchArticles, false)
        console.log("fetch(sectionUrl)")
    })