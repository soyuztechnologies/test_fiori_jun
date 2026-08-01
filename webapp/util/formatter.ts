/**
 * @namespace  ey.ap.acc.util  
 */
export default{
    getStatus(code: String): String{
            switch (code) {
                case "A":
                    return "Available";
                    break;
                case "O":
                    return "Out of Stock";
                    break;
                case "D":
                    return "Discontinued";
                    break;            
                default:
                    return "Oops!"
                    break;
            }
    },
    getStatusColor(code: String): String{
        switch (code) {
            case "A":
                return "Success";
                break;
            case "O":
                return "Warning";
                break;
            case "D":
                return "Error";
                break;            
            default:
                return "Error"
                break;
        }
    }
}


// sap.ui.define([], function(){
//     return {
//         getStatus: function(code){
//             switch (code) {
//                 case "A":
//                     return "Available";
//                     break;
//                 case "O":
//                     return "Out of Stock";
//                     break;
//                 case "D":
//                     return "Discontinued";
//                     break;            
//                 default:
//                     return "Oops!"
//                     break;
//             }
//         },
//         getStatusColor: function(code){
//             switch (code) {
//                 case "A":
//                     return "Success";
//                     break;
//                 case "O":
//                     return "Warning";
//                     break;
//                 case "D":
//                     return "Error";
//                     break;            
//                 default:
//                     return "Error"
//                     break;
//             }
//         }
//     }
// })