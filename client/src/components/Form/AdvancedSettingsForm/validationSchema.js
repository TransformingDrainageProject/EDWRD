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
    .required(),
  plantDateStart: yup
    .date()
    .max(yup.ref('plantDateEnd'))
    .required(),
  plantDateEnd: yup
    .date()
    .min(yup.ref('plantDateStart'))
    .max(yup.ref('initDateStart'))
    .required(),
  initDateStart: yup
    .date()
    .min(yup.ref('plantDateEnd'))
    .max(yup.ref('initDateEnd'))
    .required(),
  initDateEnd: yup
    .date()
    .min(yup.ref('initDateStart'))
    .max(yup.ref('devDateStart'))
    .required(),
  devDateStart: yup
    .date()
    .min(yup.ref('initDateEnd'))
    .max(yup.ref('devDateEnd'))
    .required(),
  devDateEnd: yup
    .date()
    .min(yup.ref('devDateStart'))
    .max(yup.ref('midDateStart'))
    .required(),
  midDateStart: yup
    .date()
    .min(yup.ref('devDateEnd'))
    .max(yup.ref('midDateEnd'))
    .required(),
  midDateEnd: yup
    .date()
    .min(yup.ref('midDateStart'))
    .max(yup.ref('lateDateStart'))
    .required(),
  lateDateStart: yup
    .date()
    .min(yup.ref('midDateEnd'))
    .max(yup.ref('lateDateEnd'))
    .required(),
  lateDateEnd: yup
    .date()
    .min(yup.ref('lateDateStart'))
    .max(yup.ref('harvestDateStart'))
    .required(),
  harvestDateStart: yup
    .date()
    .min(yup.ref('lateDateEnd'))
    .max(yup.ref('harvestDateEnd'))
    .required(),
  harvestDateEnd: yup
    .date()
    .min(yup.ref('harvestDateEnd'))
    .required(),
  initKC: yup
    .number()
    .positive()
    .required(),
  midKC: yup
    .number()
    .positive()
    .required(),
  initCropHeight: yup
    .number()
    .positive()
    .required(),
  midCropHeight: yup
    .number()
    .positive()
    .required(),
});
