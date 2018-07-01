/**
 * Created by Turbo_000 on 3/24/2018.
 */

public class CreateAccountController {

    //returns a list of picklist values for the Type field on Account
    @auraEnabled
    public static List<String> getAccountType(){
        List<String> options = new List<String>();
        Schema.DescribeFieldResult fieldResult = Account.Type.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for(Schema.PicklistEntry f : ple){
            options.add(f.getLabel());
        }
        System.debug('options: ' + options);
        return options;
    }
}