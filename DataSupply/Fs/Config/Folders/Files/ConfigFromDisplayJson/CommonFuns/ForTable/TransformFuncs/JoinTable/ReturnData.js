let GlobalServerSidePropertyPull = require("./ServerSidePropertyPull");

let StartFunc = ({ inTableColumnsArray, inOriginalValue, inProperty, inLocalJoinTableData }) => {
    let LocalFilterObject = {};
    let LocalReturnValue = inOriginalValue;
    let LocalLoopValue;
    LocalFilterObject.DisplayName = inProperty;

    LocalFilterColumnObject = _.find(inTableColumnsArray, LocalFilterObject);
    if (LocalFilterColumnObject.hasOwnProperty("ServerSide")) {
        LocalLoopValue = GlobalServerSidePropertyPull.ServerSidePropertyPull({ inOriginalValue, inServerSideKey: LocalFilterColumnObject.ServerSide, inJoinTableData: inLocalJoinTableData });
        if (LocalLoopValue !== undefined) {
            LocalReturnValue = LocalLoopValue;
        }
    };


    return LocalReturnValue;
};

module.exports = { StartFunc };