const e = require("express");
let _ = require("lodash");

function groupArrayOfObjects(list, key) {
    return list.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

let SingleColumn = ({ inDataToSort, inGroupByColumn }) => {
    let LocalReturnArray = [];
    console.log("inDataToSort :---------------------- ");
    let LocalMiddleObject = inDataToSort.reduce(function (rv, x) {
        (rv[x[inGroupByColumn]] = rv[x[inGroupByColumn]] || []).push(x);
        return rv;
    }, {});

    Object.entries(LocalMiddleObject).forEach(
        ([key, value]) => {
            let LocalInsideObject = {};
            LocalInsideObject[inGroupByColumn] = key;
            LocalReturnArray.push(LocalInsideObject);
        }
    );

    return LocalReturnArray;
};

let LocalFuncsForLoops = {
    SingleColumnAndMultipleColumnsReturn: {
        StartFunc: ({ inObject, inColumnsToGroupByAsFloat, inGroupByColumn, inColumnsDataFreezed }) => {
            let LocalReturnArray = [];

            Object.entries(inObject).forEach(
                ([key, value]) => {
                    let LocalInsideObject = {};
                    LocalInsideObject[inGroupByColumn] = key;

                    let LocalFromSubFuncs = LocalFuncsForLoops.SingleColumnAndMultipleColumnsReturn.SubFuncs.LoopFunc({
                        inColumnsToGroupByAsFloat,
                        inValue: value
                    });

                    //                    LocalInsideObject = { ...LocalInsideObject, ...LocalFromSubFuncs, ..._.pick(value[0], ["Date", "BillNumber", "PurchaseRate"]) };
                    LocalInsideObject = { ...LocalInsideObject, ...LocalFromSubFuncs, ..._.pick(value[0], inColumnsDataFreezed) };

                    inColumnsDataFreezed
                    //console.log("hhhhhhhhhh : ", LocalInsideObject, value[0], _.pick(value[0], ["PurchaseRate"]));

                    LocalReturnArray.push(LocalInsideObject);
                }
            );

            return LocalReturnArray;
        },
        SubFuncs: {
            LoopFunc: ({ inColumnsToGroupByAsFloat, inValue }) => {
                let LocalInsideObject = {};

                inColumnsToGroupByAsFloat.forEach(LoopColumn => {
                    let LoopColumnData = inValue.map(LoopData => {
                        if (LoopColumn in LoopData) {
                            return LoopData[LoopColumn];
                        } else {
                            return 0;
                        };
                    });

                    LocalInsideObject[LoopColumn] = LoopColumnData.reduce((a, b) => a + b, 0);
                });

                return LocalInsideObject;
            }
        }
    }
};

let SingleColumnAndMultipleColumnsReturn = ({ inDataToSort, inGroupByColumn, inColumnsToGroupByAsFloat, inColumnsDataFreezed }) => {
    let LocalReturnArray = [];

    let LocalMiddleObject = inDataToSort.reduce(function (rv, x) {
        (rv[x[inGroupByColumn]] = rv[x[inGroupByColumn]] || []).push(x);
        return rv;
    }, {});

    // let KSFilterAccountName = "VASAVI AGENCIES";

    //console.log("inGroupByColumn : ", inGroupByColumn, "VASAVI AGENCIES", LocalMiddleObject[KSFilterAccountName]);

    LocalReturnArray = LocalFuncsForLoops.SingleColumnAndMultipleColumnsReturn.StartFunc({
        inColumnsToGroupByAsFloat,
        inObject: LocalMiddleObject,
        inGroupByColumn,
        inColumnsDataFreezed
    });
    //console.log("inColumnsDataFreezed : ", inColumnsDataFreezed);
    return LocalReturnArray;
};

let SingleColumnAndMultipleDataRetruned = ({ inDataToSort, inGroupByColumn, inColumnsDataFreezed = [], inColumnsToGroupByAsInt = [], inColumnsToGroupByAsFloat = [] }) => {
    try {
        var result = [];
        let LocalLoopInsideObject;
        //console.log(" inColumnsDataFreezed : ", inColumnsDataFreezed);
        let jVarLocalGroupBy = _.groupBy(inDataToSort, inGroupByColumn);

        Object.entries(jVarLocalGroupBy).forEach(
            ([Loopkey, LoopValue]) => {
                LocalLoopInsideObject = {};
                LocalLoopInsideObject[inGroupByColumn] = Loopkey;
               // console.log(" LoopValuessssssssss : ", LoopValue);

                inColumnsDataFreezed.forEach(element => {
                 //   console.log(" LoopValue : ", element, LoopValue[element]);

                    LocalLoopInsideObject[element] = LoopValue[0][element];
                });
             //   console.log(" LocalLoopInsideObject : ", LocalLoopInsideObject);

                inColumnsToGroupByAsFloat.map(element => {
                    LocalLoopInsideObject[element] = _.sumBy(LoopValue, (o) => {
                        if (typeof o[element] === "number") {
                            return o[element];
                        } else {
                            return parseFloat(o[element]);
                        };
                    });
                });

                result.push(LocalLoopInsideObject);
            }
        );
   //     console.log("result : ", result[0]);
        return result;
    } catch (error) {
        console.log("error : ", error);
    };
};

let SingleColumnAndMultipleDataRetruned_Keshav_28Nov2022 = ({ inDataToSort, inGroupByColumn, inColumnsDataFreezed = [], inColumnsToGroupByAsInt = [], inColumnsToGroupByAsFloat = [] }) => {
    try {
        var result = [];
        let LocalLoopInsideObject;
        console.log(" inColumnsDataFreezed : ", inColumnsDataFreezed);
        let jVarLocalGroupBy = _.groupBy(inDataToSort, inGroupByColumn);

        Object.entries(jVarLocalGroupBy).forEach(
            ([Loopkey, LoopValue]) => {
                LocalLoopInsideObject = {};
                LocalLoopInsideObject[inGroupByColumn] = Loopkey;

                console.log(" LoopValue : ", LoopValue);

                inColumnsToGroupByAsFloat.map(element => {
                    LocalLoopInsideObject[element] = _.sumBy(LoopValue, (o) => {
                        if (typeof o[element] === "number") {
                            return o[element];
                        } else {
                            return parseFloat(o[element]);
                        };
                    });
                });

                result.push(LocalLoopInsideObject);
            }
        );

        return result;
    } catch (error) {
        console.log("error : ", error);
    };
};

module.exports = { SingleColumn, SingleColumnAndMultipleDataRetruned, SingleColumnAndMultipleColumnsReturn };