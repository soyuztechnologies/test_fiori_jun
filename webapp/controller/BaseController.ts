
import Controller from "sap/ui/core/mvc/Controller";
import * as formatter  from "ey/ap/acc/util/formatter";
import type Router from "sap/ui/core/routing/Router";
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace  ey.ap.acc.controller  
 */
export default class BaseController extends Controller{

    onInit(): void | undefined {
        
    };

    //export formatter utility
    public formatter = formatter;

    getRouter() : Router {
        return (this.getOwnerComponent() as UIComponent).getRouter();
    }

}

// sap.ui.define(
//     [ 
//             "sap/ui/core/mvc/Controller",
//             "ey/ap/acc/util/formatter"
//      ],
//     function(Controller, Formatter){

//         return Controller.extend("ey.ap.acc.controller.BaseController",{

//             formatter: Formatter,
//             getRouter: function(){
//                 return this.getOwnerComponent().getRouter();
//             }

//         });

//     }

// )