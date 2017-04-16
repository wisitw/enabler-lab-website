export default {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  },

  project: {
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
  },
  
  projects: {
    projects: []
  },

  searchAutoComplete: {
    
  },

  advanceSearch: {
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
  }
}
