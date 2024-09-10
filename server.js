const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const studentRouter = require("./routes/officers.js")
dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  // This is still needed
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection success!");
});

app.use("/officer",studentRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
