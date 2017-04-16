import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div>
      <div className="parallaxbox about-parallax-bottom">
        <div className="container">
          <div className="row text-center featuredbox">
            <div className="col-sm-4 xs-gap">
              <div className="inner">
                <div className="icon-box-wrap"><i className="icon-book-open ln-shadow-box shape-3"></i></div>
                <h3 className="title-4">เทคโนโลยี</h3>
                <p>
                  เนื่องจากเทคโนโลยีที่ล้ำสมัยในปัจจุบัน ช่วยผลักดันให้เกิดนวัตกรรมใหม่ ๆ อย่างต่อเนื่อง และเราพร้อมที่จะนำนวัตกรรมเหล่านั้นมาสรรค์สร้างให้กลายเป็นเครื่องมืออำนวยความสะดวกแก่ผู้ใช้ทุกคน
                </p>
              </div>
            </div>
            <div className="col-sm-4 xs-gap">
              <div className="inner">
                <div className="icon-box-wrap"><i className=" icon-lightbulb ln-shadow-box shape-6"></i></div>
                <h3 className="title-4">ความใส่ใจ</h3>
                <p>
                  การปฏิบัติในทุกขั้นตอนของเรา ตั้งแต่การวางแนวคิด ออกแบบ จนถึงการผลิตขึ้นจริง เราได้ลงมือด้วยความประณีตใส่ใจ ซึ่งนับเป็นสิ่งที่เราให้ความสำคัญที่สุด เพราะเราเชื่อว่าความละเอียดคือปัจจัยหลักของคุณภาพ
                </p>
              </div>
            </div>
            <div className="col-sm-4 xs-gap">
              <div className="inner">
                <div className="icon-box-wrap"><i className="icon-megaphone ln-shadow-box shape-5"></i></div>
                <h3 className="title-4">ความสุข</h3>
                <p>
                  ที่เราลงมือด้วยความตั้งใจ และพร้อมจะศึกษานวัตกรรมใหม่ ๆ ตลอดเวลา เพื่อสรรค์สร้างนวัตกรรมใหม่ ๆ ขึ้น เหตุผลทั้งหมดมีอยู่ข้อเดียวคือ "เพื่อความสุขของผู้ใช้" ดังนั้นเป้าหมายสุดท้ายของเราคือการส่งมอบสิ่งที่ดีที่สุดให้กับผู้ใช้ เพื่อให้ผู้ใช้ได้รับความสุข รวมถึงผู้คนรอบข้างด้วยเช่นกัน
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="footer" id="footer">
        <div className="container">
          <ul className="pull-left navbar-link footer-nav">
            <li>
              <Link to="/" activeClassName="active">หน้าหลัก</Link>
              <Link to="/aboutus" activeClassName="active">เกี่ยวกับเรา</Link>
              <Link to="/founder" activeClassName="active">ทีมผู้ก่อตั้ง</Link>
            </li>
          </ul>
          <ul className="pull-right navbar-link footer-nav">
            <li> &copy; 2017 EnablerLab.com</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
