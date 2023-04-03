const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Images");
    },
    filename: function (req, file, cb) {
        console.log("req : ", req.KeshavSoft, file);
        //  let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        //cb(null, Date.now() + ext);
        //  cb(null, Date.now() + path.extname(file.originalname));
        //cb(null, req.body.nspeakers + path.extname(file.originalname));

        // cb(null, req.KeshavSoft + path.extname(file.originalname));
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

module.exports = upload;
