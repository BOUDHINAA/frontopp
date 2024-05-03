import React, { useState } from 'react';
import { Card, Grid, Avatar, Typography, Divider, Button, Box } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';
import Comment from '../Comment';
import Caption from '../Caption';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
const DisplayPost = ({ post, profile, handledeletePost }) => {
  const [currentPost, setCurrentPost] = useState(post);
  const [newComment, setNewComment] = useState('');
  const [displayComments, setDisplayComments] = useState(false);
  const toggleDisplayComments = () => setDisplayComments((prev) => !prev);
  const handleAddComment = (key, value) => {
    setNewComment(value);
  };
  const handleDeleteComment = (commentId) => {
    axios.put(`/status/comment/${post._id}`, { commentId }).then((res) => {
      setCurrentPost(res.data);
    });
  };
  const handleSubmitAddComment = () => {
    axios
      .post(`/status/likepost/comm/${post._id}`, { profile: profile._id, comment: newComment })
      .then((res) => {
        setCurrentPost(res.data);
        setNewComment('');
      });
  };

  const handleLike = () => {
    axios
      .post(`/status/likepost/`, { profileId: profile._id, postId: post._id })
      .then((data) =>
        setCurrentPost((prev) => ({
          ...prev,
          likes: prev.likes.includes(profile._id)
            ? prev.likes.filter((e) => e != profile._id)
            : [...prev.likes, profile._id],
        })),
      );
  };
  const isAlreadyLiked = currentPost?.likes?.includes(profile._id);
  return (
    <Grid item xs={12}>
      <Card sx={{ p: '1rem', position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <ClearIcon sx={{ cursor: 'pointer' }} onClick={() => handledeletePost(post._id)} />
        </Box>
        <Grid container>
          <Grid container item alignItems={'center'} mb={'1rem'}>
            <Grid item xs={1}>
              <Avatar
                src="/img/team-5.png"
                alt="Profile picture"
                variant="square"
                sx={{ width: 80, height: 80 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                {profile.name} {profile.lastname}
              </Typography>
              <Typography variant="body1">
                {new Date(currentPost.createdAt).toUTCString()}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item>
              {' '}
              <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>
                {currentPost.content}{' '}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item spacing={1} mt={2}>
            {currentPost.tags?.map((tag) => (
              <Grid item>
                <Typography variant="body2">{tag} </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Divider></Divider>
        <Grid container display={'flex'}>
          <Grid item md={11} xs={8}>
            <Typography>
              {`${currentPost.likes?.length || 0}`}
              <ThumbUpIcon sx={{ mb: '5px' }} />
            </Typography>
          </Grid>
          <Grid item md={1} xs={4}>
            <Typography onClick={toggleDisplayComments} sx={{ cursor: 'pointer' }}>{`  ${
              currentPost.comments?.length || 0
            } comments`}</Typography>
          </Grid>
        </Grid>
        <Grid container mt={1}>
          <Grid item xs={6}>
            <Button
              onClick={handleLike}
              endIcon={<ThumbUpIcon sx={{ mb: '5px' }} />}
              style={{
                width: '100%',
                color: isAlreadyLiked ? 'white' : 'black',
                backgroundColor: isAlreadyLiked ? '#b41615' : 'white',
              }}
            >
              Like
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              endIcon={<CommentIcon />}
              style={{ width: '100%', color: 'black' }}
              onClick={toggleDisplayComments}
            >
              Comment
            </Button>
          </Grid>
        </Grid>
        {displayComments && (
          <>
            {' '}
            <Divider></Divider>
            <Caption
              value={newComment}
              setValue={handleAddComment}
              title="Add Comment"
              extraComponent={
                <Button
                  sx={{ backgroundColor: 'transparent', color: '#b41615' }}
                  onClick={handleSubmitAddComment}
                >
                  <SendIcon></SendIcon>
                </Button>
              }
            />
            <Grid container>
              {currentPost.comments?.map(({ commentContent, createdAt, _id }) => (
                <Grid item xs={12}>
                  <Comment
                    handleDeleteComment={() => handleDeleteComment(_id)}
                    comment={commentContent}
                    time={new Date(createdAt).toUTCString()}
                    userName={profile.name + ' ' + profile.lastname}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Card>
    </Grid>
  );
};

export default DisplayPost;
