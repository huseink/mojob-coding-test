import { AxiosStatic } from "axios";
import {
  IPage,
  PositionFunction,
  JobListing,
  Pagination,
} from "@/models/models";

export default class BaseApi {
  public axios!: AxiosStatic;
  protected baseUrl: string;

  constructor(url: string, axios: AxiosStatic) {
    this.baseUrl = url;
    this.axios = axios;
  }

  public getPositionFunctions = (): Promise<IPage<PositionFunction>> =>
    this.axios
      .get(`${this.baseUrl}job/position-functions/?page_size=100`)
      .then((response) => response.data);

  // Get Job Listings with pagination
  public getPagedJobListings = (
    pagination: Pagination,
    positionFunctionIds?: Number[]
  ): Promise<IPage<JobListing>> => {
    let queryParameters = "?include_open=False";

    queryParameters += `&page_size=${pagination.page_size}&use_pagination=True`;

    if (positionFunctionIds) {
      queryParameters += `&position_functions=${positionFunctionIds.toString()}`;
    }
    return this.axios
      .get(`${this.baseUrl}job/listings/${queryParameters}`)
      .then((response) => response.data);
  };

  // Get Job Listings without pagination
  public getAllJobListings = (
    positionFunctionIds?: Number[]
  ): Promise<JobListing[]> => {
    let queryParameters = "?include_open=False&use_pagination=False";

    if (positionFunctionIds) {
      queryParameters += `&position_functions=${positionFunctionIds.toString()}`;
    }

    return this.axios
      .get(`${this.baseUrl}job/listings/${queryParameters}`)
      .then((response) => response.data);
  };
}
