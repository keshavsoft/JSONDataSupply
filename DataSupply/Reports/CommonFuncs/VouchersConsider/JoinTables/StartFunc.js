let GlobalJoinTableFuncs = require("../../JoinTableFuncs");
let CommonPrepareBaseData = require("./PrepareBaseData");

let StartFunc = async ({ inData, inVouchersConsiderLoopObject, inUserPK }) => {
    let LocalReturnData = inData;

    if (inVouchersConsiderLoopObject.JoinTables !== undefined && inVouchersConsiderLoopObject.JoinTables.length > 0) {
        LocalJoinTablesObject = await CommonPrepareBaseData.StartFunc({
            inJoinTablesArray: inVouchersConsiderLoopObject.JoinTables,
            inUserPK
        });

        LocalReturnData = GlobalJoinTableFuncs.InsertData({
            inData,
            inJoinTableData: LocalJoinTablesObject,
            inVouchersConsiderColumns: inVouchersConsiderLoopObject.JoinTablesColumns
        });
    };

    return await LocalReturnData;
};

module.exports = { StartFunc }