import axios, { AxiosResponse } from 'axios';

export interface BreweryRequest {
  query?: string;
}

class GetBrewery {
  async execute(request: BreweryRequest): Promise<AxiosResponse> {
    const url = request.query
      ? `https://api.openbrewerydb.org/breweries/search?query=${request.query}`
      : 'https://api.openbrewerydb.org/breweries/';

    const response = await axios.get(url, {
      headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    });
    return response.data;
  }
}

export { GetBrewery };
