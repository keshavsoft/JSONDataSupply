let CommonTableColumnJson = require("../Json/TableColumn.json");

class LocalKeshavSoftCrud {
    static SwapData = {
        LoopRecursiveObject: ({ inData, inJson }) => {
            if (inData !== undefined) {
                Object.entries(inJson).forEach(
                    ([key, value]) => {
                        if (typeof value === 'object') {
                            if (key !== "DefaultValue") {
                                this.SwapData.LoopRecursiveObject({ inData: inData[key], inJson: value });
                            };
                        } else {
                            if (inData.hasOwnProperty(key)) {
                                inData[key] = value;
                            };
                        }
                    }
                );
            };
        },
        CallLoopStart: ({ inData, inJson }) => {
            if (typeof inJson === 'object') {
                this.SwapData.LoopRecursiveObject({ inData, inJson });
            }
        }
    }
};


let FixAll = ({ inTableColumns }) => {
    return inTableColumns.map(element => {
        return FixSingleColumn({ inObjectToFix: element });
    });
};

let FixSingleColumn = ({ inObjectToFix }) => {
    let LocalReturnObject = JSON.parse(JSON.stringify(CommonTableColumnJson));

    LocalKeshavSoftCrud.SwapData.CallLoopStart({ inData: LocalReturnObject, inJson: inObjectToFix });

    return LocalReturnObject;
};

let FChange = ({ inObjToChange, inObjWithValues }) => {
    Object.entries(inObjToChange).forEach(
        ([key, value]) => {
            if (key in inObjWithValues) {
                if (typeof value === "object") {
                    FChange({
                        inObjToChange: inObjToChange[key],
                        inObjWithValues: inObjWithValues[key]
                    });
                } else {
                    inObjToChange[key] = inObjWithValues[key];
                };

            };
        });
};

module.exports = { FixAll, FixSingleColumn };