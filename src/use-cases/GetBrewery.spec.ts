import 'jest';
import { GetBrewery } from '../use-cases/GetBrewery';

const getBrewery = new GetBrewery();

describe('GetBrewery Usecase', () => {
  it('should be able to get a brewery list without query param', async () => {
    const response = await getBrewery.execute({ query: undefined });
    expect(response).toBeInstanceOf(Array);
  });

  it('should be ablet o get a brewery list with query param', async () => {
    const response = await getBrewery.execute({ query: 'Las Vegas' });
    expect(response).toBeInstanceOf(Array);
  });
});
