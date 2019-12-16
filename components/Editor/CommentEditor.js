import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ReplyIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import getSlug from 'speakingurl';
import { APP_VERSION } from '../../config';
import json2md from '../../helpers/json2md';
import md2json from '../../helpers/md2json';
import {
  getImageList,
  getLinkList,
  getMentionList,
} from '../../helpers/parsePostContents';
import { getUser } from '../../helpers/token';
import EasyEditor from './EasyEditor';
import PublishBtn from './PublishBtn';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const CommentEditor = props => {
  const defVal = props.defaultValue ? md2json(props.defaultValue) : undefined;
  const [content, setContent] = useState(defVal ? defVal.json : '');
  const [publishThis, setPublishThis] = useState(undefined);

  const handleEditorChange = value => {
    setContent(value);
  };

  const triggerPublish = () => {
    const title = '';
    const parentAuthor = props.parent_author;
    const parentPermlink = props.parent_permlink;
    const commenttime = getSlug(new Date().toJSON()).replace(/-/g, '');
    const permlink =
      (props.editMode && props.permlink) || `re-${parentAuthor}-${commenttime}`;
    const body = json2md(content);
    const jsonMetadata = {};
    jsonMetadata.tags = ['travelfeed'];
    jsonMetadata.app = APP_VERSION;
    jsonMetadata.community = 'travelfeed';
    // Parse comment for images. Todo: Parse links
    const imageList = getImageList(body);
    const linkList = getLinkList(body);
    const mentionList = getMentionList(body);
    if (imageList.length > 0) jsonMetadata.image = imageList;
    if (linkList.length > 0) jsonMetadata.links = linkList;
    if (mentionList.length > 0) jsonMetadata.users = mentionList;
    const author = getUser();
    setPublishThis({
      author,
      title,
      body,
      parentPermlink,
      parentAuthor,
      jsonMetadata: JSON.stringify(jsonMetadata),
      permlink,
      commentOptions: undefined,
      type: 'comment',
    });
  };

  const pastPublish = res => {
    if (res.success) {
      if (props.editMode) {
        props.onCommentEdit({
          body: publishThis.body,
        });
      } else {
        props.onCommentAdd({
          body: publishThis.body,
          permlink: publishThis.permlink,
        });
      }
    }
    if (!props.editMode && res.success) props.onClose();
  };

  return (
    <div>
      <div className={`p-2${props.editMode ? '' : ' border'}`}>
        <EasyEditor
          holderId={`${props.editMode ? 're' : 'edit'}_${props.parent_author}_${
            props.parent_permlink
          }`}
          onChange={handleEditorChange}
          data={content}
          placeholder="Reply"
          defaultValue={props.defaultValue}
        />
      </div>
      <div className="container pb-2">
        <div className="row text-right">
          <div className="col">
            <MuiThemeProvider theme={theme}>
              <Button
                className="mt-1"
                variant="contained"
                color="primary"
                onClick={props.onClose}
              >
                <span>
                  Cancel <CloseIcon />
                </span>
              </Button>
            </MuiThemeProvider>
            <div className="pl-2 d-inline">
              <PublishBtn
                mt
                publishThis={publishThis}
                pastPublish={res => pastPublish(res)}
                triggerPublish={triggerPublish}
                disabled={content.length < 1}
                label={
                  (props.editMode && (
                    <span>
                      Update <EditIcon />
                    </span>
                  )) || (
                    <span>
                      Reply <ReplyIcon />
                    </span>
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentEditor.defaultProps = {
  editMode: false,
  onCommentAdd: undefined,
  onClose: undefined,
  defaultValue: '',
  permlink: '',
};

CommentEditor.propTypes = {
  permlink: PropTypes.string,
  defaultValue: PropTypes.string,
  onCommentAdd: PropTypes.func,
  onCommentEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  editMode: PropTypes.bool,
  parent_author: PropTypes.string.isRequired,
  parent_permlink: PropTypes.string.isRequired,
};

export default CommentEditor;
