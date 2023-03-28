const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector(".current-weather");
wIcon = document.querySelector(".weather-part img");
const checkbtn = inputPart.querySelector(".checkbtn")
arrowicon = document.querySelector("header i");
let api;



inputField.addEventListener("keyup",e=>{
    //If user press enter when input field is not empty
    if(e.key == "Enter"  && inputField != ""){
        requestApi(inputField.value)
    }
})
checkbtn.addEventListener("click",()=>{
    
    if(inputField.value == ""){
        infoTxt.innerHTML = "Please Enter the City Name";
        infoTxt.classList.add("error")
    }
    else{
        requestApi(inputField.value)
    }
    
})


locationBtn.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        alert("Sorry!!! Your browser doesnot support geolocation api...")
    }
})
function onSuccess(position){
    const {latitude,longitude} = position.coords;//getting latitude and longitude from coords object
     api =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=47017be5fb9cf914cf9404ed068c0f10`;
     fetchData();
}
function onError(error){
    infoTxt.innerHTML =  error.message; // come from error object 
    infoTxt.classList.add("error");
}

function requestApi(city){
     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=47017be5fb9cf914cf9404ed068c0f10`;
    fetchData();
}
function fetchData(){
    infoTxt.innerHTML = "Getting Weather details....";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result=>weatherDetails(result))
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending","error");
        infoTxt.innerHTML = `${inputField.value} isn't a valid city name...`;

    }
    else{
        console.log(info);
        infoTxt.classList.remove("pending","error")

        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const {feels_like,humidity,temp} = info.main;

        if(id == 800){
            wIcon.src = "images/clear.svg";
        }
        else if(id >= 200 || id <=232){
            wIcon.src = "images/storm.svg";
        }
        else if(id >= 600 || id <=622){
            wIcon.src = "images/snow.svg";
        }
        else if(id >= 701 || id <=781){
            wIcon.src = "images/haze.svg";
        }
        else if((id >= 300 && id<=321)  || (id <=531 && id >=500)){
            wIcon.src = "images/rain.svg";
        }
        

        wrapper.querySelector(".temp .numb").innerHTML = Math.floor(temp);
        wrapper.querySelector(".weather").innerHTML = description;
        wrapper.querySelector(".location span").innerHTML = `${city} ${country}`;
        wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerHTML = `${humidity}%`;
        


        wrapper.classList.add("active")

    }

}
arrowicon.addEventListener('click',()=>{
    wrapper.classList.remove("active");
})