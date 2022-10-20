let LocalControlTypeFuncs = {
    Number: {
        Max: ({ inLoopData, inData }) => {
            if (typeof inData === "object") {
                LocalControlTypeFuncs.Number.CommonFuncs.Max.FormDataAsObject({
                    inLoopData,
                    inDataAsObject: inData
                });
            } else {

            };
        },
        MaxOnDate: ({ inLoopData, inData, inPostData }) => {
            with (inLoopData) {
                let jVarLocalNumberArray;
                let LocalMaxNumber;
                let LocalFilteredData;

                if (inData.length === 0) {
                    if (ServerSide.DefaultValueCreate.hasOwnProperty("StartValue")) {
                        DefaultValue = ServerSide.DefaultValueCreate.StartValue;
                    } else {
                        DefaultValue = 1;
                    };
                } else {
                    LocalFilteredData = Object.values(inData).filter(element => element.Date === inPostData.Date);

                    jVarLocalNumberArray = LocalFilteredData.map(element => Number(element[DataAttribute]));
                    LocalMaxNumber = Math.max(...jVarLocalNumberArray);

                    if (ServerSide.DefaultValueCreate.hasOwnProperty("IncrementBy")) {
                        LocalMaxNumber += Number(ServerSide.DefaultValueCreate.IncrementBy);
                    } else {
                        LocalMaxNumber += 1;
                    };
                    DefaultValue = LocalMaxNumber;
                };
            };
        },
        CommonFuncs: {
            Max: {
                FormDataAsObject: ({ inLoopData, inDataAsObject }) => {
                    let LocalDefaultValue;
                    with (inLoopData) {
                        let jVarLocalNumberArray;
                        let LocalIncrementBy = 1;

                        if (Object.keys(inDataAsObject).length === 0) {
                            //  console.log("1------", inLoopData.DefaultValue);
                            if (ServerSide.DefaultValueCreate.hasOwnProperty("StartValue")) {
                                DefaultValue = ServerSide.DefaultValueCreate.StartValue;
                            } else {
                                DefaultValue = 1;
                            };
                        } else {
                            //console.log("2------", inLoopData.DefaultValue);
                            jVarLocalNumberArray = Object.values(inDataAsObject).map(element => {
                                //console.log("1--", element[DataAttribute], typeof element[DataAttribute]);
                                if (typeof element[DataAttribute] === "string") {
                                    if (isNaN(Number(element[DataAttribute])) === false) {
                                        return Number(element[DataAttribute]);
                                    } else {
                                        return 0;
                                    };
                                    //console.log("1--",);

                                } else {
                                    return element[DataAttribute];
                                };

                            });

                            if (ServerSide.DefaultValueCreate.hasOwnProperty("IncrementBy")) {
                                LocalIncrementBy = Number(ServerSide.DefaultValueCreate.IncrementBy);
                            };
                            //console.log("1------", LocalIncrementBy, Math.max(...jVarLocalNumberArray));
                            LocalDefaultValue = Math.max(...jVarLocalNumberArray) + LocalIncrementBy;
                            //    console.log("LocalDefaultValue ----- : ", LocalDefaultValue);
                            DefaultValue = LocalDefaultValue;
                            //DefaultValue = Math.max(...jVarLocalNumberArray) + LocalIncrementBy;
                        };
                    };
                    //                    console.log("end------", inLoopData.DefaultValue);
                },
                FormDataAsArray: ({ inLoopData, inDataAsArray }) => {
                    with (inLoopData) {
                        let jVarLocalNumberArray;
                        let LocalIncrementBy = 1;

                        if (inDataAsArray.length === 0) {
                            if (ServerSide.DefaultValueCreate.hasOwnProperty("StartValue")) {
                                DefaultValue = ServerSide.DefaultValueCreate.StartValue;
                            } else {
                                DefaultValue = 1;
                            };
                        } else {
                            jVarLocalNumberArray = Object.values(inData).map(element => Number(element[DataAttribute]));

                            if (ServerSide.DefaultValueCreate.hasOwnProperty("IncrementBy")) {
                                LocalIncrementBy = Number(ServerSide.DefaultValueCreate.IncrementBy);
                            };

                            DefaultValue = Math.max(...jVarLocalNumberArray) + LocalIncrementBy;
                        };

                    };
                }
            }
        }
    },
    Date: {
        PresentDate: ({ inLoopData }) => {
            inLoopData.DefaultValue = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        },
        LastVoucher: ({ inData, inLoopData }) => {
            let jVarLocalNumberArray;

            with (inLoopData) {
                if (inData.length === 0) {
                    DefaultValue = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
                } else {
                    jVarLocalNumberArray = Object.values(inData).map(element => Number(element[ServerSide.DefaultValueCreate.VoucherNumberColumnName]));
                    let LocalMaxNumber = Math.max(...jVarLocalNumberArray);

                    let LocalLastVoucherRow = Object.values(inData).find(LoopItem => LoopItem[ServerSide.DefaultValueCreate.VoucherNumberColumnName] === LocalMaxNumber);

                    if (LocalLastVoucherRow !== undefined) {
                        if (LocalLastVoucherRow.hasOwnProperty(inLoopData.DataAttribute)) {
                            DefaultValue = LocalLastVoucherRow[inLoopData.DataAttribute];
                        };
                    };
                };
            };
        }
    }
};

