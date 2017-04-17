export function getNewUser() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }
};

export function getNewProject() {
  return {
    id: "",
    projectName: "",
    projectUrl: "",
    projectDescription: "",
    projectImages: {
      
    },
    projectOwner: {
      firstName: "",
      lastName: "",
      email: ""
    },
    view: "",
    hasEditPermission: false
  };
}

export function getNewProjects() {
  return {
    projects: []
  };
}

export function getNewSearchAutoComplete() {
  return {

  };
}

export function getNewAdvanceSearch() {
  return {
    projectName: "",
    ownerFirstName: "",
    ownerLastName: "",
    order: "ASC",
    orderBy: "NAME",
    result: {

    },
    start: 0,
    length: 0,
    hasNext: false
  };
}
