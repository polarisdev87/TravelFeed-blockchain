// http://recharts.org/en-US/examples/SimpleBarChart
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

let data = [];

export default class RecentEarningsChart extends PureComponent {
  render() {
    const { recentPayouts, color } = this.props;
    const months = [
      '',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    data = [];
    recentPayouts.forEach(d => {
      data.push({ name: months[d.month], earnings: d.earnings });
    });
    data.reverse();
    return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="earnings" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

RecentEarningsChart.propTypes = {
  recentPayouts: PropTypes.arrayOf(PropTypes.object).isRequired,
  color: PropTypes.string.isRequired,
};
