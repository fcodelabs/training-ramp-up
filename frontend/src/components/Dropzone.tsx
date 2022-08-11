import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { io } from 'socket.io-client';

interface IDropzoneProps {
  loading: boolean;
}

const Dropzone = (props: IDropzoneProps) => {
  const socket = io('http://localhost:8000/');
  const { loading } = props;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      multiple: false,
      accept: { '.csv, application/vnd.ms-excel, text/csv': [] },
    });

  useEffect(() => {
    setSelectedFiles(acceptedFiles);
  }, [acceptedFiles]);

  let acceptedFileItems = selectedFiles.map((file: File) => (
    <li key={file.lastModified}>{file.name} </li>
  ));

  const onUploadFileHandler = async () => {
    const formData = new FormData();
    formData.append('file', selectedFiles[0]);

    const response = await fetch('http://localhost:5100/file', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Something went wrong!. File upload not successful.');
    }
    setSelectedFiles([]);
    socket.emit('message_to_server', 'student file uploaded!');
  };

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
      {!loading && (
        <Grid item md={4} sx={{ textAlign: 'center' }}>
          <div
            {...getRootProps()}
            style={{
              padding: '1px',
              borderRadius: '8px',
              border: '2px dashed',
              backgroundColor: '#f2f2f1',
              minHeight: '200px',
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
              {selectedFiles.length === 0 ? (
                <>
                  {isDragActive ? (
                    <p>Drop files here</p>
                  ) : (
                    <p>
                      Drag and drop some files here, or click to select files
                    </p>
                  )}
                </>
              ) : (
                <ul
                  style={{
                    listStyleType: 'none',
                    textAlign: 'start',
                  }}
                >
                  {acceptedFileItems}
                </ul>
              )}
            </div>
          </div>
          {selectedFiles.length !== 0 && (
            <Button
              sx={{ mt: 3 }}
              variant='contained'
              onClick={onUploadFileHandler}
            >
              upload
            </Button>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default Dropzone;
