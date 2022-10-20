let PrepareData = ({ inData, inDisplayColumns }) => {
    let LocalLoopObject;

    let LocalReturnData = inData.map(LoopItem => {
        LocalLoopObject = {};

        Object.entries(inDisplayColumns).forEach(
            ([key, value]) => {
                if (value === "") {
                    LocalLoopObject[key] = LoopItem[key];
                } else {
                    LocalLoopObject[key] = LocalResultFunc({
                        inValue: value,
                        inLoopItem: LoopItem
                    });
                };
            }
        );

        return LocalLoopObject;
    });

    return LocalReturnData;
};

let LocalResultFunc = ({ inValue, inLoopItem }) => {
    let LocalPlusValue = 0;
    let LocalMinusValue = 0;
    let LocalReturnValue = 0;
    
    if (typeof inValue === 'object') {
        if ("Result" in inValue) {
            if (inValue.Result === "+") {
                for (var i in inValue.ConsiderColumns.Plus) {
                    LocalPlusValue += inLoopItem[inValue.ConsiderColumns.Plus[i]];
                };

                for (var i in inValue.ConsiderColumns.Minus) {
                    LocalMinusValue += inLoopItem[inValue.ConsiderColumns.Minus[i]];
                };

                if (LocalPlusValue > LocalMinusValue) {
                    LocalReturnValue = LocalPlusValue - LocalMinusValue;
                };
            }
        };
    };

    return LocalReturnValue;
};

module.exports = { PrepareData };