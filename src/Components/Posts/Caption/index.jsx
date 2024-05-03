import { Box, Grid, Card, Typography, TextField } from '@mui/material';
import React from 'react';

const Caption = ({ value, setValue, valueName, title, extraComponent }) => {
  return (
    <Grid container px={0} display={'flex'} justifyContent={'center'}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: '1rem' }}>
          <Typography variant="h6"> {title}</Typography>
          <Card sx={{ backgroundColor: '#f9f9f9', border: '1none' }}>
            <TextField
              value={value}
              onChange={(e) => setValue(valueName, e.target.value)}
              sx={{ border: 'none', width: '100%' }}
            ></TextField>
          </Card>
          {extraComponent && (
            <Box mt={'1rem'} display={'flex'} justifyContent={'flex-end'}>
              {extraComponent}
            </Box>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default Caption;
