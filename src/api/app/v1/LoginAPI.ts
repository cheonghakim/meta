import axios, { AxiosPromise } from "axios";

export default class LoginAPI {
  static v1: string = "/api/center/v1";
  static login() {
    const form = new FormData();
    return axios.post(`${this.v1}/login`, form);
  }
  static tryGetUserInfo() {
    const form = new FormData();
    return axios.post(`${this.v1}/info`, form);
  }
}
