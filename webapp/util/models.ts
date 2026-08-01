import JSONModel from "sap/ui/model/json/JSONModel";
import Device from "sap/ui/Device";

/**
 * @namespace  ey.ap.acc.util  
 */

export default{
    createDeviceModel() : JSONModel {
            const oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
    }
}

// sap.ui.define(
//     [
//      "sap/ui/model/json/JSONModel",
//      "sap/ui/Device"
//     ],
// function(JSONModel, Device){
//     return {
//         createDeviceModel: function(){
//             return new JSONModel(Device);
//         }
//     }
// });