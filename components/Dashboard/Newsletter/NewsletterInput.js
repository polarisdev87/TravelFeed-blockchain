import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import IntroSelector from './IntroSelector';
import PostSelector from './PostSelector';
import UpdatesSelector from './UpdatesSelector';

const NewsletterInput = props => {
  const {
    title,
    setTitle,
    intro,
    setIntro,
    updates,
    setUpdates,
    posts,
    setPosts,
    loading,
    setLoading,
  } = props;

  return (
    <>
      <TextField
        margin="dense"
        value={title}
        onChange={event => setTitle(event.target.value)}
        label="Title"
        fullWidth
      />
      <IntroSelector
        intro={intro}
        setIntro={setIntro}
        loading={loading}
        setLoading={setLoading}
      />
      <Typography gutterBottom variant="h6" className="pt-2">
        Updates
      </Typography>
      <UpdatesSelector
        updates={updates}
        setUpdates={setUpdates}
        loading={loading}
        setLoading={setLoading}
      />
      <Typography gutterBottom variant="h6" className="pt-2">
        Featured posts
      </Typography>
      <PostSelector
        posts={posts}
        setPosts={setPosts}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default NewsletterInput;
