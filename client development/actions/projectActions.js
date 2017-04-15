import * as projectApi from '../api/projectApi';

export function addProject(project, token) {
  console.log("1");
  return function(dispatch) {
    return projectApi.addProject(project, token).then(response => {
      console.log(response);
      if (response.success == true) {
        dispatch(projectApi.addProjectSuccess(project));
      } else {
        dispatch(projectApi.addProjectError(project, response.error));
      }
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}
