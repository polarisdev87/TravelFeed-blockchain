import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import HelpTooltip from './HelpTooltip';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  withbg: {
    background: theme.palette.background.default,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const DetailedExpansionPanel = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={props.expanded}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          {(props.description || props.helper) && (
            <div className="d-xl-none d-lg-none">
              <HelpTooltip title={`${props.description}. ${props.helper}`} />
            </div>
          )}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <Typography variant="h6">{props.title}</Typography>
              </div>
              <div className="col-xl-9 col-lg-8 col-md-6 col-sm-6 col-12">
                <Typography className={classes.secondaryHeading}>
                  {props.value}
                </Typography>
              </div>
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          className={`${props.noPadding ? 'p-0  ' : ''}${
            props.withBg ? classes.withbg : ''
          } ${classes.details}`}
        >
          <div className="container-fluid p-0">
            <div className="row">
              <div
                className={`${
                  props.fullWidth ? 'col-12' : 'col-xl-8 col-lg-9'
                }`}
              >
                {props.selector}
              </div>
              {!props.fullWidth && (
                <div
                  className={`d-none d-xl-block d-lg-block col-xl-4 col-lg-3 ${clsx(
                    classes.column,
                    classes.helper,
                  )}`}
                >
                  <Typography variant="caption">
                    {props.description}
                    <br />
                    <Tooltip title={props.helper}>
                      <Typography
                        color="primary"
                        className="cpointer"
                        variant="caption"
                      >
                        Learn more
                      </Typography>
                    </Tooltip>
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </ExpansionPanelDetails>
        {props.actions && (
          <>
            <Divider />
            <ExpansionPanelActions>{props.actions}</ExpansionPanelActions>
          </>
        )}
      </ExpansionPanel>
    </div>
  );
};

DetailedExpansionPanel.defaultProps = {
  fullWidth: false,
  noPadding: false,
  withBg: false,
};

DetailedExpansionPanel.propTypes = {
  value: PropTypes.arrayOf(PropTypes.any).isRequired,
  expanded: PropTypes.bool.isRequired,
  noPadding: PropTypes.bool,
  withBg: PropTypes.bool,
  title: PropTypes.string.isRequired,
  selector: PropTypes.func.isRequired,
  actions: PropTypes.func,
  helper: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
};

export default DetailedExpansionPanel;
