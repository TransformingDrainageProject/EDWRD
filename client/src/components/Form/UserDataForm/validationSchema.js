import * as yup from 'yup';

export const userDataFormSchema = yup.object().shape({
  userInput: yup.boolean().required(),
});
