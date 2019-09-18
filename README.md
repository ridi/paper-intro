# PAPER Intro

## Requirements
- `nodejs`
- `yarn`

## Installation
```sh
yarn install
```

## Development
```sh
yarn local
```

## Deployment
`master` 브랜치에 `push` 하면 `Netlify`가 변경사항을 감지하여 자동으로 배포합니다.

## Tips
### Copy static files
`static` 폴더 하위의 모든 파일 및 폴더들은 빌드시 자동으로 `dist` 로 복사됩니다.