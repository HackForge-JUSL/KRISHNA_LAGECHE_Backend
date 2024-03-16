import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
    
import Connection from './database/db.js';
import router from './routes/route.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const PORT= process.env.PORT || 8000;
const app=express();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/',router);

const server = http.createServer(app);

const io = new Server(server, { cors: true });

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
    console.log(`Socket Connected`, socket.id);
    socket.on("room:join", (data) => {
      const { email, room } = data;
      emailToSocketIdMap.set(email, socket.id);
      socketidToEmailMap.set(socket.id, email);
      io.to(room).emit("user:joined", { email, id: socket.id });
      socket.join(room);
      io.to(socket.id).emit("room:join", data);
    });
  
    socket.on("user:call", ({ to, offer }) => {
      io.to(to).emit("incomming:call", { from: socket.id, offer });
    });
  
    socket.on("call:accepted", ({ to, ans }) => {
      io.to(to).emit("call:accepted", { from: socket.id, ans });
    });
  
    socket.on("peer:nego:needed", ({ to, offer }) => {
      console.log("peer:nego:needed", offer);
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });
  
    socket.on("peer:nego:done", ({ to, ans }) => {
      console.log("peer:nego:done", ans);
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
});


server.listen(PORT,()=> console.log(`Server is running successfully on PORT ${PORT}`));

Connection();
