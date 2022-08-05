import { Grid } from '@mui/material';
import { width } from '@mui/system';
import * as React from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface IDropzoneProps {}

const Dropzone = (props: IDropzoneProps) => {
  const onDrop = useCallback(() => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid
      container
      sx={{
        mt: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid item md={4}>
        <div
          {...getRootProps()}
          style={{
            padding: '1px',
            borderRadius: '8px',
            border: '2px dashed',
            backgroundColor: '#f2f2f1',
          }}
        >
          <input {...getInputProps()} />
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-3/12 p-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              width={200}
              height={240}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
              />
            </svg>
            <p>Drag and drop some files here, or click to select files</p>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Dropzone;
