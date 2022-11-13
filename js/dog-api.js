// const { default: axios } = require("axios")

const $ = document.querySelector.bind(document)
const dogs = $('.dog-menu')
const dogImg = $('.dog-img')
const select = $('#select')
const inputSearch = $('.search-input')




function dogNames(){
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(data => data.json())
    .then(data => {
        Object.keys(data.message).map(e => {
            dogs.innerHTML += `<button class="btn btn-outline-primary m-1 py-2 px-3">${e}</button>`
    }) 
    })
}
dogNames()

function addImg(){
    window.addEventListener('click' , event => {
        fetch(`https://dog.ceo/api/breed/${event.target.textContent}/images/random`)
        .then(img => img.json()).then(data => {
            dogImg.innerHTML = `<img class="dog-img img-fluild mt-3" src="${data.message}">`
        })
        // .then(setTimeout(() => {}, 1000))
        setTimeout(() => {
            window.scroll(0, 1000)
        },800)
    })
}
addImg()

function dogName(){
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(data => data.json())
    .then(data => {
        Object.keys(data.message).map(e => {
            select.innerHTML += `<option class="option" value="${e}">${e}</option>`
    }) 
    })
}
dogName()

inputSearch.addEventListener('input', () => {
    inputSearch.value
    
    fetch(`https://dog.ceo/api/breed/${inputSearch.value}/images/random`)
    .then(img => img.json()).then(data => {
        dogImg.innerHTML = `<img class="dog-img img-fluild mt-3" src="${data.message}">`
    })

})
