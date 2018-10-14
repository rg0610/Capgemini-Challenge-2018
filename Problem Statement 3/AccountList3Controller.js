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
    },
    
    checkboxSelect: function(component, event, helper) 
    {
        helper.checkboxSelect(component,event,helper);
    },
    
    selectAll: function(component, event, helper)
    {
        helper.selectAll(component,event,helper);
    },
    
    deleteSelected: function(component, event, helper) 
    {
  		// create var for store record id's for selected checkboxes   
    	if (confirm("Confirm Delete")) 
    	{
            var delId = [];
            // get all checkboxes 
            var getAllId = component.find("boxPack");
            // If the local ID is unique[in single record case], find() returns the component. not array
            if(! Array.isArray(getAllId))
            {
                if (getAllId.get("v.value") == true) 
                {
                    delId.push(getAllId.get("v.text"));
                }
     		}
         else
         {
             // play a for loop and check every checkbox values 
             for (var i = 0; i < getAllId.length; i++) 
             {
               if (getAllId[i].get("v.value") == true) 
               {
                    delId.push(getAllId[i].get("v.text"));
               }
            }
         } 
   
     	// call the helper function and pass all selected record id's.    
      	helper.deleteSelectedHelper(component, event, delId);
      } 
      else 
      {}        
   },
    
   openModal:function(component,event,helper) 
   {
		var cmpTarget = component.find('Modalbox');
		var cmpBack = component.find('Modalbackdrop');
		$A.util.addClass(cmpTarget, 'slds-fade-in-open');
		$A.util.addClass(cmpBack, 'slds-backdrop--open');      
		helper.fetchSelected(component,event,helper);    
	},
    
    closeModal:function(component,event,helper)
    {    
		var cmpTarget = component.find('Modalbox');
		var cmpBack = component.find('Modalbackdrop');
		$A.util.removeClass(cmpBack,'slds-backdrop--open');
		$A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
    },
    
    updateSelected: function(component, event, helper) 
    {
        var updId = [];
  		// get all checkboxes 
  		var getAllId = component.find("boxPack");
  		// If the local ID is unique[in single record case], find() returns the component. not array
     	if(! Array.isArray(getAllId))
        {
         	if (getAllId.get("v.value") == true) 
            {
           		updId.push(getAllId.get("v.text"));
         	}
        }
        else
        {
         	// play a for loop and check every checkbox values 
         	for (var i = 0; i < getAllId.length; i++) 
         	{
           		if (getAllId[i].get("v.value") == true) 
           		{
             		updId.push(getAllId[i].get("v.text"));
           		}
      		}
     	} 
   
     // call the helper function and pass all selected record id's.    
      helper.updateSelectedHelper(component, event, updId);
    } 
})