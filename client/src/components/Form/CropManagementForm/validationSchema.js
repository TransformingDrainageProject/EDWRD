import * as yup from 'yup';

export const cropManagementFormSchema = yup.object({
  cropSelection: yup.string().required(),
  irrdep: yup.mixed().when('irrdepType', {
    is: 'select',
    then: yup.string().required(),
    otherwise: yup
      .number()
      .min(0)
      .required()
  }),
  irrdepType: yup.string().required(),
  pfact: yup
    .number()
    .positive()
    .max(1)
    .required()
});
