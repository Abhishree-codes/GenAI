import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs'; // Import the Subscription class
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})
export class WeatherDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  date = ""


  getDate(){
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    };
    
    const date = new Date();
    const formattedDate = date.toLocaleString('en-US', options);
    this.date = formattedDate
    
  }
 
  locations: Location[] = [];
  weatherData: any;
  weatherDataSubscription: Subscription | undefined; 
  location = "Mumbai"
  units="metric" //imperial
  lat = 19.0785451
  lon = 72.878176
  selectedInterval = 300000; // Default to 5 minutes (in milliseconds)
  updateInterval: any;
  checkIfSaved(locationName:string){

    for(let i =0; i<this.locations.length; i++){
      if(this.locations[i].name===locationName){
        return true 
      }
    }
    return false 
  }
  addLocation() {
    // Add a new location to the array
    const newLocation = { name: this.location, lat:this.lat,lon:this.lon};

    //get lat and lon 

    this.locations.push(newLocation);
  }

  switchLocation(locationName:string){
    //map through locations 
    //make api call based on lat and lon 
    this.locations.forEach((ele)=>{
      if(ele.name === locationName){
        this.lat = ele.lat
        this.lon = ele.lon
        this.http.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${ele.lat}&lon=${ele.lon}&units=${this.units}&appid=${environment.apiKey}`)
        .subscribe((data: any) => {
          console.log(data);
          this.getDate()
          this.weatherData = data;
        }, (error: any) => {
          console.log(error);
        });
        this.location = locationName
        return 

      }
    })
  }
  startDataUpdates() {
    this.updateInterval = setInterval(() => {
      // Fetch and update weather data here
      this.updateWeatherData();
    }, this.selectedInterval);
  }
  updateWeatherData() {
   //whatever location is set should update 
   this.http.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${this.lat}&lon=${this.lon}&units=${this.units}&appid=${environment.apiKey}`)

   .subscribe((data: any) => {
     console.log(data);
     this.getDate()
     this.weatherData = data;
   }, (error: any) => {
     console.log(error);
   });
  }

   // Handler for changing the update interval
  changeUpdateInterval(intervalInSeconds: any) {
    intervalInSeconds = +intervalInSeconds
    this.selectedInterval = intervalInSeconds * 1000; // Convert seconds to milliseconds

    // Stop the existing interval and start a new one with the updated interval
    clearInterval(this.updateInterval);
    this.startDataUpdates();
  }

  constructor(private http: HttpClient) {}

  changeUnits(value:string){
    this.http.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${this.lat}&lon=${this.lon}&units=${value}&appid=${environment.apiKey}`)
      .subscribe((data: any) => {
        console.log(data);
        this.getDate()
        this.weatherData = data;
      }, (error: any) => {
        console.log(error);
      });
      this.units = value
  }

  changeLocation(value:string){
this.http.get(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=${environment.apiKey}`)
.subscribe((data: any) => {
  console.log(data)
this.lat = data[0].lat
this.lon = data[0].lon
  this.http.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=${this.units}&appid=${environment.apiKey}`)
  .subscribe((data: any) => {
    console.log(data);
    this.getDate()
    this.weatherData = data;
  }, (error: any) => {
    console.log(error);
  });

}, (error: any) => {
  console.log(error);
});

this.location = value 
  }


  ngOnInit(): void {

    this.weatherDataSubscription = this.http.get(`https://api.openweathermap.org/data/3.0/onecall?lat=19.0785451&lon=72.878176&units=${this.units}&appid=${environment.apiKey}`)
      .subscribe((data: any) => {
        console.log(data);
        this.getDate()
        this.weatherData = data;
      }, (error: any) => {
        console.log(error);
      });
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy() {

    if (this.weatherDataSubscription) {
      this.weatherDataSubscription.unsubscribe();
    }
  }
}


interface Location {
  name: string;
  lat:number,
  lon:number
}