import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { getDelegations } from '../../helpers/getDelegations';
import { getVesting } from '../../helpers/steem';
import TeamMember from './TeamMember';

const Team = () => {
  const [delegators, setDelegators] = useState([]);
  const [totalDelegations, setTotalDelegations] = useState(0);

  useEffect(() => {
    getVesting().then(vesting => {
      const { total_vesting_shares, total_vesting_fund_steem } = vesting;
      getDelegations(total_vesting_shares, total_vesting_fund_steem).then(
        res => {
          setDelegators(res);
          let totalDel = 0;
          res.forEach(dl => {
            totalDel += dl.amountDelegated;
          });
          setTotalDelegations(totalDel);
        },
      );
    });
  }, []);

  const founders = [
    {
      name: 'Julian Peters',
      username: 'jpphotography',
      photo:
        'https://cdn.steemitimages.com/DQmZvY5pAzUa9qdwfErTDF24bUvEi3d8bzsRXCDcXZVhy2j/tf-profile%20copy.jpg',
      content: 'Lead Developer and Business Development Manager',
    },
    {
      name: 'Jürgen Horn',
      username: 'for91days',
      photo:
        'https://cdn.steemitimages.com/DQmRypQ18Qx3jLqkKcePHQBwvQimasg7CfNXFdDusfMbSHr/01--TF-Portrait-DSC00898.jpg',
      content: 'Curation-Team Coordinator and Community Manager',
    },
    {
      name: 'Reina Flaviano',
      username: 'wanderein',
      photo:
        'https://img.travelfeed.io/jpphotography%2F20191205T063918961Z-Reina.jpg',
      content: 'Public Relations Manager and Testing Analyst',
    },
  ];
  const curators = [
    {
      username: 'elsaenroute',
      photo:
        'https://cdn.steemitimages.com/DQmQDPQwx6M6rarxNtN5jnTja95PBt9Pzx6dbSrYPNhCxuX/IMG_20190322_230301_855.jpg',
      content: 'English Curator',
    },
    {
      username: 'mrprofessor',
      photo: 'https://i.imgur.com/cYPGMum.jpg',
      content: 'English Curator',
    },
    {
      username: 'smeralda',
      photo:
        'https://cdn.discordapp.com/attachments/509459924216971275/590709431881433098/Smeralda.jpg',
      content: 'English Curator',
    },
    {
      username: 'worldcapture',
      photo:
        'https://cdn.steemitimages.com/DQmSm16YZEhpHFsLW8J9RRmAaL4mbW5S2amC1HhGo5xUtwc/Qd-H4Itg_400x400.jpg',
      content: 'English Curator',
    },
    {
      username: 'lesiopm',
      photo: 'https://i.imgsafe.org/2c/2c1e89c5d1.png',
      content: 'Polish Curator',
    },
    {
      username: 'rozku',
      photo:
        'https://cdn.steemitimages.com/DQmQQtKLUjcmmN1rzK61D1o9idcA8kQu7vXEnissqaCi8By/IMG_7748.PNG',
      content: 'Polish Curator',
    },
  ];
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center pt-4">
            <Typography variant="h4">Core Team</Typography>
          </div>
          {founders.map(member => {
            return (
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <TeamMember
                  name={member.name}
                  username={member.username}
                  photo={member.photo}
                  content={member.content}
                />
              </div>
            );
          })}
          <div className="col-12 text-center pt-4">
            <Typography variant="h4">Curation Team</Typography>
          </div>
          {curators.map(member => {
            return (
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <TeamMember
                  name={member.name}
                  username={member.username}
                  photo={member.photo}
                  content={member.content}
                />
              </div>
            );
          })}
          <div className="col-12 text-center pt-4">
            <Typography variant="h4" gutterBottom>
              Delegators
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>{delegators.length || 'Many'} delegators</strong> are
              delegating a total of{' '}
              <strong>{totalDelegations || 'a lot of'} SP</strong>
            </Typography>
            <Link href="/about/support-us">
              <Button color="primary" variant="contained">
                Become a delegator
              </Button>
            </Link>
          </div>
          {(delegators &&
            delegators.length > 0 &&
            delegators.map(delegation => {
              const { delegator, amountDelegated } = delegation;
              return (
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6">
                  <TeamMember
                    username={delegator}
                    content={<strong>{amountDelegated} SP</strong>}
                  />
                </div>
              );
            })) || <CircularProgress className="mt-5" size={55} />}
          {
            //   <div className="col-12 text-center pt-4">
            //     <Typography variant="h4">International</Typography>
            //   </div>
            //   {international.map(member => {
            //     return (
            //       <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            //         <TeamMember
            //           name={member.name}
            //           username={member.username}
            //           photo={member.photo}
            //           content={member.content}
            //         />
            //       </div>
            //     );
            //   })}
          }
        </div>
      </div>
    </Fragment>
  );
};

export default Team;
