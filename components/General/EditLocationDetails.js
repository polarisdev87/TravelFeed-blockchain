import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
  createMuiTheme,
  MuiThemeProvider,
  useTheme,
} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_LOCATION_DETAILS } from '../../helpers/graphql/locations';
import { getRoles } from '../../helpers/token';
import FeaturedImageUpload from '../Editor/FeaturedImageUpload';

const redbtntheme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const EditLocationDetails = props => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(undefined);
  const [attribution, setAttribution] = useState('');
  const [description, setDescription] = useState('');
  const [budget_score, setBudgetScore] = useState(undefined);
  const [title, setTitle] = useState('');
  const [isFeatured, setFeatured] = useState(false);
  const [roles, setRoles] = useState(undefined);
  const [topics, setTopics] = useState(undefined);

  useEffect(() => {
    setRoles(getRoles());
    if (props.data.image)
      setImage(
        props.data.image.replace(/&w=[0-9].*&h=[0-9]*/, '&w=2880&h=900'),
      );
    if (props.data.attribution) setAttribution(props.data.attribution);
    if (props.data.description) setDescription(props.data.description);
    if (props.data.budget_score) setBudgetScore(props.data.budget_score);
    if (props.data.title) setTitle(props.data.title);
    if (props.data.isFeatured !== undefined) setFeatured(props.data.isFeatured);
    if (props.data.topics !== undefined) setTopics(props.data.topics);
  }, [props]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isCurator = roles && roles.indexOf('curator') !== -1;

  if (!isCurator) return <></>;

  return (
    <>
      <span className="text-light">
        <IconButton color="inherit" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </span>
      <Mutation
        mutation={ADD_LOCATION_DETAILS}
        variables={{
          country_code: props.country_code,
          subdivision: props.subdivision,
          city: props.city,
          tag: props.tag,
          image,
          attribution,
          description,
          budget_score,
          title,
          isFeatured,
          topics,
        }}
      >
        {(
          addLocationDetails,
          // eslint-disable-next-line no-shadow
          { data },
        ) => {
          return (
            <Dialog
              fullWidth
              maxWidth="lg"
              disableBackdropClick
              disableEscapeKeyDown
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                Edit details
              </DialogTitle>
              {((!data || !data.addLocationDetails.success) && (
                <>
                  <DialogContent>
                    <TextField
                      label="Title"
                      fullWidth
                      value={title}
                      onChange={val => setTitle(val.target.value)}
                    />
                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      value={description}
                      onChange={val => setDescription(val.target.value)}
                    />
                    <FormControlLabel
                      labelPlacement="end"
                      control={
                        <Switch
                          checked={isFeatured}
                          onChange={event => setFeatured(event.target.checked)}
                          color="primary"
                        />
                      }
                      label="Featured"
                    />
                    <FeaturedImageUpload
                      allowFullSize
                      featuredImage={image}
                      setFeaturedImage={input => setImage(input)}
                      placeholder="To upload a cover image, drag 'n' drop an image here, or click to select one. Recommended dimensions: 2880x750"
                    />
                    <TextField
                      label="Image Attribution"
                      fullWidth
                      value={attribution}
                      onChange={val => setAttribution(val.target.value)}
                    />
                    {!props.tag && (
                      <>
                        <InputLabel htmlFor="budget-score-helper">
                          Budget score
                        </InputLabel>
                        <Select
                          value={budget_score}
                          onChange={event => setBudgetScore(event.target.value)}
                          inputProps={{
                            name: 'budget-score',
                            id: 'budget-score-helper',
                          }}
                        >
                          <MenuItem value={1}>Very cheap</MenuItem>
                          <MenuItem value={2}>Cheap</MenuItem>
                          <MenuItem value={3}>Regular</MenuItem>
                          <MenuItem value={4}>Expensive</MenuItem>
                          <MenuItem value={5}>Very expensive</MenuItem>
                        </Select>
                        <TextField
                          label="Topics"
                          fullWidth
                          value={topics}
                          onChange={val => setTopics(val.target.value)}
                        />
                      </>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <MuiThemeProvider theme={redbtntheme}>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                    </MuiThemeProvider>
                    <Button
                      onClick={addLocationDetails}
                      color="primary"
                      autoFocus
                      variant="contained"
                    >
                      Save Changes
                    </Button>
                  </DialogActions>
                </>
              )) || (
                <>
                  <DialogContent>
                    Successfully updated! Reload to see the changes in action.
                  </DialogContent>

                  <DialogActions>
                    <Button
                      onClick={() => location.reload()}
                      color="primary"
                      variant="contained"
                    >
                      Reload
                    </Button>
                  </DialogActions>
                </>
              )}
            </Dialog>
          );
        }}
      </Mutation>
    </>
  );
};

export default EditLocationDetails;
