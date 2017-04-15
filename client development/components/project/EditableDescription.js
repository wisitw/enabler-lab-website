import React, {Component, PropTypes} from 'react';
import Editor from 'draft-js-editor';
import {convertFromHTML, ContentState, EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../../actions/projectActions';

class EditableDescription extends Component {
  constructor(props) {
    super(props);

    const blocksFromHTML = convertFromHTML(""); // TODO GET FROM API
    const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);

    this.state = {
      value: this.props.project.projectDescription,
      hasEditPermission: this.props.project.hasEditPermission,
      editorState: EditorState.createWithContent(state),
      isEditing: false,
      formClass: "",
      error: ""
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.project.projectDescription,
      hasEditPermission: nextProps.project.hasEditPermission,
      isEditing: false
    });
  }

  handleChange(editorState) {
    this.setState({editorState});
  }

  handleBlur() {
    if (this.state.editorState != undefined) {
      const raw = stateToHTML(this.state.editorState.getCurrentContent());
      this.setState({
        value: raw,
        isEditing: false
      })
    }
  }

  handleClick(event) {
    if (this.state.hasEditPermission) {
      const blocksFromHTML = convertFromHTML(this.state.value);
      const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);

      this.setState({
        isEditing: true,
        editorState: EditorState.createWithContent(state)
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.editorState != undefined) {
      const raw = stateToHTML(this.state.editorState.getCurrentContent());
      this.setState({
        value: raw,
        isEditing: false
      });
      this.props.actions.updateProject(this.props.project.id, "projectDescription", raw, this.props.projectUrl);
    }
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      isEditing: false
    });
  }

  render() {
    var parser = new DOMParser();
    var doc = parser.parseFromString(this.state.value, "application/xml");

    const willDisplay = this.state.isEditing
      ? (
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-sm-12">
              <div className="wysiwyg-editor">
                <Editor
                  onChange={this.handleChange}
                  // onBlur={this.handleBlur}
                  editorState={this.state.editorState}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label"></label>
            <div className="col-sm-7">
              <div className="btn-toolbar">
                <button className="btn btn-primary" onClick={ this.handleSubmit } disabled={ this.state.error } >Save</button>
                <button className="btn btn-danger" onClick={ this.handleCancel } >Cancel</button>
              </div>
            </div>
          </div>
        </form>
      )
      : (
        <div className="wysiwyg-display" onClick={ this.handleClick } dangerouslySetInnerHTML={{__html: this.state.value.replace(/(<? *script)/gi, 'illegalscript')}} >

        </div>
      );

    return (
      <div>
        {willDisplay}
      </div>
    );
  }
}

EditableDescription.propTypes = {
  actions: PropTypes.object.isRequired,
  projectUrl: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    project: state.project
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableDescription);
