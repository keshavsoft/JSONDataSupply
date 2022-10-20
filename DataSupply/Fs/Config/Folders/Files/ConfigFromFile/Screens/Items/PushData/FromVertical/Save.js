//let CommonVerticalSave = require("../../../../../DataSupply/Vertical/Save");
//let CommonReturnDataFuncs = require("../../../../../DataSupply/ReturnDataFuncs");
let CommonTableFuncs = require("../../../../../../../../../CommonTableFuncs/Save");

let CheckAndSave = ({ inJsonConfig, inItemConfig, inDataPk, inPostData }) => {
    return new Promise((resolve, reject) => {
        let LocalUserPK = inDataPk;

        if (LocalUserPK > 0) {
            CommonTableFuncs.Save({ inJsonConfig, inItemConfig, inUserPK: LocalUserPK, inPostData }).then(PromiseData => {
                if (PromiseData.KTF) {

                    // let ReturnData = CommonReturnDataFuncs.VerticalSave({
                    //     inJsonConfig, inItemConfig, inPK: PromiseData.kPK,
                    //     inUserPK: LocalUserPK,
                    //     inPostData
                    // });

                    // if (ReturnData !== undefined) {
                    //     if (ReturnData.KTF) {
                    //         PromiseData.DataFromServer = ReturnData.DataFromServer;
                    //     };
                    // };

                    resolve(PromiseData);
                };
            }).catch(reject);
        };
    });
};

module.exports = {
    CheckAndSave
};