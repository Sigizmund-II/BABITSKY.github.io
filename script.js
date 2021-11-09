//Get HTML elem

let vvod = document.getElementById("vvod");
let mainframe = document.getElementById("mainframe");

let icon=document.getElementsByClassName("currenticon")[0];
let temp=document.getElementsByClassName("currenttemp")[0];
let ddate=document.getElementsByClassName("currentdate")[0];
let wicon=document.getElementsByClassName("windicon")[0];
let hicon=document.getElementsByClassName("humicon")[0];
let ricon=document.getElementsByClassName("rainicon")[0];
let wind=document.getElementsByClassName("winds")[0];
let hum=document.getElementsByClassName("hums")[0];
let rain=document.getElementsByClassName("rains")[0];
let map=document.getElementsByClassName("map")[0];
let dayof=document.getElementsByClassName("dayof")[0];


let day1 = document.getElementsByClassName("day1")[0];
let day2 = document.getElementsByClassName("day2")[0];
let day3 = document.getElementsByClassName("day3")[0];
let day4 = document.getElementsByClassName("day4")[0];

let temp1 = document.getElementsByClassName("temp1")[0];
let temp2 = document.getElementsByClassName("temp2")[0];
let temp3 = document.getElementsByClassName("temp3")[0];
let temp4 = document.getElementsByClassName("temp4")[0];

let icon1 = document.getElementsByClassName("icon1")[0];
let icon2 = document.getElementsByClassName("icon2")[0];
let icon3 = document.getElementsByClassName("icon3")[0];
let icon4 = document.getElementsByClassName("icon4")[0];


let butt = document.getElementById("button");
let buttc = document.getElementById("buttonc");
let buttf = document.getElementById("buttonf");
var howmuchdeg = 273;




wicon.innerHTML = `<img src="./pic/wicon.png">`;
hicon.innerHTML = `<img src="./pic/hicon.png">`;
ricon.innerHTML = `<img src="./pic/ricon.png">`;

async function showWeather(city) {
    const api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=66b3c3e1676ddd60a73d8a3160445061`;
    let response = await fetch(api);
    let data = await response.json();
    daySOST = checkDaytime(data.list[0].dt,data.city.sunrise,data.city.sunset);
    
    map.innerHTML = `<img src="./pic/map.png">`;

    icon.innerHTML = `<img src="./pic/${choosePicture(data.list[0].weather[0].id)}.png">`;
    temp.innerHTML = Math.floor(data.list[0].main.temp-howmuchdeg);
    createDate((Math.floor(data.list[0].dt)*1000));
    wind.innerHTML= data.list[0].wind.speed+"km/h";
    hum.innerHTML= data.list[0].main.humidity+"%";
    rain.innerHTML= (0.1);
    

    temp1.innerHTML = Math.floor(data.list[8].main.temp-howmuchdeg);
    icon1.innerHTML = `<img src="./pic/${choosePicture(data.list[8].weather[0].id)}.png">`;
    console.log(data.list[8].weather[0].main);

    temp2.innerHTML = Math.floor(data.list[16].main.temp-howmuchdeg);
    icon2.innerHTML = `<img src="./pic/${choosePicture(data.list[16].weather[0].id)}.png">`;
    console.log(data.list[16].weather[0].main);

    temp3.innerHTML = Math.floor(data.list[24].main.temp-howmuchdeg);
    icon3.innerHTML = `<img src="./pic/${choosePicture(data.list[24].weather[0].id)}.png">`;
    console.log(data.list[24].weather[0].main);

    temp4.innerHTML = Math.floor(data.list[32].main.temp-howmuchdeg);
    icon4.innerHTML = `<img src="./pic/${choosePicture(data.list[32].weather[0].id)}.png">`;
    console.log(data.list[32].weather[0].main);
    setDays(); 
    //await new Promise((resolve, reject) => setTimeout(resolve, 3000));
}
function checkDaytime(dt,sunrise,sunset){
    if((Math.floor(sunrise-dt)<5000 && Math.floor(sunrise-dt)>0) || (Math.floor(dt-sunrise)<5000 && Math.floor(dt-sunrise)>0)){
        mainframe.style.background = `linear-gradient(248.66deg, #EEAECA 0%, #91BEF3 100%)`;
        return 'morning';
    }else if(Math.floor(dt)>Math.floor(sunrise+5000) && Math.floor(dt)<Math.floor(sunset-5000)){
        mainframe.style.background = `linear-gradient(248.66deg, #AAC0FF 0%, #8C6BAE 100%)`;
        return 'day';
    }else{
        mainframe.style.background = `linear-gradient(248.66deg, #48355B 0%, #8C6EAB 100%)`;
        return 'night';
        
    }
}
function setDays(){
    var d = new Date();
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayof.innerHTML = days[d.getDay()];
        day1.innerHTML = days[d.getDay()+1];
        day2.innerHTML = days[d.getDay()+2];
        day3.innerHTML = days[d.getDay()+3];
        day4.innerHTML = days[d.getDay()+4];
}

function choosePicture(id){
    if(id>199 && id<300){
        return 'heavyrain';
    }
    if(id>299 && id<550){
        return 'rainy';
    }
    if(id>599 && id<650){
        return 'snow';
    }
    if(id>699 && id<790){
        return 'mist';
    }
    if(id==800){
        if(daySOST==='day' ||daySOST==='morning'){
            return 'day'
        }else{
            return 'night'
        }
    }
    if(id==801){
        if(daySOST==='day' ||daySOST==='morning'){
            return 'cloudssun'
        }else{
            return 'cloudsnight'
        }
    }  
    if(id>801){
        return 'cloud'
    }    
}

function createDate(d){
    const nd = new Date(d);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", 
            "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    ddate.innerHTML = ""+nd.getDay()+"th "+months[nd.getMonth()] +"'"+nd.getUTCFullYear();
}

butt.addEventListener("click", ()=>{
    if(document.getElementById("vvod").value===""){
        showWeather('Minsk');
    }else{
        showWeather(document.getElementById("vvod").value);
    }
    
});

buttc.addEventListener("click", ()=>{
    if(howmuchdeg!=273){
        howmuchdeg = 273;
        buttc.style.background = `rgba(255, 255, 255, 0.40)`;
        buttf.style.background = `rgba(255, 255, 255, 0.16)`;
        if(icon.innerHTML ===''){
            temp.innerHTML = "℃";
        }else{
            temp.innerHTML = Math.floor(Number(temp.innerHTML)-273);
            temp1.innerHTML = Math.floor(Number(temp1.innerHTML)-273);
            temp2.innerHTML = Math.floor(Number(temp2.innerHTML)-273);
            temp3.innerHTML = Math.floor(Number(temp3.innerHTML)-273);
            temp4.innerHTML = Math.floor(Number(temp4.innerHTML)-273);
        }
    }
    
});

buttf.addEventListener("click", ()=>{
    if(howmuchdeg!=0){
    howmuchdeg = 0;
    buttc.style.background = `rgba(255, 255, 255, 0.16)`;
    buttf.style.background = `rgba(255, 255, 255, 0.40)`;
    if(icon.innerHTML ===''){
        temp.innerHTML = "F";
    }else{
        temp.innerHTML = Math.floor(Number(temp.innerHTML)+273,15);
        temp1.innerHTML = Math.floor(Number(temp1.innerHTML)+273,15);
        temp2.innerHTML = Math.floor(Number(temp2.innerHTML)+273,15);
        temp3.innerHTML = Math.floor(Number(temp3.innerHTML)+273,15);
        temp4.innerHTML = Math.floor(Number(temp4.innerHTML)+273,15);
    }
}
});