// const connection = new signalR.HubConnectionBuilder()
//     .withUrl("https:localhost:7264/offers")
//     .configureLogging(signalR.LogLevel.Information)
//     .build();
// const url = "https://localhost:7264/";

// async function start() {
//     try {

//         await connection.start();

//         const element = document.querySelector("#offerValue");
//         $.get(url + "api/Offer", function (data, status) {
//             console.log(data);
//             element.innerHTML = "Begin price : "+data;
//         })

//         console.log("SignalR Connected");
//     }
//     catch (err) {
//         console.log(err);
//         setTimeout(() => {
//             start();
//         }, 5000);
//     }
// }


// start();

// var bidBtn=document.querySelector("#bidBtn");

// connection.on("ReceiveConnectInfo", (message) => {
//     let element = document.querySelector("#info");
//     element.innerHTML = message;
// });


// connection.on("ReceiveMessage", (message, data) => {
//     let element = document.querySelector("#offerValue2");
//     element.innerHTML = message + " \n with this offer : " + data + "$";
//     bidBtn.disabled=false;
//     clearTimeout(clearInterval);
// });

// connection.on("ReceiveInfo", (message, data) => {
//     let element = document.querySelector("#offerValue2");
//     element.innerHTML = message + " \n with this offer : " + data + "$";
//     bidBtn.disabled=true;
//     timeSection.style.display="none";
// });

// let timeSection=document.querySelector("#time-section");
// var totalSeconds=10;

// var clearInterval;

// async function IncreaseOffer() {
//     let result = document.querySelector("#user");
//     timeSection.style.display="block";
//     totalSeconds=10;

//     $.get(url + "Increase?data=100", function (data, status) {
//     })

//     $.get(url + "api/Offer", function (data, status) {
//         // let element = document.querySelector("#offerValue2");
//         // element.innerHTML = "";
//         connection.invoke("SendMessage", result.value);
//         bidBtn.disabled=true;
//     })

//     clearInterval=setInterval(() => {
//         let time=document.querySelector("#time");
//         --totalSeconds;
//         time.innerHTML=totalSeconds;

//         if(totalSeconds==0){
//             bidBtn.disabled=true;
//             clearTimeout(clearInterval);
//             let user=document.querySelector("#user");
//             connection.invoke("SendWinnerMessage","Game Over\n"+user.value+" is winner");
//         }
//     }, 1000);
// }

var CURRENTROOM = "";
var clearInterval;
var totalSecond = 10;
var currentUser = "";
var room = document.querySelector("#room");
var element = document.querySelector("#offerValue");
var timeSection = document.querySelector("#time-section");
var time = document.querySelector("#time");
var button = dicument.querySelector("#offerBtn");

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https:localhost:7264/offers")
    .configureLogging(signalR.LogLevel.Information)
    .build();
const url = "https://localhost:7264/";

async function start() {
    try {
        await connection.start();

        $.get(url + "Room?room=" + CURRENTROOM, function (data, status) {
            console.log(data);
            element.innerHTML = "Begin Price $" + data;
        })
        console.log("SignalR Connected");
    }
    catch (err) {
        console.log(err);
        setTimeout(() => {
            start();
        }, 5000);
    }
}

connection.on("ReceiveJoinInfo", (user) => {
    let infoUser = document.querySelector("#info");
    infoUser.innerHTML = user + " connected to our room"
})

connection.on("ReceiveInfoRoom", (user) => {
    var element2 = document.querySelector("#offerValue2");
    element2.innerHTML=user+"offer this price "+(Number(data)+100)+"$";
    button.disabled=false;
    timeSection.style.display="none";
})

connection.on("ReceiveWinInfoRoom", (user) => {
    var element2 = document.querySelector("#offerValue2");
    element2.innerHTML=user+"offer this price "+(Number(data)+100)+"$";
    button.disabled=false;
    timeSection.style.display="none";
})

async function JoinChevrolet() {
    CURRENTROOM = "chevrolet";
    room.style.display = "block";
    await start();
    currentUser = document.querySelector("#user").value;
    await connection.invoke("JoinRoom", CURRENTROOM, currentUser)
}

async function JoinMercedes() {
    CURRENTROOM = "mercedes";
    room.style.display = "block";
    await start();
    currentUser = document.querySelector("#user").value;
    await connection.invoke("JoinRoom", CURRENTROOM, currentUser)
}

async function IncreaseOffer() {
    timeSection.style.display = "block";
    totalSeconds = 10;
    let result = document.querySelector("#user");
var lastOffer=0;
    $.get(url + `IncreaseRoom?room=${CURRENTROOM}&number=100`, function (data, status) {
        $.get(url + "Room?room=" + CURRENTROOM, function (data, status) {
            var element2 = document.querySelector("#offerValue2")
            element2.innerHTML = data;
            lastOffer=data;
        })
    })

    await connection.invoke("SendMessageRoom", CURRENTROOM, result.value);
    button.disabled = true;

    var myInterval = setInterval(() => {
        --totalSecond;
        time.innerHTML = totalSecond;
        // button.disabled = false;
        if (totalSecond == 0) {
            totalSecond=10;
            clearInterval(myInterval);
             connection.invoke("SendWinnerMessageRoom", CURRENTROOM, "Game Over\n" + result.value + "is Winner!!!");
        }
    }, 1000);
}