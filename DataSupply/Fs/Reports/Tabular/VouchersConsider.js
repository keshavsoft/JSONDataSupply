let CommonPullData = require("../PullData");

let Toggles = ({ inUserPK }) => {
    return startfuncWithInput({
        inUserPK,
        inKeysNeeded: ["FolderName", "FileName","ItemName","ColumnNameToPick","ItemNameConsider", "FromFolder", 
         "Active"]
    });
};

let startfuncWithInput = ({ inUserPK, inKeysNeeded }) => {
    let LocalReturnData = {
        Reports: {}
    };

    let LocalData = CommonPullData.ReturnDataFromJson({ inUserPK });

    Object.entries(LocalData).forEach(([key, value]) => {
            LocalReturnData.Reports[key] = {
                ReportName: key,
                VouchersConsiderObject: LoopTableColumnsWithKeysNeeded({
                    inVouchersConsider: value.VouchersConsider,
                    inKeysNeeded
                })
            };
        }
    );

    return LocalReturnData;
};

let LoopTableColumnsWithKeysNeeded = ({ inVouchersConsider, inKeysNeeded }) => {
    let LocalReturnObject = {};

    inVouchersConsider.forEach(LoopTableColumn => {
        LocalReturnObject[LoopTableColumn.pk] = {};

        inKeysNeeded.forEach(element => {
            LocalReturnObject[LoopTableColumn.pk][element] = LoopTableColumn[element];
        });
    });

    return LocalReturnObject;
};

module.exports = {
    Toggles
}