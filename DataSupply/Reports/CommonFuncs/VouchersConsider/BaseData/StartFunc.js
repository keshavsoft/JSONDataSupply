let CommonPullDataFromVouchersConsiderJsonFileName = require("./PullDataFromVouchersConsiderJsonFileName");

let LocalClubData = ({ inOriginalDataAsArray, inGridColumnName }) => {
    let LocalInvGridObject = {};
    let LocalReturnArray = [];
    let LocalInvGridArray = [];

    inOriginalDataAsArray.forEach(LoopElement => {
        LocalInvGridObject = LoopElement[inGridColumnName];

        LocalInvGridArray = InvRowObject({ inInvGridObject: LocalInvGridObject, inGridColumnName, inHeadObject: LoopElement });
        LocalReturnArray = LocalReturnArray.concat(LocalInvGridArray);
    });

    return LocalReturnArray;
};

let InvRowObject = ({ inInvGridObject, inGridColumnName, inHeadObject }) => {
    let LocalInvGridObjectTransformed;
    let LocalInvGridRow;
    let LocalReturnArray = [];
    let LocalHeadObject;

    for (const GridPropertyPK in inInvGridObject) {
        LocalHeadObject = { ...inHeadObject };
        //  _.clone(inHeadObject);
        LocalInvGridObjectTransformed = {};
        LocalInvGridRow = inInvGridObject[GridPropertyPK];

        for (const InvGridProperty in LocalInvGridRow) {
            LocalInvGridObjectTransformed[`${inGridColumnName}.${InvGridProperty}`] = LocalInvGridRow[InvGridProperty];
        };

        LocalReturnArray.push(Object.assign(LocalHeadObject, LocalInvGridObjectTransformed));
    };

    return LocalReturnArray;
};

let StartFunc = async ({ inVouchersConsiderLine, inUserPK }) => {
    let LocalDataFromVouchersConsider;
    let LocalReturnArray = [];

    LocalDataFromVouchersConsider = await CommonPullDataFromVouchersConsiderJsonFileName.StartFunc({
        inVouchersConsiderLine,
        inUserPK
    });

    if (LocalDataFromVouchersConsider.KTF) {
        if (inVouchersConsiderLine.ColumnNameToPick.trim() === "") {
            LocalReturnArray = LocalDataFromVouchersConsider.KResult;
        } else {
            LocalReturnArray = LocalClubData({
                inOriginalDataAsArray: LocalDataFromVouchersConsider.KResult,
                inGridColumnName: inVouchersConsiderLine.ColumnNameToPick
            });
        };
    };

    return await LocalReturnArray;
};

module.exports = { StartFunc }