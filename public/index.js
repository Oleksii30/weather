
let button = document.getElementById('button')
let city = document.getElementById('cityInput')
let weatherUl = document.getElementById('weather')

/*button.addEventListener('click',()=>{
    let url = 'http://localhost:3000/weather'
    let query = '?city='
    let path = url + query + city.value
    fetch(path)
    .then(res=>res.json())
    .then(weather=>showWeather(weather))
  
})*/

/*function showWeather(weather){
    let ulChilds = weatherUl.childNodes
    while (ulChilds.length > 0){
        weatherUl.removeChild(weatherUl.firstChild)
    }
    let weatherArr = Object.entries(weather)
    for (let item of weatherArr){
        let li = document.createElement('li')
        li.className = 'list-group-item list-group-item-light'
        li.innerHTML = `${item[0]}: ${item[1]}`
        weatherUl.appendChild(li)
    }
    city.value = ""
  
}*/

