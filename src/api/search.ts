import { AxiosError, AxiosResponse } from "axios";
import API from "../service/axios";
import errorHandle from "./errorHandling";
import searchRoutes from "@/service/endPoints/searchEndpoints";
import { SearchFilters, SearchResult } from "@/Types/mentorTypes";
import { SearchPostFilters, SearchPostResult } from "@/Types/postTypes";
import { SearchMenteeFilters, SearchMenteeResult } from "@/Types/menteeTypes";

export const fetchMentors = async (
  filters: SearchFilters
): Promise<SearchResult[]> => {
  try {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.skills) params.append("skills", filters.skills.join(","));
    if (filters.jobTitle) params.append("jobTitle", filters.jobTitle);
    if (filters.company) params.append("company", filters.company);
    if (filters.minPrice)
      params.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice)
      params.append("maxPrice", filters.maxPrice.toString());
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const response = await API.get(searchRoutes.searchMentors, { params });
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    errorHandle(err);
    throw err;
  }
};

export const fetchPosts = async (
  filters: SearchPostFilters
): Promise<SearchPostResult[]> => {
  try {
    const params = new URLSearchParams();

    if (filters.title) params.append("title", filters.title);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const response = await API.get(searchRoutes.searchPosts, { params });
    return response.data.data; // Adjust depending on the response structure
  } catch (error) {
    const err = error as AxiosError;
    errorHandle(err);
    throw err;
  }
};

export const fetchMentees = async (
  filters: SearchMenteeFilters
): Promise<SearchMenteeResult[]> => {
  try {
    const params = new URLSearchParams();

    if (filters.name) params.append("name", filters.name);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const response = await API.get(searchRoutes.searchMentees, { params });
    return response.data.data; // Adjust depending on the response structure
  } catch (error) {
    const err = error as AxiosError;
    errorHandle(err);
    throw err;
  }
};