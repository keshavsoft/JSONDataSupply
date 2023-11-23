let fs = require("fs");

let StartFunc = ({ req }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    try {
        if (fs.existsSync(req.file.path)) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "Images Folder not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = "Images Folder not found!";
    };

    console.log("ppppppppppp : ", LocalReturnData);
    return LocalReturnData;
};

module.exports = { StartFunc };
