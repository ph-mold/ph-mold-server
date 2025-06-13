# NestJS를 위한 베이스 이미지
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 소스 복사
COPY . .

# Nest 빌드
RUN npm run build

# 앱 실행
CMD ["node", "dist/main"]

# NestJS 기본 포트 (expose만 하면 nginx가 프록시 처리)
EXPOSE 3001

# Puppeteer 의존성 및 Chromium 설치
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Puppeteer 환경 변수 설정
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser