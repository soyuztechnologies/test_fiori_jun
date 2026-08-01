import BaseController from "ey/ap/acc/controller/BaseController";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import MessageBox from "sap/m/MessageBox";
import Fragment from "sap/ui/core/Fragment";
import type { ListBase$SelectionChangeEvent,
              ListBase$DeleteEvent
 } from "sap/m/ListBase";
import ListItemBase from "sap/m/ListItemBase";
import ListBase from "sap/m/ListBase";
import type { SearchField$SearchEvent } from "sap/m/SearchField";
import type ListBinding from "sap/ui/model/ListBinding";
import type SelectDialog from "sap/m/SelectDialog";
import type { Button$PressEvent } from "sap/m/Button";
import StandardListItem from "sap/m/StandardListItem";
import JSONModel from "sap/ui/model/json/JSONModel";
import Button from "sap/m/Button";
import type { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import type Input from "sap/m/Input";
import type { Mode , ODataV2Response, Product, Supplier } from '../types/anubhav';
import type UIComponent from "sap/ui/core/UIComponent";
import type ODataModel from "sap/ui/model/odata/v2/ODataModel";
import MessageToast from "sap/m/MessageToast";
import type { SelectDialog$ConfirmEvent } from "sap/m/SelectDialog";
import type { Input$SubmitEvent, Input$ValueHelpRequestEvent } from "sap/m/Input";
import Image from "sap/m/Image";
import type Select from "sap/m/Select";
import History from "sap/ui/core/routing/History";

/**
 * @namespace  ey.ap.acc.controller
 */
export default class AddController extends BaseController{

    private oLocalModel: JSONModel | null = null;
    private oSupplierPopup: SelectDialog | null = null;
    private oField : Input | null = null;
    private prodId : string | null = null;
    private mode : Mode = 'Create';

    onInit(){

                this.getRouter()?.getRoute("superman")?.attachMatched(this.herculis, this);

                this.oLocalModel = new JSONModel({
                    "prodData": {
                                    "PRODUCT_ID": "",
                                    "TYPE_CODE": "PR",
                                    "CATEGORY": "Notebooks",
                                    "NAME": "",
                                    "DESCRIPTION": "",
                                    "SUPPLIER_ID": "0100000049",
                                    "SUPPLIER_NAME": "Talpa",
                                    "TAX_TARIF_CODE": "1 ",
                                    "PRICE": "0.00",
                                    "CURRENCY_CODE": "USD",
                                    "DIM_UNIT": "CM",
                                    "PRODUCT_PIC_URL": "/sap/public/bc/NWDEMO_MODEL/IMAGES/JN-2025.jpg"
                                }
                });
                (this.getView()?.byId("idDelete") as Button).setEnabled(false);
                this.getView()?.setModel(this.oLocalModel, "zkas");

            };
    //Route matched handler function which triggers
    //The route can change manually, browser back-forward button, when user select fruit, user reload ui.
    herculis(oEvent: Route$PatternMatchedEvent): void{
        debugger;
        
    };


    setMode(sMode: Mode): void{
        this.mode = sMode;
        if(this.mode === "Create"){
            (this.getView()?.byId("idSave") as Button).setText("Save");
            (this.getView()?.byId("idDelete") as Button).setEnabled(false);
            (this.getView()?.byId("idProd") as Input).setEnabled(true);
        }else{
            (this.getView()?.byId("idSave") as Button).setText("Update");
            (this.getView()?.byId("idDelete") as Button).setEnabled(true);
            (this.getView()?.byId("idProd") as Input).setEnabled(false);
        }
    };
    onDelete(): void{
                //step 2: call sap to check  if the product exist
                var oDataModel = (this.getOwnerComponent() as UIComponent).getModel() as ODataModel;

                //create a local variable to access controller object inside callback
                var that = this;

                //step 3: check if product exist in sap
                oDataModel.remove("/ProductSet('" + this.prodId + "')", {
                    //YES, product exist
                    success:function(data: ODataV2Response<Product>){
                        MessageToast.show("The product is now deleted");
                        that.setMode("Create");
                    }
                });
            };

            onConfirm(oEvent: SelectDialog$ConfirmEvent): void{
                //step 1: get the value of selected supplier
                var supplierId = oEvent?.getParameter("selectedItem")?.getTitle() as string;
                var supplierName = oEvent?.getParameter("selectedItem")?.getDescription();

                //Step 2: set the id to the field
                this.oField?.setValue(supplierId);
                this.oLocalModel?.setProperty("/prodData/SUPPLIER_NAME",supplierName);
            };

            onF4Help = (oEvent: Input$ValueHelpRequestEvent): void => {
                //take a snapshot of the field on which f4 was pressed
                this.oField = oEvent.getSource();
                //in the callback we can access our cotroller object using that
                //var that = this;
                //step 2: load our fragment using sapui5 api = load and return object in callback
                //like in abap during PBO - IF lo_alv IS NOT BOUND
                if(!this.oSupplierPopup){
                    Fragment.load({
                        name:"ey.ap.acc.fragments.popup",
                        type:"XML",
                        id:"supplier",
                        controller: this
                    })
                    //promise which fullfil if fragment object is created successfully
                    .then((oFragment) => {
                        //first run
                        this.oSupplierPopup = oFragment as SelectDialog;
                        this.oSupplierPopup.setTitle("Choose one of the Suppliers");
                        //allow parasite to access human heart by Immune system
                        this.getView()?.addDependent(this.oSupplierPopup);
                        this.oSupplierPopup.setMultiSelect(false);
                        this.oSupplierPopup.bindAggregation("items",{
                            path: '/SupplierSet',
                            template: new StandardListItem({
                                icon: 'sap-icon://supplier',
                                title: '{BP_ID}',
                                description: '{COMPANY_NAME}'
                            })
                        });
                        this.oSupplierPopup.open("");
                    });
                }else{
                    this.oSupplierPopup.open("");
                }
                
            };
            onLoadExp = () : void =>  {
                //step 2: call sap to check  if the product exist
                var oDataModel = (this.getOwnerComponent() as UIComponent).getModel() as ODataModel;

                //create a local variable to access controller object inside callback
                //var that = this;

                //step 3: check if product exist in sap
                oDataModel.callFunction("/GetMostExpensiveProduct", {
                    urlParameters:{
                        I_CATEGORY: (this.getView()?.byId("category") as Select).getSelectedKey()
                    },
                    //YES, product exist
                    success: (data: ODataV2Response<Product>) => {
                        this.oLocalModel?.setProperty("/prodData", data);
                        this.setMode("Update");
                    }
                });
            };
            onSubmit = (oEvent: Input$SubmitEvent) : void =>{
                
                //step 1: read the product id which was entered by user
                this.prodId = oEvent.getParameter("value") as string;

                //step 2: call sap to check  if the product exist
                var oDataModel = (this.getOwnerComponent() as UIComponent).getModel() as ODataModel;

                //create a local variable to access controller object inside callback
                // var that = this;

                //step 3: check if product exist in sap
                oDataModel.read("/ProductSet('" + this.prodId + "')", {
                    //YES, product exist
                    success:(data: ODataV2Response<Product>) => {
                        this.oLocalModel?.setProperty("/prodData", data);
                        this.setMode("Update");
                    }
                });

                (this.getView()?.byId("idphoto") as Image).setSrc("/sap/opu/odata/sap/ZODATA_JUN_SRV/ProductImgSet('" + this.prodId + "')/$value");

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

        onSave= (): void => {
                //Step 1: prepare and precheck payload (validation)
                var payload = (this.oLocalModel as JSONModel).getProperty("/prodData");
                if(!payload.PRODUCT_ID || !payload.NAME || !payload.DESCRIPTION || !payload.PRICE){
                    MessageBox.error("Bro, give me correct data");
                    return;
                }

                //Step 2: pre-enhancement
                //payload.CURRENCY_CODE = "USD";

                //step 3: get the odata model object
                var oDataModel = (this.getOwnerComponent() as UIComponent).getModel() as ODataModel;


                if(this.mode === "Update"){
                    
                    //step 4: trigger the POST call
                    oDataModel.update("/ProductSet('"+ this.prodId +"')",payload, {
                        success: function(){
                            MessageToast.show("Walaah! you updated it 😂");
                        },
                        error: function(){
                            MessageBox.error("OOps!! something wrong in data save🤔");
                        }
                    });

                }else{
                    //step 4: trigger the POST call
                    oDataModel.create("/ProductSet",payload, {
                        success: function(){
                            MessageToast.show("Walaah! you made it bro 😂");
                        },
                        error: function(){
                            MessageBox.error("OOps!! something wrong in data save🤔");
                        }
                    });
                }
                

            };
            onClear = () : void => {
                this.setMode("Create");
                (this.oLocalModel as JSONModel).setProperty("/prodData",{
                                    "PRODUCT_ID": "",
                                    "TYPE_CODE": "PR",
                                    "CATEGORY": "Notebooks",
                                    "NAME": "",
                                    "DESCRIPTION": "",
                                    "SUPPLIER_ID": "0100000049",
                                    "SUPPLIER_NAME": "Talpa",
                                    "TAX_TARIF_CODE": "1 ",
                                    "PRICE": "0.00",
                                    "CURRENCY_CODE": "USD",
                                    "DIM_UNIT": "CM",
                                    "PRODUCT_PIC_URL": "/sap/public/bc/NWDEMO_MODEL/IMAGES/JN-2025.jpg"
                                });
            }

}



// sap.ui.define(
//     //while we add dependencies, use module name
//     [
//         "ey/ap/acc/controller/BaseController",
//         "sap/m/MessageBox",
//         "sap/m/MessageToast",
//         "sap/ui/model/json/JSONModel",
//         "sap/ui/core/Fragment"
//     ], 
//     function(BaseController, MessageBox, MessageToast, JSONModel, Fragment){
//         return BaseController.extend("ey.ap.acc.controller.Add",{
//             onInit: function(){

//                 this.getRouter().getRoute("superman").attachMatched(this.herculis, this);

//                 this.oLocalModel = new JSONModel({
//                     "prodData": {
//                                     "PRODUCT_ID": "",
//                                     "TYPE_CODE": "PR",
//                                     "CATEGORY": "Notebooks",
//                                     "NAME": "",
//                                     "DESCRIPTION": "",
//                                     "SUPPLIER_ID": "0100000049",
//                                     "SUPPLIER_NAME": "Talpa",
//                                     "TAX_TARIF_CODE": "1 ",
//                                     "PRICE": "0.00",
//                                     "CURRENCY_CODE": "USD",
//                                     "DIM_UNIT": "CM",
//                                     "PRODUCT_PIC_URL": "/sap/public/bc/NWDEMO_MODEL/IMAGES/JN-2025.jpg"
//                                 }
//                 });
//                 this.getView().byId("idDelete").setEnabled(false);
//                 this.getView().setModel(this.oLocalModel, "zkas");

//             },

//             prodId: null,
//             mode: 'Create',

//             setMode: function(sMode){
//                 this.mode = sMode;
//                 if(this.mode === "Create"){
//                     this.getView().byId("idSave").setText("Save");
//                     this.getView().byId("idProd").setEnabled(true);
//                     this.getView().byId("idDelete").setEnabled(false);
//                 }else{
//                     this.getView().byId("idSave").setText("Update");
//                     this.getView().byId("idProd").setEnabled(false);
//                     this.getView().byId("idDelete").setEnabled(true);
//                 }
//             },
//             onDelete: function(){
//                 //step 2: call sap to check  if the product exist
//                 var oDataModel = this.getOwnerComponent().getModel();

//                 //create a local variable to access controller object inside callback
//                 var that = this;

//                 //step 3: check if product exist in sap
//                 oDataModel.remove("/ProductSet('" + this.prodId + "')", {
//                     //YES, product exist
//                     success:function(data){
//                         MessageToast.show("The product is now deleted");
//                         that.setMode("Create");
//                     }
//                 });
//             },

//             onConfirm: function(oEvent){
//                 //step 1: get the value of selected supplier
//                 var supplierId = oEvent.getParameter("selectedItem").getTitle();
//                 var supplierName = oEvent.getParameter("selectedItem").getDescription();

//                 //Step 2: set the id to the field
//                 this.oField.setValue(supplierId);
//                 this.oLocalModel.setProperty("/prodData/SUPPLIER_NAME",supplierName);
//             },
//             //step 1: create a object for fragment
//             oSupplierPopup : null,
//             oField: null,
//             onF4Help: function(oEvent){
//                 //take a snapshot of the field on which f4 was pressed
//                 this.oField = oEvent.getSource();
//                 //in the callback we can access our cotroller object using that
//                 var that = this;
//                 //step 2: load our fragment using sapui5 api = load and return object in callback
//                 //like in abap during PBO - IF lo_alv IS NOT BOUND
//                 if(!that.oSupplierPopup){
//                     Fragment.load({
//                         fragmentName:"ey.ap.acc.fragments.popup",
//                         type:"XML",
//                         id:"supplier",
//                         controller: that
//                     })
//                     //promise which fullfil if fragment object is created successfully
//                     .then(function(oFragment){
//                         //first run
//                         that.oSupplierPopup = oFragment;
//                         that.oSupplierPopup.setTitle("Choose one of the Suppliers");
//                         //allow parasite to access human heart by Immune system
//                         that.getView().addDependent(that.oSupplierPopup);
//                         that.oSupplierPopup.setMultiSelect(false);
//                         that.oSupplierPopup.bindAggregation("items",{
//                             path: '/SupplierSet',
//                             template: new sap.m.StandardListItem({
//                                 icon: 'sap-icon://supplier',
//                                 title: '{BP_ID}',
//                                 description: '{COMPANY_NAME}'
//                             })
//                         });
//                         that.oSupplierPopup.open();
//                     });
//                 }else{
//                     that.oSupplierPopup.open();
//                 }
                
//             },
//             onLoadExp: function(){
//                 //step 2: call sap to check  if the product exist
//                 var oDataModel = this.getOwnerComponent().getModel();

//                 //create a local variable to access controller object inside callback
//                 var that = this;

//                 //step 3: check if product exist in sap
//                 oDataModel.callFunction("/GetMostExpensiveProduct", {
//                     urlParameters:{
//                         I_CATEGORY: this.getView().byId("category").getSelectedKey()
//                     },
//                     //YES, product exist
//                     success:function(data){
//                         that.oLocalModel.setProperty("/prodData", data);
//                         that.setMode("Update");
//                     }
//                 });
//             },
//             onSubmit: function(oEvent){
                
//                 //step 1: read the product id which was entered by user
//                 this.prodId = oEvent.getParameter("value");

//                 //step 2: call sap to check  if the product exist
//                 var oDataModel = this.getOwnerComponent().getModel();

//                 //create a local variable to access controller object inside callback
//                 var that = this;

//                 //step 3: check if product exist in sap
//                 oDataModel.read("/ProductSet('" + this.prodId + "')", {
//                     //YES, product exist
//                     success:function(data){
//                         that.oLocalModel.setProperty("/prodData", data);
//                         that.setMode("Update");
//                     }
//                 });

//                 this.getView().byId("idphoto").setSrc("/sap/opu/odata/sap/ZODATA_JUN_SRV/ProductImgSet('" + this.prodId + "')/$value");

//             },
//             //Route matched handler function which triggers
//             //The route can change manually, browser back-forward button, when user select fruit, user reload ui.
//             herculis: function(oEvent){
//                 debugger;
                
//             },
//             onBack: function(){

//                 //step 1: get the parent control
//                 var oAppCon = this.getView().getParent();
//                 //step 2: container have the power to navigate to 2nd child
//                 oAppCon.to("idView1");

//             },
//             onSave: function(){
//                 //Step 1: prepare and precheck payload (validation)
//                 var payload = this.oLocalModel.getProperty("/prodData");
//                 if(!payload.PRODUCT_ID || !payload.NAME || !payload.DESCRIPTION || !payload.PRICE){
//                     MessageBox.error("Bro, give me correct data");
//                     return;
//                 }

//                 //Step 2: pre-enhancement
//                 //payload.CURRENCY_CODE = "USD";

//                 //step 3: get the odata model object
//                 var oDataModel = this.getOwnerComponent().getModel();


//                 if(this.mode === "Update"){
                    
//                     //step 4: trigger the POST call
//                     oDataModel.update("/ProductSet('"+ this.prodId +"')",payload, {
//                         success: function(){
//                             MessageToast.show("Walaah! you updated it 😂");
//                         },
//                         error: function(oError){
//                             MessageBox.error("OOps!! something wrong in data save🤔");
//                         }
//                     });

//                 }else{
//                     //step 4: trigger the POST call
//                     oDataModel.create("/ProductSet",payload, {
//                         success: function(){
//                             MessageToast.show("Walaah! you made it bro 😂");
//                         },
//                         error: function(oError){
//                             MessageBox.error("OOps!! something wrong in data save🤔");
//                         }
//                     });
//                 }
                

//             },
//             onClear: function(){
//                 this.setMode("Create");
//                 this.oLocalModel.setProperty("/prodData",{
//                                     "PRODUCT_ID": "",
//                                     "TYPE_CODE": "PR",
//                                     "CATEGORY": "Notebooks",
//                                     "NAME": "",
//                                     "DESCRIPTION": "",
//                                     "SUPPLIER_ID": "0100000049",
//                                     "SUPPLIER_NAME": "Talpa",
//                                     "TAX_TARIF_CODE": "1 ",
//                                     "PRICE": "0.00",
//                                     "CURRENCY_CODE": "USD",
//                                     "DIM_UNIT": "CM",
//                                     "PRODUCT_PIC_URL": "/sap/public/bc/NWDEMO_MODEL/IMAGES/JN-2025.jpg"
//                                 });
//             }

//         });
//     }
// );