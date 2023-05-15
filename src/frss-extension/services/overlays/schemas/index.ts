import { z } from 'zod';

/**
 * List of all analysis types
 */
export const analysisTypes = [
  'SEMANTIC_RULES',
  'SEMANTIC_HINTS',
  'SEMANTIC_ALL',
  'EVIDENCE_QUALITY_ANALYSIS',
] as const;

/**
 * Schema for the semantic request
 */
export const semanticRequestFormDataSchema = z.object({
  analysis_type: z.enum([
    analysisTypes[0],
    analysisTypes[1],
    analysisTypes[2]]),
}).strict().required();

/**
 * Schema for evidence quality request
 */
export const evidenceQualityAnalysisFormDataSchema = z.object({
  analysis_type: z.enum([analysisTypes[3]]),
  element_id: z.string().nonempty(),
}).strict().required();

/**
 * Schema for data that is retrieved from a form
 */
export const dataValidationFormSchema = semanticRequestFormDataSchema
  .or(evidenceQualityAnalysisFormDataSchema);

/**
 * The inferred type of form data
 */
export type DataValidationFormData = z.infer<
  typeof dataValidationFormSchema
>;

/**
 * Extension field required in the request
 */
export const formExtensionField = {
  bpmn_model: z.string().nonempty(),
};

/**
 * Data Validation request schema (extended form data with the bpmn diagram)
 */
export const DataValidationRequestSchema = semanticRequestFormDataSchema
  .extend(
    formExtensionField,
  ).or(evidenceQualityAnalysisFormDataSchema.extend(
    formExtensionField,
  ));

/**
 * Inferred type of data validation request
 */
export type DataValidationRequest =
z.infer<typeof DataValidationRequestSchema>;

/**
 * The error severity result from the validator
 */
const severitySchema = z.enum([
  'HIGH',
  'MEDIUM',
  'LOW',
]);

/**
 * Analysis result common shape
 */
const commonAnalysisObjectSchema = z.object({
  source: z.array(z.string().nonempty()),
  message: z.string().nonempty(),
}).strict();

/**
 * Errors have a common shape and also a severity field
 */
const errorSchema = commonAnalysisObjectSchema.extend({
  severity: severitySchema,
});

/**
 * Schema for incoming data from an external validator.
 */
export const dataValidationResultSchema = z.object({
  errors: z.array(errorSchema),
  warnings: z.array(commonAnalysisObjectSchema),
  evidence_sources: commonAnalysisObjectSchema.nullable(),
}).strict().required();

/**
 * Actual shape of the data that is received
 */
export type DataValidationResult = z.infer<typeof dataValidationResultSchema>;
