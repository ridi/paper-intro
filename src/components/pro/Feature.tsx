import React from 'react';

import paper from '../../assets/images/pro/feature/paper.png';
import paper_pro from '../../assets/images/pro/feature/paper_pro.png';
import book from '../../assets/images/pro/feature/book.png';
import landscape from '../../assets/images/pro/feature/landscape.png';
import landscape_shadow from '../../assets/images/pro/feature/landscape_shadow.jpg';
import side_view from '../../assets/images/pro/feature/side_view.png';
import side_view_shadow from '../../assets/images/pro/feature/side_view_shadow.jpg';
import image_300ppi from '../../assets/images/pro/feature/300ppi.jpg';


export default () => (
  <section className="js_trigger intro_section" id="display_upgrade">
    <div className="contents_wrapper white_tone">
        <h2 className="section_title">압도적 피지컬</h2>
        <div className="js_trigger size_compare">
            <img className="paper_image" src={paper} alt="PAPER" />
            <img className="paper_pro_image" src={paper_pro} alt="PAPER PRO" />
            <img className="book_image" src={book} alt="book" />
        </div>
        <article className="display_size_article">
            <h3 className="article_title">
                <strong>
                    처음 만나는 7.8인치{' '}
  <span className="mobile_br"></span>
                    전자잉크 디스플레이
                </strong>
            </h3>
            <p className="article_paragraph">
                국내 최초로 선보이는 7.8인치 전자잉크 디스플레이는
  6인치 디스플레이에 비해 69% 더 큰 화면을 제공합니다.<br />가로모드도 지원하여 더 쾌적한 화면을 경험할 수 있습니다.
            </p>
        </article>
        <div className="js_trigger landscape_mode">
            <img className="landscape_display_image" src={landscape} alt="PAPER PRO landscape mode" />
            <img className="landscape_display_shadow_image" src={landscape_shadow} alt="PAPER PRO landscape mode shadow" />
        </div>
        <div className="js_trigger thickness_and_weight_section">
            <div className="thickness_and_weight_wrapper white_tone">
                <article className="thickness">
                    <h3 className="article_title">
                        <strong>얇고</strong>
                        <br />두께 7.69mm
                    </h3>
                    <p className="article_paragraph">기존 페이퍼보다 0.4mm 더 얇아졌습니다.</p>
                </article>
                <article className="weight">
                    <h3 className="article_title">
                        <strong>가볍고</strong>
                        <br />무게 250g
                    </h3>
                    <p className="article_paragraph">비슷한 크기의 태블릿 PC, 종이책보다 가볍습니다.</p>
                </article>
            </div>
            <div className="side_view">
                <img className="side_view_image" src={side_view} alt="PAPER PRO side_view" />
                <img className="side_view_shadow_image" src={side_view_shadow} alt="PAPER PRO side_view shadow" />
            </div>
        </div>
        <div className="ppi_info_wrapper">
            <article className="ppi white_tone">
                <h3 className="article_title">
                    <strong>선명하다</strong>
                    <br />해상도 300PPI
                </h3>
                <p className="article_paragraph">
                    7.8인치 전자잉크<br />디스플레이에서<br />현존하는 최고 해상도입니다.
                </p>
            </article>
            <div className="js_trigger high_resolution">
                <img className="high_resolution_image" src={image_300ppi} alt="300 ppi" />
            </div>
        </div>
    </div>
  </section>
);
