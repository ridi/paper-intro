import React from 'react';

import paper from '../../assets/images/pro/compare/paper.jpg';
import paper_pro from '../../assets/images/pro/compare/paper_pro.jpg';

export default () => (
  <section className="js_trigger intro_section" id="spec_compare">
      <div className="contents_wrapper">
          <h2 className="table_section_title">페이퍼 모델 비교</h2>
          <table className="spec_table" id="spec_compare_table">
              <thead>
                  <tr>
                      <th className="indent_hidden">스펙</th>
                      <th>
                          <img className="paper_pro_image" src={paper_pro} alt="paper pro thumbnail image" />
                          <span className="spec_title">PAPER PRO</span>
                      </th>
                      <th>
                          <img className="paper_image" src={paper} alt="paper thumbnail image" />
                          <span className="spec_title">PAPER</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <th>디스플레이</th>
                      <td>7.8인치 Carta E-ink</td>
                      <td>6인치 Carta E-ink</td>
                  </tr>
                  <tr>
                      <th>해상도</th>
                      <td>300PPI</td>
                      <td>300PPI / Lite 212PPI</td>
                  </tr>
                  <tr>
                      <th>* 두께</th>
                      <td>7.69mm</td>
                      <td>8.10mm</td>
                  </tr>
                  <tr>
                      <th>CPU</th>
                      <td>i.MX6 1GHz</td>
                      <td>Rockchip 1GHz</td>
                  </tr>
                  <tr>
                      <th>RAM</th>
                      <td>1GB</td>
                      <td>512MB</td>
                  </tr>
                  <tr>
                      <th>OS</th>
                      <td>안드로이드 4.4</td>
                      <td>안드로이드 4.2.2</td>
                  </tr>
                  <tr>
                      <th>화면 조명</th>
                      <td>
                          <ul>
                              <li>프론트라이트 프로</li>
                              <li>색 온도 조절, 밝기 조절</li>
                          </ul>
                      </td>
                      <td>
                          <ul>
                              <li>프론트라이트</li>
                              <li>밝기 조절</li>
                          </ul>
                      </td>
                  </tr>
                  <tr>
                      <th>오토 슬립</th>
                      <td>지원</td>
                      <td>미지원</td>
                  </tr>
                  <tr>
                      <th>* 배터리</th>
                      <td>용량: 1,200mAh</td>
                      <td>용량: 2,800mAh</td>
                  </tr>
                  <tr>
                      <th>* 충전 완료 시간</th>
                      <td>약 2.5시간</td>
                      <td>약 5시간</td>
                  </tr>
                  <tr>
                      <th>출시년도</th>
                      <td>2017년 12월</td>
                      <td>
                          2015년 10월<br />
                          <span className="sub_info">(현재 판매 종료)</span>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </section>
);