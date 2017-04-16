import React from 'react';
import Founder from './Founder';

const FounderPage = () => {
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
                <h1 className="intro-title animated fadeInDown"> Founder Team </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-container inner-page">
        <div className="container">
          <div className="section-content">
            <div className="row">
              <Founder name="Wisit Wongchaianukul" descriptions={
                ["Back-End Developer"]
              } image="images/film.jpg" left={ true } />

              <Founder name="Seehait Chockthanyawat" descriptions={
                ["Front-End Developer"]
              } image="images/kiki.jpg" left={ true }/>

              <Founder name="Pornthep Achatsachat" descriptions={
                ["Editorial, UX Designer, and Tester"]
              } image="images/lc.jpg" left={ true } />
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

export default FounderPage;
