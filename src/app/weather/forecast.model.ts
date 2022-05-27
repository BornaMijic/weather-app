export class Forecast {
  public cityName : string;
  public currentTemperature: number;
  public icon: string
  public wind: number;
  public humidity: number;


  constructor(cityName: string, currentTemperature: number, icon: string, wind: number, humidity: number) {
    this.cityName = cityName;
    this.currentTemperature = currentTemperature;
    this.icon = icon;
    this.wind = wind;
    this.humidity = humidity;
  }
}
