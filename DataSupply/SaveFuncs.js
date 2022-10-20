const toNumbers = arr => arr.map(Number);

let GeneratePk = ({ inDataWithKey }) => {
    let LocalNewPk = 1;
    let LocalPkArray = toNumbers(Object.keys(inDataWithKey));

    if (LocalPkArray.length > 0) {
        LocalNewPk = Math.max(...LocalPkArray) + 1;
    };

    return LocalNewPk;
};

let LocalTransformObjectBeforeSaving = ({ inDisplayColumns, inObjectToInsert }) => {
    let LocalObject = {};
    
    inDisplayColumns.forEach(loopitem => {
        if (inObjectToInsert.hasOwnProperty(loopitem.DataAttribute)) {
            if (inObjectToInsert[loopitem.DataAttribute] === undefined) {
                LocalObject[loopitem.DataAttribute] = loopitem.DefaultValue;
            } else {
                LocalObject[loopitem.DataAttribute] = inObjectToInsert[loopitem.DataAttribute];

                if (loopitem.hasOwnProperty("ServerSide")) {
                    if (loopitem.ServerSide.hasOwnProperty("TransformBeforeSave")) {
                        switch (loopitem.ServerSide.TransformBeforeSave.Type) {
                            case "Number":
                                LocalObject[loopitem.DataAttribute] = parseInt(inObjectToInsert[loopitem.DataAttribute]);

                                break;
                            case "Decimal":
                                LocalObject[loopitem.DataAttribute] = parseFloat(inObjectToInsert[loopitem.DataAttribute]);

                                break;
                            default:
                                LocalObject[loopitem.DataAttribute] = inObjectToInsert[loopitem.DataAttribute];
                                break;
                        };
                    };
                };
            };
        };
    });

    LocalObject.DateTime = new Date();

    return LocalObject;
};

let InsertUserInfoWithDateStamp = ({ inObjectToInsert, inUserPK }) => {
    let LocalObject = JSON.parse(JSON.stringify(inObjectToInsert));

    LocalObject.DateTime = new Date();
    LocalObject.UserPK = inUserPK;

    return LocalObject;
};

module.exports = { GeneratePk, LocalTransformObjectBeforeSaving, InsertUserInfoWithDateStamp };
