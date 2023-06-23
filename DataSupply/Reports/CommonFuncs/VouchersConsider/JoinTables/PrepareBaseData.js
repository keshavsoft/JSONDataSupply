let CommonPullUserData = require("../../../../Fs/Config/Folders/Files/PullData/FromData");

const StartFunc = async ({ inJoinTablesArray, inUserPK, inJVarDataToInsert }) => {
    let LocalReturnObjectAtEnd = {};
    let LocalJoinTableArrayObject;
    let LocalJoinTableKey;

    if (inJoinTablesArray !== undefined) {
        let LocalToArray = await Promise.all(inJoinTablesArray.map(async LoopItemObject => {
            let LocalReturnObject = {};

            LocalJoinTableArrayObject = Object.values(LoopItemObject);
            LocalJoinTableKey = Object.keys(LoopItemObject);

            if (LocalJoinTableArrayObject[0].JsonConfig.UserFolderName === "Reports") {
              //  LocalReturnObject[LocalJoinTableKey[0]] = await LocalLedgerHelperFuncs.ReturnData.FromItemName({ inItemName: LoopItem, inUserPK, inJVarDataToInsert });
            } else {
                LocalReturnObject[LocalJoinTableKey[0]] = await CommonPullUserData.AsJsonAsync({
                    inJsonConfig: LocalJoinTableArrayObject[0].JsonConfig,
                    inUserPK
                });
            };

            return await LocalReturnObject;
        }));

        LocalToArray.forEach(element => {
            LocalReturnObjectAtEnd = { LocalReturnObjectAtEnd, ...element };
        });
    };

    return await LocalReturnObjectAtEnd;
};

module.exports = { StartFunc }