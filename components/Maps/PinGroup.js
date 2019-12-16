/* eslint-disable  */
import { indigo } from '@material-ui/core/colors';
import React, { Component } from 'react';

class PinGroups extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { cluster } = this.props;
    return (
      <div
        style={{
          background: indigo[600],
          width: '35px',
          height: '35px',
          border: `3px solid ${indigo[300]}`,
          wordWrap: 'normal',
          wordBreak: 'normal',
        }}
        className="cpointer rounded-circle p-1 text-center text-light font-weight-bold"
        onClick={() =>
          this.props.setPopupList({
            longitude: this.props.cluster.geometry.coordinates[0],
            latitude: this.props.cluster.geometry.coordinates[1],
            posts: this.props.superCluster.getLeaves(
              this.props.cluster.id,
              Infinity,
            ),
            clusterId: this.props.cluster.id,
            superCluster: this.props.superCluster,
            pointCount: this.props.cluster.properties.point_count,
          })
        }
      >
        {cluster.properties.point_count}
      </div>
    );
  }
}

export default PinGroups;
