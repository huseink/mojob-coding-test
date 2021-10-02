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
    pagination: Pagination
  ): Promise<IPage<JobListing>> => {
    let queryParameters = "?include_open=False";
    queryParameters += `&page_size=${pagination.page_size}&use_pagination=True`;
    return this.axios
      .get(`${this.baseUrl}job/listings/${queryParameters}`)
      .then((response) => response.data);
  };

  // Get Job Listings without pagination
  public getAllJobListings = (): Promise<JobListing[]> => {
    let queryParameters =
      "?include_open=False&use_pagination=False";
    return this.axios
      .get(`${this.baseUrl}job/listings/${queryParameters}`)
      .then((response) => response.data);
  };
}
