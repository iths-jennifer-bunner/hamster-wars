const { Router } = require('express');
const { storage } = require('./../firebase');
const fileUpload = require("express-fileupload");
const router = new Router();

app.use(fileUpload());



router.get("/:imgName", async (req, res) => {

    let img = await storage.bucket().file(`hamsters/${req.params.imgName}`).download();
    img = Buffer.concat(img);

    res.status(200).contentType("jpg").send(img);
});


router.post("/", async (rew, res) => {



});
module.exports = router; 