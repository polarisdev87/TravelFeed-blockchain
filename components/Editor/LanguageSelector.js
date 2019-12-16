import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React from 'react';

export const languages = [
  {
    code: 'en',
    name: (
      <span>
        English{' '}
        <span role="img" aria-label="English flag">
          🇬🇧
        </span>
      </span>
    ),
  },
  {
    code: 'pl',
    name: (
      <span>
        Polish{' '}
        <span role="img" aria-label="Polish flag">
          🇵🇱
        </span>
      </span>
    ),
  },
  {
    code: 'kr',
    name: (
      <span>
        Korean{' '}
        <span role="img" aria-label="Korean flag">
          🇰🇷
        </span>
      </span>
    ),
  },
  {
    code: 'cn',
    name: (
      <span>
        Chinese{' '}
        <span role="img" aria-label="Chinese flag">
          🇨🇳
        </span>
      </span>
    ),
  },
  {
    code: 'es',
    name: (
      <span>
        Spanish{' '}
        <span role="img" aria-label="Spanish flag">
          🇪🇸
        </span>
      </span>
    ),
  },
  {
    code: 'ph',
    name: (
      <span>
        Filipino{' '}
        <span role="img" aria-label="Philippines flag">
          🇵🇭
        </span>
      </span>
    ),
  },
  {
    code: 'de',
    name: (
      <span>
        German{' '}
        <span role="img" aria-label="German flag">
          🇩🇪
        </span>
      </span>
    ),
  },
  {
    code: 'fr',
    name: (
      <span>
        French{' '}
        <span role="img" aria-label="French flag">
          🇫🇷
        </span>
      </span>
    ),
  },
  {
    code: 'pt',
    name: (
      <span>
        Portuguese{' '}
        <span role="img" aria-label="Portuguese flag">
          🇵🇹
        </span>
      </span>
    ),
  },
  {
    code: 'ru',
    name: (
      <span>
        Russian{' '}
        <span role="img" aria-label="Russian flag">
          🇷🇺
        </span>
      </span>
    ),
  },
  {
    code: 'ar',
    name: (
      <span>
        Arabic{' '}
        <span role="img" aria-label="Saudi Arabia flag">
          🇸🇦
        </span>
      </span>
    ),
  },
  {
    code: 'it',
    name: (
      <span>
        Italian{' '}
        <span role="img" aria-label="Italian flag">
          🇮🇹
        </span>
      </span>
    ),
  },
  {
    code: 'vn',
    name: (
      <span>
        Vietnamese{' '}
        <span role="img" aria-label="Vietnamese flag">
          🇻🇳
        </span>
      </span>
    ),
  },
];

const LanguageSelector = props => {
  const handleChange = value => {
    props.onChange(value.target.value);
  };

  return (
    <FormControl>
      <InputLabel htmlFor="post-language">Language</InputLabel>
      <Select value={props.value} onChange={handleChange}>
        {languages.map(l => {
          return <MenuItem value={l.code}>{l.name}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

LanguageSelector.propTypes = {
  value: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LanguageSelector;
