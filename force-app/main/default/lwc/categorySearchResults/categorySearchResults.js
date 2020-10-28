import { LightningElement, wire, api, track } from 'lwc';
import getNoisleeFiles from '@salesforce/apex/NoisleeDataService.getNoisleeFiles';


export default class CategorySearchResults extends LightningElement {
    @track noisleeFiles;
    selectedNoisleeFileId = '';
    error = undefined;
    categoryTypeId = '';


    @api
    searchCategories(categoryTypeId) {
        //this.isLoading = true;
        // this.notifyLoading(this.isLoading);
        this.categoryTypeId = categoryTypeId;
    }

    @wire(getNoisleeFiles, { categoryTypeId: '$categoryTypeId' })
    wiredNoisleeFiles(result) {
        this.noisleeFiles = result;
        console.log(
            "----------- inside categorySearchResults getNoisleeFiles this.noisleeFiles----------" +
              JSON.stringify(this.noisleeFiles, null, "\t")
          );
        if (result.error) {
            this.error = result.error;
            this.noisleeFiles = undefined;
        }
       // this.isLoading = false;
       //  this.notifyLoading(this.isLoading);
    }
    
    updateSelectedTile(event) {
        this.selectedNoisleeFileId = event.detail.noisleeFileId;
    }

}