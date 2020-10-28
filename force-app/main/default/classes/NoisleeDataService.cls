public with sharing class NoisleeDataService {
    
    @AuraEnabled(cacheable = true)
    public static List<NoisleeCategoryType__c> getCategoryTypes() {
        return [SELECT Name, Id FROM NoisleeCategoryType__c WITH SECURITY_ENFORCED ORDER BY Name];
    }

    @AuraEnabled(cacheable = true)
    public static List<Noislee_Junction_Object__c> getNoisleeFiles(String categoryTypeId) {
        // Without an explicit categoryTypeId, the full list is desired
        List<Noislee_Junction_Object__c> lstCheck = new List<Noislee_Junction_Object__c>();
        if (String.isBlank(categoryTypeId)){
            List<Noislee_Junction_Object__c> lstnoislee= [SELECT NoisleeFileRecord__r.Name, NoisleeFileRecord__r.Picture__c, NoisleeFileRecord__r.Audio_File_URL__c, NoisleeCategoryType__c FROM Noislee_Junction_Object__c order by NoisleeFileRecord__r.Name asc];
            Map<String,Noislee_Junction_Object__c> mapStrByzip=new Map<String,Noislee_Junction_Object__c>();
            for(Noislee_Junction_Object__c noislee:lstnoislee){
                mapStrByzip.put(noislee.NoisleeFileRecord__c,noislee);//This is map and hence it will always have unique values	
            }           
            lstCheck = mapStrByzip.values();            
        }
        if (String.isNotBlank(categoryTypeId)) {
            String query = 'SELECT '
                     + 'NoisleeFileRecord__r.Name, '
                     + 'NoisleeFileRecord__r.Picture__c, NoisleeFileRecord__r.Audio_File_URL__c, '
                     + 'NoisleeCategoryType__c '
                     + 'FROM Noislee_Junction_Object__c '
                     + 'WHERE NoisleeCategoryType__c = :categoryTypeId '
                     + ' WITH SECURITY_ENFORCED order by NoisleeFileRecord__r.Name asc';                
            lstCheck = Database.query(query);
        }
        
        return lstCheck;
    }


}