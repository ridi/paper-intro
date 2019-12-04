import React from 'react';

import paper_pro_front_and_back from '../../assets/images/pro/spec/paper_pro_front_and_back.jpg';

export default () => (
  <section className="js_trigger intro_section" id="detail_spec">
    <div className="contents_wrapper">
        <h2 className="table_section_title">상세 스펙</h2>
        <div className="image_wrapper">
            <img className="paper_pro_front_and_back_image" src={paper_pro_front_and_back} alt="paper pro front and back image"/>
        </div>
        <table className="spec_table" id="paper_pro_spec_table">
            <tbody>
                <tr>
                    <th>정식 명칭</th>
                    <td>리디북스 페이퍼 프로</td>
                </tr>
                <tr>
                    <th>해상도</th>
                    <td>300PPI (1,404 x 1,872 화소)</td>
                </tr>
                <tr>
                    <th>화면 크기</th>
                    <td>7.8인치 (197.7mm)</td>
                </tr>
                <tr>
                    <th>스크린 형태</th>
                    <td>7.8" Carta E-ink (플랫 스크린)</td>
                </tr>
                <tr>
                    <th>페이지 넘김</th>
                    <td>정전식 터치스크린 + 물리버튼 (좌우 각 2개, 총 4개)</td>
                </tr>
                <tr>
                    <th>화면 조명</th>
                    <td>프론트라이트 프로 (색 온도 조절 가능)</td>
                </tr>
                <tr>
                    <th>* 무게</th>
                    <td>250g</td>
                </tr>
                <tr>
                    <th>* 크기</th>
                    <td>가로 147.3mm x 세로 199.8mm x 두께 7.69mm</td>
                </tr>
                <tr>
                    <th>저장공간</th>
                    <td>기본 8GB (시스템 용량 제외 약 5.6GB 사용 가능)</td>
                </tr>
                <tr>
                    <th>확장 메모리</th>
                    <td>마이크로 SD 최대 32GB 추가 가능</td>
                </tr>
                <tr>
                    <th>CPU</th>
                    <td>i.MX6 1GHz</td>
                </tr>
                <tr>
                    <th>RAM</th>
                    <td>1GB</td>
                </tr>
                <tr>
                    <th>OS</th>
                    <td>안드로이드 4.4</td>
                </tr>
                <tr>
                    <th>지원 파일</th>
                    <td>EPUB, TXT, PDF, ZIP</td>
                </tr>
                <tr>
                    <th>와이파이</th>
                    <td>802.11b/g/n, 2.4GHz</td>
                </tr>
                <tr>
                    <th>배터리</th>
                    <td>용량: 1,200mAh</td>
                </tr>
                <tr>
                    <th>정상 작동 온도</th>
                    <td>0~40℃</td>
                </tr>
                <tr>
                    <th>* 충전 완료 시간</th>
                    <td>약 2.5시간 (5V 1A 충전기 기준)</td>
                </tr>
                <tr>
                    <th>부가 기능</th>
                    <td>
                        <ul>
                            <li>뷰어 가로모드</li>
                            <li>오토 슬립 (정품 플립 커버 케이스 사용 시)</li>
                            <li>퀵 버튼 (터치 잠금 모드 on/off, 다른 기능으로 변경 가능)</li>
                            <li>페이지 넘김 화면 터치 영역 설정 (좌/우 혹은 상/하)</li>
                            <li>기본 글꼴 6가지 제공 (사용자 글꼴 추가 가능)</li>
                            <li>글자 크기, 문단 너비, 줄 간격, 문단 정렬 조절</li>
                            <li>만화/PDF 이미지 진하기 기능</li>
                            <li>독서노트 (형광펜, 밑줄, 메모, 책갈피) 기능 및 동기화</li>
                            <li>팝업으로 주석 보기</li>
                            <li>책장 편집</li>
                            <li>사용자 파일 추가 (지원 파일 형식에 한함)</li>
                            <li>국어, 영어, 영영, 백과사전 (Wi-Fi 연결 시 가능)</li>
                            <li>기기 및 구매 목록 잠금, 아이디 숨김</li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
        <p className="spec_alert">* 표시된 스펙은 기기/측정 조건에 따라 다를 수 있습니다.</p>
    </div>
</section>
);