import React, { Component } from 'react';
import AddProjectFormContainer from './AddProjectFormContainer'

class AddProjectPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-md-9 page-content">
              <AddProjectFormContainer />
            </div>

            <div className="col-md-3 reg-sidebar">
              <div className="reg-sidebar-inner text-center">
                <div className="promo-text-box"><i className=" icon-picture fa fa-4x icon-color-1"></i>
                  <h3><strong>Post a Free Classified</strong></h3>
                  <p> Post your free online classified ads with us. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                </div>
                <div className="panel sidebar-panel">
                  <div className="panel-heading uppercase">
                    <small><strong>How to sell quickly?</strong></small>
                  </div>
                  <div className="panel-content">
                    <div className="panel-body text-left">
                      <ul className="list-check">
                        <li> Use a brief title and description of the item</li>
                        <li> Make sure you post in the correct category</li>
                        <li> Add nice photos to your ad</li>
                        <li> Put a reasonable price</li>
                        <li> Check the item before publish</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProjectPage;
