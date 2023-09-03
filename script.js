const apiKey="48ff5860c6cf30b1adcb2505b9bc3e66";
const button=document.getElementById("fetch-data");
const container_2=document.getElementsByClassName("container-2")[0];
const map_container=document.getElementsByClassName("map-container")[0];
const weather_detail_container=document.getElementsByClassName("weather-detail-container")[0];
const wait_msg=document.getElementsByClassName("wait-msg")[0];
const map_box=document.getElementsByTagName("iframe")[0];

var lat;
var long;


//extract user location latitude and longitude here
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition , showerror);
}
else{  //if user denied access
    console.log("your browser not suuport");
}
function showPosition(position){
    lat=position.coords.latitude;
    long=position.coords.longitude;

}
function showerror(err){
    console.log(err.message);
}



 
setTimeout(() => {
    async function checkWeather(){
        //fetch api here
        try{
            const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&appid=${apiKey}`);
            // const response=await fetch(apiUrl+"dehradun"+`&appid=${apiKey}`);
            var data=await response.json();
            container_2.style.display="block";
            map_container.style.display="block";
            weather_detail_container.style.display="block"
            wait_msg.style.display="none";
            map_box.src=`https://maps.google.com/maps?q=${lat}, ${long}&output=embed`;

            
            console.log(data);

            //set inner text for weather details using innerHTML method
        
            document.getElementsByClassName("lat")[0].innerHTML="Lat: "+lat;
            document.getElementsByClassName("long")[0].innerHTML="Long: "+long;
        
        
            document.getElementsByClassName("location")[0].innerHTML="Location: "+data.name;
            document.getElementsByClassName("wind-speed")[0].innerHTML="Wind Speed: "+Math.round(data.wind.speed)+"kmph";
            document.getElementsByClassName("humidity")[0].innerHTML="Humidity: "+data.main.humidity;
            document.getElementsByClassName("timezone")[0].innerHTML="Time Zone GMT +5:30 " ;//+data.timezone;
            document.getElementsByClassName("pressure")[0].innerHTML="Pressure: "+Math.round((data.main.pressure)/100)+"atm";
            document.getElementsByClassName("wind-direction")[0].innerHTML="Wind Direction:  North East"
            document.getElementsByClassName("uv-index")[0].innerHTML="UV Index: 500";
            document.getElementsByClassName("feels-like")[0].innerHTML="Feels like: "+Math.round(data.main.temp)+"°";
        }
        catch(error){
            console.log(error);
        }
    
        
    }
    
checkWeather();
}, 900);

