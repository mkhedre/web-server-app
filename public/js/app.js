console.log('fetching data')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
const weatherFfom = document.querySelector('form')
const searchValue = document.querySelector('input')
const pragraphValue = document.querySelector('#p1')
const pragraph2Value = document.querySelector('#p2')

weatherFfom.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchValue.value
    pragraphValue.textContent='loading...'
    pragraph2Value.textContent=''
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then(data=>{
        if(data.error){
            pragraphValue.textContent= data.error
        }else{
            pragraphValue.textContent= data.location 
            pragraph2Value.textContent=data.forecast
        }
    })
})
})
