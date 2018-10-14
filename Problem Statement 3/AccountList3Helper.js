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
    
     fetchSelected: function(component,event,helper)
     {         
        var fetchId = [];
  		// get all checkboxes 
  		var getAllId = component.find("boxPack");
  		// If the local ID is unique[in single record case], find() returns the component. not array
     	if(! Array.isArray(getAllId))
        {
         	if (getAllId.get("v.value") == true) 
            {
           		fetchId.push(getAllId.get("v.text"));
         	}
     	}
     	else
     	{
        	 // play a for loop and check every checkbox values 
         	for (var i = 0; i < getAllId.length; i++) 
         	{
           		if (getAllId[i].get("v.value") == true) 
           		{
             		fetchId.push(getAllId[i].get("v.text"));
           		}
      		}  
     	} 
     // call the helper function and pass all selected record id's.    
      helper.fetchSele(component, event, fetchId);
    },
    
    fetchSele:function(component,event,selectedRecordId)
    {
        var action = component.get('c.getsSelected');
        action.setParams
        ({
       		"lstRecordId": selectedRecordId
     	 });
        var self = this;
        action.setCallback(this, function(actionResult) 
        {
        	component.set('v.selectedAccounts', actionResult.getReturnValue());
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
	},
    
    checkboxSelect: function(component, event, helper)
    {
      // get the selected checkbox value  
      var selectedRec = event.getSource().get("v.value");
      // get the selectedCount attrbute value(default is 0) for add/less numbers. 
      var getSelectedNumber = component.get("v.selectedCount");
        
      if (selectedRec == true) 
      {
       	getSelectedNumber++;
      } 
      else
      {
      	getSelectedNumber--;
      }
      // set the actual value on selectedCount attribute to show on header part. 
      component.set("v.selectedCount", getSelectedNumber);
     },
    
     selectAll: function(component, event, helper) 
     {
      	//get the header checkbox value  
      	var selectedHeaderCheck = event.getSource().get("v.value");
      	// get all checkbox on table with "boxPack" aura id (all iterate value have same Id)
      	 
      	var getAllId = component.find("boxPack");
      // If the local ID is unique[in single record case], find() returns the component. not array   
        if(! Array.isArray(getAllId))
        {
           if(selectedHeaderCheck == true)
           { 
              component.find("boxPack").set("v.value", true);
              component.set("v.selectedCount", 1);
           }
           else
           {
               component.find("boxPack").set("v.value", false);
               component.set("v.selectedCount", 0);
           }
         }
         else
         {
           // check if select all (header checkbox) is true then true all checkboxes on table in a for loop  
           // and set the all selected checkbox length in selectedCount attribute.
           // if value is false then make all checkboxes false in else part with play for loop 
           // and select count as 0 
            if (selectedHeaderCheck == true) 
            {
            	for (var i = 0; i < getAllId.length; i++) 
                {
              		component.find("boxPack")[i].set("v.value", true);
             		component.set("v.selectedCount", getAllId.length);
            	}
            }
            else
            {
            	for (var i = 0; i < getAllId.length; i++) 
                {
                	component.find("boxPack")[i].set("v.value", false);
                 	component.set("v.selectedCount", 0);
            	}
            } 
         }   
	},
    
    deleteSelectedHelper: function(component, event, deleteRecordsIds)
    {
      //call apex class method
      var action = component.get('c.deleteMultipleRecords');
      // pass the all selected record's Id's to apex method 
      action.setParams
      ({
       		"lstRecordId": deleteRecordsIds
      });
      action.setCallback(this, function(response) 
      {
       		//store state of response
       		var state = response.getState();
       		if (state === "SUCCESS") 
            {
        		console.log(state);
        		if (response.getReturnValue() != '') 
                {
         			// if getting any error while delete the records , then display a alert msg/
         			alert('The following error has occurred. while Delete record-->' + response.getReturnValue());
        		} 
                else 
                {
         			console.log('check it--> delete successful');
        		}
        // call the onLoad function for refresh the List view    
        		window.location.reload(true);
       		}
      });
      $A.enqueueAction(action);
 	},
    
    updateSelectedHelper: function(component, event, updateRecordsIds)
    {
      //call apex class method
      var action = component.get('c.updateMultipleRecords');
        //get the value of select option
        var mySelect = component.find("mySelect");
        var accSource = mySelect.get("v.value");
      // pass the all selected record's Id's to apex method 
      action.setParams
      ({
      	  "lstRecordId": updateRecordsIds,
          "accSource" : accSource
      });
      action.setCallback(this, function(response) 
      {
      		 //store state of response
       		var state = response.getState();
       		if (state === "SUCCESS") 
            {
        		alert('Record updated');
                // call the onLoad function for refresh the List view    
        		window.location.reload(true);
       		}
      });
      $A.enqueueAction(action);
   }
})