import styled from 'astroturf';
import { useState } from 'react';
import React from 'react';
import { SpecsHeader } from './SpecsHeader';
import { SpecsTable } from './SpecsTable';

const SpecsContainer = styled('section')`
  max-width: 1004px;
  padding-top: 215px;
  margin: 0 auto;
`;

const SpecsTitle = styled('h2')`
  color: #121212;
  text-align: start;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  margin: 0 20px;
  margin-bottom: 0px;
`;

const SpecsPanelContainer = styled('div')`
  display: none;
  margin: 0 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  width: 100%;
  
  &[data-is-selected="true"] {
    display: flex;
  }
`;

const BASIC_CONTENT = [
  { key: 'name', name: '정식명칭', value: '리디페이퍼 4' },
  { key: 'display-size', name: '화면크기', value: '6인치 (152.4mm)' },
  { key: 'resolution', name: '해상도', value: '300PPI (1072x1448화소)' },
  { key: 'weight', name: '무게', value: '173g' },
  { key: 'size', name: '크기', value: '가로 114.08mm x 세로 156.96mm x 두께 7.94mm' },
  { key: 'storage', name: '저장공간', value: '기본 8GB (시스템 용량 제외 약 5.72GB 사용 가능)' },
  { key: 'external-storage', name: '확장 메모리', value: '마이크로 SD 최대 32GB 추가 가능' },
  { key: 'battery', name: '배터리 용량', value: '1,500mAh' },
  { key: 'charge-time', name: '충전 완료 시간', value: '약 2시간 40분 (5V 1A 충전기 기준)' },
];

const TECHINFO_CONTENT = [
  { key: 'cpu', name: 'CPU', value: 'Exynos 850 Octa-Core 2.0GHz' },
  { key: 'ram', name: 'RAM', value: 'LPDDR4X 3GB' },
  { key: 'os', name: 'OS', value: '안드로이드 10' },
  { key: 'wifi', name: '와이파이', value: '802.11a/b/g/n/ac, 2.4GHz / 5GHz' },
  { key: 'bluetooth', name: '블루투스', value: '5.0 (Profile : A2DP, AVRCP, HID)' },
  { key: 'safe-temperature', name: '정상 작동 온도', value: '0~40℃' },
  { key: 'suported-file', name: '지원 파일', value: 'EPUB, TXT, PDF, ZIP' },
];

const DISPLAY_CONTENT = [
  { key: 'type', name: '스크린 형태', value: '7" Carta 1200 E-Ink Display (논플랫 스크린)' },
  { key: 'page', name: '페이지 넘김', value: '정전식 터치스크린 + 페이지 넘김 버튼 (2개)' },
  { key: 'light', name: '화면 조명', value: '프론트라이트 프로 (밝기 조절 및 색 온도 조절 가능)' },
];

const EXTRA_CONTENT = [
  {
    key: 'extra',
    name: '부가 기능',
    value: [
      '오토 슬립 (정품 하드 플립 케이스 사용 시)',
      '화면 회전 (기기 방향에 따른 화면 자동 회전)',
      '가로 모드 (한쪽보기, 두쪽보기 선택 가능)',
      '퀵 버튼 (터치 잠금 모드 ON/OFF, 다양한 기능으로 할당 가능)',
      'TTS (Text to Speech) 기능',
      '사용자 파일 추가 (지원 파일 형식에 한함)',
      '글자 크기, 줄 간격, 문단 간격, 문단 너비, 문단 정렬 조절',
      '기본 글꼴 6가지 제공 (사용자 글꼴 추가 가능)'
    ].join('\n')
  }
];

const SpecsBasic = () => (
  <SpecsTable rows={BASIC_CONTENT} />
);

const SpecsTechInfo = () => (
  <SpecsTable rows={TECHINFO_CONTENT} />
);

const SpecsDisplay = () => (
  <SpecsTable rows={DISPLAY_CONTENT} />
);

const SpecsExtra = () => (
  <SpecsTable rows={EXTRA_CONTENT} />
);

const SPECS_ITEMS = [
  { key: 'basic', text: '기본사양', panelId: 'ridipaper4-specs-basic', component: SpecsBasic },
  { key: 'techinfo', text: '기술정보', panelId: 'ridipaper4-specs-techinfo', component: SpecsTechInfo },
  { key: 'display', text: '디스플레이', panelId: 'ridipaper4-specs-display', component: SpecsDisplay },
  { key: 'extra', text: '부가기능', panelId: 'ridipaper4-specs-extra', component: SpecsExtra },
];

export const Specs = (): JSX.Element => {
  const items = SPECS_ITEMS;
  const [selectedItemKey, setSelectedItemKey] = useState(items[0].key);
  
  return (
    <SpecsContainer id="ridipaper4-specs">
      <SpecsTitle>
        RIDI PAPER 4
        <br />
        상세 스펙
      </SpecsTitle>
      
      <SpecsHeader items={items} selectedItemKey={selectedItemKey} setSelectedItemKey={setSelectedItemKey} />
      { items.map(({ key, panelId, component: SpecsPanel }) => (
        <SpecsPanelContainer
          id={panelId}
          key={key}
          role="tabpanel"
          aria-selected={key === selectedItemKey}
          data-is-selected={key === selectedItemKey}
        >
          <SpecsPanel />
        </SpecsPanelContainer>
      ))}
    </SpecsContainer>
  );
};
