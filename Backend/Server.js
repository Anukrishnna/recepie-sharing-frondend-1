const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

mongoose.connect('mongodb://localhost:27017/recipesDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('recipeUpdated', (recipe) => {
    socket.broadcast.emit('recipeUpdated', recipe);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));
