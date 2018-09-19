({


    doInit: function(component) {
        // Prepare a new record from template
        component.find("accountRecordCreator").getNewRecord(
            "Account", // sObject type (entityAPIName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newAccount");
                var error = component.get("v.newAccountError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                }
                else {
                    console.log("Record template initialized: " + rec.sobjectType);
                }
            })
        );

        //return picklist values on type
        var action = component.get("c.getAccountType");
        var inputSel = component.find("InputSelectDynamic");
        var opts = [];
        action.setCallback(this, function(a) {
            for(var i=0;i< a.getReturnValue().length;i++){
                opts.push({"class": "optionClass", label: a.getReturnValue()[i], value: a.getReturnValue()[i]});
            }
            inputSel.set("v.options", opts);

        });
        $A.enqueueAction(action);
    },

    handleSave: function(component, event) {
        
        console.log('error');
    },
    
    handleSaveAccount: function(component) {

        component.find("accountRecordCreator").saveRecord(function(saveResult) {
            debugger
            var resultsToast = $A.get("e.force:showToast");
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                // record is saved successfully

                resultsToast.setParams({
                    "title": "Saved",
                    "message": "The record was saved."
                });
                resultsToast.fire();
            } else if (saveResult.state === "INCOMPLETE") {
                // handle the incomplete state
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                // handle the error state
                console.log('Problem saving account, error: ' +
                    JSON.stringify(saveResult.error));
                resultsToast.setParams({
                    "title" : "Error",
                    "message" : "There was an error: " + JSON.stringify(saveResult.error)
                });
                resultsToast.fire();
            } else {
                console.log('Unknown problem, state: ' + saveResult.state +
                    ', error: ' + JSON.stringify(saveResult.error));
            }
        });

    }

})