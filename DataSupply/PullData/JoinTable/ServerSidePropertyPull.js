let ServerSidePropertyPull = ({ inOriginalValue, inServerSideKey, inJoinTableData }) => {
    if (inServerSideKey.hasOwnProperty("DefaultShowData")) {
        let LocalFilterObject = {};
        let LocalFindData;
        let LocalinJoinTableDataNeeded = inJoinTableData[inServerSideKey.DefaultShowData.JsonFileName];
        let LocalReturnData;
        let LocalReturnKey = inServerSideKey.DefaultShowData.RetColumnName;

        LocalFilterObject[inServerSideKey.DefaultShowData.CheckColumnName] = inOriginalValue;

        LocalFindData = _.find(LocalinJoinTableDataNeeded, LocalFilterObject);

        if (LocalFindData !== undefined) {
            if (LocalFindData.hasOwnProperty(LocalReturnKey)) {
                LocalReturnData = LocalFindData[LocalReturnKey];
            };
        };

        //  debug("LocalFilterObject : ", Object.keys(inJoinTableData), inServerSideKey.DefaultShowData.JsonFileName, inOriginalValue, LocalReturnData, LocalFilterObject);

        return LocalReturnData;
    };
};

let ServerSidePropertyPullFromDefaultShowData = ({ inOriginalValue, inDefaultShowData, inJoinTableData }) => {
    let LocalFilterObject = {};
    let LocalFindData;
    let LocalinJoinTableDataNeeded = inJoinTableData[inDefaultShowData.JsonFileName];
    let LocalReturnData;
    let LocalReturnKey = inDefaultShowData.RetColumnName;

    LocalFilterObject[inDefaultShowData.CheckColumnName] = inOriginalValue;

    LocalFindData = _.find(LocalinJoinTableDataNeeded, LocalFilterObject);

    if (LocalFindData !== undefined) {
        if (LocalFindData.hasOwnProperty(LocalReturnKey)) {
            LocalReturnData = LocalFindData[LocalReturnKey];
        };
    };

    return LocalReturnData;
};

module.exports = { ServerSidePropertyPull, ServerSidePropertyPullFromDefaultShowData };