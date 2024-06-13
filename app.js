const express = require("express");
const mongoose = require("mongoose");
const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT} = require("./config/config");
const app = express();

const postRouter = require("./routes/postRoutes");

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// mongoose.connect(
//     // "mongodb://root:root@192.168.32.2:27017/?authSource=admin")
//     // "mongodb://root:root@mongo:27017/?authSource=admin")
//     mongoURL)
//     .then(() => console.log("Successfully connected to DB"))
//     .catch((e) => console.log("Error :",e));


const mongoConnection = () => mongoose.connect(
    // "mongodb://root:root@192.168.32.2:27017/?authSource=admin")
    // "mongodb://root:root@mongo:27017/?authSource=admin")
    mongoURL)
    .then(() => console.log("Successfully connected to DB"))
    .catch((e) => {
        console.log("Error :",e);
        setTimeout(mongoConnection, 5000);
    });


// to handle json
app.use(express.json());

// print hello world on home page
app.get("/", (req, res) => {
    res.send("<h1>Hello World Using Node + Mongo + Docker Compose</h1>");
});

// for testing load balancing
app.get("/api/v1", (req, res) => {
    res.send("<h1>Hello User...</h1>");
    console.log("It is running...");
});

mongoConnection();


// localhost:3000/posts
app.use("/api/v1/posts", postRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
