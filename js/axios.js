const $ = document.querySelector.bind(document)
const place = $('.count-gen')
const searchInput = $('.search-input')
const searchBtn = $('.search-btn')
const sortby = $('#select')
const filterby = $('#filter')
const preBtn = $('.pre-btn')
const nextBtn = $('.next-btn')
const preve = $('.preve')


let countries = []
axios.get('https://restcountries.com/v3.1/all')
.then(data =>  data.data)
.then(data => {
    data.map(el => countries.push(el))
})
.then(() => {
    getCount(countries)
})


let count = 12
let start = 0

function getCount(data){
    count === 12 && start === 0 ? preBtn.style.opacity = '0.5' : preBtn.style.opacity = '1'
    count === 240 && start === 228 ? nextBtn.style.opacity = '0.5' : nextBtn.style.opacity = '1'
console.log(count, start)
    let a = []
    for(let i = start; i < count; i++){
        a +=  `<div class="count-item col-md-3 col-sm-5 col-12 text-center">
                                <img class="count-img img img-fluid"  src="${data[i].flags.png}">
                                <h4 class="title text-white">${data[i].name.official}</h4>
                            </div>`
    }
    $('.previous').style.display = 'none'
    place.innerHTML = a
        let j = document.querySelectorAll('.count-item')
        j.forEach(e =>{
            e.addEventListener('click', (r) => {
                let nameCount = r.target.parentElement.children[1].innerHTML
                nameCount.toLowerCase()
                $('.previous').style.display = 'block'
                axios.get(`https://restcountries.com/v3.1/name/${nameCount}`)
                .then(data =>  data.data)
                .then(found => addCount(found))
                preBtn.style.display = 'none'
                nextBtn.style.display = 'none'
                $('.previous').addEventListener('click', () => {
                    preBtn.style.display = 'block'
                    nextBtn.style.display = 'block'
                    getCount(countries)
                    $('.previous').style.display = 'none'
                })
            })
        })
    
}

preBtn.addEventListener('click', () => {
    if(count !== 12 && start !== 0){
        count -= 12
        start -= 12
    }
    getCount(countries)
})
nextBtn.addEventListener('click', () => {
    if(count !== 240 && start !== 228){
        count += 12
        start += 12
    }   
    getCount(countries)
})

function addCount(found){
    found.map(el => {
        place.innerHTML =  
        `<div class="col-5 text-center">
                <img class="solo-img"  src="${el.flags.png}">
        </div>
        <div class="col-5 text-start">
        <h4 class="title text-white">Official name: ${el.name.official}</h4>
        <p>Another names: ${el.name.common}, (<small>${el.altSpellings[0]}, ${el.altSpellings[1]} ${el.altSpellings[2]}, ${el.altSpellings[3]}</small>)</p>
        <p>Capital: ${el.capital[0]}</p>
        <p>Area: ${el.area}km<sup>2</sup></p>
        <p>Borders: ${el.borders[0]}, ${el.borders[1]}, ${el.borders[2]}, ${el.borders[3]}</p>
        <p>Population: ${el.population}</p>
        <p>Region: ${el.region}, ${el.subregion} </p>
        <p>National: ${el.demonyms.eng.f}</p>
        <p>Time zone: ${el.timezones[0]}</p>

        </div>`
    })
       
}

searchBtn.addEventListener('click', () => {
    $('.previous').style.display = 'block'
    if(searchInput.value == ''){
        $('.previous').style.display = 'none'
        getCount(countries)
    }else{
        axios.get(`https://restcountries.com/v3.1/name/${searchInput.value}`)
        .then(data =>  data.data)
        .then(found => {
            addCount(found)
            
        })
    }
})
window.addEventListener('keydown', e => {
    if(e.key === 'Enter'){
        axios.get(`https://restcountries.com/v3.1/name/${searchInput.value}`)
        .then(data =>  data.data)
        .then(found => addCount(found))
        .catch((error) => console.error('Something is wrong!'))
    }
})
// find()




let sorted
sortby.addEventListener('change', () => {
    count = 12
    start = 0
    place.innerHTML = ''
    const vSort = sortby.value
    if(vSort == '0'){
        getCount(countries)
    }
    if(vSort == 'area'){
        sorted = countries.sort((a,b) => {
            return b.area - a.area
            })
          getCount(sorted)
        }
    if(vSort == 'population'){
        sorted = countries.sort((a,b) => {
            return b.population - a.population
            })
          getCount(sorted)
    }
    if(vSort == 'aZ'){
        sorted = countries.sort((a,b) => {
            return a.name.official < b.name.official ? -1 : 1
        })
        getCount(sorted)
    }
    
})

filterby.addEventListener('change', () => {
    let filt = filterby.value
    console.log(filt)
    let filted
    if(filt === 'asia'){
        filted = countries.filter(e => { return e.region === 'Asia'})
        console.log(filted)

        getCount(filted)
    }
    if(filt === 'africa'){
        filted = countries.filter(e => { return e.region === 'Africa'})
        console.log(filted)
        getCount(filted)
    }
    if(filt === 'americas'){
        filted = countries.filter(e => {return e.region === 'Americas'})
        getCount(filted)
    }
    if(filt === 'oceania'){
        filted = countries.filter(e => {return e.region === 'Oceania'})
        getCount(filted)
    }
    if(filt === 'europe'){
        filted = countries.filter(e => {return e.region === 'Europe'})
        getCount(filted)
    }
})