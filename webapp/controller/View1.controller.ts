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

/**
 * @namespace  ey.ap.acc.controller
 */
export default class View1Controller extends BaseController{

    onInit(): void{
        //debugger;
        //this.getOwnerComponent().getManifest()
        //this.getOwnerComponent().getModel()
    };

    onSelectItem(oEvent: ListBase$SelectionChangeEvent): void{
        //Step 1: get the path of the element selected by user
        var sPath = (oEvent.getParameter("listItem") as ListItemBase).getBindingContext()?.getPath() as string;
        //Step 2: Get the view 2 object
        // var oView2 =  this.getView().getParent().getPage("idView2");
        //Due to new Split App the deposition changed as below

        //var oView2 =  this.getView().getParent().getParent().getDetailPage("idView2");
        //Step 3: Bind element
        //oView2.bindElement(sPath);
        //Step 4: nav to view2
        this.onNext(sPath);
    };

    onNext(sPath: string) : void {

        // //step 1: get the parent control
        // var oAppCon = this.getView().getParent().getParent();
        // //step 2: container have the power to navigate to 2nd child
        // oAppCon.toDetail("idView2");
        var sIndex = sPath.split("/")[sPath.split("/").length - 1];
        this.getRouter().navTo("superman",{
            zkas: sIndex
        });

    };

    //dummy change
    onDelete(oEvent: ListBase$DeleteEvent) : void{
        //MessageBox.confirm("This function is under contruction and you need to complete this 😂");
        //Hint: Get All list items which are selected, loop at them, delete them one by one from list object
        var oList = this.getView()?.byId("myList") as ListBase;
        var oSelectedItem = oList.getSelectedItem();
        oList.removeItem(oSelectedItem);
    };
    onSearch(oEvent: SearchField$SearchEvent): void{
        //Step 1: get the text typed by user in search field
        var sQuery = oEvent.getParameter("query");
        console.log(sQuery);
        //Step 2: Construct a filter object from sap.ui.model
        var oFilter1 = new Filter("CATEGORY", FilterOperator.Contains ,sQuery);
       
        //Step 3: inject this filter to the items aggregation of list control
        var oList = this.getView()?.byId("myList") as ListBase;
        (oList.getBinding("items") as ListBinding).filter(oFilter1);
    };
    onAdd(): void{
        this.getRouter().navTo("wonderwomen");
    };

    public oOrderPopup : SelectDialog | null = null;

    onShowOrders(oEvent: Button$PressEvent): void{
                //in the callback we can access our cotroller object using that
                //var that = this;
                //step 2: load our fragment using sapui5 api = load and return object in callback
                //like in abap during PBO - IF lo_alv IS NOT BOUND
                if(!this.oOrderPopup){
                    Fragment.load({
                        name:"ey.ap.acc.fragments.popup",
                        type:"XML",
                        id:"order",
                        controller: this
                    })
                    //promise which fullfil if fragment object is created successfully
                    .then((oFragment) => {
                        //first run
                        this.oOrderPopup = oFragment as SelectDialog;
                        this.oOrderPopup.setTitle("Choose Orders");
                        //allow parasite to access human heart by Immune system
                        this.getView()?.addDependent(this.oOrderPopup);
                        this.oOrderPopup.bindAggregation("items",{
                            path: '/SalesOrderSet',
                            template: new StandardListItem({
                                icon: 'https://cdn-icons-png.flaticon.com/512/4866/4866645.png',
                                title: '{SoId}',
                                description: '{Note}'
                            })
                        });
                        this.oOrderPopup.open("");
                    });
                }else{
                    this.oOrderPopup.open("");
                }
                
            };
    

}

// sap.ui.define(
//     //while we add dependencies, use module name
//     [
//         "ey/ap/acc/controller/BaseController",
//         "sap/ui/model/Filter",
//         "sap/ui/model/FilterOperator",
//         "sap/m/MessageBox",
//         "sap/ui/core/Fragment"
//     ], 
//     function(BaseController, Filter, FilterOperator, MessageBox, Fragment){
//         return BaseController.extend("ey.ap.acc.controller.View1",{

