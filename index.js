const express = require("express");
const app = express();
const cors = require("cors");
const port = process.eventNames.PORT || 5000;
require("dotenv").config();

//MIddleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to our Add-to-Task App");
});

app.listen(port, () => {
    console.log(`Running server is ${port}`);
});
