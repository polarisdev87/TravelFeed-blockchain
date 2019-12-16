import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import FixedBackgroundImage from '../General/FixedBackgroundImage';
import LoginButton from '../Header/LoginButton';

const MobileDialog = props => {
  const [open, setOpen] = useState(true);
  const [joinOpen, setJoinOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      {((joinOpen || loginOpen) && (
        <LoginButton
          open={joinOpen}
          loginOpen={loginOpen}
          hideButtons
          onClickClose={() => setOpen(false)}
        />
      )) || (
        <Dialog
          maxWidth="md"
          fullScreen
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="form-dialog-title"
        >
          <div
            className="h-100"
            style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto' }}
          >
            <FixedBackgroundImage
              backgroundImage="https://img.travelfeed.io/jpphotography%2F20191102T104018981Z-mobile-splash.jpg"
              component={
                <>
                  <header className="page-header pt-2">
                    <DialogTitle className="text-center ">
                      <Typography
                        variant="h4"
                        color="primary"
                        className="font-weight-bold"
                      >
                        Welcome to TravelFeed!
                      </Typography>
                    </DialogTitle>
                  </header>
                  <article className="page-body" />
                  <footer className="page-footer fixed-bottom">
                    <DialogContent className="text-center">
                      <div className="container">
                        <div className="row">
                          <div className="col-xl-4 col-lg-3 col-md-3 col-sm-2 d-none d-xl-block d-lg-block d-md-block d-sm-block" />
                          <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-8">
                            <div>
                              <Button
                                fullWidth
                                onClick={() => setLoginOpen(true)}
                                variant="outlined"
                                color="primary"
                              >
                                Login
                              </Button>
                            </div>
                            <div className="pt-2 pb-2">
                              <Button
                                fullWidth
                                onClick={() => setJoinOpen(true)}
                                variant="contained"
                                color="primary"
                              >
                                Sign Up
                              </Button>
                            </div>
                            <div className="pb-1 text-light">
                              <Typography
                                variant="subtitle1"
                                onClick={() => setOpen(false)}
                                role="link"
                                className="cpointer"
                              >
                                Continue as guest
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </footer>
                </>
              }
            />
          </div>
        </Dialog>
      )}
    </>
  );
};

export default MobileDialog;
