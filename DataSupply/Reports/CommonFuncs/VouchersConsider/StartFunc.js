let CommonVouchersConsiderBaseData = require("./BaseData/StartFunc");
let CommonVouchersConsiderTransform = require("./Transform");
let CommonJoinTables = require("./JoinTables/StartFunc");

let StartFunc = async ({ inVouchersConsiderLoopObject, inUserPK }) => {
    try {
        let LocalDataArrayToPullFrom = [];
        let LocalDataFromTableJoin;

        LocalDataArrayToPullFrom = await CommonVouchersConsiderBaseData.StartFunc({
            inVouchersConsiderLine: inVouchersConsiderLoopObject,
            inUserPK
        });

        LocalDataTransformedToPullFrom = CommonVouchersConsiderTransform.Transform({
            inColumns: inVouchersConsiderLoopObject.Columns,
            inData: LocalDataArrayToPullFrom
        });

        LocalDataFromTableJoin = await CommonJoinTables.StartFunc({
            inData: LocalDataTransformedToPullFrom,
            inVouchersConsiderLoopObject, inUserPK
        });

        return await LocalDataFromTableJoin;
    } catch (error) {
        console.log("error : ", error);
    };
};

module.exports = { StartFunc }