trigger AvoidDuplicateName on NoisleeFileRecord__c(before insert) {
 for(NoisleeFileRecord__c a:Trigger.new)
        {
            List<NoisleeFileRecord__c> records=[select ID from NoisleeFileRecord__c where Name =:a.Name ];
            if(records.size()>0)
            {
                a.adderror('You cannot create a dulplicate record');
            }
        } 
 }