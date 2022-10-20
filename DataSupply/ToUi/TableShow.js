let _ = require("lodash");

let LocalControlTypeFuncs = {
    Number: {
        Max: ({ inData, inLoopData }) => {
            with (inLoopData) {
                if (inData.length === 0) {
                    if (ServerSide.DefaultValueCreate.hasOwnProperty("StartValue")) {
                        DefaultValue = ServerSide.DefaultValueCreate.StartValue;
                    } else {
                        DefaultValue = 1;
                    };
                } else {
                    if (hasOwnProperty("IncrementBy")) {
                        DefaultValue = _.max(_.map(inData, DataAttribute).map(i => Number(i))) + ServerSide.DefaultValueCreate.IncrementBy;
                    } else {
                        DefaultValue = _.max(_.map(inData, DataAttribute).map(i => Number(i))) + 1;
                    };
                };
            };
        }
    },
    Date: {
        PresentDate: ({ inLoopData }) => {
            inLoopData.DefaultValue = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        },
        LastVoucher: ({ inData, inLoopData }) => {
            with (inLoopData) {
                if (inData.length === 0) {
                    DefaultValue = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
                } else {
                    let LocalMaxNumber = _.max(_.map(inData, ServerSide.DefaultValueCreate.VoucherNumberColumnName).map(i => Number(i)));
                    let LocalFilterObject = {};
                    LocalFilterObject[ServerSide.DefaultValueCreate.VoucherNumberColumnName] = LocalMaxNumber;

                    let LocalLastVoucherRow = _.find(inData, LocalFilterObject);

                    if (LocalLastVoucherRow !== undefined) {
                        if (LocalLastVoucherRow.hasOwnProperty(inLoopData.DataAttribute)) {
                            DefaultValue = LocalLastVoucherRow[inLoopData.DataAttribute];
                        };
                    } else {

                    }
                };
            };
        }
    }
};

let LocalDefaultValueCreateSwitch = {
    StartFunc: ({ inData, inLoopItemColumnData, inColumnDataAttribute }) => {
        //    console.log("inLoopItemColumnData : ", inLoopItemColumnData, inColumnDataAttribute);
        //     inLoopItemColumnData: LoopItemColumnData.ServerSide.DefaultValueShow,

        switch (inLoopItemColumnData.ServerSide.DefaultValueShow.ControlType) {
            case "Number":
                LocalDefaultValueCreateSwitch.SubFuncs.ForNumber({
                    inData,
                    inLoopData: inLoopItemColumnData
                });
                break;
            case "Barcode":
                LocalDefaultValueCreateSwitch.SubFuncs.ForBarcode({ inData, inLoopItemColumnData })

                break;
            case "Date":
                LocalDefaultValueCreateSwitch.SubFuncs.ForDate({
                    inData,
                    inLoopItemColumnDataFormat: inLoopItemColumnData.ServerSide.DefaultValueShow.Format,
                    inColumnDataAttribute
                });

                break;
            default:
                break;
        }
    },
    SubFuncs: {
        ForNumber: ({ inData, inLoopData }) => {
            //console.log("inLoopData : ", inLoopData);
            switch (inLoopData.ServerSide.DefaultValueCreate.Type) {
                case "Max":
                    LocalControlTypeFuncs.Number.Max({ inData, inLoopData });
                    break;

                default:
                    break;
            }

        },
        ForBarcode: ({ inData, inLoopData }) => {
            switch (inLoopData.ServerSide.DefaultValueCreate.Type) {
                case "SKML":
                    let LocalBarcode = _.max(_.map(inData, (loopitem) => {

                        if (loopitem.Barcode != undefined && loopitem.Barcode.includes("S-")) {
                            let LocalSplitArray = loopitem.Barcode.split("-");
                            let s1 = [];
                            return parseInt(LocalSplitArray[1]);
                        }
                    })) + 1;
                    inLoopData.DefaultValue = `S-${LocalBarcode}`;
                    break;

                default:
                    break;
            }
        },
        ForDate: ({ inData, inLoopItemColumnDataFormat, inColumnDataAttribute }) => {
            let date = new Date(inData[inColumnDataAttribute]);

            let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
            let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
            let yyyy = date.getFullYear();

            switch (inLoopItemColumnDataFormat) {
                case "dd-MM-yyyy":
                    inData[inColumnDataAttribute] = `${dd}-${MM}-${yyyy}`;

                    break;
                case "dd/MM/yyyy":
                    inData[inColumnDataAttribute] = `${dd}/${MM}/${yyyy}`;

                    break;
                case "yyyy-MM-dd":
                    inData[inColumnDataAttribute] = `${yyyy}-${MM}-${dd}`;

                    break;
                case "yyyy/MM/dd":
                    inData[inColumnDataAttribute] = `${yyyy}/${MM}/${dd}`;

                    break;

                case "LastVoucher":

                    break;

                default:
                    break;
            }

        },
        ForDate1: ({ inData, inLoopItemColumnData, inColumnDataAttribute }) => {
            let date = new Date(inData[inColumnDataAttribute]);

            let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
            let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
            let yyyy = date.getFullYear();

            switch (inLoopItemColumnData.Format) {
                case "dd-MM-yyyy":
                    inData[inColumnDataAttribute] = `${dd}-${MM}-${yyyy}`;

                    break;
                case "dd/MM/yyyy":
                    inData[inColumnDataAttribute] = `${dd}/${MM}/${yyyy}`;

                    break;
                case "yyyy-MM-dd":
                    inData[inColumnDataAttribute] = `${yyyy}-${MM}-${dd}`;

                    break;
                case "yyyy/MM/dd":
                    inData[inColumnDataAttribute] = `${yyyy}/${MM}/${dd}`;

                    break;

                case "LastVoucher":

                    break;

                default:
                    break;
            }

        }
    }
};

let TransformData = ({ inLoopItemData, inTableColumnsToTransform }) => {
    let LocalReturnRowObject = JSON.parse(JSON.stringify(inLoopItemData));

    inTableColumnsToTransform.forEach(LoopItemColumnData => {
        LocalDefaultValueCreateSwitch.StartFunc({
            inData: LocalReturnRowObject,
            inLoopItemColumnData: LoopItemColumnData,
            inColumnDataAttribute: LoopItemColumnData.DataAttribute
        });
    });

    return LocalReturnRowObject;
};

module.exports = { TransformData };
