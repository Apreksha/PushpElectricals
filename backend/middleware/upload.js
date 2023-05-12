const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: "mongodb+srv://aprekshamathur456:Pankajaashi@cluster0.jqankv4.mongodb.net/pushpElectricals",
    //options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (request, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        if(match.indexOf(file.mimetype) === 1){
            const filename = `${file.orginalname}`;
            return filename;
        }
        return {
            bucketName: "photos",
            filename: `${file.orginalname}`
        }
    }
});

module.exports = multer({storage});