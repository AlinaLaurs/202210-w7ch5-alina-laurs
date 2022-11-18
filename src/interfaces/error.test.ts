import { CustomError, HTTPError } from './error';

describe('Given', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let error: CustomError;
    beforeEach(() => {
        error = new HTTPError(400, 'Bad', 'Bad Request');
    });
    test('should first', () => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('statusCode', 400);
        expect(error).toHaveProperty('statusMessage', 'Bad');
        expect(error).toHaveProperty('message', 'Bad Request');
        expect(error).toHaveProperty('name', 'HTTPError');
    });
});
