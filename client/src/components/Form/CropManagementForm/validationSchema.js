import * as yup from 'yup';

export const cropManagementFormSchema = yup.object({
  cropSelection: yup.string().required(),
  irrdep: yup
    .number()
    .min(0)
    .required(),
  pfact: yup
    .number()
    .positive()
    .max(1)
    .required()
});
