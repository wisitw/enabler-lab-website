import React, { PropTypes } from 'react';
import Editor from 'draft-js-editor';
import { stateToHTML } from 'draft-js-export-html';


class DescriptionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
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
  onUpdate: PropTypes.func.isRequired
}

export default DescriptionContainer;
