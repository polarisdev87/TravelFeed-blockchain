/* eslint-disable */
import EditorJS from '@editorjs/editorjs';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import commonTools from './common-tools';

class Editor extends Component {
  state = { mounted: false };

  static defaultProps = {
    holderId: 'editorjs-holder',
    customTools: {},
    excludeDefaultTools: [],
    onChange: () => {},
    onReady: () => {},
    data: {},
    autofocus: true,
  };

  static propTypes = {
    holderId: PropTypes.string,
    customTools: PropTypes.object,
    excludeDefaultTools: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    data: PropTypes.object,
    autofocus: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this._tools = this._initTools(props.tools, props.excludeTools);

    this._onChange = props.onChange;
    this._onReady = props.onReady;

    this._el = React.createRef();
  }

  componentDidMount() {
    this._initEditor();
  }

  componentWillUnmount() {
    this._destroyEditor();
  }

  _initEditor = () => {
    this.setState({ mounted: true });

    const { holderId, autofocus, data } = this.props;

    this.editor = new EditorJS({
      holderId,
      autofocus,
      data,
      tools: this._tools,

      onChange: this._handleChange,
      onReady: this._handleReady,
    });
  };

  _destroyEditor = () => {
    if (!this.editor) return;

    try {
      this.editor.destroy();
    } catch {
      console.warn('Could not unmount editor');
    }

    this.setState({ mounted: false });

    this.editor = undefined;
  };

  _initTools = () => {
    const { customTools, excludeDefaultTools } = this.props;
    const toolsList = { ...commonTools, ...customTools };

    if (excludeDefaultTools.length !== 0) {
      return Object.keys(toolsList)
        .filter(tool => !excludeDefaultTools.includes(tool))
        .reduce((acc, curr) => ({ ...acc, [curr]: toolsList[curr] }), {});
    }

    return toolsList;
  };

  _handleChange = async () => {
    try {
      const data = await this.editor.save();
      this._onChange(data);
    } catch {
      console.warn('Could not save editor');
    }
  };

  _handleReady = () => {
    this._onReady();
  };

  render() {
    if (this.state.mounted) {
      const { holderId } = this.props;
      return React.createElement('div', {
        id: holderId,
        ref: this._el,
      });
    } else {
      return <Fragment />;
    }
  }
}

export default Editor;
