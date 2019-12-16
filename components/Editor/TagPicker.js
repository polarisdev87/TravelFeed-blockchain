import Chip from '@material-ui/core/Chip';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import { withStyles } from '@material-ui/styles';
import Downshift from 'downshift';
import deburr from 'lodash.deburr';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { photoTags, removeTags } from '../../config';
import { allSpecialChars } from '../../helpers/regex';

const blacklistTags = removeTags.concat(photoTags);

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
    zIndex: 2,
  },
  paper: {
    position: 'relative',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing(2),
  },
});

const suggestions = [
  { label: 'roadtrip' },
  { label: 'beach' },
  { label: 'backpacking' },
  { label: 'mountains' },
  { label: 'wildlife' },
  { label: 'budgettravel' },
  { label: 'festivals' },
  { label: 'adventure' },
  { label: 'hiking' },
  { label: 'animals' },
  { label: 'hitchhiking' },
  { label: 'cyclefeed' },
  { label: 'digitalnomads' },
  { label: 'photography' },
  { label: 'foodoftheworld' },
  { label: 'traveladvice' },
  { label: 'introduceyourself' },
  { label: 'birds' },
  { label: 'contest' },
  { label: 'culture' },
  { label: 'family' },
  { label: 'nature' },
  { label: 'news' },
  { label: 'video' },
  { label: 'walkwithme' },
  { label: 'wednesdaywalk' },
  { label: 'marketfriday' },
  { label: 'sports' },
  { label: 'transportation' },
  { label: 'urbex' },
];

const renderInput = inputProps => {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
};

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.objectOf(PropTypes.string).isRequired,
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value, allowedTagNumber) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < allowedTagNumber &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const TagPicker = props => {
  const [inputValue, setInputValue] = useState('');
  const [stateUpdate, setStateUpdate] = useState(true);

  const selectedItem = props.value;

  const allowedTagNumber = props.useAdvancedMode ? 10 : 4;

  const handleKeyDown = event => {
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace' &&
      props.defaultTags.indexOf(selectedItem[selectedItem.length - 1]) === -1
    ) {
      props.onTagChange(selectedItem.slice(0, selectedItem.length - 1));
    }
  };

  const handleInputChange = event => {
    setInputValue(event.target.value.toLowerCase());
    const lastKey = event.target.value[event.target.value.length - 1];
    if (
      (lastKey === ' ' || lastKey === ',') &&
      inputValue.length &&
      inputValue.length < 20 &&
      inputValue.match(/[a-zA-Z0-9]/) &&
      inputValue.replace(/\s/g, '').match(allSpecialChars) === null &&
      selectedItem.length < allowedTagNumber
    ) {
      const item = inputValue
        .toLowerCase()
        .replace(/,/g, '')
        .replace(/\s/g, '');

      if (
        selectedItem.indexOf(item) === -1 &&
        props.defaultTags.indexOf(item) === -1
      ) {
        props.onTagChange([...selectedItem, item]);
        setInputValue('');
      }
    }
  };

  const handleChange = item => {
    //  If *allowedTagNumber* tags already, don't autocomplete
    if (
      selectedItem.length < allowedTagNumber &&
      props.defaultTags.indexOf(item) === -1
    ) {
      if (selectedItem.indexOf(item) === -1) {
        props.onTagChange([...selectedItem, item]);
        setInputValue('');
      }
    }
  };

  const handleDelete = item => () => {
    const selit = selectedItem;
    selit.splice(selit.indexOf(item), 1);
    props.onTagChange(selit);
    // hack to make component update
    setStateUpdate(!stateUpdate);
  };

  const { classes } = props;

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <Downshift
            id="downshift-multiple"
            inputValue={inputValue}
            onChange={handleChange}
            selectedItem={selectedItem}
          >
            {({
              getInputProps,
              getItemProps,
              isOpen,
              inputValue: inputValue2,
              selectedItem: selectedItem2,
              highlightedIndex,
            }) => (
              <div className={classes.container}>
                {renderInput({
                  fullWidth: true,
                  classes,
                  InputProps: getInputProps({
                    startAdornment: (
                      <Fragment>
                        {props.useAdvancedMode &&
                          props.defaultTags.map(item => (
                            <Chip
                              key={item}
                              tabIndex={-1}
                              label={item}
                              className={classes.chip}
                            />
                          ))}
                        {selectedItem.map(item => (
                          <Chip
                            key={item}
                            color={
                              blacklistTags.indexOf(item) > -1
                                ? 'primary'
                                : 'secondary'
                            }
                            tabIndex={-1}
                            label={item}
                            className={classes.chip}
                            onDelete={handleDelete(item)}
                          />
                        ))}
                      </Fragment>
                    ),
                    onChange: handleInputChange,
                    onKeyDown: handleKeyDown,
                    placeholder: 'Add topics',
                  }),
                  label: '',
                })}
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue2, allowedTagNumber).map(
                      (suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.label }),
                          highlightedIndex,
                          selectedItem: selectedItem2,
                        }),
                    )}
                  </Paper>
                ) : null}
              </div>
            )}
          </Downshift>
        </div>
        {props.recommendations.length > 0 && (
          <div className="col-12 pt-4">
            <FormLabel component="legend">
              Topic recommendations based on your post:
            </FormLabel>
            {props.recommendations.map(r => (
              <Chip
                onDelete={() => handleChange(r)}
                color="secondary"
                deleteIcon={
                  props.value.indexOf(r) === -1 ? <AddIcon /> : <DoneIcon />
                }
                key={r}
                tabIndex={-1}
                label={r}
                className={classes.chip}
              />
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

TagPicker.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTagChange: PropTypes.func.isRequired,
  defaultTags: PropTypes.string.isRequired,
};

export default withStyles(styles)(TagPicker);
