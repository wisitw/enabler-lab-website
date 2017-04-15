import * as rootApi from './rootApi';
import * as types from '../actions/types'

function projectToApiProject(project, token) {
  return {
    name: project.projectName,
    url: project.projectUrl,
    detail: project.projectDescription,
    gallery: "[" + Object.keys(project.projectImages).map((key, index) => {
        return project.projectImages[key] + ",";
      }) + "]",
    token: token
  };
}

export function addProject(project, token) {
  console.log("2");
  const formBody = rootApi.objectToBody(projectToApiProject(project, token));
  console.log("3");

  const request = new Request(rootApi.rootEndPoint + 'newproject', {
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: formBody
  });

  return fetch(request).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

export function addProjectSuccess(project) {
  return {
    type: types.ADD_PROJECT_SUCCESS, 
    project
  }
}

export function addProjectError(project, error) {
  return {
    type: types.ADD_PROJECT_ERROR, 
    project,
    error: error
  }
}
