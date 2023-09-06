import { AxiosResponse } from "axios";
import { httpService } from "./HttpService";

export class ComponentService{
    private BASE_URL = "cubes";
    private httpService = new httpService();
  
    public getAllCubes = async () => {
      try {
        const res: AxiosResponse = await this.httpService.getRequest(
          this.BASE_URL
        );
        return res.data;
      } catch (error) {
        throw error;
      }
    };

    public getAllDimensions = async (cubeId: any) => {
        try {
          const res: AxiosResponse = await this.httpService.getRequest(
            `${this.BASE_URL}/getDimensions/${cubeId}`
          );
          return res.data;
        } catch (error) {
          throw error;
        }
      };
}