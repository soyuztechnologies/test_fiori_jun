
sap.ui.define(
    ["sap/ui/model/json/JSONModel",
     "sap/ui/Device"
    ],
function(JSONModel, Device){
    return {
        createDeviceModel: function(){
            return new JSONModel(Device);
        }
    }
});