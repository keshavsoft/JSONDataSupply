let CommonTemplateFromFileNameOnly = require("../../../../../../../GeneralFuns/Insert/Bulk/TemplateFromFileNameOnly");
let CommonPullData = require("../../../../PullData/From-ConfigFromFile");
let CommonPushData = require("../../../../PushData/To-ConfigFromFile");

let FromTemplate = async ({ inJsonConfig, inItemName, inUserPK, inFirstRow }) => {
    let LocalReturnData = { KTF: false, LocalCreateItem: "" };

    try {
        let LocalDataFromJSON = await CommonPullData.AsJsonAsync({ inJsonConfig, inUserPK });

        if (LocalDataFromJSON !== undefined) {
            let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));
            let LocalReturnFromPush;

            let LocalFromGeneral = CommonTemplateFromFileNameOnly.StartFunc({
                inUserPK, inJsonConfig,
                inItemName
            });

            if (LocalFromGeneral.KTF) {
                if (inItemName in LocalDataFromJSONObject === false) {
                    LocalDataFromJSONObject[inItemName] = LocalFromGeneral.KData;
                    
                    LocalReturnFromPush = await CommonPushData.AsAsync({
                        inJsonConfig, inUserPK,
                        inOriginalData: LocalDataFromJSON,
                        inDataToUpdate: LocalDataFromJSONObject
                    });

                    if (LocalReturnFromPush.KTF) {
                        LocalReturnData.KTF = true;
                    };
                } else {
                    LocalReturnData.KError = `Item Name already found in display.json : ${inItemName}`;
                };
            };
        };
    } catch (error) {
        console.log("error : ", error);
    };

    return await LocalReturnData;
};

module.exports = {
    FromTemplate
};