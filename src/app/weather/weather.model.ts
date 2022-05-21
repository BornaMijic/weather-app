export class Weather {
  public cityName: String;
  public icon: String;
  public date: Date;
  public maxTemperature: String;
  public minTemperature: String;


  constructor(cityName: String, icon: String,date: Date, maxTemperature: String, minTemperature: String) {
    this.cityName = cityName;
    this.date = date;
    this.icon = icon;
    this.maxTemperature = maxTemperature;
    this.minTemperature = minTemperature;
  }
}
