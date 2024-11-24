const express = require("express");
const { createQueue, listQueues, deleteQueue, getQueueDetails} = require("../controllers/queueController");
const router = express.Router();


router.post("/", createQueue);
router.get("/", listQueues);
router.delete('/:queueId', deleteQueue);
router.get('/:queueId', getQueueDetails);

module.exports = router;
