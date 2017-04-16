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
                <h1 className="intro-title animated fadeInDown"> ENABLER LAB คืออะไร? </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-container inner-page">
        <div className="container">
          <div className="section-content">
            <div className="row ">
              <h1 className="text-center title-1"> เพื่อเติมเต็มสิ่งที่ขาดหายไปจากชีวิต </h1>
              <hr className="center-block small text-hr" />
              <div className="col-sm-6">
                <div className="text-content has-lead-para text-left">
                  <p className="lead">
                    ในปัจจุบัน ผู้สูงอายุ และผู้พิการ สามารถดำเนินชีวิตได้โดยปกติและลดอุปสรรคในการประกอบกิจกรรมต่าง ๆ ให้เหลือน้อยที่สุดเท่าที่จะเป็นไปได้ ด้วยความก้าวหน้าของเทคโนโลยี
                  </p>
                  <p className="lead">
                    <strong>Enabler Lab</strong> เป็นกลุ่มคนที่มีเป้าหมายอย่างชัดเจนคือการ "เติมเต็มชีวิตของผู้สูงอายุ และผู้พิการ" เราวางจุดประสงค์ของทุกนวัตกรรมที่สรรค์สร้างคือการ "ลดอุปสรรคในการดำเนินชีวิตประจำวันของพวกเขาให้เหลือน้อยที่สุดเท่าที่จะเป็นไปได้"
                  </p>
                  <p className="lead">
                    เราหวังที่จะให้คุณภาพชีวิตของผู้ใช้บริการของเราถูกยกระดับสูงยิ่งขึ้น ด้วยราคาที่จับต้องได้ และคุณภาพการใช้งานที่ตอบโจทย์ความประสงค์ ซึ่งทั้งหมดล้วนคือความสุขของท่านและคือความสุขของเรา
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <img src="/images/info.png" alt="imfo" className="img-responsive" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
