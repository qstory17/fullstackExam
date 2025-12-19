# Docker 구성 설명

## 1. Docker를 사용하는 이유

어디서든 같은 환경을 제공하여주고, 컨테이너 단위로 프로세스를 처리하여 작업효율을 높여준다.
(언제 어디서든 같은 이미지(어플, 의존성, 실행환경)을 제공하고, 이미지를 실행한 인스턴스를 컨테이너라 한다.)

## 2. Backend Dockerfile 설명

## [1] 빌드단계

# 작업하는 버전과 AS 이름

FROM eclipse-temurin:21-jdk AS builder

# 호스트->컨테이너 폴더내용복사

WORKDIR /app
COPY guestbook/ .

# gradlew 읽는방식에 대한 에러해결! 윈도우-줄바꿈 문자(\r\n)를 리눅스 방식(\n)으로 변환

RUN sed -i 's/\r$//' gradlew

# 실행권한

RUN chmod +x gradlew

# 이거 중요! clean: 이전 빌드 기록 삭제 / bootJar: 실행 가능한 JAR 생성 / -x test: 테스트 단계는 제외(빌드 속도 향상)

RUN ./gradlew clean bootJar -x test

## [2] 실행단계

# 실행 환경만 갖춘 이미지

FROM eclipse-temurin:21-jdk

# 실행 시 사용할 작업 디렉토리 설정(상동)

WORKDIR /app

# 빌드 스테이지(builder)에서 생성된 JAR 파일만 현재 스테이지의 /app/app.jar로 복사 - 소스코드, 그래들 캐시 포함x-용량 작아짐(목적)

COPY --from=builder /app/build/libs/\*.jar app.jar

# "java -jar app.jar" 명령어를 실행하여 백엔드 서버를 구동(중요)

ENTRYPOINT ["java", "-jar", "app.jar"]

## 3. Frontend Dockerfile 설명

## [1] 빌드단계

# 18버전 쓰다가 에러나서 20버전 쓰니 해결 알파인은 가볍고 보안에 유리

FROM node:20-alpine AS builder

# 내부 디렉토리

WORKDIR /app

# npm 설치와 설치 전 해당 json을 먼저 복사해서 빌드 속도 증가!

COPY package\*.json ./
RUN npm install

# 전체 소스 코드 복사 / Next.js 빌드 실행

COPY . .
RUN npm run build

## [2] 실행단계

#상동
FROM node:20-alpine AS runner

WORKDIR /app

# 성능 최적화/보안/경량화 시키는 코드(빌드생성시간 줄여준데서 추가해봄)

ENV NODE_ENV production

# 빌드시 생성된 것 복사

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static #포트 번호
EXPOSE 3000

# standalone모드(실행에 필요한것만 복사해랏)로 빌드

CMD ["node", "server.js"]

(빌드 과정과 실행 과정 설명)

## 4. docker-compose 역할

- 각각 역할이 다르지만 유기체 처럼 하나의 동작이나 일들을 할 수 있어야 해서 여러 컨테이너를 함께 실행한다.
  할 수 있는 일
- 전체 실행
- 서로 통신 - 네트워크
- 의존성관리/실행순서
- 일관된 환경
- 확장하기 쉬움
