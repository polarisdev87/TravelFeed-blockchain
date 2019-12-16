import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { imageProxy } from '../../helpers/getImage';
import uploadFile from '../../helpers/imageUpload';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const FeaturedImageUpload = props => {
  const { featuredImage, setFeaturedImage, rounded } = props;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDropAccepted: files => {
      files.map(file => {
        return uploadFile(file, { allowFullSize: props.allowFullSize }).then(
          res => {
            setFeaturedImage(res);
          },
        );
      });
    },
  });

  const text =
    acceptedFiles && acceptedFiles.length > 0
      ? acceptedFiles.map(file => `Uploading ${file.path}...`)
      : props.placeholder;

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject],
  );

  return (
    <div className="text-center">
      {(featuredImage && (
        <Fragment>
          <img
            alt="Featured"
            className={`img-fluid${rounded ? ' rounded-circle' : ''}`}
            src={imageProxy(featuredImage, 500)}
            style={(rounded && { height: '200px', width: '200px' }) || {}}
          />
          <div className="pt-2">
            <Button
              variant="contained"
              color="secondary"
              component="span"
              onClick={() => setFeaturedImage(undefined)}
            >
              Remove Image <DeleteIcon />
            </Button>
          </div>
        </Fragment>
      )) || (
        <div className="container">
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

FeaturedImageUpload.defaultProps = {
  featuredImage: undefined,
  rounded: false,
};

FeaturedImageUpload.propTypes = {
  setFeaturedImage: PropTypes.func.isRequired,
  featuredImage: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  rounded: PropTypes.bool,
};

export default FeaturedImageUpload;
