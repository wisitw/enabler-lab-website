import * as projectApi from '../api/projectApi';

export function addProject(project) {
  return function(dispatch) {
    return projectApi.addProject(project, localStorage.getItem("enablerT")).then(response => {
      console.log(response);
      if (response) {
        dispatch(projectApi.addProjectSuccess(project, response.project_id));
      } else {
        dispatch(projectApi.addProjectError(project, response.error));
      }
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateProject(id, attribute, value, projectUrl) {
  return function(dispatch) {
    return projectApi.updateProject(id, attribute, value, localStorage.getItem("enablerT")).then(() => {
      projectApi.fetchProject(projectUrl).then(response => {
        dispatch(projectApi.updateProjectSuccess(response));
      })
    }).catch(error => {
      throw(error);
    });
  };
}

export function fetchProject(projectUrl) {
  return function(dispatch) {
    return projectApi.fetchProject(projectUrl).then(response => {
      if (response) {
        dispatch(projectApi.fetchProjectSuccess(response));
      } else {
        dispatch(projectApi.fetchProjectError());
      }
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}

export function clearProject() {
  return function(dispatch) {
    dispatch(projectApi.clearProject());
  }
}

export function getMyProjects() {
  return function(dispatch) {
    return projectApi.getMyProjects({token: localStorage.getItem("enablerT")}).then(response => {
      if (response) {
        dispatch(projectApi.getMyProjectsSuccess(response));
      } else {
        dispatch(projectApi.getMyProjectsError());
      }
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteProject(id) {
  return function(dispatch) {
    return projectApi.deleteProject(id, localStorage.getItem("enablerT")).then(() => {
      dispatch(projectApi.deleteProjectSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function fetchSearchAutoComplete(keyword) {
  return function(dispatch) {
    return projectApi.fetchSearchAutoComplete(keyword).then(response => {
      dispatch(projectApi.fetchSearchAutoCompleteSuccess(response));
    }).catch(error => {
      throw(error);
    });
  };
}

export function fetchNewAdvanceSearchResult(projectName, ownerFirstName, ownerLastName, order, orderBy, start, length) {
  return function(dispatch) {
    return projectApi.fetchAdvanceSearchResult(projectName, ownerFirstName, ownerLastName, order, orderBy, start, length).then(response => {
      dispatch(projectApi.fetchNewAdvanceSearchResultSuccess(response, projectName, ownerFirstName, ownerLastName, order, orderBy, start, length));
    }).catch(error => {
      throw(error);
    });
  };
}

export function fetchMoreAdvanceSearchResult(oldResult, projectName, ownerFirstName, ownerLastName, order, orderBy, start, length) {
  return function(dispatch) {
    return projectApi.fetchAdvanceSearchResult(projectName, ownerFirstName, ownerLastName, order, orderBy, start, length).then(response => {
      dispatch(projectApi.fetchMoreAdvanceSearchResultSuccess(oldResult, response, projectName, ownerFirstName, ownerLastName, order, orderBy, start, length));
    }).catch(error => {
      throw(error);
    });
  };
}

export function fetchHighlight(start, length) {
  return function(dispatch) {
    return projectApi.fetchAdvanceSearchResult("", "", "", "DSC", "VIEW", start, length).then(response => {
      dispatch(projectApi.fetchHighlightSuccess(response));
    }).catch(error => {
      throw(error);
    });
  };
}
