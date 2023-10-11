let ServerSideCheckNoSync = ({ inItemName, inUserData, inConfigTableColumns, inObjectToInsert, inDataPK }) => {
    let LocalConfigTableColumns = inConfigTableColumns;

    let LocalTableColumnsForSaveCheck;
    let LocalRetTf = { KTF: true, KReason: "From ServerSideCheck" };
    let LocalReturnFromSwitch;

    LocalTableColumnsForSaveCheck = LocalConfigTableColumns.filter(LoopItem => {
        if ("ServerSide" in LoopItem) {
            return LoopItem.ServerSide.SaveCheck.Validate;
        };
    });
    // console.log("LocalTableColumnsForSaveCheck : ", LocalConfigTableColumns, LocalTableColumnsForSaveCheck);
    LocalTableColumnsForSaveCheck.forEach((LoopItemColumn) => {
        LocalReturnFromSwitch = LocalSwitchFunc({
            inUserData: inUserData,
            inColumnData: LoopItemColumn,
            inObjectToInsert,
            inUserPK: inDataPK
        });

        //console.log("inObjectToInsert : ", LocalReturnFromSwitch);

        //  console.log("LocalReturnFromSwitch : ", LocalReturnFromSwitch);
        if (LocalReturnFromSwitch.KTF === false) {
            LocalRetTf.KTF = false;
            LocalRetTf.KReason += ` - ${LocalReturnFromSwitch.KReason}`;
        };
    });

    return LocalRetTf;
};

module.exports = { ServerSideCheckNoSync };
