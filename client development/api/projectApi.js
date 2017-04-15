import * as rootApi from './rootApi';
import * as types from '../actions/types'

function projectToApiProject(project, token) {
  return {
    name: project.projectName,
    url: project.projectUrl,
    detail: project.projectDescription,
    gallery: Object.keys(project.projectImages).map((key, index) => {
        return project.projectImages[key];
      }),
    token: token
  };
}

function objectToBodyWithGalleryArray(object) {
  var formBody = [];
  for (let property in object) {
    if (property != "gallery") {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(object[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    } else {
      object.gallery.forEach(function(image) {
        const imageKey = encodeURIComponent("gallery[]");
        const encodedImage = encodeURIComponent(image);
        formBody.push(imageKey + "=" + encodedImage);
      });
    }
  }
  return formBody.join("&");
}

export function addProject(project, token) {
  const formBody = objectToBodyWithGalleryArray(projectToApiProject(project, token));

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

export function addProjectSuccess(project, id) {
  return {
    type: types.ADD_PROJECT_SUCCESS, 
    project,
    projectId: id
  }
}

export function addProjectError(project, error) {
  return {
    type: types.ADD_PROJECT_ERROR, 
    project,
    error: error
  }
}

export function isUrlAvailable(url) {
  const formBody = rootApi.objectToBody({url: url});

  const request = new Request(rootApi.rootEndPoint + 'projectavailable', {
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

export function fetchProject(projectUrl) {
  const formBody = rootApi.objectToBody({url: projectUrl});

  const request = new Request(rootApi.rootEndPoint + 'TODO', {
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

export function fetchProjectSuccess(project) {
  return {
    type: types.FETCH_PROJECT_SUCCESS, 
    project
  }
}

export function fetchProjectError(project, error) {
  return {
    type: types.FETCH_PROJECT_ERROR, 
    project,
    error: error
  }
}
