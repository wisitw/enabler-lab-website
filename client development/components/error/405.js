import React from 'react';
import { IndexLink } from 'react-router';

const Error405Page = () => {
  return (
    <section className="landing-page ">
      <header className="landing-header">
        <div className="inner">
          <div className="pull-left">
            <IndexLink to="/">
              <div className="site-title logo-title">
                ENABLER<span>LAB
                </span>
              </div>
            </IndexLink>
          </div>
          <div className="pull-right">
            <i
              data-toggle="modal"
              data-target="#myModal"
              className="icon icon-info-circled"></i>
          </div>
        </div>
      </header>
      <div className="inner hw100">
        <div
          className="landing-intro fade-in"
          style={{
          background: 'url(images/bg.jpg) no-repeat center',
          backgroundSize: 'cover'
        }}>
          <div className="dtable hw100 hasOverly">
            <div className="dtable-cell hw100">
              <div className="container text-center">
                <div className="landing-text">
                  <h1 className="intro-title animated fadeInDown  delay-1">
                    405 Method not Allowed
                  </h1>
                  <p className="  animated  fade-in delay-2">
                    อย่าซน!
                  </p>
                  <div id="subscribe" className="animated  fadeIn delay-4">
                    <div className="col-md-10 col-md-offset-1 col-xs-12 col-xs-offset-0"></div>
                  </div>
                </div>
                <div className="social-list"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Error405Page;
