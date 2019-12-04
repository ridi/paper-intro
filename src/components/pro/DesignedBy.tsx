import React from 'react';

import image from '../../assets/images/pro/designed_by/back.jpg';

export default () => (
  <section className="js_trigger intro_section" id="designed_by_ridi">
    <div className="contents_wrapper">
        <div className="description_wrapper dark_tone">
            <h2 className="section_title">
                Designed by<span className="indent_hidden">RIDI</span>
                <svg className="svg_logo_ridi" viewBox="0 0 517.9 210" xmlns="http://www.w3.org/2000/svg">
                    <path d="M282.1 209.9h60.4c31.1 0 53.9-7.9 67.8-23.5 14-15.7 21.2-43.1 21.2-81.4 0-38.3-7.2-65.7-21.3-81.4C396.2 8 373.2.1 341.9.1h-59.8c-5 0-6.8 1.9-6.8 6.8v196.2c0 5 1.8 6.8 6.8 6.8zm47.6-49.4V47.1H340.4c13.1 0 22.6 4.3 28.2 12.7 5.4 8 8 22.8 8 45.2 0 22.4-2.5 37.2-7.6 45.2-5.4 8.4-14.8 12.7-27.9 12.7h-11.3v-2.4zM192.6 209.9h40.8c5 0 6.8-1.8 6.8-6.8V6.9c0-5-1.8-6.8-6.8-6.8h-40.8c-5 0-6.8 1.9-6.8 6.8v196.2c-.1 5 1.8 6.8 6.8 6.8zM470.4 209.9h40.8c4.9 0 6.8-1.8 6.8-6.8V6.9c0-5-1.8-6.8-6.8-6.8h-40.8c-5 0-6.8 1.9-6.8 6.8v196.2c0 5 1.9 6.8 6.8 6.8zM6.4 209.9h40.5c5 0 6.8-1.8 6.8-6.8v-57.3h15.1l.7 1.4 27 56.2c2.2 4.5 5.8 6.5 11.1 6.5h41.1c3.5 0 4-1.2 4.2-1.7.6-1.5.3-3.5-1-5.9l-32.8-62.1-1.2-2.2 2.3-1.1 1.1-.5c21.6-10.3 32.6-31.1 32.6-61.7 0-27.6-6.3-47.1-18.8-58C122.5 5.7 101.5.1 72.9.1H6.4C1.4.1-.4 1.9-.4 6.9v196.2c0 5 1.8 6.8 6.8 6.8zm47.2-109.2V45.9H72.2c10 0 16.8 2.1 20.8 6.6 3.9 4.3 5.9 11.6 5.9 22.2 0 10-1.9 17-5.8 21.5-4 4.6-11 6.9-20.8 6.9H53.7v-2.4z"/>
                </svg>
            </h2>
            <p className="article_paragraph p1">종이책에서의 경험을 온전히 전자잉크로 재현하고 싶다는 바람에서
RIDI는 PAPER PRO를 만들기 시작했습니다.</p>
            <p className="article_paragraph p2">
                기본 인쇄 판형과 가장 유사한 7.8인치 디스플레이,<br />
                얇은 두께와 가벼운 무게,<br />
                플랫 스크린과 어울리는 물리 버튼,<br />불필요한 요소를 최대한 줄인 심플한 디자인.
            </p>
            <p className="article_paragraph p3">
                <strong>
                    그렇게 1년 6개월의 개발 기간 끝에 PAPER PRO를 완성했습니다.<br />전자책 독자들에게 완전히 새로운 경험을 선사할 것입니다.
                </strong>
            </p>
        </div>
        <div className="js_trigger device">
            <img className="device_back" src={image} alt="PAPER PRO 뒷면" />
        </div>
    </div>
</section>
);
