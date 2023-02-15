let CommonFromFromJson = require("../PullDataFromFile/FromJson");

let StartFunc = async ({ inDataPK }) => {
    let localinDataPK = inDataPK;

    let LocalReturnData = { KTF: false };


    let CommonFromReportsData = await CommonFromFromJson.StartFunc({ inDataPK: localinDataPK });
    // console.log("CommonFromReportsData", CommonFromReportsData);
    if (CommonFromReportsData.KTF === false) {
        LocalReturnData.KReason = CommonFromReportsData.KReason;
        return await LocalReturnData;
    };

    LocalReturnData.JsonData = LocalBuildJsonData({ inJsonData: CommonFromReportsData.JsonData });
    LocalReturnData.KTF = true;
    // console.log("LocalReturnData", LocalReturnData.JsonData.Reports);

    return await LocalReturnData;
};

let LocalBuildJsonData = ({ inJsonData }) => {
    let LocalReturnObject = {};
    LocalReturnObject.Reports = {};

    Object.entries(inJsonData).forEach(
        ([key, value]) => {
            LocalReturnObject.Reports[key] = {};
            LocalReturnObject.Reports[key].VouchersConsider = {};

            Object.entries(value.VouchersConsider).forEach(
                ([key, value]) => {
                    console.log("key",key);

                });

            // value.VouchersConsider.forEach(element => {
            //     LocalReturnObject.Reports[key].VouchersConsider[element] = {
            //         FolderName: element.Columns
            //     };

            // });
        }
    );

    return LocalReturnObject;
};

let MockFunc = () => {
    StartFunc({
        inDataPK: 1022
    }).then((PromiseData) => {
        // console.log("PromiseData--", Object.keys(PromiseData));
    })
};
// MockFunc();


module.exports = { StartFunc };