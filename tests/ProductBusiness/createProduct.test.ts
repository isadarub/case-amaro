import { ProductBusiness } from '../../src/business/ProductBusiness';
import { AuthenticatorMock } from '../mocks/services/AuthenticatorMock';
import { HashManagerMock } from '../mocks/services/HashManagerMock';
import { IdGeneratorMock } from '../mocks/services/IdGeneratorMock';
import { ProductDatabaseMock } from '../mocks/ProductDatabaseMock';
import {
  IGetProductsInputDTO,
  IPostProductInputDTO,
} from '../../src/models/Products';
import { BaseError } from '../../src/errors/BaseError';

describe('Testing ProductsBusiness', () => {
  const productsBusiness = new ProductBusiness(
    new ProductDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
  );

  test('Create product successfully', async () => {
    const input: IPostProductInputDTO = {
      token: 'token-admin',
      name: 'Blue dress',
    };

    const response = await productsBusiness.createProduct(input);

    expect(response.message).toEqual('Product added successfully!');
  });

  test('returns error if token is invalid/missing', async () => {
    expect.assertions(2);
    try {
      const input: IPostProductInputDTO = {
        token: '',
        name: 'Blue dress',
      };

      await productsBusiness.createProduct(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(401);
        expect(error.message).toEqual('Missing or invalid token.');
      }
    }
  });

  test('returns error if product name is missing', async () => {
    expect.assertions(2);
    try {
      const input: IPostProductInputDTO = {
        token: 'token-admin',
        name: '',
      };

      await productsBusiness.createProduct(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual('Missing param.');
      }
    }
  });

  test('returns error if name have less than 4 chars', async () => {
    expect.assertions(2);
    try {
      const input: IPostProductInputDTO = {
        token: 'token-admin',
        name: 'pan',
      };

      await productsBusiness.createProduct(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual('Invalid name param.');
      }
    }
  });
});
