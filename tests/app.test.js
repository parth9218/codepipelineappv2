const app = require('../src/app.js');

describe('Lambda handler', () => {
    it('should return 200 and standard message', async () => {
        const event = {};
        const response = await app.handler(event);
        
        expect(response.statusCode).toEqual(200);
        
        const body = JSON.parse(response.body);
        expect(body.message).toContain('Environment is dictated by the Git branch deployed.');
        expect(body.timestamp).toBeDefined();
    });
});
