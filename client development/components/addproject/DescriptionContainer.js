import React, { PropTypes } from 'react';
import Editor from 'draft-js-editor';

class DescriptionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(editorState) {
    this.props.onUpdate(editorState);
  }

  render() {
    return (
      <div className="form-group">
        <label className="col-sm-4 control-label">รายละเอียดของโปรเจกต์</label>
        <div className="col-sm-6">
          <div className="wysiwyg-editor">
            <Editor 
              onChange={ this.handleChange }
              editorState={ this.props.value }
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
