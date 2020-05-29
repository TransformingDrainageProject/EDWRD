import * as yup from 'yup';

export const cropManagementFormSchema = yup.object({
  cropSelection: yup.string().required(),
  irrdep: yup.mixed().when('irrdepType', {
    is: 'variable',
    then: yup.string().required(),
    otherwise: yup.number().min(0).required(),
  }),
  irrdepMin: yup.number().when(['irrdepType, irrdep'], {
    is: (irrdepType, irrdep) =>
      irrdepType === 'variable' && irrdep === 'deficitOnly',
    then: yup.number().positive().required(),
    otherwise: yup.number().positive(),
  }),
  irrdepType: yup.string().required(),
  pfact: yup.number().positive().max(1).required(),
});
