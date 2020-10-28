import { LightningElement, track, api, wire } from "lwc";
import getCategoryTypes from '@salesforce/apex/NoisleeDataService.getCategoryTypes';


export default class CategorySearchForm extends LightningElement {
  selectedCategoryTypeId = "";
  error = undefined;
  @track categoryOptions;

  //wired method to get Category Types for the search category dropdown from org  
  @wire(getCategoryTypes)
  categoryTypes({ error, data }) {
    if (data) {
      this.categoryOptions = data.map((type) => {
        return { label: type.Name, value: type.Id };
      });
      this.categoryOptions.unshift({ label: "All Categories", value: "" });
    } else if (error) {
      this.categoryOptions = undefined;
      this.error = error;
    }
  }

  //handleCategoryOptionChange method creates and dispatches event when the user selects any of the category
  handleCategoryOptionChange(event) {
    this.selectedCategoryTypeId = event.target.value;
    const searchEvent = new CustomEvent('search', {
    detail: {
    categoryTypeId : this.selectedCategoryTypeId
    }
    });
    searchEvent;
    this.dispatchEvent(searchEvent);
    }
}