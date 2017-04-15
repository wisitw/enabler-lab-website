import React, {Component, PropTypes} from 'react';

class EditableProjectSection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="inner inner-box ads-details-wrapper">
        <h1 className="auto-heading">
          <span className="auto-title left">2011 Mercedes-Benz SLS AMG
          </span>
          <span className="auto-price pull-right">
            $204,990</span>
        </h1>
        <div style="clear:both;"></div>
        <span className="info-row">
          <span className="date">
            <i className=" icon-clock"></i>
            Today 1:21 pm
          </span>
          -
          <span className="category">
            Cars
          </span>-
          <span className="item-location">
            <i className="fa fa-map-marker"></i>
            New York
          </span>
        </span>
        <div className="row ">
          <div className="col-sm-9 automobile-left-col">
            <div className="ads-image">
              <div className="bx-wrapper" style="max-width: 100%;">
                <div
                  className="bx-viewport"
                  style="width: 100%; overflow: hidden; position: relative; height: 322px;">
                  <ul
                    className="bxslider"
                    style="width: 515%; position: relative; transition-duration: 0s; transform: translate3d(-527px, 0px, 0px);">
                    <li
                      style="float: left; list-style: none; position: relative; width: 527px;"
                      className="bx-clone">
                      <img src="/images/auto/3.jpg" alt="img"/></li>
                    <li style="float: left; list-style: none; position: relative; width: 527px;">
                      <img src="/images/auto/2012-mercedes-benz-sls-amg.jpg" alt="img"/></li>
                    <li style="float: left; list-style: none; position: relative; width: 527px;">
                      <img src="/images/auto/2.jpg" alt="img"/></li>
                    <li style="float: left; list-style: none; position: relative; width: 527px;">
                      <img src="/images/auto/3.jpg" alt="img"/></li>
                    <li
                      style="float: left; list-style: none; position: relative; width: 527px;"
                      className="bx-clone">
                      <img src="/images/auto/2012-mercedes-benz-sls-amg.jpg" alt="img"/></li>
                  </ul>
                </div>
                <div className="bx-controls bx-has-controls-direction">
                  <div className="bx-controls-direction">
                    <a className="bx-prev" href="">Prev</a>
                    <a className="bx-next" href="">Next</a>
                  </div>
                </div>
              </div>
              <div id="bx-pager">
                <a
                  className="thumb-item-link active"
                  data-slide-index="0"
                  href="ads-details-automobile.html">
                  <img src="/images/auto/2012-mercedes-benz-sls-amg.jpg" alt="img"/></a>
                <a
                  className="thumb-item-link"
                  data-slide-index="1"
                  href="ads-details-automobile.html">
                  <img src="/images/auto/2.jpg" alt="img"/></a>
                <a
                  className="thumb-item-link"
                  data-slide-index="2"
                  href="ads-details-automobile.html">
                  <img src="/images/auto/2.jpg" alt="img"/></a>
              </div>
            </div>

          </div>

          <div className="col-sm-3 automobile-right-col">
            <div className="inner">
              <div className="key-features">
                <div className="media">
                  <div className="media-body">
                    <span className="media-heading">8,187 km</span>
                    <span className="data-type">Mileage</span>
                  </div>
                </div>
                <div className="media">
                  <div className="media-body">
                    <span className="media-heading">2011</span>
                    <span className="data-type">YEAR</span>
                  </div>
                </div>
                <div className="media">
                  <div className="media-body">
                    <span className="media-heading">New</span>
                    <span className="data-type">Condition</span>
                  </div>
                </div>
                <div className="media">
                  <div className="media-body">
                    <span className="media-heading">Automatic</span>
                    <span className="data-type">TRANSMISSION</span>
                  </div>
                </div>
                <div className="media">
                  <div className="media-body">
                    <span className="media-heading">CAR</span>
                    <span className="data-type">TYPE</span>
                  </div>
                </div>
                <div className="media">
                  <div className="media-body">
                    <span className="media-heading">Personal</span>
                    <span className="data-type">Class</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Ads-Details">
          <h5 className="list-title">
            <strong>Car Details</strong>
          </h5>
          <div className="row">
            <div className="ads-details-info col-md-8">
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
                enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
                nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in
                hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu
                feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
                blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla
                facilisi. Nam liber tempor.
              </p>
              <h4 className="text-uppercase">Features</h4>
              <ul className="list-circle">
                <li>Brand-new model</li>
                <li>47/53 front-to-rear weight distribution</li>
                <li>563-hp V-8</li>
                <li>Seven-speed dual-clutch transmission</li>
                <li>7-speed dual-clutch automated manual</li>
                <li>Zero to 60 mph: 3.5 sec</li>
                <li>Top speed (governor limited): 196 mph</li>
                <li>EPA city/highway driving: 13/20 mpg</li>
              </ul>
              <h4 className="text-uppercase">DIMENSIONS</h4>
              <ul className="list-circle">
                <li>
                  <strong>Wheelbase:</strong>
                  105.5 in Length: 182.6 in /li&gt;
                </li>
                <li>
                  <strong>Width:</strong>
                  76.3 in Height: 49.7 in (3G)</li>
                <li>
                  <strong>Curb weight</strong>
                  (C/D est): 3600 lb</li>
              </ul>
            </div>
            <div className="col-md-4">
              <aside className="panel panel-body panel-details">
                <ul>
                  <li>
                    <p className=" no-margin ">
                      <strong>Price:</strong>
                      $204,990</p>
                  </li>
                  <li>
                    <p className="no-margin">
                      <strong>Type:</strong>
                      Car</p>
                  </li>
                  <li>
                    <p className="no-margin">
                      <strong>Location:</strong>
                      New York
                    </p>
                  </li>
                  <li>
                    <p className=" no-margin ">
                      <strong>Condition:</strong>
                      New</p>
                  </li>
                  <li>
                    <p className="no-margin">
                      <strong>Brand:</strong>
                      Mercedes-Benz</p>
                  </li>
                </ul>
              </aside>
              <div className="ads-action">
                <ul className="list-border">
                  <li>
                    <a href="#">
                      <i className=" fa fa-user"></i>
                      More ads by User
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className=" fa fa-heart"></i>
                      Save ad
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-share-alt"></i>
                      Share ad
                    </a>
                  </li>
                  <li>
                    <a href="ads-details-#reportAdvertiser" data-toggle="modal">
                      <i className="fa icon-info-circled-alt"></i>
                      Report abuse
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="content-footer text-left">
            <a
              className="btn  btn-default"
              data-toggle="modal"
              href="ads-details-#contactAdvertiser">
              <i className=" icon-mail-2"></i>
              Send a message
            </a>
            <a className="btn  btn-info">
              <i className=" icon-phone-1"></i>
              01680 531 352
            </a>
          </div>
        </div>
      </div>
    );
  }
}

EditableProjectSection.propTypes = {
  projectId: PropTypes.number.isRequired
};

export default EditableProjectSection;