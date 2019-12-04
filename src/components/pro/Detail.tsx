import React from 'react';

import pagination1 from '../../assets/images/pro/detail/pagination_1.jpg';
import pagination2 from '../../assets/images/pro/detail/pagination_2.jpg';
import pagination3 from '../../assets/images/pro/detail/pagination_3.jpg';
import button from '../../assets/images/pro/detail/button.png';
import button_bg from '../../assets/images/pro/detail/button_bg.jpg';

export default () => (
  <section className="js_trigger intro_section" id="ux_upgrade">
      <div className="contents_wrapper white_tone">
          <h2 className="section_title">
            {`누구도\xa0예상\xa0못\xa0한 디테일`}
          </h2>
          <div className="js_trigger one_hand_pagination">
              <div className="pagination_wrapper">
                  <ol>
                      <li className="page_list page1">
                          <img className="page" src={pagination1} alt="이미지" />
                      </li>
                      <li className="page_list page2">
                          <img className="page" src={pagination2} alt="이미지" />
                      </li>
                      <li className="page_list page3">
                          <img className="page" src={pagination3} alt="이미지" />
                      </li>
                  </ol>
                  <div className="pointer"></div>
              </div>
          </div>
          <article className="one_hand_article">
              <h3 className="article_title">
                  <strong>한 손으로 충분한 페이지 이동</strong>
              </h3>
              <p className="article_paragraph">
                  상하 구분된 물리 버튼을 활용하여<br />한 손으로 앞뒤 페이지를 편하게 넘기세요.
              </p>
          </article>
          <div className="js_trigger prominent_button">
              <img className="button_bg" src={button_bg} alt="기기본체" />
              <img className="button" src={button} alt="돌출된 버튼" />
          </div>
          <article>
              <h3 className="article_title">
                  <strong>손끝에 느껴지는 버튼</strong>
              </h3>
              <p className="article_paragraph">
                  돌출된 점으로 버튼 위치를 쉽게 알 수 있어,<br />독서 흐름이 끊기지 않습니다.
              </p>
          </article>
      </div>
  </section>
);