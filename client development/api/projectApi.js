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

function photoArrayToObject(array) {
  if (array != null) {
    let obj = {};
    for (var cnt = 0; cnt < array.length; cnt++) {
      obj[cnt + 1] = array[cnt];
    }
    return obj;
  } else {
    return { };
  }
}

function apiProjectToProject(apiProject) {
  return {
    id: apiProject.project_id,
    projectName: apiProject.name,
    projectUrl: apiProject.url,
    projectDescription: apiProject.detail,
    projectImages: photoArrayToObject(apiProject.gallery),
    projectOwner: {
      firstName: apiProject.owner.fname,
      lastName: apiProject.owner.lname,
      email: apiProject.owner.email,
    },
    view: apiProject.view,
    hasEditPermission: apiProject.owner.hasEditPermission
  }
}

function apiProjectListToProjectList(apiProjectList) {
  if (apiProjectList != null) {
    let projectsArray = [];
    for (var cnt = 0; cnt < apiProjectList.length; cnt++) {
      projectsArray[cnt] = {
        projectName: apiProjectList[cnt].name,
        projectUrl: apiProjectList[cnt].url,
        projectDescription: apiProjectList[cnt].detail,
        projectImages: photoArrayToObject(apiProjectList[cnt].gallery),
        projectOwner: {
          firstName: apiProjectList[cnt].owner.fname,
          lastName: apiProjectList[cnt].owner.lname,
          email: apiProjectList[cnt].owner.email,
        }
      };
    }
    return {
      projects: projectsArray
    };
  } else {
    return { projects: [] };
  }
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
        if (image != "") {
          const imageKey = encodeURIComponent("gallery[]");
          const encodedImage = encodeURIComponent(image);
          formBody.push(imageKey + "=" + encodedImage);
        }
      });
    }
  }
  return formBody.join("&");
}

function projectAttributeToApiProjectAttribute(id, attribute, value, token) {
  switch (attribute) {
    case 'projectName':
      return {
        project_id: id,
        name: value,
        token: token
      }
    case 'projectDescription':
      return {
        project_id: id,
        detail: value,
        token: token
      }
    case 'projectImages':
      return {
        project_id: id,
        gallery: Object.keys(value).map((key, index) => {
          return value[key];
        }),
        token: token
      }
    default:
      return {
        project_id: id,
        [attribute]: value,
        token: token
      };
  }
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
  const formBody = rootApi.objectToBody({
    url: projectUrl,
    token: localStorage.getItem("enablerT") === null ? "" : localStorage.getItem("enablerT")
  });

  const request = new Request(rootApi.rootEndPoint + 'projectinfo', {
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
    project: apiProjectToProject(project)
  }
}

export function fetchProjectError() {
  return {
    type: types.FETCH_PROJECT_ERROR, 
    project: {}
  }
}

export function clearProject() {
  return {
    type: types.CLEAR_PROJECT, 
    project: {}
  }
}

export function getMyProjects(token) {
  const formBody = rootApi.objectToBody(token);

  const request = new Request(rootApi.rootEndPoint + 'myprojects', {
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

export function getMyProjectsSuccess(projects) {
  return {
    type: types.GET_MY_PROJECTS_SUCCESS,
    projects: apiProjectListToProjectList(projects)
  }
}

export function getMyProjectsError() {
  return {
    type: types.GET_MY_PROJECTS_ERROR,
    projects: {}
  }
}

export function updateProject(id, attribute, value, token) {
  const formBody = objectToBodyWithGalleryArray(projectAttributeToApiProjectAttribute(id, attribute, value, token));

  const request = new Request(rootApi.rootEndPoint + 'editproject', {
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

export function updateProjectSuccess(project) {
  return {
    type: types.UPDATE_PROJECT_SUCCESS, 
    project: apiProjectToProject(project)
  }
}

export function deleteProject(id, token) {
  const formBody = rootApi.objectToBody({project_id: id, token: token});

  const request = new Request(rootApi.rootEndPoint + 'deleteproject', {
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

export function deleteProjectSuccess() {
  return {
    type: types.DELETE_PROJECT_SUCCESS,
    project: {}
  }
}

export function incrementView(id) {
  const request = new Request(rootApi.rootEndPoint + 'view/' + id, {
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  });

  return fetch(request).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });
}
