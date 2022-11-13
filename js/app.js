const $ = document.querySelector.bind(document)
const btn = $('.btn')
const post = $('.post')


btn.addEventListener('click', () => {
    btn.style.display = 'none'
    
    getData()
})



function getData(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(data => {
        return data.json()
    }).then(dataJson => {
        displayData(dataJson)
    })
}



function displayData(data){
    data.map(el => {
        post.innerHTML += `<div class="col-4">
                             <div class="border m-2 border-primary text-center">
                                <h4 class="text-danger">User ID: ${el.id}</h4>
                                <h5 class="text-success">Title: ${el.title}</h5>
                                <p>Comment: ${el.body}</p>   
                             </div>
                        </div>`
    })
}