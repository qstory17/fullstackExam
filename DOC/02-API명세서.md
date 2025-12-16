# API 명세서

## 1. 전체 다짐 목록 조회

서버에 저장된 모든 방명록 데이터를 최신순(또는 저장된 순서)으로 조회합니다.

| 항목             | 내용                  |
| :--------------- | :-------------------- |
| **URL**          | `GET /api/guestbooks` |
| **Request Body** | 없음                  |
| **Response**     | `200 OK`              |

**Response Body 예시**

```json
[
  {
    "id": 1,
    "nickname": "휴고",
    "content": "오늘도 열심히 코딩하자!",
    "createdAt": "2024-05-20T10:00:00"
  },
  {
    "id": 2,
    "nickname": "게스트",
    "content": "반갑습니다~",
    "createdAt": "2024-05-20T10:05:00"
  }
]
```

## 2. 다짐 등록

새로운 다짐(방명록)을 저장합니다.

| 항목             | 내용                   |
| :--------------- | :--------------------- |
| **URL**          | `POST /api/guestbooks` |
| **Content-Type** | `application/json`     |
| **Response**     | `200 OK`               |

**Request Body 예시**

```json
{
  "nickname": "새로운방문자",
  "content": "이 프로젝트 정말 재밌네요!"
}
```

**Response Body 예시** (저장된 데이터 반환)

```json
{
  "id": 3,
  "nickname": "새로운방문자",
  "content": "이 프로젝트 정말 재밌네요!",
  "createdAt": "2024-05-20T12:00:00"
}
```
