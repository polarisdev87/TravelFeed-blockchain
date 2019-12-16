import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const TitleEditor = props => {
  const { data, onChange } = props;

  const [value, setValue] = useState(props.data);
  const [timer, setTimer] = useState(undefined);

  useEffect(() => {
    if (!value) setValue(data);
  }, [props]);

  const triggerChange = newval => () => {
    onChange(newval);
  };

  const handleTitleEditorChange = changedtitle => {
    setTimer(clearTimeout(timer));

    setValue(changedtitle.target.value);

    setTimer(setTimeout(triggerChange(changedtitle.target.value), 1000));
  };

  return (
    <InputBase
      inputProps={{
        maxLength: 100,
      }}
      multiline
      className="font-weight-bold inputtitle"
      placeholder="Title"
      value={value}
      onChange={handleTitleEditorChange}
      fullWidth
    />
  );
};

TitleEditor.propTypes = {
  data: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TitleEditor;
