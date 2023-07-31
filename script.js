const URL='https://newsapi.org/v2/everything?q='
const API_KEY='6ded571115fc41d8b4643e8b2cd3ba61'
const fashionContainer=document.getElementById('fashion-container')
const sportsContainer=document.getElementById('sports-container')
const trendingContainer=document.getElementById('trending-container')
const ukraineContainer=document.getElementById('ukraine-container')
const worldContainer=document.getElementById('world-container')
const swapperContainer=document.getElementById('swapper-wrapper')
const indiaContainer=document.getElementById('india-container')
const entertainmentContainer=document.getElementById('entertainment-container')
let imagesArray=Array.from(document.getElementsByClassName('img'))
window.addEventListener('load',()=>fetchTrendingNews())
window.addEventListener('load',()=>fetchFashionNews())
window.addEventListener('load',()=>fetchSportsNews())
window.addEventListener('load',()=>fetchIndiaNews())
window.addEventListener('load',()=>fetchUkraineNews())
window.addEventListener('load',()=>fetchWorldNews())
window.addEventListener('load',()=>fetchEntertainmentNews())
async function fetchFashionNews(){
    const query='fashion'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    console.log(data)
    bindData(data.articles.slice(0,8),fashionContainer)
}
async function fetchSportsNews(){
    const query='Sports'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    bindData(data.articles.slice(0,12),sportsContainer)
}
async function fetchTrendingNews(){
    const query='trending'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    
    bindData(data.articles.slice(0,8),trendingContainer)
}
async function fetchUkraineNews(){
    const query='ukraine'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    bindData(data.articles.slice(0,8),ukraineContainer)
}
async function fetchIndiaNews(){
    const query='india'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    bindData(data.articles.slice(0,10),indiaContainer)
}
async function fetchWorldNews(){
    const query='world'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    console.log(data)
    bindData(data.articles.slice(0,8),worldContainer)
}
async function fetchEntertainmentNews(){
    const query='hollywood'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    imagesArray.forEach((imgElement, index) => {
        if(!data.articles[index] || !data.articles[index].urlToImage){
            while(data.articles[index] && data.articles[index].urlToImage){
                index++;
            }
            imgElement.src = data.articles[index].urlToImage;
        }
        else{
            imgElement.src = data.articles[index].urlToImage;
        }
    });
    console.log(data)
    bindData(data.articles.slice(0,12),entertainmentContainer)
}
function bindData(articles,cardsContainer){
    const newsCardTemplate=document.getElementById('template-news-card')
    cardsContainer.innerHTML=''
    articles.forEach((article)=>{
        if(!article.urlToImage) return
        const cardClone=newsCardTemplate.content.cloneNode(true)
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone)
    })
}

function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-image')
    const newsTitle=cardClone.querySelector('#news-title')
    const newsSource=cardClone.querySelector('#news-source')
    const newsDesc=cardClone.querySelector('#news-desc')

    newsImg.src=article.urlToImage
    newsTitle.innerHTML=article.title
    newsDesc.innerHTML=article.description
    const date=new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone:'Asia/Jakarta'
    })
    newsSource.innerHTML=`${article.source.name}.${date}`
    let arr=[newsImg,newsTitle,newsSource,newsDesc]
    arr.forEach((element)=>{
        element.addEventListener('click',()=>window.open(article.url))
    })
}
