import axios from "axios";
import {
  dataValidationResultSchema,
  type DataValidationRequest,
  type DataValidationResult
} from "../../../src/frss-extension/services/overlays/schemas";
import { validationApiRoute } from "./route";

export const getValidation = async (
  data: DataValidationRequest,
): Promise<DataValidationResult> => {
  const response = await axios.post(validationApiRoute, data);

  return dataValidationResultSchema.parse(response.data);
}