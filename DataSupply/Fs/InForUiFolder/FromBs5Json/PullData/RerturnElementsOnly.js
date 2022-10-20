let CommonFromJson = require("./FromJson");

let StartFunc = ({ inDataPK }) => {
    let LocalReturnObject = { KTF: false, JsonData: {}, KReason: "" };
    let LocalCommonFromJson = CommonFromJson.FuncReturnAsObject({ inDataPK });
    
    if (LocalCommonFromJson.KTF) {
        if ("JsonData" in LocalCommonFromJson) {
            if ("Folders" in LocalCommonFromJson.JsonData) {
                if ("Elements" in LocalCommonFromJson.JsonData.Folders) {
                    LocalReturnObject.KTF = true;
                    LocalReturnObject.JsonData = LocalCommonFromJson.JsonData.Folders.Elements;
                };
            };
        };
    };

    return LocalReturnObject;
};


module.exports = { StartFunc };