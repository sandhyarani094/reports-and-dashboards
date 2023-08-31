import axios from 'axios'

export class HttpService {

    private API_URL = process.env.NEXT_PUBLIC_CONNECTION_URL;

    public postRequest = async (path: string, data: any) => {
        return axios.post(`${this.API_URL}${path}`, data);
    };

    public getRequest = async (path) => {
        return axios.get(`${this.API_URL}${path}`);
    }
}