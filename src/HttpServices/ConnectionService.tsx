import { Connection } from "@/shared/constants/models/Connection";
import { httpService } from "./HttpService";
import { AxiosResponse } from "axios";

export class ConnectionService {
  private BASE_URL = "connections";
  private httpService = new httpService();

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
  public getById = async (id: number) => {
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

  public update = async (id: number, data: Connection) => {
    try {
      const res: AxiosResponse = await this.httpService.putRequest(
        `${this.BASE_URL}/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: number) => {
    try {
      const res: AxiosResponse = await this.httpService.deleteRequest(
        `${this.BASE_URL}/${id}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  public test = async (data: Connection) => {
    try {
      const res: AxiosResponse = await this.httpService.postRequest(
        `${this.BASE_URL}/test`,
        data
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };
}
