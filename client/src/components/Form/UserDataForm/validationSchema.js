import * as yup from 'yup';

export const userDataFormSchema = yup.object().shape({
  userInput: yup.boolean().required(),
  userInputFile: yup.string().when('userInput', {
    is: (val) => val === 'true' || val === true,
    then: yup.string().required(),
    otherwise: yup.string(),
  }),
  userSelectedStation: yup.number().when('userInput', {
    is: (val) => val === 'false' || val === false,
    then: yup.number().required(),
    otherwise: yup.number(),
  }),
});
