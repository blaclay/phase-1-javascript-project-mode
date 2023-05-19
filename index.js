const url = 'https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=StRnwuvLrlzl1qT0szS7CAKPI2NGEJ65'

function displayMain() {
    const mainbody = document.querySelector('#mainbody')
    let p = document.createElement('p')

    p.innerHTML = data[0].section
    mainbody.append(p)
}

function newFunc(isFull) {
    ///
    expandButton = createElement('button')
    if(isFull) {
        expandButton.addEventListener('click', element => {
            // loads brief articles
        })
    } else {
        expandButton.addEventListener('click', element)
    }
    

    data.result.forEach(item => {
        articleDiv = createElement('div');
        articleDiv.id = '$article' +  item.index;
        if(isFull) {
            newsFull(item.index, articleDiv);
        } else {
            newsBrief(item.index, articleDiv)
        }
    })
}

function newsFull(index, parent) {
    buttonBrief = parent.createElement('button')
    buttonBrief.id = '$showBrief' + index
    buttonBrief.addEventListener('click', element => {

    })
}

// function newsBrief() {
//     section = this.value
//     newsURL = 'https://api.nytimes.com/svc/news/v3/content/nyt/' + section + '.json?api-key=StRnwuvLrlzl1qT0szS7CAKPI2NGEJ65'
//     fetch(newsURL)
//         .then(res => res.json())
//         .then(data => {
//             let output = ''
//             console.log(data)
//             data.results.forEach(item => {
//                 if (item.multimedia) {
//                     if (item.multimedia[0]) {
//                         output += `<img src="${item.multimedia[0].url}">`
//                     }
//                 }
//                 output += `<option value="${item.title}">${item.title}</option>`
//                 output += `<option value="${item.byline}">${item.byline}</option>`
//                 output += `<option value="${item.published_date}">${item.published_date}</option>`
//                 output += `<option value="${item.section}">${item.section}</option>`
//                 output += `<option value="${item.abstract}">${item.abstract}</option>`
//                 output += `<option value="${item.url}">${item.url}</option>`
//             })
//             document.querySelector('#mainbody').innerHTML = output
//         })
//         console.log("newsBrief()")
// }

// function newsFull() {
//     section = this.value
//     newsURL = 'https://api.nytimes.com/svc/news/v3/content/nyt/' + section + '.json?api-key=StRnwuvLrlzl1qT0szS7CAKPI2NGEJ65'
//     fetch(newsURL)
//         .then(res => res.json())
//         .then(data => {
//             let output = ''
//             console.log(data)
//             data.results.forEach(item => {
//                 if (item.multimedia) {
//                     if (item.multimedia[2]) {
//                         output += `<img src="${item.multimedia[2].url}">`
//                     }
//                 }
//                 output += `<option value="${item.title}">${item.title}</option>`
//                 output += `<option value="${item.byline}">${item.byline}</option>`
//                 output += `<option value="${item.published_date}">${item.published_date}</option>`
//                 output += `<option value="${item.section}">${item.section}</option>`
//                 output += `<option value="${item.abstract}">${item.abstract}</option>`
//                 output += `<option value="${item.url}">${item.url}</option>`
//             })
//             document.querySelector('#mainbody').innerHTML = output
//         })
//         console.log("newsFull()")
// }


fetch(url)
    .then(res => res.json())
    .then(data => {
        let output = ''
        console.log(data)
        data.results.forEach(item => {
            output += `<option value="${item.section}">${item.display_name}</option>`
        })
        const sectionSelect = document.querySelector('#sectionSelect')
        sectionSelect.innerHTML = output
        sectionSelect.addEventListener("change", newsFull, false)
        console.log("fetch(url)")
    })

