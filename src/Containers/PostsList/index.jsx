import DisplayPost from '@/Components/Posts/DisplayPost';
import { Container, Grid } from '@mui/material';
import React from 'react';

const PostsList = ({ posts, profile, handledeletePost }) => {
  return (
    <Container sx={{ my: '2rem' }}>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <DisplayPost post={post} profile={profile} handledeletePost={handledeletePost} />
        ))}
      </Grid>
    </Container>
  );
};

export default PostsList;
