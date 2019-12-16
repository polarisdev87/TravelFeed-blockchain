import { cyan } from '@material-ui/core/colors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Query } from 'react-apollo';
import { REFERRALS } from '../../../helpers/graphql/contest';
import HeaderCard from '../../General/HeaderCard';

const Referrals = () => {
  return (
    <>
      <Query query={REFERRALS}>
        {({ data }) => {
          let title = '';
          if (data && data.referrals && data.referrals.length > 0)
            title = `Your have Referred ${data.referrals.length} User${
              data.referrals.length > 1 ? 's' : ''
            }`;
          else if (data && data.referrals && data.referrals.length === 0)
            title = "You haven't Referred Anyone yet";
          return (
            <HeaderCard
              title={title}
              background={cyan[600]}
              content={
                <>
                  {(data && data.referrals && data.referrals.length > 0 && (
                    <div
                      style={{
                        overflowX: 'auto',
                        wordWrap: 'normal',
                        wordBreak: 'normal',
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Username</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data &&
                            data.referrals &&
                            data.referrals.length > 0 &&
                            data.referrals.map(c => (
                              <TableRow hover key={c}>
                                <TableCell>{c}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  )) ||
                    (data && data.referrals && data.referrals.length === 0 && (
                      <Typography variant="body1">
                        Once your referrals join TravelFeed, they will show up
                        here.
                      </Typography>
                    )) ||
                    ''}
                </>
              }
            />
          );
        }}
      </Query>
    </>
  );
};

export default Referrals;
