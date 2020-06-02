import React, { useState } from 'react';
import axios from 'axios';
import { FormGroup, Input, Label, Progress } from 'reactstrap';

function UserDataFileUpload() {
  const [inputFile, setInputFile] = useState(null);
  const [progress, updateProgress] = useState(-1);
  const [error, setError] = useState(undefined);

  const handleOnChange = (e) => {
    setError(undefined);

    if (!e.target.files) {
      return;
    }

    let file = e.target.files[0];
    setInputFile(file);

    let data = new FormData();
    data.append('file', file);
    data.append('type', 'input');

    let config = {
      onUploadProgress: (p) => {
        updateProgress(Math.round((p.loaded * 100) / p.total));
      },
    };

    updateProgress(0);

    axios.post('/api/upload', data, config).then(
      (res) => {
        setError(undefined);
      },
      (err) => {
        if (err.response.data.msg) {
          setError(err.response.data.msg);
        } else {
          setError('Unable to upload file');
        }
      }
    );
  };

  return (
    <FormGroup>
      <Label for="inputFile">Upload your data</Label>
      <Input
        type="file"
        name="inputFile"
        accept="text/csv, text/plain"
        onChange={handleOnChange}
      />
      {progress > -1 && !error ? (
        <Progress
          animated
          striped
          bar
          className="mt-3"
          color="success"
          value={progress}
        >
          {progress}%
        </Progress>
      ) : null}
      {error ? (
        <div className="mt-3">
          <strong style={{ color: '#EDB229' }}>{error}</strong>
        </div>
      ) : null}
    </FormGroup>
  );
}

export default UserDataFileUpload;
