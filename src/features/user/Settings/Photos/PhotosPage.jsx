import React, { useState, useEffect, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
} from '../../userActions.js';
import { toastr } from 'react-redux-toastr';
import { Segment, Header, Divider, Grid, Button } from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';
import UserPhotos from './UserPhotos.jsx';

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos' // this is how it's stored in our reducer. Even tho its the same name as the collection..
    }
  ];
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading
});

const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
};

const PhotosPage = ({
  uploadProfileImage,
  photos,
  profile,
  deletePhoto,
  setMainPhoto,
  loading
}) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [cropResult, setCropResult] = useState('');
  console.log(cropResult);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const handleUploadImage = async () => {
    try {
      await uploadProfileImage(image, files[0].name);
      handleCancelCrop();
      toastr.success('Success', 'Photo has been uploaded!');
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Something went wrong');
    }
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
    setCropResult('');
  };

  const handleDeletePhoto = async photo => {
    try {
      await deletePhoto(photo);
    } catch (err) {
      toastr.error('Oops', err.message);
    }
  };

  const handleSetMainPhoto = async photo => {
    try {
      await setMainPhoto(photo);
    } catch (err) {
      toastr.error('Oops', err.message);
    }
  };

  return (
    <Segment>
      <Header dividing size="large" content="Your Photos" />
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <DropzoneInput setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
          {files.length > 0 && (
            <CropperInput
              setImage={setImage}
              imagePreview={files[0].preview}
              setCropResult={setCropResult}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />
          {files.length > 0 && (
            <Fragment>
              <div
                className="img-preview"
                style={{
                  minHeight: '200px',
                  minWidth: '200px',
                  overflow: 'hidden'
                }}
              />
              <Button.Group>
                <Button
                  loading={loading}
                  onClick={handleUploadImage}
                  style={{ width: '100px' }}
                  positive
                  icon="check"
                />
                <Button
                  disabled={loading}
                  onClick={handleCancelCrop}
                  style={{ width: '100px' }}
                  icon="close"
                />
              </Button.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>

      <Divider />
      <UserPhotos
        photos={photos}
        profile={profile}
        deletePhoto={handleDeletePhoto}
        setMainPhoto={handleSetMainPhoto}
      />
    </Segment>
  );
};

export default compose(
  connect(mapStateToProps, actions),
  firestoreConnect(auth => query(auth))
  // withRouter() - if you need it, it goes here
)(PhotosPage);