let LocalDefaultValueCreateSwitch = {
    StartFunc: ({ inData, inLoopData, inPostData }) => {
        switch (inLoopData.ServerSide.DefaultValueCreate.ControlType) {
            case "Number":
                LocalDefaultValueCreateSwitch.SubFuncs.ForNumber({ inData, inLoopData, inPostData });
                break;
            case "Barcode":
                LocalDefaultValueCreateSwitch.SubFuncs.ForBarcode({ inData, inLoopData })

                break;
            case "Date":
                LocalDefaultValueCreateSwitch.SubFuncs.ForDate({ inData, inLoopData })
                break;

            default:
                break;
        }
    },
    SubFuncs: {
        ForNumber: ({ inData, inLoopData, inPostData }) => {
            switch (inLoopData.ServerSide.DefaultValueCreate.Type) {
                case "Max":
                    //  console.log("max-----------", inData, inLoopData);
                    LocalControlTypeFuncs.Number.Max({ inData, inLoopData });
                    break;
                case "MaxOnDate":
                    if (inPostData !== undefined) {
                        LocalControlTypeFuncs.Number.MaxOnDate({ inData, inLoopData, inPostData });
                    };

                    break;
                default:
                    break;
            }

        },
        ForBarcode: ({ inData, inLoopData }) => {
            switch (inLoopData.ServerSide.DefaultValueCreate.Type) {
                case "SKML":
                    let LocalMapArray = Object.values(inData).map(loopitem => {
                        if (loopitem.Barcode != undefined && loopitem.Barcode.includes("S-")) {
                            let LocalSplitArray = loopitem.Barcode.split("-");
                            let s1 = [];
                            return parseInt(LocalSplitArray[1]);
                        } else {
                            return 0;
                        };
                    });

                    let LocalBarcode = Math.max(...LocalMapArray) + 1;

                    inLoopData.DefaultValue = `S-${LocalBarcode}`;
                    break;

                default:
                    break;
            }

        },
        ForDate: ({ inData, inLoopData }) => {
            switch (inLoopData.ServerSide.DefaultValueCreate.Type) {
                case "PresentDate":
                    LocalControlTypeFuncs.Date.PresentDate({ inLoopData });

                    break;
                case "LastVoucher":
                    LocalControlTypeFuncs.Date.LastVoucher({ inData, inLoopData });
                    break;
                default:
                    break;
            };
        }
    }
};

exports.CalculateDefaultValue = ({ inColumns, inData, inPostData }) => {
    inColumns.forEach((LoopData, LoopIndex) => {
        if (LoopData.hasOwnProperty("ServerSide")) {
            if (LoopData.ServerSide.hasOwnProperty("DefaultValueCreate")) {
                LocalDefaultValueCreateSwitch.StartFunc({ inData, inLoopData: LoopData, inPostData });
            };
        };
    });

    return inColumns;
};
