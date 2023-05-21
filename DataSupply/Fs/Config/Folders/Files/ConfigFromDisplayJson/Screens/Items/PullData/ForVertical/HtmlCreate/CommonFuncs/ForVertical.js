let CommonDefaultValue = require("../../../../../../../../../../../ToUi/CalculateDefaultValue");

let StartFunc = ({ inJsonConfig, inItemConfig, inDisplayData, inUserData }) => {
    let LocalReturnArrayObject = { HTMLControlType: "Vertical", KData: {} };

    let LocalUserDataNeeded = inUserData;

    LocalReturnArrayObject.KData.TableColumns = LocalForTableColumns({
        inDisplayData,
        inUserData: LocalUserDataNeeded
    });

    LocalReturnArrayObject.KData.TableInfo = LocalForTableInfo({
        inDisplayData,
        inJsonConfig,
        inItemConfig
    });

    return LocalReturnArrayObject;
};

let LocalForTableInfo = ({ inDisplayData, inJsonConfig, inItemConfig }) => {
    let LocalReturnTableInfo = inDisplayData.TableInfo;

    if (!LocalReturnTableInfo.hasOwnProperty("DataAttributes")) { LocalReturnTableInfo.DataAttributes = {} };

    LocalReturnTableInfo.DataAttributes.JsonConfig = JSON.stringify(inJsonConfig);
    LocalReturnTableInfo.DataAttributes.ItemConfig = JSON.stringify(inItemConfig);

    return LocalReturnTableInfo;
};

let LocalForTableColumns = ({ inDisplayData, inUserData }) => {
    let LocalReturnTableColumns = [];

    let LocalUserDataNeeded = inUserData;

    let LocalColumnsWithCreateNew = inDisplayData.TableColumns.filter(element => element.CreateNew);

    LocalReturnTableColumns = LocalColumnsWithCreateNew;

    CommonDefaultValue.CalculateDefaultValue({
        inColumns: LocalReturnTableColumns,
        inData: LocalUserDataNeeded,
    });

    return LocalReturnTableColumns;
};


module.exports = { StartFunc };
