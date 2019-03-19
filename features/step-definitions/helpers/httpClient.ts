import * as request from 'request-promise';
const API_BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const originalRequest = require('request');
type RequestPromise = (
  options: request.RequestPromiseOptions
) => request.RequestPromise;

class HttpClient {
  public httpTransport: RequestPromise;

  constructor(httpTransport: RequestPromise) {
    this.httpTransport = httpTransport;
  }

  public async get(url) {
    return this.execRequest({
      method: 'GET',
      uri: API_BASE_URL + url
    });
  }

  public async post(url, body) {
    return this.execRequest({
      method: 'POST',
      uri: API_BASE_URL + url,
      body
    });
  }

  public postWithStream(url) {
      return originalRequest.post(API_BASE_URL + url);
  }

  public async put(url, body) {
    return this.execRequest({
      method: 'PUT',
      uri: API_BASE_URL + url,
      body
    });
  }

  public async delete(url) {
    return this.execRequest({
      method: 'DELETE',
      uri: API_BASE_URL + url
    });
  }

  public async execRequest(options) {
    const technicalOptions = {
      resolveWithFullResponse: true,
      json: true,
      simple: false
    };

    return this.httpTransport(Object.assign(options, technicalOptions));
  }
}

const httpClient = new HttpClient(request);
export default httpClient;
