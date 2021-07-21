////////// WEATHER API ////////////
//////////////////////////////////
const API_KEY3='bb9b4cf73b5a4efa90973c24bc599198'


// Fetch the API //
const currentWeather = (latitude,longitude) =>{
  fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${API_KEY3}`)
    .then((response) => response.json())
    .then((response) => {
      viewWeather(response)
    })
    .catch((error) => console.error((error)))
}

////////// GEOLOC API /////////////
//////////////////////////////////

navigator.geolocation.getCurrentPosition( (position) => {
  currentWeather(position.coords.latitude, position.coords.longitude);
});

///// CREATE WEATHER VIEW /////////
//////////////////////////////////
const weekDays =['dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']

const month = (today) => {
  if(today.getMonth()+1 <10){
    return '0'+(today.getMonth()+1)
  }else{
    return (today.getMonth()+1)
  }
}

const dateTime= (date) =>{
  const today = new Date();
  const dateToday = today.getFullYear()+'-'+(month(today))+'-'+today.getDate();
  if(date == dateToday){
    return "Aujourd'hui"
  }else{
    const numb = new Date(date).getDay() 
    return weekDays[numb]
  }
}

const viewWeather = (data) => {
  const title = document.getElementById('title');
  const weather = document.getElementById('weather');

  title.innerHTML = `Voici la météo à 6 jours pour la ville ${data.city_name} (géolocalisation)`
  for(let i = 0;i<6; i++){
  weather.innerHTML += `
  <div class='day'>
    <h3>${dateTime(data.data[i].datetime)}</h3>
    <div class='image'>
      <img src='https://www.weatherbit.io/static/img/icons/${data.data[i].weather.icon}.png'></img>
    </div>
    <p>Temp : Min ${data.data[i].min_temp} - Max ${data.data[i].max_temp}</p>
    <p><i class="fas fa-wind"></i> : ${data.data[i].wind_cdir_full} - ${parseInt(data.data[i].wind_spd)} m/s</p>
  </div>
  
`}}


