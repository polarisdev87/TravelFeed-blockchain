import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import Link from '../../lib/Link';
import VoteButton from './VoteButton';

const VoteDetailsBtn = props => {
  const [open, setOpen] = useState(false);

  const votelist = [];
  const below8 = [];
  const below6 = [];
  const below4 = [];
  const below2 = [];
  const below0 = [];
  const below3 = [];
  const below5 = [];
  const below7 = [];
  const below9 = [];
  const above9 = [];

  const allVoteLists = [
    { list: above9, weight: 10 },
    { list: below9, weight: 8 },
    { list: below7, weight: 6 },
    { list: below5, weight: 4 },
    { list: below3, weight: 1 },
    { list: below0, weight: -1 },
    { list: below2, weight: -3 },
    { list: below4, weight: -5 },
    { list: below6, weight: -7 },
    { list: below8, weight: -9 },
  ];

  if (props.votes) {
    const vl = props.votes.split('\n');
    vl.forEach(el => {
      const element = el.split(',');
      const weight = element[2] / 1000;
      const vote = { voter: element[0], weight };
      votelist.push(vote);
      if (weight < -8) below8.push(vote);
      else if (weight < -6) below6.push(vote);
      else if (weight < -4) below4.push(vote);
      else if (weight < -2) below2.push(vote);
      else if (weight < 0) below0.push(vote);
      else if (weight < 3) below3.push(vote);
      else if (weight < 5) below5.push(vote);
      else if (weight < 7) below7.push(vote);
      else if (weight < 9) below9.push(vote);
      else if (weight >= 9) above9.push(vote);
    });
  }

  return (
    <>
      <div style={{ marginBottom: '-10px' }}>
        <Tooltip
          title={votelist.map((vote, i) => {
            if (i < 11)
              return (
                <>
                  {vote.voter} <VoteButton weight={vote.weight} size="10" />
                  <br />
                </>
              );
          })}
          placement="top"
          arrow
        >
          <Typography color="textSecondary" component="span">
            <Button
              className="m-1"
              onClick={() => setOpen(true)}
              size="small"
              color="inherit"
            >
              {props.total_votes} votes
            </Button>
          </Typography>
        </Tooltip>
        <a href="#comments">
          <Typography color="textSecondary" component="span">
            <Button className="m-1" size="small" color="inherit">
              {props.numberreplies} comments
            </Button>
          </Typography>
        </a>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="text-center" id="form-dialog-title">
          Smiles received: {props.total_votes}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '2px',
            }}
          >
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          {allVoteLists.map((list, i) => {
            return (
              <>
                {list.list.length > 0 && (
                  <>
                    {i !== 0 && <Divider className="mt-2 mb-2" />}
                    <p>
                      <VoteButton weight={list.weight} size="40" />
                    </p>
                    {list.list.map(vote => {
                      return (
                        <>
                          <Link
                            as={`/@${vote.voter}`}
                            href={`/blog?author=${vote.voter}`}
                          >
                            <Tooltip
                              title={`${vote.voter} ${
                                vote.weight > 0 ? '+' : ''
                              }${vote.weight}`}
                              placement="top"
                              arrow
                            >
                              <img
                                width="30"
                                height="30"
                                className="rounded-circle"
                                alt=""
                                src={`https://steemitimages.com/u/${vote.voter}/avatar/small`}
                              />
                            </Tooltip>
                          </Link>
                        </>
                      );
                    })}
                  </>
                )}
              </>
            );
          })}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VoteDetailsBtn;
