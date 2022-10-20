let CommonPullDataReports = require("../../Fs/Reports/PullData");
let CommonPushDataReports = require("../../Fs/Reports/PushData");

exports.Single = async ({ inItemConfig, inFromName, inToName, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalItemName = inItemConfig.inItemName;
        let LocalPkName = parseInt(inItemConfig.inPkName);
        let localColumns = "Columns";
        let LocalDataFromJSON = CommonPullDataReports.ReturnDataFromJson({ inUserPK });
        let LocalUpdatedJson = JSON.parse(JSON.stringify(LocalDataFromJSON));
        let LocalTableColumnsArray = LocalUpdatedJson[LocalItemName].TableColumns;

        let LocalFromDataNeeded = LocalTableColumnsArray.find(element => {
            if (typeof element.pk === "string") {
                return element.pk === inFromName;
            } else {
                return element.pk === parseInt(inFromName);
            };
        });

        let LocalNewColumnData = JSON.parse(JSON.stringify(LocalFromDataNeeded));
        let LocalNewColumnpk = Math.max(...LocalTableColumnsArray.map(Loopitem => parseInt(Loopitem.pk))) + 1;

        LocalNewColumnData.DisplayName = inToName;
        LocalNewColumnData.DataAttribute = inToName;
        LocalNewColumnData.pk = LocalNewColumnpk;
        LocalTableColumnsArray.push(LocalNewColumnData);

        return await CommonPushDataReports.PushDataAsync({ inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalUpdatedJson });
    };
};