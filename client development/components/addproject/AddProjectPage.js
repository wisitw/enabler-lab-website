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
                  <h3><strong>เปิดโอกาสใหม่ในชีวิตของคุณ</strong></h3>
                  <p>
                    โปรเจกต์ของคุณอาจเป็นสิ่งที่คนบางคนไฝ่หามาตลอด และอาจเป็นโอกาสที่คุณใฝ่หาตลอดมาเช่นกัน ถ้าคุณพร้อมแล้วก็ลงมือเลย!
                  </p>
                </div>
                <div className="panel sidebar-panel">
                  <div className="panel-heading uppercase">
                    <small><strong>ทำอย่างไรให้โปรเจกต์น่าสนใจ?</strong></small>
                  </div>
                  <div className="panel-content">
                    <div className="panel-body text-left">
                      <ul className="list-check">
                        <li> ใช้ชื่อที่กระชับและสื่อความหมาย</li>
                        <li> กรอกรายละเอียดให้ชัดเจน</li>
                        <li> เพิ่มรูปประกอบที่น่าสนใจ</li>
                        <li> แนะนำโปรเจกต์นี้กับเพื่อน ๆ ของคุณ</li>
                        <li> ตรวจสอบความถูกต้องทุกครั้ง</li>
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
