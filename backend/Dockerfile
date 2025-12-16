# 1. 빌드 단계 (Builder)
# 인텔리제이와 가장 유사한 표준 JDK 환경 사용
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# [중요] backend 폴더 안의 'guestbook' 프로젝트 폴더 내용물을 복사
# (만약 프로젝트 폴더명이 guestbook이 아니면 이 부분을 수정해야 함)
COPY guestbook/ .

# [윈도우 사용자 필수]
# 1. 줄바꿈 문자(\r) 제거
RUN sed -i 's/\r$//' gradlew
# 2. 실행 권한 부여
RUN chmod +x gradlew

# 빌드 실행
RUN ./gradlew clean bootJar -x test

# ----------------------------------------------------

# 2. 실행 단계 (Runner)
# 실행 환경도 동일한 표준 JDK 사용 (Alpine 제외)
FROM eclipse-temurin:21-jdk

WORKDIR /app

# 빌드된 JAR 파일 복사
COPY --from=builder /app/build/libs/*.jar app.jar

# 서버 실행
ENTRYPOINT ["java", "-jar", "app.jar"]