trigger AvoidDuplicateRecordOnUpdate on NoisleeFileRecord__c(before update) {
 integer count = 0;
 for(NoisleeFileRecord__c newRecord:Trigger.new)
        {
        // Access the "old" record by its ID in Trigger.oldMap
    NoisleeFileRecord__c oldRecord = Trigger.oldMap.get(newRecord.Id);
            List<NoisleeFileRecord__c> records=[select ID from NoisleeFileRecord__c where Name =:newRecord.Name];
            if(records.size()>0)
            {
                count++;
                
                if (oldRecord.Name == newRecord.Name)
                {
                 count--;
                }
                if(count>0)
                {
                newRecord.adderror('You cannot create a dulplicate record');
                }
            }
        } 
 }