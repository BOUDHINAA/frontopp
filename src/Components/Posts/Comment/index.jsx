import { Grid, Avatar, Typography, Card, Box } from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
const Comment = ({ comment, userName, time, handleDeleteComment }) => {
  return (
    <Card sx={{ mt: '1rem', p: '1rem', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        <ClearIcon sx={{ cursor: 'pointer' }} onClick={handleDeleteComment} />
      </Box>
      <Grid container>
        <Grid item xs={12} md={1}>
          <Avatar
            src={`http://localhost:3000/user/profileCompany_image/${localStorage.getItem(
              'pId',
            )}`}
            alt="Profile picture"
            variant="round"
            sx={{ width: 80, height: 80 }}
          />
        </Grid>
        <Grid container item xs={11} mt={2} display={'flex'} flexDirection={'column'}>
          <Grid item>
            <Typography variant="h6">{userName}</Typography>
            <Typography variant="body2">{time}</Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ wordBreak: 'break-all' }}>{comment}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Comment;
