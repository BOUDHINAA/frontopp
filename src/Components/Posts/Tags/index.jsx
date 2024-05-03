import { Box, Grid, Card, Typography, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CustomizedHook from '@/Components/AutoComplete';
const Tags = ({ setSelectedTags, parentTags }) => {
  const defaultTags = [
    '#CareerGoals',
    '#JobOpportunity',
    '#DreamJob',
    '#CareerDevelopment',
    '#ProfessionalGrowth',
    '#JobSearch',
    '#CareerAdvice',
    '#JobHunt',
    '#WorkOpportunity',
    '#CareerPath',
    '#Employment',
    '#JobOpening',
    '#CareerSuccess',
    '#JobSeeker',
    '#CareerTips',
    '#JobInterview',
    '#WorkLifeBalance',
    '#CareerChange',
    '#JobMarket',
    '#CareerAdvancement',
  ];
  const [selectedValues, setSelectedValues] = useState(parentTags);
  useEffect(() => {
    setSelectedValues(parentTags);
  }, [parentTags]);

  const sampleTags = ['#CareerGoals', '#JobOpportunity', '#CareerDevelopment'];
  const handleAddTag = (tag, alltags) => {
    setSelectedValues((prev) => (alltags ? tag : [...prev, tag]));
    setSelectedTags(alltags ? tag : [...selectedValues, tag]);
  };
  return (
    <Grid container px={0} display={'flex'} justifyContent={'center'}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: '1rem' }}>
          <Typography variant="h6"> Tags</Typography>

          <Card sx={{ backgroundColor: '#f9f9f9', border: 'none' }}>
            <CustomizedHook
              defaultOptions={defaultTags}
              selectedOptions={selectedValues}
              handleAddTag={handleAddTag}
            />
          </Card>
          <Grid container alignItems={'baseline'} spacing={3}>
            <Grid item xs={1}>
              <Typography variant="body1" pl="1rem" pt="1rem">
                Try:
              </Typography>
            </Grid>
            {sampleTags.map((e) => (
              <Grid item>
                <Button
                  disabled={selectedValues.includes(e)}
                  onClick={() => handleAddTag(e)}
                  sx={{ backgroundColor: '#b41615' }}
                  variant="contained"
                  endIcon={<AddIcon />}
                >
                  {e}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Tags;
