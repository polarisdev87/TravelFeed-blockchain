import Typography from '@material-ui/core/Typography';
import React from 'react';
import Link from '../../lib/Link';

const LegalNotice = () => {
  return (
    <div className="p-2 pt-0">
      <Link color="textPrimary" href="/about">
        <Typography
          className="hoverline"
          color="textSecondary"
          variant="subtitle"
          display="inline"
        >
          About
        </Typography>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/faq">
        <Typography
          className="hoverline"
          color="textSecondary"
          variant="subtitle"
          display="inline"
        >
          FAQ
        </Typography>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/support-us">
        <Typography
          className="hoverline"
          color="textSecondary"
          variant="subtitle"
          display="inline"
        >
          Support Us
        </Typography>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/terms">
        <Typography
          className="hoverline"
          color="textSecondary"
          variant="subtitle"
          display="inline"
        >
          Terms
        </Typography>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/privacy">
        <Typography
          className="hoverline"
          color="textSecondary"
          variant="subtitle"
          display="inline"
        >
          Privacy
        </Typography>
      </Link>
      {'　'}
      <Link color="textPrimary" href="/about/cookies">
        <Typography
          className="hoverline"
          color="textSecondary"
          variant="subtitle"
          display="inline"
        >
          Cookies
        </Typography>
      </Link>
      <div className="pt-2">
        <Typography color="textSecondary" variant="subtitle" display="inline">
          &copy; {new Date().getFullYear()} TravelFeed
        </Typography>
      </div>
    </div>
  );
};

export default LegalNotice;
