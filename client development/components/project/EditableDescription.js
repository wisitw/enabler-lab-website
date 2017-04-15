import React, {Component, PropTypes} from 'react';
import Editor from 'draft-js-editor';
import {convertFromHTML, ContentState, EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

class EditableDescription extends Component {
  constructor(props) {
    super(props);

    const blocksFromHTML = convertFromHTML(""); // TODO GET FROM API
    const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);

    this.state = {
      value: '',
      editorState: EditorState.createWithContent(state),
      isEditing: false,
      formClass: "",
      error: ""
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isEditing: false});
  }

  componentWillMount() {
    // TODO: call action here to load project, check if user can edit or not
    setTimeout(() => {
      const html = `<p>This is my first project</p>
<ol>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ol>`;

      this.setState({value: html})
    }, 1000);
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
    //if (this.props.hasPermission) {
    const blocksFromHTML = convertFromHTML(this.state.value); // TODO GET FROM API
    const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);

    this.setState({
      isEditing: true,
      editorState: EditorState.createWithContent(state)
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.editorState != undefined) {
      const raw = stateToHTML(this.state.editorState.getCurrentContent());
      this.setState({
        value: raw,
        isEditing: false
      })
    }
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
              <button className="btn btn-primary" onClick={ this.handleSubmit } >Save</button>
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
  projectUrl: PropTypes.string.isRequired,
  // project: PropTypes.object.isRequired,
  hasPermission: PropTypes.bool.isRequired

}

//TODO: get project object from store

export default EditableDescription;
