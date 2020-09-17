const express=require('express')
const socketio=require('socket.io')
const http=require('http')
const location=require('./data')
const router=require('./routes')

const PORT= process.env.PORT||5000

const app=express()
const server=http.createServer(app)
const io=socketio(server)

app.use(router)

const getApiAndEmit = async socket => {
    try {
      const res = await axios.get(
        "url"
      ); // Getting the location data  from the url
      location=res.data;
      socket.emit("FromAPI", location); // Emitting a new message. It will be consumed by the client
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  };

  io.on("connection", socket => {
    console.log("New client connected"), setInterval(
      () => getApiAndEmit(socket),
      5000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
  });
server.listen(PORT,()=>console.log(`server has started on port ${PORT}`))