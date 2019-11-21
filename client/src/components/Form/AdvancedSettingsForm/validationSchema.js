import * as yup from 'yup';

export const advancedSettingsFormSchema = yup.object().shape({
  ze: yup
    .number()
    .min(0)
    .required()
});
