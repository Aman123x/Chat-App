// Client side
// Connection between client and server established

const socket =io('http://localhost:3000');

let username="";

//To join chatroom

document.getElementById("join-btn").addEventListener("click",(event)=>{
    event.preventDefault();
    username=document.getElementById("username-input").value;
    
    if(username.trim()!==""){
        document.querySelector(".form-username").style.display="none";

        document.querySelector(".chatroom-container").style.display="block";

        document.querySelector(".chatroom-header").innerText=`Chatroom - ${username}`;

        //from client to server
        socket.emit("username enter", username);

    }
    else{
        alert("Username cannot be empty");
    }
});

document.getElementById("send-btn").addEventListener("click",(event)=>{
    event.preventDefault();

    const data={
        username:username,
        message:document.getElementById("message-input").value
    }

    //Frontend --> add the message on screen
    addMessage(data,true);

    // Socket --> Send the message to server
    socket.emit("message",data);

});

function addMessage(data,flag){
    var msgDiv=document.createElement("div");
    msgDiv.innerText=`${data.username}: ${data.message}`;

    if(flag){
        msgDiv.setAttribute("class","message sent");
    }
    else{
        msgDiv.setAttribute("class","message received");
    }

    document.querySelector("#messages-container").appendChild(msgDiv);
}

// For exit

document.getElementById("exit-btn").addEventListener("click",()=>{


    socket.emit("username left",username);
});

socket.on("username enter",(username)=>{
    var msgDiv =document.createElement("div");
    msgDiv.innerText=`${username} has entered`;

    document.querySelector("#messages-container").appendChild(msgDiv);
});

socket.on("message",(data)=>{
    if(data.username!==username){
        addMessage(data,false);
    }
});

socket.on("username left",(data)=>{
    if(data!==username){
        var msgDiv=document.createElement("div");
        msgDiv.innerText= `${data} has left!`

        document.querySelector("#messages-container").appendChild(msgDiv);
    }
    else{
        var msgDiv=document.createElement("div");
        msgDiv.innerText= `You have left!`;

        document.querySelector("#messages-container").appendChild(msgDiv);
    }
});