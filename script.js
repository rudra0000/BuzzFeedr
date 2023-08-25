const URL='https://newsapi.org/v2/everything?q='
const API_KEY='6ded571115fc41d8b4643e8b2cd3ba61'
const fashionContainer=document.getElementById('fashion-container')
const sportsContainer=document.getElementById('sports-container')
const trendingContainer=document.getElementById('trending-container')
const ukraineContainer=document.getElementById('ukraine-container')
const worldContainer=document.getElementById('world-container')
const swapperContainer=document.getElementById('swapper-wrapper')
const southAsiaContainer=document.getElementById('south-asia-container')
const indiaContainer=document.getElementById('india-container')
const entertainmentContainer=document.getElementById('entertainment-container')
const businessContainer=document.getElementById('businesscontainer')
const tech=document.getElementById('tech-container')
const searchButton=document.getElementById('search')
const searchContainer=document.getElementById('search-container')
const searchBar=document.getElementById('search-bar')
const topResultsTemplate=document.getElementById('top-result')
const topResults=document.getElementById('top-results')
const world=document.getElementById('world')
const sa=document.getElementById('sa')
const india=document.getElementById('india')
const ukraine=document.getElementById('ukraine')
const sports=document.getElementById('sports')
const science=document.getElementById('Science')
const business=document.getElementById('Business')
const entertainment=document.getElementById('Entertainment')
const lifestyle=document.getElementById('Lifestyle')
const headers=Array.from(document.getElementsByClassName('header'))
const navbar=document.getElementsByClassName('nav-bar')
let imagesArray=[]
let swiperText=[]
window.addEventListener('load', () => {
    console.log(API_KEY,'hello')
    imagesArray = Array.from(document.getElementsByClassName('img'));
    swiperText=Array.from(document.getElementsByClassName('slide-text'))
    fetchWorldNews();
    fetchTechNews()
    fetchEntertainmentNews();
    swiperText.forEach(element=>{
        console.log('ye lo',element.href)
    })
    swiperText.forEach(element => {
        element.addEventListener('click', ()=> {
            console.log(element.href)
            element.style.color = 'green'; 
        });
    });
    fetchTrendingNews();
   
    fetchSouthAsiaNews();
    fetchIndiaNews();
    fetchUkraineNews();
   
    fetchFashionNews();
    
    fetchBusinessNews()
    fetchSportsNews();
});
topResults.addEventListener('click',()=>{
    window.location.reload()
})
headers.forEach(header=>{
    let child=header.querySelector('.news-heading')
    header.addEventListener('click',()=>{
        fetchNews(child.textContent)
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    })
    
})
world.addEventListener('click',()=>fetchNews('world'))
sa.addEventListener('click',()=>fetchNews('South Asia'))
india.addEventListener('click',()=>fetchNews('india'))
ukraine.addEventListener('click',()=>fetchNews('ukraine'))
sports.addEventListener('click',()=>fetchNews('sports'))
science.addEventListener('click',()=>fetchNews('technology'))
business.addEventListener('click',()=>fetchNews('business'))
entertainment.addEventListener('click',()=>fetchNews('hollywood bollywood'))
lifestyle.addEventListener('click',()=>fetchNews('lifestyle'))
async function fetchNews(query){
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    console.log('hello')
    topResults.style.display='inline'
    bindData(data.articles,searchContainer)
}
searchButton.addEventListener('click',async ()=>{
    const query=searchBar.value
    if(!query) return
    await fetchNews(query)
})
window.addEventListener('keydown',async e=>{
    let name=e.key
    if(name=='Enter'){
        let query=searchBar.value
        if(query=='') return
        await fetchNews(query)
    }
})
async function fetchTechNews(){
    const query='technology'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data= await res.json()
    bindData(data.articles.slice(0,12),tech)
}
async function fetchFashionNews(){
    const query='fashion'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    console.log(data)
    bindData(data.articles.slice(0,12),fashionContainer)
   
}

async function fetchSouthAsiaNews(){
    const query='south asia'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    bindData(data.articles.slice(0,12),southAsiaContainer)
    console.log('done with south asia news')
}
async function fetchBusinessNews(){
    const query='Business'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    bindData(data.articles.slice(0,12),businessContainer)
}
async function fetchSportsNews(){
    const query='cricket'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    bindData(data.articles.slice(0,12),sportsContainer)
}
async function fetchTrendingNews(){
    const query='trending'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    
    bindData(data.articles.slice(0,12),trendingContainer)
}
async function fetchUkraineNews(){
    const query='ukraine'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    bindData(data.articles.slice(0,12),ukraineContainer)
}
async function fetchIndiaNews(){
    const query='india'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    bindData(data.articles.slice(0,12),indiaContainer)
    console.log('india news loaded')
}
async function fetchWorldNews(){
    const query='world'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
    let i=0;
    console.log(data.articles)
    imagesArray.forEach((imgElement, index) => {
        if(!data.articles[index] || !data.articles[index].urlToImage){
            while(data.articles[index] && data.articles[index].urlToImage){
                index++;
            }
            imgElement.src = data.articles[index].urlToImage;
            console.log(data.articles[index].url)
            swiperText[i].textContent=data.articles[index].title
            swiperText[i].href=data.articles[index].url
           
            console.log('dsfad')
            console.log(data.articles[index].title)
        }
        else{
            imgElement.src = data.articles[index].urlToImage;
            swiperText[i].textContent=data.articles[index].title
            swiperText[i].href=data.articles[index].url
        }
        i+=1
    });
    console.log(data)
    bindData(data.articles.slice(0,12),worldContainer)
}
async function fetchEntertainmentNews(){
    const query='hollywood  bollywood'
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json()
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
