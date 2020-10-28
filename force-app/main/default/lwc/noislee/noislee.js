import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


export default class Noislee extends  NavigationMixin(LightningElement) {


    searchCategories(event){
        this.categoryTypeId = event.detail.categoryTypeId;
        this.template.querySelector('c-category-search-results').searchCategories(this.categoryTypeId);

    }
    handleLoading(){

    }
    handleDoneLoading(){

    }
    createNewNoisleeFile() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Noislee_Junction_Object__c',
                actionName: 'new'
            }
        });
    }
}