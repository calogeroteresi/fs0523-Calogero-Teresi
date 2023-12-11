import { IVento } from "./i-vento";

export interface CurrentWeather {
    base: string;
    clouds: { all: number };
    cod: number;
    coord: { lon: number; lat: number };
    dt: number;
    id: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity:number;
    };
    name: string;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    visibility?: number;
    weather: [
      {
        description: string;
        icon: string;
        id: number;
        main: string;
      }
    ];
    wind: {
      deg: number;
      gust: number;
      speed: number;
      direction?: IVento
    };

}
