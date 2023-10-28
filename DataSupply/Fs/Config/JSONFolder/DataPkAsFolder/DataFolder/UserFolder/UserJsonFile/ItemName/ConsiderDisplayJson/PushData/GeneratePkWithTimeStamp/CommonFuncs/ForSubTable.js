function getDifferenceInDays(date1, date2) {
    const LocalHoursDiff = date1 - date2;
    return LocalHoursDiff / 1000;
}

let LocalFuncForConfigColumns = ({ inTableColumns, inMainKey, inDataToInsert, inDirectoriesWithDataAsTree }) => {
    let LocalTableColumns = inTableColumns;

    let LocalInsertFilter = LocalTableColumns.filter(element => element.ServerSide.SaveCheck.Validate);

    let LocalReturnArray = LocalInsertFilter.map(element => {
        let LoopFolderName = element.ServerSide.DefaultShowData.FolderName;
        let LoopFileName = element.ServerSide.DefaultShowData.FileName;
        let LoopItemName = element.ServerSide.DefaultShowData.ItemName;
        let LoopCheckColumnName = element.ServerSide.DefaultShowData.CheckColumnName;
        let LocalFilterString = element.ServerSide.DefaultShowData.FilterString;

        let LocalMinFloat = element.ServerSide.DefaultShowData.MinFloat;
        let LocalMaxFloat = element.ServerSide.DefaultShowData.MaxFloat;

        let LoopItemData = inDirectoriesWithDataAsTree[LoopFolderName][LoopFileName][LoopItemName];
        const arr = Object.values(LoopItemData).map(LoopValues => new Date(LoopValues[inMainKey][LoopCheckColumnName]));

        if (arr.length > 0) {
            const maxDate = new Date(Math.max.apply(null, arr));
            const dateDiffHours = getDifferenceInDays(new Date(inDataToInsert[element.DataAttribute]), maxDate);

            // console.log("arr : ", arr, dateDiffHours, LocalMinFloat, LocalMaxFloat);

            if ((dateDiffHours > LocalMinFloat && dateDiffHours < LocalMaxFloat) === false) {
                return {
                    KInfo: `Maximum Date : ${maxDate}, HoursDiff : ${dateDiffHours}`,
                    DisplayName: element.DisplayName,
                    DataAttribute: element.DataAttribute,
                    ServerSideCheck: true
                };
            };

        };
        // let LoopInsideFilter = arr.find(LoopValues => getDifferenceInDays(new Date(inDataToInsert[element.DataAttribute]), new Date(LoopValues[inMainKey][LoopCheckColumnName])) > LocalFilterString);


        // if (typeof LoopInsideFilter === "undefined") {
        //     return {
        //         DisplayName: element.DisplayName,
        //         DataAttribute: element.DataAttribute,
        //         ServerSideCheck: false
        //     };
        // };


        return {
            DisplayName: element.DisplayName,
            DataAttribute: element.DataAttribute,
            ServerSideCheck: false
        };

    });

    return LocalReturnArray;
};

let LocalFuncForConfigColumns1 = ({ inTableColumns, inMainKey, inDataToInsert, inDirectoriesWithDataAsTree }) => {
    let LocalTableColumns = inTableColumns;

    let LocalInsertFilter = LocalTableColumns.filter(element => element.ServerSide.SaveCheck.Validate);

    let LocalReturnArray = LocalInsertFilter.map(element => {
        let LoopFolderName = element.ServerSide.DefaultShowData.FolderName;
        let LoopFileName = element.ServerSide.DefaultShowData.FileName;
        let LoopItemName = element.ServerSide.DefaultShowData.ItemName;
        let LoopCheckColumnName = element.ServerSide.DefaultShowData.CheckColumnName;
        let LocalFilterString = element.ServerSide.DefaultShowData.FilterString;

        let LoopItemData = inDirectoriesWithDataAsTree[LoopFolderName][LoopFileName][LoopItemName];
        const arr = Object.values(LoopItemData);

        let LoopInsideFilter = arr.find(LoopValues => getDifferenceInDays(new Date(inDataToInsert[element.DataAttribute]), new Date(LoopValues[inMainKey][LoopCheckColumnName])) > LocalFilterString);

        // const maxDate = new Date(Math.max.apply(null, dates));

        if (typeof LoopInsideFilter === "undefined") {
            return {
                DisplayName: element.DisplayName,
                DataAttribute: element.DataAttribute,
                ServerSideCheck: false
            };
        };
        return {
            DisplayName: element.DisplayName,
            DataAttribute: element.DataAttribute,
            ServerSideCheck: true
        };
    });

    return LocalReturnArray;
};

let StartFunc = ({ inConfigData, inDataToInsert, inDirectoriesWithDataAsTree }) => {
    let LocalConfigData = inConfigData;
    let k2 = [];
    if ("SubTableColumns" in LocalConfigData) {
        let LocalSubTableColumns = LocalConfigData.SubTableColumns;

        k2 = Object.entries(LocalSubTableColumns).map(
            ([key, value]) => {
                if (key in inDataToInsert) {

                    let k1 = LocalFuncForConfigColumns({
                        inTableColumns: value.TableColumns,
                        inMainKey: key,
                        inDataToInsert: inDataToInsert[key], inDirectoriesWithDataAsTree
                    });

                    // return { [key]: k1 };

                    return { MainKey: key, SubTableColumns: k1 };
                };

                return { MainKey: key, SubTableColumns: [] };
                // return { [key]: {} };
            }
        );
    }
    // let LocalSubTableColumns = LocalConfigData.SubTableColumns;

    // let k2 = Object.entries(LocalSubTableColumns).map(
    //     ([key, value]) => {
    //         if (key in inDataToInsert) {

    //             let k1 = LocalFuncForConfigColumns({
    //                 inTableColumns: value.TableColumns,
    //                 inMainKey: key,
    //                 inDataToInsert: inDataToInsert[key], inDirectoriesWithDataAsTree
    //             });

    //             // return { [key]: k1 };

    //             return { MainKey: key, SubTableColumns: k1 };
    //         };

    //         return { MainKey: key, SubTableColumns: [] };
    //         // return { [key]: {} };
    //     }
    // );

    return k2;
};

module.exports = { StartFunc };
