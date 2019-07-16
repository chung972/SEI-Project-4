const express = require('express');
const router = express.Router();
const chatboardsCtrl = require('../../controllers/chatboards');

// mounted with /api/chatboards
router.get("/", chatboardsCtrl.index);
router.post("/", chatboardsCtrl.create);


module.exports = router;