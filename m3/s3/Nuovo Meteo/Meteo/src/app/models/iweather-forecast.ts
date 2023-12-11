export interface IWeatherForecast {

    clouds: {
      all: number;
    };
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity:string;

    };
    pop: number;
    sys: {
      pod: string;

    };
    visibility: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
      deg: number;
      gust: number;

    };


}
