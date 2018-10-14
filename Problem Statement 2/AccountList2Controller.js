({
	doInit: function(component, event, helper) 
    {
    	// Fetch the account list from the Apex controller
        helper.getAccountList(component);
    },
    
    handleClick: function(component, event, helper) 
    {
    	helper.handleClick(component,event);
	},
    
    createRecord: function(component,event,helper)
    {
        helper.createRecord(component,event);
    },
    
    editRecords: function(component,event,helper)
    {
        helper.editRecords(component,event,helper);
    },
    
    deleteRecords: function(component,event,helper)
    {
        helper.deleteRecords(component,event,helper);
    }
})