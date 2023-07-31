const URL='https://newsapi.org/v2/everything?q='
const API_KEY='4c2db71147a7491e9f82e4a9f60bd3fa'
const fashionContainer=document.getElementById('fashion-container')
const sportsContainer=document.getElementById('sports-container')
const trendingContainer=document.getElementById('trending-container')
const ukraineContainer=document.getElementById('ukraine-container')
const worldContainer=document.getElementById('world-container')
const swapperContainer=document.getElementById('swapper-wrapper')
const indiaContainer=document.getElementById('india-container')
const entertainmentContainer=document.getElementById('entertainment-container')
const searchButton=document.getElementById('search')
const searchContainer=document.getElementById('search-container')
const searchBar=document.getElementById('search-bar')
const topResultsTemplate=document.getElementById('top-result')
let imagesArray;

window.addEventListener('load', () => {
    imagesArray = Array.from(document.getElementsByClassName('img'));
    fetchTrendingNews();
    fetchFashionNews();
    fetchSportsNews();
    fetchIndiaNews();
    fetchUkraineNews();
    fetchWorldNews();
    fetchEntertainmentNews();
});
async function fetchNews(query){
    const cloneHeader=topResultsTemplate.content.cloneNode(true)
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    bindData(data.articles,searchContainer)
}
searchButton.addEventListener('click',async ()=>{
    const query=searchBar.value
    if(!query) return
    await fetchNews(query)
})
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
    const query='hollywood  bollywood'
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
