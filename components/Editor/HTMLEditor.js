import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import uploadFile from '../../helpers/imageUpload';
import parseBody from '../../helpers/parseBody';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const HtmlEditor = props => {
  const { data, onChange } = props;
  const [showHtml, setShowHtml] = useState(true);
  const [value, setValue] = useState(props.data);
  const [timer, setTimer] = useState(undefined);

  useEffect(() => {
    if (window.innerWidth < 576) {
      setShowHtml(false);
    }
  }, []);

  const handleImageUpload = (file, callback) => {
    return uploadFile(file, {}).then(res => {
      return callback(res);
    });
  };

  const triggerChange = newval => () => {
    onChange(newval);
  };

  const handleHtmlEditorChange = ({ text }) => {
    // Fire change when user stops typing:
    // https://gist.github.com/krambertech/76afec49d7508e89e028fce14894724c
    setTimer(clearTimeout(timer));

    setValue(text);

    setTimer(setTimeout(triggerChange(text), 1000));
  };

  return (
    <div style={{ height: '600px' }}>
      <MdEditor
        config={{
          imageAccept: 'image/*',
          view: {
            menu: true,
            md: true,
            html: showHtml,
          },
          synchScroll: false,
          htmlClass: 'postcontent',
        }}
        value={data}
        renderHTML={text =>
          parseBody(text, {
            parseImages: true,
            secureLinks: false,
            allLinksBlank: true,
          })
        }
        onChange={handleHtmlEditorChange}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
};

HtmlEditor.propTypes = {
  data: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HtmlEditor;
