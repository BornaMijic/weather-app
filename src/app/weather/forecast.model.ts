export class Forecast {
  public cityName: string;
  public currentTemperature?: number;
  public icon: string;
  public wind?: number;
  public humidity?: number;
  public maxTemperature?: number;
  public minTemperature?: number;
  public date?: Date;

  constructor(
    cityName: string,
    icon: string,
    currentTemperature?: number,
    wind?: number,
    humidity?: number,
    maxTemperature?: number,
    minTemperature?: number,
    date?: Date
  ) {
    this.cityName = cityName;
    this.icon = icon;
    if (currentTemperature) {
      this.currentTemperature = currentTemperature;
    }
    if (wind) {
      this.wind = wind;
    }
    if (humidity) {
      this.humidity = humidity;
    }
    if (maxTemperature) {
      this.maxTemperature = maxTemperature;
    }
    if (minTemperature) {
      this.minTemperature = minTemperature;
    }
    if (date) {
      this.date = date;
    }
  }
}
