import * as yup from 'yup';

export const userDataFormSchema = yup.object().shape({
  userData: yup.boolean().required()
});
