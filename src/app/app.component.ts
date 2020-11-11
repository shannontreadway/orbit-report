import { Component } from '@angular/core';
import { Satellite } from './satellite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];

  constructor() {
    this.displayList = [];
    this.sourceList = [
      // The following lines are commented out per direction 5.1 - "replace your constructor in AppComponent with the code below."
      // new Satellite("SiriusXM", "Communication", "2009-03-21", "LOW", true),
      // new Satellite("Cat Scanner", "Imaging", "2012-01-05", "LOW", true),
      // new Satellite("Weber Grill", "Space Debris", "1996-03-25", "HIGH", false),
      // new Satellite("GPS 938", "Positioning", "2001-11-01", "HIGH", true),
      // new Satellite("ISS", "Space Station", "1998-11-20", "LOW", true)
    ];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

    window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {
        let fetchedSatellites = data.satellites;
        // Loop over satellites. 
        for (let i=0; i<fetchedSatellites.length; i++) {

          // Create a Satellite object using new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational).
          let satellite = new Satellite (fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);

          // Add the new Satellite object to sourceList using: this.sourceList.push(satellite).
          this.sourceList.push(satellite);
        }
        // make a copy of the sourceList to be shown to the user
        this.displayList = this.sourceList.slice(0);
      }.bind(this));
    }.bind(this));
  }

  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for(let i=0; i < this.sourceList.length; i++) {
       let name = this.sourceList[i].name.toLowerCase();
       let orbitType = this.sourceList[i].orbitType.toLowerCase();
       let type = this.sourceList[i].type.toLowerCase();
       if (name.indexOf(searchTerm) >= 0 || orbitType.indexOf(searchTerm) >= 0 || type.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
       }
    }
    // assign this.displayList to be the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
  }

}