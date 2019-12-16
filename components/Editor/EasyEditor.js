import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React from 'react';

const Editor = dynamic(() => import('./EasyEditor/editor.js'), {
  ssr: false,
});

const EasyEditor = props => {
  const { data, onChange } = props;

  return (
    <div className="postcontent">
      <Editor
        autofocus
        holderId={props.holderId || 'editorjs-container'}
        onChange={onChange}
        data={data}
      />
    </div>
  );
};

EasyEditor.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EasyEditor;
