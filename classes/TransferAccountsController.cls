/**
 * Created by Turbo_000 on 7/1/2018.
 */

public with sharing class TransferAccountsController {



    @AuraEnabled
    public static void transferAccounts(String oldOwnerId, String newOwnerId){

        System.debug('in transfer accounts');

        List<Account> acctList = new List<Account>();

        for(Account acct : [SELECT Id FROM Account WHERE OwnerId=:oldOwnerId]){
            acct.OwnerId = newOwnerId;
            acctList.add(acct);
        }


        try{
            update acctList;
        }catch(DmlException e){
            throw new AuraHandledException('The following error occurred: ' + e.getMessage());
        }


    }
}