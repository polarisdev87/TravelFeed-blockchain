import { teal } from '@material-ui/core/colors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import dayjs from 'dayjs';
import React from 'react';
import { Query } from 'react-apollo';
import { CONTEST_GET } from '../../../helpers/graphql/contest';
import HeaderCard from '../../General/HeaderCard';

const RaffleTickets = () => {
  return (
    <>
      <Query query={CONTEST_GET}>
        {({ data }) => {
          if (data && data.contestGet) {
            let count = 0;
            data.contestGet.forEach(c => {
              count += c.tickets;
            });
            return (
              <HeaderCard
                title={
                  count
                    ? `Your have ${count} Raffle Entr${count > 1 ? 'ies' : 'y'}`
                    : 'You have no Raffle Entries yet'
                }
                background={teal[600]}
                content={
                  <>
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
                            <TableCell>Type</TableCell>
                            <TableCell>Entries</TableCell>
                            <TableCell>Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.contestGet.map((c, i) => (
                            <TableRow hover key={i}>
                              <TableCell>{c.type}</TableCell>
                              <TableCell>{c.tickets}</TableCell>
                              <TableCell>
                                {dayjs(c.date).format('MMMM DD YYYY')}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                }
              />
            );
          }
          return 'Loading...';
        }}
      </Query>
    </>
  );
};

export default RaffleTickets;
