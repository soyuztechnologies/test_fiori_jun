import BaseController from "ey/ap/acc/controller/BaseController";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import type { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import History from "sap/ui/core/routing/History";


interface IAnubhav{
    zkas: string
}

/**
 * @namespace  ey.ap.acc.controller
 */
export default class View2Controller extends BaseController{

    onInit() : void{

        this.getRouter()?.getRoute("superman")?.attachMatched(this.herculis, this);

    };

    //Route matched handler function which triggers
    //The route can change manually, browser back-forward button, when user select fruit, user reload ui.
    herculis(oEvent : Route$PatternMatchedEvent ) : void{
        debugger;
        //here this - will never point to your controller class object
        // so in order to use this as a object of controller we have to pass while calling it - attachMatched(this.herculis, this);
        var oParams = oEvent.getParameter("arguments");
        //step 1: extract the index of selected fruit
        var sIndex = (oParams as IAnubhav).zkas;
        //step 2: rebuild the element path
        var sPath = "/" + sIndex;
        //Step 3: bind element with view
        this.getView()?.bindElement(sPath,{
            expand: 'To_Supplier'
        });

    };

    onBack(): void{
        //get the instance of history
        var oHistory = History.getInstance();
        //get previous hash
        var sPreviousHash = oHistory.getPreviousHash();
        if(sPreviousHash !== undefined){
            window.history.go(-1);
        }else{
            this.getRouter().navTo("spiderman", {}, true);
        }
    };

    onSave(): void{
                MessageBox.confirm("Would you like to Save?",{
                    onClose: function(status){
                        debugger;
                        if(status === "OK"){
                            MessageToast.show("Your data was saved!");
                        }else{
                            MessageBox.error("Oops~ something is fishy");
                        }
                    }
                });
    };



}


// sap.ui.define(
//     //while we add dependencies, use module name
//     [
//         "ey/ap/acc/controller/BaseController",
//         "sap/m/MessageBox",
//         "sap/m/MessageToast"
//     ], 
//     function(BaseController, MessageBox, MessageToast){
//         return BaseController.extend("ey.ap.acc.controller.View2",{
//             onInit: function(){

//                 this.getRouter().getRoute("superman").attachMatched(this.herculis, this);

//             },
//             //Route matched handler function which triggers
//             //The route can change manually, browser back-forward button, when user select fruit, user reload ui.
//             herculis: function(oEvent){
//                 debugger;
//                 //here this - will never point to your controller class object
//                 // so in order to use this as a object of controller we have to pass while calling it - attachMatched(this.herculis, this);
                
//                 //step 1: extract the index of selected fruit
//                 var sIndex = oEvent.getParameter("arguments").zkas;
//                 //step 2: rebuild the element path
//                 var sPath = "/" + sIndex;
//                 //Step 3: bind element with view
//                 this.getView().bindElement(sPath,{
//                     expand: 'To_Supplier'
//                 });


//             },
//             onBack: function(){

//                 //step 1: get the parent control
//                 var oAppCon = this.getView().getParent();
//                 //step 2: container have the power to navigate to 2nd child
//                 oAppCon.to("idView1");

//             },
//             onSave: function(){
//                 MessageBox.confirm("Would you like to Save?",{
//                     onClose: function(status){
//                         debugger;
//                         if(status === "OK"){
//                             MessageToast.show("Your data was saved!");
//                         }else{
//                             MessageBox.error("Oops~ something is fishy");
//                         }
//                     }
//                 });
//             },
//             onClear: function(){

//             }

//         });
//     }
// );