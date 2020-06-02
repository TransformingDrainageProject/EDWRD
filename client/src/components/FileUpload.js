import React, { useState } from 'react';
import axios from 'axios';
import { FormGroup, Input, Label, Progress } from 'reactstrap';

const FileUpload = ({ label, type }) => {
  const [progress, updateProgress] = useState(-1);
  const [error, setError] = useState(undefined);

  const handleOnChange = (e) => {
    setError(undefined);

    if (!e.target.files) {
      return;
    }

    let file = e.target.files[0];

    let data = new FormData();
    data.append('file', file);
    data.append('type', type);

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
        setError(err.response.data);
      }
    );
  };

  return (
    <FormGroup>
      <Label for="file">{label}</Label>
      <Input
        type="file"
        name="file"
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
          {progress === 100 ? 'Completed' : `${progress}%`}
        </Progress>
      ) : null}
      {error ? (
        <div className="mt-3">
          <strong style={{ color: '#EDB229' }}>{error}</strong>
        </div>
      ) : null}
    </FormGroup>
  );
};

export default FileUpload;
