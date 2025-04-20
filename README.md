# ⚙️ PH-MOLD Server

ph-mold-server는 (주)팜앤몰드의 웹 백엔드 API 서버입니다.
제품 카탈로그 관리, 이미지 업로드, 카테고리 및 태그 시스템, SEO 대응 API 등을 제공합니다.

NestJS 기반의 RESTful API 구조로 구성되며, 도커 및 GitHub Actions 기반으로 자동 배포됩니다.

## 🔧 Tech Stack

| 영역         | 기술                              |
| ------------ | --------------------------------- |
| Framework    | NestJS 10+                        |
| Language     | TypeScript                        |
| DB           | MariaDB (mysql2 + TypeORM)        |
| API 문서     | Swagger (`@nestjs/swagger`)       |
| 파일 업로드  | Multer + Nginx Static File Server |
| 배포         | Docker + GitHub Actions + Nginx   |
| 마이그레이션 | TypeORM CLI 기반 관리             |

## 📁 프로젝트 구조

```
├── src/
│   ├── modules/                   # 주요 도메인 모듈 (product, category 등)
│   ├── migrations/               # TypeORM 마이그레이션 파일
│   ├── common/                   # 공통 예외 필터, 유틸, 설정
│   ├── data-source.ts            # TypeORM 데이터 소스 정의
│   └── main.ts                   # 서버 엔트리포인트
├── contents/                     # 업로드된 이미지 파일 (volume 연동)
├── Dockerfile                    # NestJS 앱용 Dockerfile
├── .env                          # 환경변수 설정
```

## 🧪 주요 기능

- ✅ 제품, 카테고리, 태그, 스펙 기반 API 제공
- ✅ SSR/SEO 대응을 위한 요약 데이터 제공
- ✅ 이미지 업로드 및 정적 파일 서버 연동
- ✅ 커스텀 카테고리 분류 생성 및 태그 필터
- ✅ Swagger 기반 API 문서 자동 생성
- ✅ TypeORM 기반 마이그레이션 관리
- ✅ GitHub Actions 기반 서버 자동 배포
- ✅ 파일 서버와의 Docker Volume 연동 및 Nginx Proxy
- ✅ 현재 개발 진행중...

## 🐳 Docker 사용

**로컬 개발용이 아닌 프로덕션 컨테이너로만 사용됩니다.**

> Docker Compose는 별도의 [`ph-mold-infra`](https://github.com/ph-mold/ph-mold-infra) 레포에서 관리됩니다.

## 🧬 마이그레이션

### ▶ 마이그레이션 생성

```bash
npm run typeorm:create --name=CreateProductsTable
```

### ▶ 마이그레이션 실행

```
npm run typeorm:run
```

> 자동 실행은 GitHub Actions + SSH 배포 시
> docker compose run --rm api npm run typeorm:run 으로 처리됩니다.

## ⚙️ 환경변수 (.env.example 참고)

```
# development / production / test
NODE_ENV=development
# dev / local
APP_ENV=local
BASE_URL=

# DB 설정
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

## 🏁 API 문서

> Swagger 문서 경로
> http://<서버주소>/swagger
