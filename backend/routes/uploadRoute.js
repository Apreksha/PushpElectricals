const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), async (request, response) => {
    if(request.file === undefined)
        return response.send("You must select a file");
    
    //const imgUrl = `http://localhost:8000/file/${request.file.filename}`;    
    const imgUrl = `http://localhost:8000/file/${request.file.filename}`;
    return response.send(imgUrl);
});

module.exports = router;