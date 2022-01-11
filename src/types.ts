export type Country = {
  Country: string;
  Slug: string;
  ISO2: string;
}

export type CountryCase = {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: string;
  Date: string;
}