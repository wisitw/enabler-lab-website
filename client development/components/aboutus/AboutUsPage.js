import React from 'react';

const AboutUsPage = () => {
  const style = {
    background: 'url(images/bg2.jpg) no-repeat center',
    backgroundSize: 'cover'
  }
  return (
    <div>
      <div className="intro-inner">
        <div className="about-intro" style={ style }>
          <div className="dtable hw100">
            <div className="dtable-cell hw100">
              <div className="container text-center">
                <h1 className="intro-title animated fadeInDown"> Building a customer focus </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-container inner-page">
        <div className="container">
          <div className="section-content">
            <div className="row ">
              <h1 className="text-center title-1"> What Makes Us Special </h1>
              <hr className="center-block small text-hr" />
              <div className="col-sm-6">
                <div className="text-content has-lead-para text-left">
                  <p className="lead"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                    consectetur sit amet ante nec vulputate. Nulla aliquam, justo auctor consequat
                    tincidunt, arcu erat mattis lorem, lacinia lacinia dui enim at eros. Pellentesque ut
                    gravida augue. Duis ac dictum tellus </p>
                  <p className="lead"> Pellentesque in mauris placerat, porttitor lorem id, ornare nisl.
                    Pellentesque rhoncus convallis felis, in egestas libero. Donec et nibh dapibus, sodales
                    nisi quis, fringilla augue. Donec dui quam, egestas in varius ut, tincidunt quis ipsum.
                    Nulla nec odio eu nisi imperdiet dictum. </p>
                  <p className="lead"> Curabitur sed leo dictum, convallis lorem eu, suscipit mi. Mauris viverra
                    blandit varius. Proin non sem turpis. Etiam fringilla hendrerit nunc at accumsan. Duis
                    mollis auctor lobortis. </p>
                  <p className="lead"> Etiam elementum nulla non erat blandit, sed porttitor urna malesuada. Cras
                    euismod a nulla sed ornare. Vestibulum id molestie nulla. Phasellus sodales, sapien
                    vitae auctor rhoncus </p>
                </div>
              </div>
              <div className="col-sm-6">
                <img src="/images/info.png" alt="imfo" className="img-responsive" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="parallaxbox about-parallax-bottom">
        <div className="container">
          <div className="row text-center featuredbox">
            <div className="col-sm-4 xs-gap">
              <div className="inner">
                <div className="icon-box-wrap"><i className="icon-book-open ln-shadow-box shape-3"></i></div>
                <h3 className="title-4">Customer service</h3>
                <p>Ein herausragendes Beispiel für Story-Telling im modernen Webdesign. et suscipit sapien
                posuere quis. Maecenas ut iaculis nunc, eget efficitur ipsum. Nam vitae hendrerit
                tortor.</p>
              </div>
            </div>
            <div className="col-sm-4 xs-gap">
              <div className="inner">
                <div className="icon-box-wrap"><i className=" icon-lightbulb ln-shadow-box shape-6"></i></div>
                <h3 className="title-4">Seller satisfaction</h3>
                <p>Ein herausragendes Beispiel für Story-Telling im modernen Webdesign. et suscipit sapien
                posuere quis. Maecenas ut iaculis nunc, eget efficitur ipsum. Nam vitae hendrerit tortor.
                .</p>
              </div>
            </div>
            <div className="col-sm-4 xs-gap">
              <div className="inner">
                <div className="icon-box-wrap"><i className="icon-megaphone ln-shadow-box shape-5"></i></div>
                <h3 className="title-4">Best Offers </h3>
                <p>Ein herausragendes Beispiel für Story-Telling im modernen Webdesign. et suscipit sapien
                  posuere quis. Maecenas ut iaculis nunc, eget efficitur ipsum. Nam vitae hendrerit
                  tortor. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
