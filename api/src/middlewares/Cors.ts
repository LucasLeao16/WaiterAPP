/* eslint-disable @typescript-eslint/no-explicit-any */
export default (request: string, response: any, next: any) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    next();
};
