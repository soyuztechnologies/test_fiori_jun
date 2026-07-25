sap.ui.define(
    //while we add dependencies, use module name
    [
        "ey/ap/acc/controller/BaseController",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator"
    ], 
    function(BaseController, MessageBox, MessageToast, Filter, FilterOperator){
        return BaseController.extend("ey.ap.acc.controller.Ops",{
            onInit: function(){

                this.getRouter().getRoute("batman").attachMatched(this.herculis, this);

            },
            //Route matched handler function which triggers
            //The route can change manually, browser back-forward button, when user select fruit, user reload ui.
            herculis: function(oEvent){
                
            },
            onTabSelect: function(oEvent){
                var sKey = oEvent.getParameter("selectedKey");
                var oBinding = this.getView().byId("mainOps").getBinding("items");
                console.log(sKey);
                switch (sKey) {
                    case "all":
                        oBinding.filter([]);
                        break;
                    case "less":
                        oBinding.filter([
                            new Filter({
                                path: 'component',
                                operator: FilterOperator.Any,
                                variable: 'spiderman',
                                condition: new Filter(
                                    "spiderman/quantity",
                                    FilterOperator.LT,
                                    1.5
                                )
                            })
                        ]);
                        break;
                    case "more":
                        oBinding.filter([
                            new Filter({
                                path: 'component',
                                operator: FilterOperator.All,
                                variable: 'spiderman',
                                condition: new Filter(
                                    "spiderman/quantity",
                                    FilterOperator.GE,
                                    2
                                )
                            })
                        ]);
                        break;
                    default:
                        break;
                }
            },
            onBack: function(){

                //step 1: get the parent control
                var oAppCon = this.getView().getParent();
                //step 2: container have the power to navigate to 2nd child
                oAppCon.to("idView1");

            },
            onSave: function(){
            },
            onClear: function(){

            }

        });
    }
);