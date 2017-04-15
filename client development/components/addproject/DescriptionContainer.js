import React, { PropTypes } from 'react';
import Editor from 'draft-js-editor';
import { convertFromHTML, ContentState, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';


class DescriptionContainer extends React.Component {
  constructor(props) {
    super(props);

    const blocksFromHTML = convertFromHTML(props.value);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    this.state = {
      editorState: EditorState.createWithContent(state),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(editorState) {
    this.setState({editorState});
  }

  handleBlur() {
    if (this.state.editorState != undefined) {
      const raw = stateToHTML(this.state.editorState.getCurrentContent());
      this.props.onUpdate(raw);
    }
  }

  render() {
    return (
      <div className="form-group">
        <label className="col-sm-4 control-label">Project Description</label>
        <div className="col-sm-6">
          <div className="wysiwyg-editor">
            <Editor 
              onChange={ this.handleChange }
              onBlur={ this.handleBlur }
              editorState={this.state.editorState}
            />
          </div>
        </div>
      </div>
    );
  }
}

DescriptionContainer.propTypes = {
  value: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default DescriptionContainer;
