export class Weather {
  public date: Date;
  public icon: String;
  public currentTemperature: string;


  constructor(date: Date, icon: string, currentTemperature: string) {
    this.date = date;
    this.icon = icon;
    this.currentTemperature = currentTemperature;
  }
}
