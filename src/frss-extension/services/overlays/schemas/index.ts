import { z } from 'zod';

/**
 * Schema for data that is sent to an external validator
 */
export const dataValidationInputSchema = z.object({
  analysis_type: z.enum([
    'SEMANTIC_RULES',
    'SEMANTIC_HINTS',
    'SEMANTIC_ALL',
  ]),
  bpmn_model: z.string().nonempty(),
}).strict().required().or(z.object({
  analysis_type: z.enum(['EVIDENCE_QUALITY_ANALYSIS']),
  element_id: z.string().nonempty(),
  bpmn_model: z.string().nonempty(),
}).strict().required());

/**
 * Actual shape of the data that needs to be sent
 */
export type DataValidationOutput = ReturnType<
  typeof dataValidationInputSchema.parse
>;

const severitySchema = z.enum([
  'HIGH',
  'MEDIUM',
  'LOW',
]);

const commonAnalysisObjectSchema = z.object({
  source: z.array(z.string().nonempty()),
  message: z.string().nonempty(),
}).strict();

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
export type DataValidationResult = ReturnType<
  typeof dataValidationResultSchema.parse
>;
