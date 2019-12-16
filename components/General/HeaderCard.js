import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const HeaderCard = props => {
  return (
    <Card>
      <CardHeader
        style={{ background: props.background }}
        title={
          <Typography
            variant={props.titlesize}
            align="center"
            className="p-2 text-light"
          >
            {props.title}
          </Typography>
        }
      />
      {props.noborder && props.content}
      {!props.noborder && <CardContent>{props.content}</CardContent>}
    </Card>
  );
};

HeaderCard.defaultProps = {
  titlesize: 'h4',
  noborder: false,
};

HeaderCard.propTypes = {
  background: PropTypes.string.isRequired,
  titlesize: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  noborder: PropTypes.bool,
};

export default HeaderCard;
