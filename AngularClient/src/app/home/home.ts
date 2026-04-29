import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import {HousingLocationInfo} from '../housinglocation';
import { Housing } from '../housing';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      @for (housingLocationObj of filteredLocationList; track $index) {
        <app-housing-location [housingLocation]="housingLocationObj"/>
      }
    </section>`,
  styleUrl: './home.css',
})
export class Home {

  housingLocationList: HousingLocationInfo[] = [];
  housingService: Housing = inject(Housing);

  filteredLocationList : HousingLocationInfo[] = [];  

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
    
    /* To use the async REST version, constructor would look like:

    this.housingService
      .getAllHousingLocationsREST()
      .then((housingLocationList : housingLocationInfo[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
        this.changeDetectorRef.markForCheck();
      });

    */
  }

  filterResults(text: string) {
    if (!text){
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((hLocation) => 
      hLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
