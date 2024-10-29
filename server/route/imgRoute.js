const express = require("express");
const router = express.Router();
const path = require('path');
router.use('/', express.static(path.join(__dirname, '../img')));

//라우터 추가
// app.get("/", (req, res) => {
//     console.log(req.file);
//     res.json(req.file);
// });
module.exports = router;