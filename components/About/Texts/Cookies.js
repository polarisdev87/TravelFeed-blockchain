import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';

const Cookies = () => {
  return (
    <Fragment>
      <p>Last updated: June 10th, 2019</p>

      <Typography gutterBottom variant="h5">
        1. What Are Cookies?
      </Typography>
      <p>
        As it is common practice with almost all professional websites, this
        site uses cookies, which are tiny files that are downloaded to your
        computer, to improve your experience. This page describes what
        information they gather, how we use it and why we sometimes need to
        store these cookies. We will also share how you can prevent these
        cookies from being stored, however, this may downgrade or break certain
        elements of the site&apos;s functionality.
      </p>

      <p>
        For more general information on cookies see the HTTP Cookies article at{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          Mozilla Developer Network
        </a>
        .
      </p>

      <Typography gutterBottom variant="h5">
        2. How Do We Use Cookies?
      </Typography>
      <p>
        We use cookies for a variety of reasons detailed below. Unfortunately,
        in most cases there are no industry standard options for disabling
        cookies without completely disabling the functionality and features they
        add to this site. It is recommended that you leave on all cookies if you
        are not sure whether you need them or not in case they are used to
        provide a service that you use.
      </p>

      <Typography gutterBottom variant="h5">
        3. Disabling Cookies
      </Typography>
      <p>
        You can prevent the setting of cookies by adjusting the settings on your
        browser (see your browser&apos;s help for how to do this). Be aware that
        disabling cookies will affect the functionality of this and many other
        websites that you visit. Disabling cookies will usually result in also
        disabling certain functionality and features of this site. Therefore, it
        is recommended that you do not disable cookies.
      </p>

      <Typography gutterBottom variant="h5">
        4. The Cookies We Set
      </Typography>
      <p>
        If you login to your account, then we will use cookies for the
        management of the login process and general administration. These
        cookies will usually be deleted when you log out. However, in some
        cases, they may remain afterwards to remember your site preferences when
        logged out.
      </p>

      <p>
        We use cookies when you are logged in so that we can remember this fact.
        This prevents you from having to log in every single time you visit a
        new page. These cookies are typically removed or cleared when you log
        out to ensure that you can only access restricted features and areas
        when logged in.
      </p>

      <Typography gutterBottom variant="h5">
        5. Third Party Cookies
      </Typography>
      <p>
        In some special cases we also use cookies provided by trusted third
        parties. The following section details which third party cookies you
        might encounter through this site.
      </p>

      <p>
        This site uses self-hosted Matomo Analytics which is one of the most
        widespread and trusted analytics solution on the web for helping us to
        understand how you use the site and ways that we can improve your
        experience. These cookies may track things such as how long you spend on
        the site and the pages that you visit, so we can continue to produce
        engaging content.
      </p>

      <p>
        For more information on Matomo Analytics, see the official{' '}
        <a
          href="hhttps://matomo.org/about/"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          Matomo Analytics
        </a>{' '}
        page. You can choose to{' '}
        <a href="/about/privacy#matomo">
          opt-out of being tracked by Matomi Analytics on our site.
        </a>
      </p>

      <p>
        From time to time, we test new features and make subtle changes to the
        way that the site is delivered. When we are still testing new features,
        these cookies may be used to ensure that you receive a consistent
        experience whilst on the site whilst ensuring we understand which
        optimisations our users appreciate the most.
      </p>

      <Typography gutterBottom variant="h5">
        6. More Information
      </Typography>
      <p>
        Hopefully that has clarified things for you and as was previously
        mentioned if there is something that you aren&#39;t sure whether you
        need or not it&#39;s usually safer to leave cookies enabled in case it
        does interact with one of the features you use on our site.
      </p>

      <p>
        However, if you are still looking for more information, then you can
        contact us through one of our preferred contact methods.{' '}
      </p>
      <ul>
        <li>
          By email:{' '}
          <a
            href="mailto:contact@travelfeed.io"
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            contact@travelfeed.io
          </a>
        </li>
        <li>
          By visiting our Discord:{' '}
          <a
            href="https://discord.gg/jWWu73H"
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            https://discord.gg/jWWu73H
          </a>
        </li>
      </ul>
    </Fragment>
  );
};

export default Cookies;
