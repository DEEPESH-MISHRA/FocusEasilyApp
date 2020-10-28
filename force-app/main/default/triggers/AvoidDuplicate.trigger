trigger AvoidDuplicate on Noislee_Junction_Object__c(before insert,before update) {
 for(Noislee_Junction_Object__c a:Trigger.new)
        {
            List<Noislee_Junction_Object__c> acc=[select ID from Noislee_Junction_Object__c where Category_Name__c=:a.Category_Name__c and File_Name__c=:a.File_Name__c];
            if(acc.size()>0)
            {
                a.adderror('You cannot create a dulplicate record');
            }
        } 
 }