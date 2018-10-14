({
	doInit: function(component, event, helper) 
    {
        // Fetch the account list from the Apex controller
        helper.getAccountList(component);
    },
    
    handleClick: function(component, event, helper) 
    {
    	helper.handleClick(component,event);
	}
})