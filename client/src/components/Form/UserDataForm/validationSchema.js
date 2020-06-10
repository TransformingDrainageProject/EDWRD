import * as yup from 'yup';

export const userDataFormSchema = yup.object().shape({
  userInput: yup.boolean().required(),
  userSelectedStation: yup.number().when('userInput', {
    is: 'false',
    then: yup.number().required(),
    otherwise: yup.number(),
  }),
});
