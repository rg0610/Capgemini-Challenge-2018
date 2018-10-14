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
        var idx = event.target.id;
        var action = component.get('c.viewAccounts');
        
        action.setParams
        ({
            k : idx
        });
        
        // Set up the callback
        var self = this;
		action.setCallback(this, function(actionResult) 
        {
        	component.set('v.viewAccounts', actionResult.getReturnValue());
        });
        
        $A.enqueueAction(action); 
	}
})