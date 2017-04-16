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
                <h1 className="intro-title animated fadeInDown"> ทีมผู้ก่อตั้ง </h1>
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
    </div>
  );
}

export default FounderPage;
