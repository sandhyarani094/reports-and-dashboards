import { HttpService } from "./HttpService";
import { AxiosResponse } from "axios";

export class ConnectionService {
  private BASE_URL = "connections";
  private httpService = new HttpService();

  public getAll = async () => {
    try {
      const res: AxiosResponse = await this.httpService.getRequest(
        this.BASE_URL
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  public getById = async (id) => {
    try {
      const res: AxiosResponse = await this.httpService.getRequest(
        `${this.BASE_URL}/${id}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  public create = async (data) => {
    try {
      const res: AxiosResponse = await this.httpService.postRequest(
        this.BASE_URL,
        data
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };
}
