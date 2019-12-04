import React from 'react';

import image1 from '../../assets/images/pro/hardware/01.png';
import image2 from '../../assets/images/pro/hardware/02.png';
import image3 from '../../assets/images/pro/hardware/03.png';
import image4 from '../../assets/images/pro/hardware/04.png';
import image5 from '../../assets/images/pro/hardware/05.png';
import image6 from '../../assets/images/pro/hardware/06.png';

export default () => (
  <section className="js_trigger intro_section" id="hardware_upgrade">
      <div className="contents_wrapper dark_tone">
          <h2 className="section_title">탄탄한 기본기</h2>
          <div className="js_trigger layer">
              <div className="layer_wrapper">
                  <img className="layer_image bottom" src={image6} alt="외관 바닥면" />
                  <img className="layer_image pcb" src={image5} alt="기판" />
                  <img className="layer_image point" src={image4} alt="보강판" />
                  <img className="layer_image housing" src={image3} alt="하우징" />
                  <img className="layer_image display" src={image2} alt="디스플레이" />
                  <img className="layer_image front" src={image1} alt="외관 전면" />
              </div>
          </div>
          <article className="durability">
              <h3 className="article_title">
                  <strong>견고해진 내구성</strong>
              </h3>
              <p className="article_paragraph">가볍고 강한 마그네슘 보강재를 추가하여 기존 페이퍼보다 충격과 압력에 강합니다.</p>
          </article>
          <article className="battery">
              <h3 className="article_title">
                  <strong>강해진 배터리</strong>
              </h3>
              <p className="article_paragraph">
                  배터리 소모가 적은 i.MX6 CPU를 장착하여 배터리 효율을 높였습니다.<br />기존 페이퍼보다 배터리 용량은 작지만, 사용 시간과 대기 시간이 길어졌습니다.
              </p>
              <div className="js_trigger battery_compare_chart">
                  <h4 className="chart_title">대기 시간</h4>
                  <ul>
                      <li className="paper_pro_chart">
                          <div className="bar paper_pro_battery_bar">약 4주</div>
                          <div className="description_wrapper">
                              <p className="device_title">PAPER PRO</p>
                              <p className="description">3배 더 길어진 대기 시간</p>
                          </div>
                      </li>
                      <li className="paper_chart">
                          <div className="bar paper_battery_bar">약 1.5주</div>
                          <p className="device_title">PAPER</p>
                      </li>
                  </ul>
              </div>
          </article>
      </div>
  </section>
);