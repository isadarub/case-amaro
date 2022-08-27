import { ProductBusiness } from '../../src/business/ProductBusiness';
import { AuthenticatorMock } from '../mocks/services/AuthenticatorMock';
import { HashManagerMock } from '../mocks/services/HashManagerMock';
import { IdGeneratorMock } from '../mocks/services/IdGeneratorMock';
import { ProductDatabaseMock } from '../mocks/ProductDatabaseMock';
import { IAddTagInputDTO } from '../../src/models/Products';
import { BaseError } from '../../src/errors/BaseError';

describe('Testing ProductsBusiness', () => {
  const productsBusiness = new ProductBusiness(
    new ProductDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
  );

  test('Add tag to product successfully', async () => {
    const input: IAddTagInputDTO = {
      token: 'token-admin',
      id: '8360',
      tagName: 'moderno',
    };

    const response = await productsBusiness.addTag(input);

    expect(response.message).toEqual('Tag added successfully!');
  });

  test('returns error if token id missing/invalid', async () => {
    expect.assertions(2);
    try {
      const input: IAddTagInputDTO = {
        token: 'token',
        id: '8360',
        tagName: 'moderno',
      };

      await productsBusiness.addTag(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(401);
        expect(error.message).toEqual('Missing or invalid token.');
      }
    }
  });

  test('returns error if missing params', async () => {
    expect.assertions(2);
    try {
      const input: IAddTagInputDTO = {
        token: 'token-admin',
        id: '8360',
        tagName: '',
      };

      await productsBusiness.addTag(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual('Missing param.');
      }
    }
  });

  test('returns error if id not found', async () => {
    expect.assertions(2);
    try {
      const input: IAddTagInputDTO = {
        token: 'token-admin',
        id: '836',
        tagName: 'moderno',
      };

      await productsBusiness.addTag(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(404);
        expect(error.message).toEqual('Product not found.');
      }
    }
  });

  test("returns error if tagName doesn't exist", async () => {
    expect.assertions(2);
    try {
      const input: IAddTagInputDTO = {
        token: 'token-admin',
        id: '8360',
        tagName: 'summer',
      };

      await productsBusiness.addTag(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(404);
        expect(error.message).toEqual('Tag not found.');
      }
    }
  });

  test('If tag already on product', async () => {
    expect.assertions(2);
    try {
      const input: IAddTagInputDTO = {
        token: 'token-admin',
        id: '8360',
        tagName: 'viagem',
      };

      await productsBusiness.addTag(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(409);
        expect(error.message).toEqual('Tag already related to product.');
      }
    }
  });
});
