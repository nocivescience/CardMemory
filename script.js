const addContainer=document.querySelector('.add-container')
const cardsContainer=document.getElementById('cards-container')
const addCard=document.getElementById('add-card')
const questEl=document.getElementById('pregunta');
const answerEl=document.getElementById('respuesta')
const showCard=document.getElementById('show-card')
const btnHide=document.getElementById('btn-hide')
const currentEl=document.getElementById('current')
const prevEl=document.getElementById('prev')
const nextEl=document.getElementById('next')
let currentActive=0;
let cardsEl=[]
const cardsData=getCardsData()
function createCards(){
    cardsData.forEach((data,index)=>createCard(data,index))
}
function getCardsData(){
    const cards=JSON.parse(localStorage.getItem('cards'))
    return cards===null?[]:cards
}
function setCardsData(cards){
    localStorage.setItem('cards',JSON.stringify(cards))
    window.location.reload()
}
function aplicacion(){
    addContainer.classList.toggle('show')
}
function createCard(data,index){
    const card=document.createElement('div')
    card.classList.add('card')
    if (index===0){
        card.classList.add('active')
    }
    card.innerHTML=`
        <div class='inner-card'>
            <div class='inner-card-front shadow'>${data.question}</div>
            <div class='inner-card-back shadow'>${data.answer}</div>
        </div>
    `
    card.addEventListener('click',()=>card.classList.toggle('show-answer'))
    cardsEl.push(card)
    cardsContainer.appendChild(card)
    updateCurrentCard()
}
function updateCurrentCard(){
    currentEl.innerText=`
        ${currentActive+1}/${cardsEl.length}
    `
}
createCards()
prevEl.addEventListener('click', ()=>{
    cardsEl[currentActive].className='card right'
    currentActive-=1
    if(currentActive<0) {
        currentActive=0
    }
    cardsEl[currentActive].className='card active'
    updateCurrentCard()
})
nextEl.addEventListener('click',()=>{
    cardsEl[currentActive].className='card left'
    currentActive+=1
    if(currentActive>cardsEl.length-1) {
        currentActive=cardsEl.length-1
    }
    cardsEl[currentActive].className='card active'

    updateCurrentCard()
})
showCard.addEventListener('click',()=>{
    addContainer.classList.add('show')
})
btnHide.addEventListener('click',()=>{
    addContainer.classList.remove('show')
})
updateCurrentCard()
addCard.addEventListener('click', ()=>{
    const question= questEl.value
    const answer=answerEl.value
    if(question.trim()&& answer.trim()){
        const newCard={question,answer}
        createCard(newCard)
        questEl.value=''
        answerEl.value=''
        addContainer.classList.remove('show')
        cardsData.push(newCard);
        setCardsData(cardsData)
    }
})