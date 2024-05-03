import Caption from '@/Components/Posts/Caption';
import Tags from '@/Components/Posts/Tags';
import { Button, Typography } from '@material-tailwind/react';
import { Divider, Grid } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const AddPost = ({ currentProfile, handleAddPost }) => {
  const [formValues, setFormValues] = useState({ content: '', tags: [] });
  const handleUpdateFormCaption = (key, value) => {
    setFormValues((prev) => ({ ...prev, content: value }));
  };

  const updateTags = (tags) => setFormValues((prev) => ({ ...prev, tags }));
  const handleSubmit = () => {
    const dataToAdd = {
      ...formValues,
      userProfileId: currentProfile._id,
    };
    axios.post(`/status`, dataToAdd).then((data) => {
      handleAddPost(data.data);
      setFormValues({ content: '', tags: [] });
    });
  };
  return (
    <Grid
      // m={'1rem'}
      container
      px={5}
      display={'flex'}
      justifyContent={'center'}
      spacing={5}
      mb={5}
    >
      <Grid item xs={12} width={'100%'}>
        <Typography variant="h4" color="black">
          {' '}
          New post
        </Typography>
      </Grid>
      <Grid item xs={12} width={'100%'}>
        <Divider sx={{ color: 'black', backgroundColor: 'black' }}></Divider>{' '}
      </Grid>
      <Grid item xs={12}>
        <Caption
          value={formValues.content}
          setValue={handleUpdateFormCaption}
          valueName={'caption'}
          title="Caption"
        />
      </Grid>
      <Grid item xs={12}>
        <Tags parentTags={formValues.tags} setSelectedTags={updateTags} />
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
        <Button onClick={handleSubmit}>Submit</Button>
      </Grid>
    </Grid>
  );
};

export default AddPost;
