import BaseController from "ey/ap/acc/controller/BaseController";

/**
 * @namespace  ey.ap.acc.controller  
 */
export default class AppController extends BaseController{
    onInit(): void | undefined {
        
    }
}

// sap.ui.define(
//     //while we add dependencies, use module name
//     [
//         "ey/ap/acc/controller/BaseController"
//     ], 
//     function(BaseController, models, lifeSaver){
//         return BaseController.extend("ey.ap.acc.controller.App",{


//         });
//     }
// );