import * as yup from 'yup';

export const advancedSettingsFormSchema = yup.object().shape({
  rew: yup
    .number()
    .positive()
    .required(),
  rseep: yup
    .number()
    .min(0)
    .required(),
  ze: yup
    .number()
    .min(0)
    .required(),
  zefc: yup
    .number()
    .positive()
    .max(1)
    .moreThan(yup.ref('zewp'))
    .required(),
  zewp: yup
    .number()
    .positive()
    .max(1)
    .required(),
  zrfc: yup
    .number()
    .positive()
    .max(1)
    .moreThan(yup.ref('zrwp'))
    .required(),
  zrwp: yup
    .number()
    .positive()
    .max(1)
    .required()
});
