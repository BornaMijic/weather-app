export class Weather {
  public cityName : string
  public currentTemperature: number
  public icon: string;


  constructor(cityName: string, currentTemperature: number, icon: string) {
    this.cityName = cityName;
    this.currentTemperature = currentTemperature;
    this.icon = icon;
  }
}
