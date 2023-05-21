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

        /// PUT THESE BACK IN ONCE FIXED:
        // articleDiv.addEventListener('mouseover', () => {
        //     articleDiv.className = 'article-hoveron';
        // });

        // articleDiv.addEventListener('mouseout', () => {
        //     articleDiv.className = 'article-hoveroff';
        // });
        
        // articleDiv.addEventListener('mouseover', () => {
        //     // articleImage.src = article.multimedia[2].url;
        //     // articleImage.className = 'article-image';
        //     articleImageFull(article, articleDiv);
        // });

        // articleDiv.addEventListener('mouseout', () => {
        //     // // articleImage.src = article.thumbnail_standard
        //     articleImageThumbnail(article, articleDiv);
        // });
    });
}

function articleImageThumbnail(article, articleDiv) {
    let articleImage = document.createElement('img');
    articleImage.src = article.thumbnail_standard;
    articleImage.alt = article.title;
    articleImage.dataset.articleUrl = article.url;
    articleImage.className = 'article-thumbnail';

    // if (article.multimedia) {
    //     article.multimedia.forEach(media => {
    //         if (media.width > imageSize) {
    //             imageUrl = media.url
    //             imageSize = media.width
    //         }
    //     });
    // }
    // else {
    //     imageUrl = "images/No-Image-Placeholder.svg.png";
    // }

    let articleTitle = document.createElement('h3');
    articleTitle.textContent = article.title;

    // let moreInfoButton = document.createElement('button');
    // moreInfoButton.textContent = 'Show More Info';
    // moreInfoButton.dataset.articleAbstract = article.abstract;
    // moreInfoButton.className = 'more-info-button';
    articleDiv.innerHTML = '';

    articleDiv.appendChild(articleImage);
    articleDiv.appendChild(articleTitle);
    // articleDiv.appendChild(moreInfoButton);
}

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
    else {
        imageUrl = "images/No-Image-Placeholder.svg.png";
    }

    // articleImage.src = article.multimedia[2].url;
    articleImage.src = imageUrl
    articleImage.alt = article.title;
    articleImage.dataset.articleUrl = article.url;
    articleImage.className = 'article-image';

    let articleTitle = document.createElement('h3');
    let articleAbstract = document.createElement('p');
    articleTitle.textContent = article.title;
    articleAbstract.textContent = article.abstract;
    // let articleInfoList = document.createElement('ul')
    // articleInfoList.className = 'article-info';

    // let moreInfoButton = document.createElement('button');
    // moreInfoButton.textContent = 'Show More Info';
    // moreInfoButton.dataset.articleAbstract = article.abstract;
    // moreInfoButton.className = 'more-info-button';
    articleDiv.innerHTML = '';

    if (imageSize != 0) {
        articleDiv.appendChild(articleImage);
    }

    articleDiv.appendChild(articleInfoDiv)
    articleInfoDiv.appendChild(articleTitle);
    articleInfoDiv.appendChild(document.createElement('br'));
    articleInfoDiv.appendChild(articleAbstract);

    // output += `<option value="${item.byline}">${item.byline}</option>`
    // output += `<option value="${item.published_date}">${item.published_date}</option>`
    // output += `<option value="${item.section}">${item.section}</option>`
    // output += `<option value="${item.abstract}">${item.abstract}</option>`
    // output += `<option value="${item.url}">${item.url}</option>`
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