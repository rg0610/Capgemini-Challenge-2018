({
	// Fetch the accounts from the Apex controller
    getAccountList: function(component)
    {
        var action = component.get('c.getAccounts');
        // Set up the callback
        var self = this;
        action.setCallback(this, function(actionResult) 
        {
        	component.set('v.accounts', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    
    handleClick:function(component,event)
    {
        var accId = event.target.id;
        var action = component.get('c.viewAccounts');
        
        action.setParams
        ({
            k : accId
        });
        
        // Set up the callback
        var self = this;
		action.setCallback(this, function(actionResult) 
        {
        	component.set('v.viewAccounts', actionResult.getReturnValue());
        });
        $A.enqueueAction(action); 
	},
    
    createRecord : function (component,event) 
    {
    	var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams
        ({
            "entityApiName": "Account"
        });
        createRecordEvent.fire();
        window.location.reload(true);
    },
    
    editRecords: function(component,event,helper)
    {
        var accId = event.target.id;
        var editRecordEvent = $A.get("e.force:editRecord");
        
        editRecordEvent.setParams
        ({
            "recordId": accId
        });
        editRecordEvent.fire();    
        window.location.reload(true);
    },
    
    deleteRecords:function(component,event,helper)
    {
        var accId = event.target.id;
        var action = component.get('c.deleteAccounts');
        
        action.setParams
        ({ 
            k : accId
        });
        
        // Set up the callback
        var self = this;
        action.setCallback(this, function(response) 
        {
        	var state = response.getState();
            if (state === "SUCCESS") 
            {
            	alert('Record deleted');
            }
            else
            {
                alert('Record not deleted');
            }

        });
        
        $A.enqueueAction(action); 
        window.location.reload(true);
	}
})