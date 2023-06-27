import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/interceptors";

export const addCourseService = async (endpoint: string, courseInfo: any) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    courseInfo
  );
  return response
};