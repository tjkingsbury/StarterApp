/**
 * Created by Turbo_000 on 7/1/2018.
 */
({
    "transferAccountsButton" : function(cmp){
        console.log('in transfer accounts');
        var action = cmp.get("c.transferAccounts");
        var oldOwnrId = cmp.get("v.oldOwner").Id;
        var newOwnrId = cmp.get("v.newOwner").Id;
        console.log('old owner: ' + oldOwnrId);
        console.log('new owner: ' + newOwnrId);
        action.setParams({oldOwnerId : oldOwnrId,newOwnerId : newOwnrId});
        console.log('action: ' + action);

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned
                // from the server
                //alert("From server: " + response.getReturnValue());
                console.log('success');
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({"title" : "success"
                ,"message":"success"
                ,"type":"success"});
                resultsToast.fire();

                // You would typically fire a event here to trigger
                // client-side notification that the server-side
                // action is complete
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                 errors[0].message);
                    }

                    var resultsToast = $A.get("e.force:showToast");
                                    resultsToast.setParams({"title" : "error"
                                    ,"message":"error: " + errors[0].message,"type":"error"});
                                    resultsToast.fire();
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    }
})