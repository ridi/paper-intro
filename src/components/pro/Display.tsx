import React, { EventHandler } from 'react';

import tmp_high from '../../assets/images/pro/display/tmp_high.jpg';
import tmp_low from '../../assets/images/pro/display/tmp_low.jpg';
import paper_bright_up from '../../assets/images/pro/display/paper_bright_up.jpg';
import paper_bright_down from '../../assets/images/pro/display/paper_bright_down.jpg';
import paper_pro_bright_up from '../../assets/images/pro/display/paper_pro_bright_up.jpg';
import paper_pro_bright_down from '../../assets/images/pro/display/paper_pro_bright_down.jpg';

export default () => (
  <section className="js_trigger intro_section" id="light_upgrade">
    <div className="contents_wrapper dark_tone">
        <h2 className="js_trigger section_title">
            {`어둠\xa0속에서\xa0드러나는 우월함`}
        </h2>
        <div className="js_trigger color_temperature">
            <div className="tmp">
                <img className="tmp_low" src={tmp_high} alt="색 온도 높음, 백색" />
                <img className="tmp_high js_tmp_high" src={tmp_low} alt="색 온도 높음, 황백색" />
            </div>
            <div className="tmp_controller">
                <input className="range_ui js_tmp_range_input" type="range" min="0" max="1" step="0.01" />
            </div>
        </div>
        <article>
            <h3 className="js_trigger article_title">
                <strong>
                    색 온도 조절 가능한
    <span className="mobile_br"></span>
                    프론트라이트 프로
                </strong>
            </h3>
            <p className="article_paragraph">
                차가운 백색부터 따뜻한 황백색까지 내 눈에 편안한 색 온도를 설정하세요.<br />
                색 온도 조절 기능* 은 어두운 밤에 유용하며,<br />황백색에 가까울수록 숙면을 방해하는 블루라이트가 줄어듭니다.
            </p>
            <p className="annotation">* 색 온도 조절 기능: CTM (Color Temperature Management)</p>
        </article>
        <div className="js_trigger lowest_brightness">
            <table className="brightness_table">
                <tbody>
                    <tr>
                        <td>
                            <div className="device_image_wrapper brightness_paper">
                                <img className="min_brightness paper" src={paper_bright_down} alt="PAPER 최저밝기" />
                                <img className="max_brightness paper" src={paper_bright_up} alt="PAPER 최대밝기" />
                            </div>
                        </td>
                        <td>
                            <div className="device_image_wrapper brightness_paper_pro">
                                <img className="min_brightness paper_pro" src={paper_pro_bright_down} alt="PAPER PRO 최저밝기" />
                                <img className="max_brightness paper_pro" src={paper_pro_bright_up} alt="PAPER PRO 최대밝기" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>PAPER</th>
                        <th>PAPER PRO</th>
                    </tr>
                </tbody>
            </table>
        </div>
        <article>
            <h3 className="js_trigger article_title">
                <strong>더 어두워진 최저 밝기</strong>
            </h3>
            <p className="article_paragraph">
                화면의 밝기를 더 어둡게 조절할 수 있습니다.<br />
                기존 페이퍼의 최저 밝기가 10이라면, 페이퍼 프로의 최저 밝기는 3입니다.<br />
                어두운 곳에서 눈의 부담이 적으며,<br />주변 눈치 보지 않고 독서를 즐길 수 있습니다.
            </p>
        </article>
    </div>
  </section>
);