const express = require('express');
const urlSchema = require("../models/url");
const shortid = require("shortid");
const router = express.Router();
const validator = require("validator");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();



//get all
router.get('/hello', (req, res) => {
    res.send(["hello world"]);
})
router.get('/', (req, res) => {
    res.send("hello world");
})
// //gives redirect link to frontend
// router.get('/:shortId', async (req, res) => {
//     const shortId = req.params.shortId;
//     if (shortId === '') {
//         throw new Error('id must be a non-empty string');
//     }
//     else {
//         try {
//             const sid = req.params.shortId;
//             console.log("req.params.shortId in get method is ", req.params.shortId);
//             console.log("shortId in get method is ", shortId);
//             console.log("sid in get method is ", sid);

//             const data = await urlSchema.findOneAndUpdate(
//                 { shortId }, {
//                 $push: {
//                     visitInfo: { timestamp: Date.now() }
//                 }
//             }, { new: true });
//             console.log(data);

//             console.log("data is: ",data);  
//             res.status(302).redirect(data.redirectUrl);
//             // res.send(data);
//         } catch (error) {
//             res.send(error)
//             //console.log(error)
//         }
//     }
// })
// //redirect
router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    if (shortId === '') {
        throw new Error('id must be a non-empty string');
    }
    else {
        try {
            const sid = req.params.shortId;
            console.log("req.params.shortId in get method is ", req.params.shortId);
            console.log("shortId in get method is ", shortId);
            console.log("sid in get method is ", sid);

            const data = await urlSchema.findOneAndUpdate(
                { shortId }, {
                $push: {
                    visitInfo: { timestamp: Date.now() }
                }
            }, { new: true });
            console.log(data);

            console.log("data is: ", data);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");

            res.status(302).redirect(data.redirectUrl);
            // res.send(data);
        } catch (error) {
            res.send(error)
            //console.log(error)
        }
    }
})


//create shorthandId
router.post('/', async (req, res) => {
    const body = req.body;
    if (!body.redirectUrl) {
        return res.status(400).json({ error: "url is required" });
    }

    if (!validator.isURL(body.redirectUrl)) {
        return res.status(400).json({ error: "invalid url format" });
    }

    // rest of the code
    console.log("Generating short url for: ", req.body.redirectUrl)
    // console.log("Generating short url for: ", req.body.redirectUrl)
    //   const body = req.body;
    if (!body.redirectUrl) {
        return res.status(400).json({ error: "url is required" });
    }
    const shortUrlId = shortid(8);
    console.log("shortUrlId in controller.js: ", shortUrlId);
    const newUrl = new urlSchema({
        shortId: shortUrlId,
        redirectUrl: body.redirectUrl,
        visitInfo: []
    })
    await newUrl.save();
    console.log(" new url in controller.js: ", newUrl);
    // return res.json({ id: shortUrlId })
    return res.send({
        id: newUrl.shortId,
        redirectUrl: newUrl.redirectUrl,
        backendUrl: `${process.env.Backend_URL}/url/${newUrl.shortId}`
    })

});


//analytics
router.get('/analytics/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const url = await urlSchema.find({ shortId: shortId });
    console.log(url)
    res.send({
        totalClicks: url[0].visitInfo.length,
        analytics: url[0].visitInfo
    })
})


module.exports = router;