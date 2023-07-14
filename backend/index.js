const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
const urlSchema = require("./models/url");
const uri = process.env.Mongo_URL;
// const cors = require("cors");
const urlRoute = require("./routes/urlRoute");
// app.use(cors());




// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/url", urlRoute);


app.get('/', (req, res) => {
    const allUrls = urlSchema.find({});
    console.log("start")

    res.send("hello world")
})
// app.get("/test", async (req, res) => {
//     const allUrls = urlSchema.find({});
//     return res.render(`
//     <html>
//     <head></head>
//     <body>
//     <ol>
//     ${allUrls.map((url) => `<li>${url.shortId}-</li>`)
//         }
//     </ol>
//     </body>
//     </html>

//     `);
// })
connect = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: true
    };
    try {
        await mongoose.connect(uri, connectionParams);
        console.log("connected to database successfully");
    } catch (error) {
        console.log("could not connect to database.", error);
    }
};

connect();
const port = process.env.PORT || 8000;
app.listen((port), (req, res) => { console.log(`Server is running on port ${port}`) });