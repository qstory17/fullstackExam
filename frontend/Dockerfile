# 과제 예제 기반 + 에러 방지용 설정 추가
FROM node:20-alpine AS builder

WORKDIR /app

# 패키지 파일만 먼저 복사 (캐시 활용)
COPY package*.json ./

# 의존성 설치 (ci를 사용하면 lock파일 기준이라 더 안전하지만, install도 무방)
RUN npm install

# 소스 코드 전체 복사
COPY . .

# 빌드 실행 (여기서 에러가 났던 것입니다)
# next.config.js에 output: 'standalone'이 있어야 이후 단계가 작동합니다.
RUN npm run build

# --- 실행 단계 ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# 보안상 권장되는 node 사용자 사용 (선택 사항이지만 권장)
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# 빌드 결과물 중 standalone 폴더(필요한 파일만 모은 것) 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 포트 노출
EXPOSE 3000

# 실행 명령어
CMD ["node", "server.js"]