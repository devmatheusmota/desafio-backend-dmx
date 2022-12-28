import axios, { AxiosResponse } from 'axios';

export interface BreweryRequest {
  query: string;
}

class GetBrewery {
  async execute(request: BreweryRequest): Promise<AxiosResponse> {
    console.log(request.query);
    if (!request.query) {
      const response = await axios.get(`https://api.openbrewerydb.org/breweries/`, {
        headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
      });
      return response.data;
    }
    const response = await axios.get(`https://api.openbrewerydb.org/breweries/search?query=${request.query}`, {
      headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    });

    return response.data;
  }
}

export { GetBrewery };
