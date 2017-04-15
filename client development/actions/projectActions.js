import * as projectApi from '../api/projectApi';

export function addProject(project, token) {
  return function(dispatch) {
    return projectApi.addProject(project, token).then(response => {
      if (response.success == true) {
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
