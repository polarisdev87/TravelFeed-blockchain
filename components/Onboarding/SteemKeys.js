import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import { saveAs } from 'file-saver';
import React from 'react';
import steem from '../../helpers/steem';

const SteemKeys = props => {
  const { passPhrase } = props;

  const getPrivKeys = () => {
    const roles = ['active', 'owner', 'posting', 'memo'];
    return steem.auth.getPrivateKeys(props.username, passPhrase, roles);
  };

  const { active, owner, posting, memo } = getPrivKeys();
  const keyList = [
    {
      name: 'Passphrase',
      description:
        'The passphrase has all the permissions of your other keys. It is very powerful and should only be used in emergencies, e.g. if you forgot your other keys. Write it down on paper and store it safely. Memorise it if you can.',
      value: passPhrase,
    },
    {
      name: 'Owner',
      description:
        'The owner key can change all other keys. Store it offline or write it down on paper.',
      value: owner,
    },
    {
      name: 'Active',
      description:
        'The active key is needed to move funds from your account. Store it in a password manager.',
      value: active,
    },
    {
      name: 'Posting',
      description:
        'The posting key is needed to interact, e.g. login, post and vote. Thanks to TravelFeed EasyLogin, you will not need it on TravelFeed. Store it in a password manager.',
      value: posting,
    },
    {
      name: 'Memo',
      description:
        'The memo key can be used to encrypt and decrypt messages. Store it in a password manager.',
      value: memo,
    },
  ];

  const handleTxtSave = () => {
    let dltext = '';
    keyList.forEach(k => {
      dltext += `${k.name}: ${k.description}\n${k.value}\n\n`;
    });
    const blob = new Blob([dltext], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, 'travelfeed_steem_private_keys.txt');
  };

  return (
    <>
      <div className="pt-3 pb-3">
        <Button variant="contained" color="primary" onClick={handleTxtSave}>
          Download wallet keys
        </Button>
      </div>
      {keyList.map(k => (
        <FormGroup className="pt-2">
          <TextField
            multiline
            label={k.name}
            margin="normal"
            value={k.value}
            fullWidth
          />
          <FormHelperText>{k.description}</FormHelperText>
        </FormGroup>
      ))}
    </>
  );
};

export default SteemKeys;
