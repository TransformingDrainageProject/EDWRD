import * as yup from 'yup';

export const fieldReservoirFormSchema = yup.object().shape({
  darea: yup
    .number()
    .positive()
    .required(),
  dareaIncSurfaceRunoff: yup.boolean().required(),
  iarea: yup
    .number()
    .positive()
    .required(),
  rarea: yup
    .number()
    .positive()
    .required(),
  rdep: yup
    .number()
    .positive()
    .required(),
  soilType: yup.string().required(),
  zr: yup
    .number()
    .min(0)
    .moreThan(yup.ref('ze'))
    .required()
});
