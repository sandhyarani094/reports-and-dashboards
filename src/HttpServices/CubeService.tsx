import { AxiosResponse } from "axios";
import { HttpService } from "./HttpService";

export class CubeService {
    private BASE_URL = "metadata";
    private httpService = new HttpService();
  
    public getAllTablesByConnection = async (connectionId) => {
      try {
        const res: AxiosResponse = await this.httpService.getRequest(
          `${this.BASE_URL}/tables?connectionId=${connectionId}`
        );
        return res.data;
      } catch (error) {
        throw error;
      }
    };
}