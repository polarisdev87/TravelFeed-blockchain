import grey from '@material-ui/core/colors/grey';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const SmallBox = props => {
  const theme = useTheme();
  const { borderRadius } = theme.shape;

  const { title, value, iconColor, boxColor, prefix } = props;
  const { Icon } = props;
  const styles = {
    content: {
      padding: '5px 10px',
      marginLeft: 80,
      height: 70,
      backgroundColor: boxColor,
      borderRadius: `0 ${borderRadius}px ${borderRadius}px 0`,
    },
    text: {
      fontSize: 15,
      fontWeight: 'medium',
      lineHeight: 1.7,
      color: grey[50],
    },
    number: {
      display: 'block',
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 1.5,
      color: grey[50],
    },
    iconSpan: {
      float: 'left',
      height: 70,
      width: 80,
      textAlign: 'center',
      backgroundColor: iconColor,
      borderRadius: `${borderRadius}px 0 0 ${borderRadius}px`,
    },
    icon: {
      height: 38,
      width: 38,
      marginTop: 15,
      maxWidth: '100%',
      color: grey[50],
    },
    prefix: {
      fontWeight: 'medium',
      fontSize: 12,
      marginRight: 1,
      color: grey[50],
      position: 'relative',
      bottom: 3.5,
    },
  };
  return (
    <Paper>
      <span style={styles.iconSpan}>
        <Icon style={styles.icon} />
      </span>
      <div style={styles.content}>
        <span style={styles.text}>{title}</span>
        <span style={styles.number}>
          {prefix && <span style={styles.prefix}> {prefix}</span>}
          {value}
        </span>
      </div>
    </Paper>
  );
};

SmallBox.defaultProps = {
  prefix: undefined,
};

SmallBox.propTypes = {
  Icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  boxColor: PropTypes.string.isRequired,
  prefix: PropTypes.string,
};

export default SmallBox;
