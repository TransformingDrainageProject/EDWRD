import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  darea: Yup.number().positive(),
  iarea: Yup.number().positive(),
  rarea: Yup.number().positive(),
  rdep: Yup.number().positive(),
  rseep: Yup.number().min(0),
  zr: Yup.number()
    .min(0)
    .moreThan(Yup.ref('ze')),
  zrfc: Yup.number()
    .lessThan(1)
    .moreThan(Yup.ref('zrwp')),
  zrwp: Yup.number()
    .positive()
    .max(1),
  ze: Yup.number().min(0),
  zefc: Yup.number()
    .max(1)
    .moreThan(Yup.ref('zewp')),
  zewp: Yup.number()
    .positive()
    .max(1),
  rew: Yup.number().positive(),
  cn: Yup.number()
    .positive()
    .integer()
});

export default validationSchema;
