let Common = require("../Reports/Ledger/Show");

Common.ShowDataWithOutFilters({ inLedgerName: "Purchases", inUserPK: 1022 }).then(PromiseData => {
    console.log("PromiseData : ", PromiseData.DataFromServer[0].KData.TableData[0]);
});