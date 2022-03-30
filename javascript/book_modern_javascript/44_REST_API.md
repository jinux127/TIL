# REST API
REST(Representational State Transfer)는 HTTP 장점을 최대한 활용할 수 있는 아키텍처로서 REST를 소개했고 이는 HTTP 프로토콜을 의도에 맞게 디자인하도록 유도하고 있다. REST의 기본 원칙을 잘지킨 서비스 디자인을 RESTful이라고 표현한다.

- REST : HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처
- REST API : REST를 기반으로 서비스 API를 구현한 것

## 44.1 REST API의 구성
REST API는 3가지 요소로 구성된다.
1. 자원
2. 행위
3. 표현

REST는 자체 표현 구조로 구성되어 REST API만으로 HTTP 요청의 내용을 이해할 수 있다.

## 44.2 REST API 설계 원칙
REST에서 가장 중요한 기본적인 원칙은 두 가지이다.
1. URI는 리소스를 표현하는데 집중

리소스를 식별할 수 있는 이름은 명사를 사용한다. get 같은 행위에 대한 표현이 들어가서는 안된다.
```
#bad
GET /getTodos/1

#good
GET /todos/1
```

2. 행위에 대한 정의는 HTTP 요청 메서드를 통해 한다.

주로 5가지 요청 메서드를 사용하여 CRUD를 구현한다.
- GET : 모든/특정 리소스 취득
- POST : 리소스 생성
- PUT : 리소스의 전체 교체
- PATCH : 리소스의 일부 수정
- DELETE : 모든/특정 리소스 삭제