//             onInit: function(){
//                 //debugger;
//                 //this.getOwnerComponent().getManifest()
//                 //this.getOwnerComponent().getModel()
//             },  
//             onSelectItem: function(oEvent){
//                 //Step 1: get the path of the element selected by user
//                 var sPath = oEvent.getParameter("listItem").getBindingContextPath();
//                 //Step 2: Get the view 2 object
//                 // var oView2 =  this.getView().getParent().getPage("idView2");
//                 //Due to new Split App the deposition changed as below

//                 //var oView2 =  this.getView().getParent().getParent().getDetailPage("idView2");
//                 //Step 3: Bind element
//                 //oView2.bindElement(sPath);
//                 //Step 4: nav to view2
//                 this.onNext(sPath);
//             },
//             //dummy change
//             onDelete: function(oEvent){
//                 //MessageBox.confirm("This function is under contruction and you need to complete this 😂");
//                 //Hint: Get All list items which are selected, loop at them, delete them one by one from list object
//                 var oList = this.getView().byId("myList");
//                 var oSelectedItem = oList.getSelectedItem();
//                 oList.removeItem(oSelectedItem);
//             },
//             onSearch: function(oEvent){
//                 //Step 1: get the text typed by user in search field
//                 var sQuery = oEvent.getParameter("query");
//                 console.log(sQuery);
//                 //Step 2: Construct a filter object from sap.ui.model
//                 var oFilter1 = new Filter("CATEGORY", FilterOperator.Contains ,sQuery);
//                 // var oFilter2 = new Filter("taste", FilterOperator.Contains ,sQuery);
//                 // var aFilter = [oFilter1, oFilter2];

//                 //make a filter that is not exclusive AND, rather an OR
//                 // var oFilter = new Filter({
//                 //     filters: aFilter,
//                 //     and: false
//                 // });
                
//                 //Step 3: inject this filter to the items aggregation of list control
//                 var oList = this.getView().byId("myList");
//                 oList.getBinding("items").filter(oFilter1);
//             },
//             onAdd: function(){
//                 this.getRouter().navTo("wonderwomen");
//             },

//             //step 1: create a object for fragment
//             oOrderPopup : null,
//             onShowOrders: function(oEvent){
//                 //in the callback we can access our cotroller object using that
//                 var that = this;
//                 //step 2: load our fragment using sapui5 api = load and return object in callback
//                 //like in abap during PBO - IF lo_alv IS NOT BOUND
//                 if(!that.oOrderPopup){
//                     Fragment.load({
//                         fragmentName:"ey.ap.acc.fragments.popup",
//                         type:"XML",
//                         id:"order",
//                         controller: that
//                     })
//                     //promise which fullfil if fragment object is created successfully
//                     .then(function(oFragment){
//                         //first run
//                         that.oOrderPopup = oFragment;
//                         that.oOrderPopup.setTitle("Choose Orders");
//                         //allow parasite to access human heart by Immune system
//                         that.getView().addDependent(that.oOrderPopup);
//                         that.oOrderPopup.bindAggregation("items",{
//                             path: '/SalesOrderSet',
//                             template: new sap.m.StandardListItem({
//                                 icon: 'https://cdn-icons-png.flaticon.com/512/4866/4866645.png',
//                                 title: '{SoId}',
//                                 description: '{Note}'
//                             })
//                         });
//                         that.oOrderPopup.open();
//                     });
//                 }else{
//                     that.oOrderPopup.open();
//                 }
                
//             },
//             onNext: function(sPath){

//                 // //step 1: get the parent control
//                 // var oAppCon = this.getView().getParent().getParent();
//                 // //step 2: container have the power to navigate to 2nd child
//                 // oAppCon.toDetail("idView2");
//                 var sIndex = sPath.split("/")[sPath.split("/").length - 1];
//                 this.getRouter().navTo("superman",{
//                     zkas: sIndex
//                 });

//             }


//         });
//     }
// );