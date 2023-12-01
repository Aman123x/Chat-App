const express = require('express');

// A library to create server 

const { createServer } = require("http");
const {Server} =require("socket.io");

// Intialization of express server

const app =express()

// Creation of an http server

const httpServer = createServer(app);

// Creating a bridge between clients and this server

const io=new Server(httpServer,{
    cors:{
        origin:'http://127.0.0.1:5500',
    },
});

io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`);

    //Getting this from client
    socket.on("username enter",(data)=>{
        console.log("username enter",data);

        //Send the message to all the clients
        io.emit("username enter",data);
    });  

    socket.on("message",(data)=>{
        console.log("Message is being sent to all the clients");

        io.emit("message",data);
    });

    socket.on("username left",(username)=>{
        io.emit("username left",username);
    });

});

httpServer.listen(3000,()=>{
    console.log("Server listening on PORT 3000");
})