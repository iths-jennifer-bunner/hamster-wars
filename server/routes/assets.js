//assets ska serva bilder
const { Router } = require("express");
const router = new Router();

const fs = require("fs");

router.get('/:img', async (req, res) => {
    
    let image = fs.createReadStream(`./hamsters/${req.params.img}`)
    image.pipe(res)
})

module.exports = router;