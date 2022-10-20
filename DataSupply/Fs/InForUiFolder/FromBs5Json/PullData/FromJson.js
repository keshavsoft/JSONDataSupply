let CommonAbsolutePath = require("../../../../Fs/DataPath");
let fs = require("fs");

let FuncReturnAsObject = ({ inDataPK }) => {
    console.log("inDataPK : ", inDataPK);
    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    let LocalReturnObject = { KTF: false, JsonData: {} };
    let LocalDesignPath = `${GlobalDataPath}/${inDataPK}/ForUi/Bs5.json`;
    
    if (fs.existsSync(LocalDesignPath)) {
        let LocalDesignFile = fs.readFileSync(LocalDesignPath);

        LocalReturnObject.KTF = true;
        LocalReturnObject.JsonData = JSON.parse(LocalDesignFile);
    };

    return LocalReturnObject;
};


module.exports = { FuncReturnAsObject };