const formFields = [
  { type: 'number', name: 'darea', min: 0.1, step: 0.1 },
  { type: 'number', name: 'iarea', min: 0.1, step: 0.1 },
  { type: 'number', name: 'rarea', min: 0.1, step: 0.1 },
  { type: 'number', name: 'rdep', min: 0.1, step: 0.1 },
  { type: 'number', name: 'rseep', min: 0, step: 0.1 },
  { type: 'number', name: 'zr', min: 0, step: 0.1 },
  { type: 'number', name: 'zrfc', min: 0.001, step: 0.001 },
  { type: 'number', name: 'zrwp', min: 0.001, max: 1, step: 0.001 },
  { type: 'number', name: 'ze', min: 0, step: 0.1 },
  { type: 'number', name: 'zefc', min: 0.001, max: 1, step: 0.001 },
  { type: 'number', name: 'zewp', min: 0.001, max: 1, step: 0.001 },
  { type: 'number', name: 'rew', min: 0.1, step: 0.1 },
  { type: 'number', name: 'cn', min: 1 }
];

export default formFields;
