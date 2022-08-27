import { UserBusiness } from '../../src/business/UserBusiness';
import { UserDatabaseMock } from '../mocks/UserDatabaseMock';
import { IdGeneratorMock } from '../mocks/services/IdGeneratorMock';
import { HashManagerMock } from '../mocks/services/HashManagerMock';
import { AuthenticatorMock } from '../mocks/services/AuthenticatorMock';
import { ISignupInputDTO } from '../../src/models/User';
import { BaseError } from '../../src/errors/BaseError';

describe('Testing UserBusiness', () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
  );

  test('Signup successfully', async () => {
    const input: ISignupInputDTO = {
      name: 'alice',
      email: 'alice@gmail.com',
      password: 'alice99',
    };

    const response = await userBusiness.signup(input);

    expect(response.message).toEqual('Successfully registered!');
    expect(response.token).toEqual('token-mock');
  });

  test('returns error if e-mail already signed', async () => {
    expect.assertions(2);
    try {
      const input: ISignupInputDTO = {
        name: 'Admin',
        email: 'admin@test.com',
        password: 'asdfg123',
      };

      await userBusiness.signup(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(409);
        expect(error.message).toEqual('E-mail already registered.');
      }
    }
  });

  test('returns error if e-mail is in invalid format', async () => {
    expect.assertions(2);
    try {
      const input: ISignupInputDTO = {
        name: 'alice',
        email: 'alicegmail.com',
        password: 'alice99',
      };

      await userBusiness.signup(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual("Invalid 'email' parameter.");
      }
    }
  });

  test('returns error if password have less than 6 chars', async () => {
    expect.assertions(2);
    try {
      const input: ISignupInputDTO = {
        name: 'alice',
        email: 'alice@gmail.com',
        password: 'alice',
      };

      await userBusiness.signup(input);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        expect(error.statusCode).toEqual(400);
        expect(error.message).toEqual(
          "Invalid 'password' parameter: minimum 6 characters."
        );
      }
    }
  });
});
