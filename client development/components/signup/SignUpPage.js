import React, { Component, PropTypes } from 'react';
import SignUpFormContainer from './SignUpFormContainer';

class SignupPage extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-md-8 page-content">
              <SignUpFormContainer />
            </div>
            <div className="col-md-4 reg-sidebar">
              <div className="reg-sidebar-inner text-center">
                <div className="promo-text-box"><i className=" icon-pencil-circled fa fa-4x icon-color-2"></i>
                  <h3><strong>แสดงโปรเจกต์ของคุณให้โลกเห็น</strong></h3>
                  <p>เพื่อให้โปรเจกต์ของคุณออกสู่สายตาชาวโลกด้วยเพียงแค่ไม่กี่คลิก บน EnablerLab ของเรา</p>
                </div>
                  <div className="promo-text-box"><i className="  icon-heart-2 fa fa-4x icon-color-3"></i>
                  <h3><strong>แชร์ความเห็นของคุณให้ทุกคนฟัง</strong></h3>
                  <p>แลกเปลี่ยนความเห็นของคุณให้คนอื่นฟัง และฟังความเห็นของคนรอบข้างคุณไปพร้อม ๆ กัน เพื่อพัฒนาโปรเจกต์ของแต่ละคนให้ไปสู่จุดสูงสุด</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupPage;
