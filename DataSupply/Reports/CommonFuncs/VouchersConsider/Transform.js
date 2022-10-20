let _ = require("lodash");

let CommonFuns = {
    StartFunc({ inColumns, inData }) {
        try {
            let localLoopObject = {};
            let LocalReturnData;
            let LocalValueFromTransform;
            let LocalColumnsSorted = _.sortBy(inColumns, "pk");;
            //    console.log("ssssssssssssss : ", inColumns[0], LocalColumnsSorted[0]);
            LocalReturnData = inData.map(LoopItem => {
                localLoopObject = {};

                LocalColumnsSorted.forEach(LoopItemColumn => {
                    if (LoopItemColumn.hasOwnProperty("DisplayColumn")) {
                        localLoopObject[LoopItemColumn.DisplayColumn] = LoopItem[LoopItemColumn.Name];

                        if (LoopItemColumn.hasOwnProperty("TransformTF")) {
                            if (LoopItemColumn.TransformTF) {
                                LocalValueFromTransform = CommonFuns.SubFuncs.TransformType({
                                    inLoopItemColumn: LoopItemColumn,
                                    inLoopItemData: LoopItem
                                });
                                localLoopObject[LoopItemColumn.DisplayColumn] = LocalValueFromTransform;
                            };
                        };
                    };
                });

                return localLoopObject;
            });

            // console.log("error from ----- : ", LocalReturnData[0]);

            return LocalReturnData;
        } catch (error) {
            console.log("error from transform : ", error);
        };
    },
    SubFuncs: {
        TransformType: ({ inLoopItemColumn, inLoopItemData }) => {
            let LocalReturnValue = inLoopItemData[inLoopItemColumn.Name];
            switch (inLoopItemColumn.TransformType) {
                case "EquationFromDefaultValue":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.EquationFromDefaultValue.CalculateFunc({
                        inColumnData: inLoopItemColumn,
                        inLoopItemData
                    });

                    break;
                case "EquationFromDefaultValueEval":
                    //console.log("inLoopItemData : ", inLoopItemData,inLoopItemColumn.Name);
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.EquationFromDefaultValueEval.CalculateFunc({ inColumnData: inLoopItemColumn, inLoopItemData });
                    break;
                case "Default":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.DefaultFuncs.InsertDefaultValue({ inColumnData: inLoopItemColumn });

                    break;
                case "DateOnly":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.DateFuncs.ddMMyyyy({ inDate: inLoopItemData[inLoopItemColumn.Name] });

                    break;
                case "DateFromddMMyyyy":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.DateFuncs.DateFromddMMyyyy({ inDate: inLoopItemData[inLoopItemColumn.Name] });

                    break;
                case "DateFromddMMyyyyToyyyyMMdd":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.DateFuncs.DateFromddMMyyyyToyyyyMMdd({ inDate: inLoopItemData[inLoopItemColumn.Name] });

                    break;
                case "DateFromyyyyMMddToddMMyyyy":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.DateFuncs.DateFromyyyyMMddToddMMyyyy({ inDate: inLoopItemData[inLoopItemColumn.Name] });

                    break;
                case "IndianFormat":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.AmountFuncs.ThousandsSeperator({ input: inLoopItemData[inLoopItemColumn.Name], decimalpoints: 2 });

                    break;
                case "ObjectToArrayGroupBy":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.ObjectToArrayGroupBy({ inLoopItemColumn, inLoopItemData });

                    break;
                case "ObjectToArrayGroupByAndEval":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.ObjectToArrayGroupByAndEval({
                        inItemColumnName: inLoopItemColumn.Name,
                        inDefaultValue: inLoopItemColumn.DefaultValue,
                        inTransformTF: inLoopItemColumn.TransformTF,
                        inLoopItemData
                    });

                    break;
                case "ObjectToArrayMultipleColumnsGroupByAndEvalPositive":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.ObjectToArrayMultipleColumnsGroupByAndEvalPositive({
                        inLoopItemColumn,
                        inLoopItemData
                    });

                    break;
                case "ObjectToArrayMultipleColumnsGroupByAndEvalNegative":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.ObjectToArrayMultipleColumnsGroupByAndEvalNegative({
                        inLoopItemColumn,
                        inLoopItemData
                    });

                    break;
                case "ObjectCount":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.ObjectCount({ inLoopItemColumn, inLoopItemData });
                    break;
                case "ClubColumns":
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.ClubColumns({ inLoopItemColumn, inLoopItemData });

                    break;
                case "FromPositive":
                    LocalReturnValue = 0;
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.FromPositive({ inColumnData: inLoopItemColumn, inLoopItemData });

                    break;
                case "PositiveAndEvalDefaultValue":
                    LocalReturnValue = 0;
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.PositiveAndEvalDefaultValue({ inColumnData: inLoopItemColumn, inLoopItemData });

                    break;
                case "NegativeAndEvalDefaultValue":
                    LocalReturnValue = 0;
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.NegativeAndEvalDefaultValue({ inColumnData: inLoopItemColumn, inLoopItemData });

                    break;

                case "FromPositiveAndEval":
                    LocalReturnValue = 0;
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.FromPositiveAndEval({ inColumnData: inLoopItemColumn, inLoopItemData });

                    break;
                case "FromNegative":
                    LocalReturnValue = 0;
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.FromNegative({ inColumnData: inLoopItemColumn, inLoopItemData });

                    break;
                case "FromNegativeAndEval":
                    LocalReturnValue = 0;
                    LocalReturnValue = CommonFuns.SubFuncs.SubFuncs.FromNegativeAndEval({ inColumnData: inLoopItemColumn, inLoopItemData });

                    break;
                default:

                    break;
            };
            return LocalReturnValue;
        },
        SubFuncs: {
            EquationFromDefaultValueEval: {
                CalculateFunc: ({ inColumnData, inLoopItemData }) => {
                    let LocalEquation = inColumnData.DefaultValue;

                    if (inColumnData.TransformTF) {
                        if ("DefaultValue" in inColumnData) {
                            Object.entries(inLoopItemData).forEach(
                                ([key, value]) => {
                                    if (LocalEquation.indexOf(`{{${key}}}`) >= 0) {
                                        LocalEquation = CommonFuns.SubFuncs.SubFuncs.CommonFuns.ForLoopFunc({
                                            injVarClientEval: LocalEquation,
                                            inKey: key,
                                            invalue: value
                                        });
                                    };
                                }
                            );
                        };
                    };

                    try {
                        return eval(LocalEquation);
                    } catch (error) {
                        return inColumnData.DefaultValue;
                    };
                }
            },
            EquationFromDefaultValue: {
                CalculateFunc: ({ inColumnData, inLoopItemData }) => {
                    let LocalEquation = inColumnData.DefaultValue;

                    if (inColumnData.TransformTF) {
                        if ("DefaultValue" in inColumnData) {
                            Object.entries(inLoopItemData).forEach(
                                ([key, value]) => {
                                    if (LocalEquation.indexOf(`{{${key}}}`) >= 0) {
                                        LocalEquation = CommonFuns.SubFuncs.SubFuncs.CommonFuns.ForLoopFunc({ injVarClientEval: LocalEquation, inKey: key, invalue: value });
                                    };
                                }
                            );
                        };
                    };

                    return LocalEquation;
                },
                CalculateFuncFromInputs: ({ inDefaultValue, inTransformTF, inLoopItemData }) => {
                    let LocalEquation = inDefaultValue;

                    if (inTransformTF) {
                        if (LocalEquation !== undefined) {
                            Object.entries(inLoopItemData).forEach(
                                ([key, value]) => {
                                    if (LocalEquation.indexOf(`{{${key}}}`) >= 0) {
                                        LocalEquation = CommonFuns.SubFuncs.SubFuncs.CommonFuns.ForLoopFunc({ injVarClientEval: LocalEquation, inKey: key, invalue: value });
                                    };
                                }
                            );
                        };
                    };

                    return LocalEquation;
                }
            },
            DefaultFuncs: {
                InsertDefaultValue: ({ inColumnData }) => {
                    return inColumnData.DefaultValue;
                }
            },
            ObjectToArrayGroupBy: ({ inLoopItemColumn, inLoopItemData }) => {
                let LocalSplitArray = inLoopItemColumn.Name.split(".");
                let LocalColumnDataNeeded = [];
                let LocalInvGridData;

                if (LocalSplitArray.length === 2) {
                    if (inLoopItemData.hasOwnProperty(LocalSplitArray[0])) {
                        LocalInvGridData = inLoopItemData[LocalSplitArray[0]];
                        if (LocalInvGridData !== null) {
                            if (Object.values(LocalInvGridData).length > 0) {
                                LocalColumnDataNeeded = Object.values(inLoopItemData[LocalSplitArray[0]]).map((LoopItem) => {
                                    return parseFloat(LoopItem[[LocalSplitArray[1]]]);
                                });
                            };

                        };
                    };
                };
                return LocalColumnDataNeeded.reduce((a, b) => a + b, 0);
            },
            ObjectToArrayGroupByAndEval: ({ inItemColumnName, inDefaultValue, inTransformTF, inLoopItemData }) => {
                let LocalSplitArray = inItemColumnName.split(".");
                let LocalColumnDataNeeded = [];
                let LocalGroupData;
                let LocalInvGridData;
                let LocalFromEval;

                if (LocalSplitArray.length === 2) {
                    if (inLoopItemData.hasOwnProperty(LocalSplitArray[0])) {
                        LocalInvGridData = inLoopItemData[LocalSplitArray[0]];
                        if (LocalInvGridData !== null) {
                            if (Object.values(LocalInvGridData).length > 0) {
                                LocalColumnDataNeeded = Object.values(inLoopItemData[LocalSplitArray[0]]).map((LoopItem) => {
                                    return parseFloat(LoopItem[[LocalSplitArray[1]]]);
                                });
                            };

                        };
                    };
                };

                LocalFromEval = CommonFuns.SubFuncs.SubFuncs.EquationFromDefaultValue.CalculateFuncFromInputs({
                    inDefaultValue,
                    inTransformTF,
                    inLoopItemData
                });

                LocalGroupData = LocalColumnDataNeeded.reduce((a, b) => a + b, 0);

                try {
                    return eval(LocalFromEval + LocalGroupData);
                } catch (error) {
                    return LocalFromEval + LocalGroupData;
                };
            },
            ObjectToArrayMultipleColumnsGroupByAndEvalPositive: ({ inLoopItemColumn, inLoopItemData }) => {
                let LocalReturnValue = 0;

                if (Array.isArray(inLoopItemColumn.Name)) {

                    let LocalArray = inLoopItemColumn.Name;

                    for (var i in LocalArray) {
                        LocalReturnValue += CommonFuns.SubFuncs.SubFuncs.ObjectToArrayGroupByAndEval({
                            inItemColumnName: LocalArray[i],
                            inDefaultValue: inLoopItemColumn.DefaultValue,
                            inTransformTF: inLoopItemColumn.TransformTF,
                            inLoopItemData
                        });
                    };
                };

                if (LocalReturnValue < 0) {
                    LocalReturnValue = 0;
                };

                return LocalReturnValue;
            },
            ObjectToArrayMultipleColumnsGroupByAndEvalNegative: ({ inLoopItemColumn, inLoopItemData }) => {
                let LocalReturnValue = 0;

                if (Array.isArray(inLoopItemColumn.Name)) {
                    let LocalArray = inLoopItemColumn.Name;

                    for (var i in LocalArray) {
                        LocalReturnValue += CommonFuns.SubFuncs.SubFuncs.ObjectToArrayGroupByAndEval({
                            inItemColumnName: LocalArray[i],
                            inDefaultValue: inLoopItemColumn.DefaultValue,
                            inTransformTF: inLoopItemColumn.TransformTF,
                            inLoopItemData
                        });
                    };
                };

                if (LocalReturnValue > 0) {
                    LocalReturnValue = 0;
                };

                if (LocalReturnValue < 0) {
                    LocalReturnValue = -LocalReturnValue;
                };

                return LocalReturnValue;
            },
            ObjectCount: ({ inLoopItemColumn, inLoopItemData }) => {
                let LocalReturnLength = 0;

                if (inLoopItemData.hasOwnProperty(inLoopItemColumn.Name)) {
                    if (inLoopItemColumn.Name in inLoopItemData) {

                        let LocalInvGridData = inLoopItemData[inLoopItemColumn.Name];
                        if (LocalInvGridData !== null) {
                            LocalReturnLength = Object.values(LocalInvGridData).length;

                        };
                    } else {
                        console.log("LocalInvGridData : ", LocalInvGridData);
                    }

                };

                return LocalReturnLength;
            },
            ClubColumns: ({ inLoopItemColumn, inLoopItemData }) => {
                let LocalReturnValue = "";

                inLoopItemColumn.PickColumnsArray.forEach(element => {
                    LocalReturnValue += `${inLoopItemData[element]} `;
                });

                return LocalReturnValue;
            },
            FromPositive: ({ inColumnData, inLoopItemData }) => {
                let LocalReturnValue = 0;
                if (typeof inLoopItemData[inColumnData.Name] === "number") {
                    if (inLoopItemData[inColumnData.Name] > 0) {
                        LocalReturnValue = inLoopItemData[inColumnData.Name];
                    };
                };

                return LocalReturnValue;
            },
            PositiveAndEvalDefaultValue: ({ inColumnData, inLoopItemData }) => {
                let LocalFromEval;

                LocalFromEval = CommonFuns.SubFuncs.SubFuncs.EquationFromDefaultValue.CalculateFuncFromInputs({
                    inDefaultValue: inColumnData.DefaultValue,
                    inTransformTF: inColumnData.TransformTF,
                    inLoopItemData
                });

                try {
                    if (eval(LocalFromEval) > 0) {
                        return eval(LocalFromEval);
                    } else {
                        return 0;
                    };
                } catch (error) {
                    return LocalFromEval;
                };
            },
            NegativeAndEvalDefaultValue: ({ inColumnData, inLoopItemData }) => {
                let LocalFromEval;

                LocalFromEval = CommonFuns.SubFuncs.SubFuncs.EquationFromDefaultValue.CalculateFuncFromInputs({
                    inDefaultValue: inColumnData.DefaultValue,
                    inTransformTF: inColumnData.TransformTF,
                    inLoopItemData
                });

                try {
                    if (eval(LocalFromEval) < 0) {
                        return eval(LocalFromEval);
                    } else {
                        return 0;
                    };
                } catch (error) {
                    return LocalFromEval;
                };
            },
            FromPositiveAndEval: ({ inColumnData, inLoopItemData }) => {
                let LocalReturnValue = 0;
                let LocalFromEval;
                let LocalReturnValueAfterEval;

                if (typeof inLoopItemData[inColumnData.Name] === "number") {
                    LocalReturnValue = inLoopItemData[inColumnData.Name];
                };

                LocalFromEval = CommonFuns.SubFuncs.SubFuncs.EquationFromDefaultValue.CalculateFuncFromInputs({
                    inDefaultValue: inColumnData.DefaultValue,
                    inTransformTF: inColumnData.TransformTF,
                    inLoopItemData
                });

                try {
                    //console.log(LocalFromEval, LocalReturnValue);
                    LocalReturnValueAfterEval = eval(`${LocalFromEval}(${LocalReturnValue})`);

                    if (LocalReturnValue !== 0) {
                        if (LocalReturnValueAfterEval > 0) {
                            return LocalReturnValueAfterEval;
                        } else {
                            return 0;
                        };
                    } else {
                        return 0;
                    };
                } catch (error) {
                    return LocalFromEval + LocalReturnValue;
                };
            },
            FromNegative: ({ inColumnData, inLoopItemData }) => {
                let LocalReturnValue = 0;

                if (typeof inLoopItemData[inColumnData.Name] === "number") {
                    if (inLoopItemData[inColumnData.Name] < 0) {
                        LocalReturnValue = - inLoopItemData[inColumnData.Name];
                    }
                };

                return LocalReturnValue;
            },
            FromNegativeAndEval: ({ inColumnData, inLoopItemData }) => {
                let LocalReturnValue = 0;
                let LocalFromEval;
                let LocalReturnValueAfterEval;

                if (typeof inLoopItemData[inColumnData.Name] === "number") {
                    LocalReturnValue = inLoopItemData[inColumnData.Name];
                };

                LocalFromEval = CommonFuns.SubFuncs.SubFuncs.EquationFromDefaultValue.CalculateFuncFromInputs({
                    inDefaultValue: inColumnData.DefaultValue,
                    inTransformTF: inColumnData.TransformTF,
                    inLoopItemData
                });

                try {
                    LocalReturnValueAfterEval = eval(`${LocalFromEval}(${LocalReturnValue})`);

                    if (LocalReturnValue !== 0) {
                        if (LocalReturnValueAfterEval < 0) {
                            return -LocalReturnValueAfterEval;
                        } else {
                            return 0;
                        };
                    } else {
                        return 0;
                    };

                } catch (error) {
                    return LocalFromEval + LocalReturnValue;
                };
            },
            DateFuncs: {
                ddMMyyyy: ({ inDate }) => {
                    let date = new Date(inDate);

                    let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
                    let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
                    let yyyy = date.getFullYear();

                    return `${dd}-${MM}-${yyyy}`;
                },
                DateFromddMMyyyy: ({ inDate }) => {
                    if (inDate !== undefined) {
                        return inDate.substring(0, 10);
                    };
                },
                DateFromddMMyyyyToyyyyMMdd: ({ inDate }) => {
                    let LocalDateTransformed = "";
                    if (inDate !== undefined) {
                        let dd = inDate.substring(0, 2);
                        let MM = inDate.substring(3, 5);
                        let yyyy = inDate.substring(6, 10);
                        LocalDateTransformed = `${yyyy}-${MM}-${dd}`;
                    };

                    return LocalDateTransformed;
                },
                DateFromyyyyMMddToddMMyyyy: ({ inDate }) => {
                    let LocalDateTransformed = "";
                    if (inDate !== undefined) {
                        let yyyy = inDate.substring(0, 4);
                        let MM = inDate.substring(5, 7);
                        let dd = inDate.substring(8, 10);

                        LocalDateTransformed = `${dd}-${MM}-${yyyy}`;
                    };

                    return LocalDateTransformed;
                }
            },
            AmountFuncs: {
                IndianFormat: (x) => {
                    var lastThree = x.substring(x.length - 3);
                    var otherNumbers = x.substring(0, x.length - 3);

                    if (otherNumbers !== '')
                        lastThree = ',' + lastThree;
                    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

                    return res;
                },
                ThousandsSeperator: ({ input, decimalpoints }) => {
                    var output = input;
                    var zerovalue = "0";

                    //if 0 then return 0.00
                    if (input === 0) {
                        // output = "0.00";
                        if (decimalpoints > 0) {
                            //if decimalpoints are needed then add that many zeros with . to the output
                            output = "0." + zerovalue.repeat(decimalpoints);
                        };
                    } else {
                        if (parseFloat(input)) {
                            input = new String(input); // so you can perform string operations

                            if (input.indexOf(".") === -1) {
                                //if no decimal is present in input
                                output = LocalLedgerHelperFuncs.TransferToDisplayColumn.SubFuncs.SubFuncs.AmountFuncs.IndianFormat(input.trim());

                                if (decimalpoints > 0) {
                                    //if decimalpoints are needed then add that many zeros with . to the output
                                    output += "." + zerovalue.repeat(decimalpoints);
                                };
                            } else {
                                var parts = input.split("."); // remove the decimal part
                                //convert the integer to thousands value
                                parts[0] = LocalLedgerHelperFuncs.TransferToDisplayColumn.SubFuncs.SubFuncs.AmountFuncs.IndianFormat(parts[0]);
                                //now check for the decimal portion length
                                if (parts[1].trim().length < decimalpoints) {
                                    //if decimal portion length is less then needed of decimalpoints
                                    //then insert the last need zeros as below
                                    parts[1] = parts[1].trim() + zerovalue.repeat(decimalpoints - parts[1].trim().length);
                                } else {
                                    //if decimal portion needed is less then available
                                    //then trim the content needed
                                    parts[1] = parts[1].substring(0, decimalpoints);
                                }
                                //now join then split parts
                                output = parts.join(".");
                            };
                        };
                    };

                    return output;
                }
            },
            CommonFuns: {
                ForLoopFunc: ({ injVarClientEval, inKey, invalue }) => {
                    let jVarLocalReturnData = injVarClientEval;
                    const search = `{{${inKey}}}`;
                    const replacer = new RegExp(search, 'g')

                    jVarLocalReturnData = injVarClientEval.replace(replacer, invalue);

                    return jVarLocalReturnData;
                }
            }
        }
    }
};

let Transform = ({ inColumns, inData }) => {
    return CommonFuns.StartFunc({ inColumns, inData });
};

module.exports = { Transform };