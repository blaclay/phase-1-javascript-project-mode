// API key and website URL
let apiKey = 'StRnwuvLrlzl1qT0szS7CAKPI2NGEJ65';
const sectionUrl = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${apiKey}`;

// Click Event on Article Image
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('article-image')) {
        let articleURL = event.target.dataset.articleUrl;
        window.open(articleURL, '_blank');
    }
});

// Function to fetch articles from the API
function fetchArticles() {
    section = this.value
    url = `https://api.nytimes.com/svc/news/v3/content/nyt/${section}.json?api-key=${apiKey}`;


    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayArticles(data.results);
            console.log(data);
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
        let expandButton = document.createElement('button');
        expandButton.innerText = 'Show More';
        expandButton.state = 'Less';
        expandButton.className = 'expand-button';

        articleImageThumbnail(article, articleDiv);
        articleList.appendChild(articleDiv);
        articleDiv.appendChild(expandButton);

        expandButton.addEventListener('click', () => {
            if (expandButton.state === 'More') {
                expandButton.state = 'Less';
                expandButton.innerText = 'Show More';
                articleImageThumbnail(article, articleDiv);
            }
            else {
                expandButton.state = 'More';
                expandButton.innerText = 'Show Less';
                articleImageFull(article, articleDiv);
            }
            articleDiv.appendChild(expandButton);
        });

        articleDiv.addEventListener('mouseover', () => {
            articleDiv.classList.add('article-hover');
        });

        articleDiv.addEventListener('mouseout', () => {
            articleDiv.classList.remove('article-hover');
        });
    });
}

// Function to display normal article block
function articleImageThumbnail(article, articleDiv) {
    let articleImage = document.createElement('img');

    if (!article.thumbnail_standard) {
        articleImage.src = "No-Image-Placeholder-100x100.png";
    }
    else {
        articleImage.src = article.thumbnail_standard;
        articleImage.alt = article.title;
        articleImage.dataset.articleUrl = article.url;
        articleImage.className = 'article-thumbnail';
    }

    let articleTitle = document.createElement('h3');
    articleTitle.textContent = article.title;

    articleDiv.innerHTML = '';

    articleDiv.appendChild(articleImage);
    articleDiv.appendChild(articleTitle);
}

// Function to show expanded article block
function articleImageFull(article, articleDiv) {
    let articleImage = document.createElement('img');
    let imageUrl = '';
    let imageSize = 0;
    let articleInfoDiv = document.createElement('div');
    articleInfoDiv.className = 'article-info-section';

    if (article.multimedia) {
        article.multimedia.forEach(media => {
            if (media.width > imageSize) {
                imageUrl = media.url
                imageSize = media.width
            }
        });
    }
    if (imageUrl === 'undefined') {
        imageUrl = "No-Image-Placeholder.svg.png";
    }

    articleImage.src = imageUrl;
    articleImage.alt = article.title;
    articleImage.dataset.articleUrl = article.url;
    articleImage.className = 'article-image';

    let articleTitle = document.createElement('h3');
    articleTitle.textContent = article.title;

    let articleDate = document.createElement('p');
    let pubDate = new Date(Date.parse(article.published_date));
    articleDate.innerHTML = pubDate.toDateString();

    let articleByline = document.createElement('p');
    articleByline.innerHTML = article.byline;

    let articleAbstract = document.createElement('p');
    articleAbstract.innerHTML = article.abstract;

    let articleUrl = document.createElement('a');
    articleUrl.innerHTML = article.url;
    articleUrl.href = article.url;

    articleDiv.innerHTML = '';

    if (imageSize != 0) {
        articleDiv.appendChild(articleImage);
    }

    articleDiv.appendChild(articleInfoDiv);
    articleInfoDiv.appendChild(articleTitle);
    articleInfoDiv.appendChild(articleDate);
    articleInfoDiv.appendChild(articleByline);
    articleInfoDiv.appendChild(articleAbstract);
    articleInfoDiv.appendChild(articleUrl);


}

// Initial fetch to load articles
fetch(sectionUrl)
    .then(res => res.json())
    .then(data => {
        let article = ''
        console.log(data)
        data.results.forEach(item => {
            let noShowList = ['crosswords & games', 'admin', 'automobiles', 'corrections', 'universal', 'the weekly', 'multimedia/photos', 'home & garden']
            let nextSection = `<option value="${item.section}">${item.display_name}</option>`
            noShowList.forEach(nono => {
                if (item.section === nono) {
                    nextSection = ''
                }
            })

            article += nextSection
        })
        const sectionSelect = document.querySelector('#sectionSelect')
        sectionSelect.innerHTML = article
        sectionSelect.addEventListener("change", fetchArticles, false)
        console.log("fetch(sectionUrl)")
    })