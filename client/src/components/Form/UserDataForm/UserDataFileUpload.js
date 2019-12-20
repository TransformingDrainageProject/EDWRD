import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

function UserDataFileUpload() {
  return (
    <FormGroup>
      <Label for="dep29">Upload your data</Label>
      <Input type="file" name="dep29" />
    </FormGroup>
  );
}

export default UserDataFileUpload;
