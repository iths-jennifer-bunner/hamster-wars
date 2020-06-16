const { Router } = require('express');
const { storage } = require('./../firebase');
const fileUpload = require("express-fileupload");
const router = new Router();
const fs = require('fs');

// app.use(fileUpload());



router.get("/:imgName", async (req, res) => {

    try {
        let img = await fs.readFile(`hamsters/${req.params.imgName}`);

        // let img = await storage.bucket().file(`hamsters/${req.params.imgName}`).download();
        // img = Buffer.concat(img);

        res.status(200).contentType("jpg").send(img);
        // res.send(req.params.imgName);
    }catch(e) {
        console.log(e);
        res.send('failed to load image')
    }
    
});


// router.post("/", async (rew, res) => {



// });
module.exports = router; 