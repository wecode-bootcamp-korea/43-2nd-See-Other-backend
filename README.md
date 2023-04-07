# 43-2nd-See-Other-backend
강혁주, 김승태

<br>

## SeeOther 2차 프로젝트 Backend (강혁주, 김승태)
- 영화산업 극장체인 기업 [CGV](https://www.cgv.co.kr/) 클론 프로젝트.
- 해당 브랜드의 영화 관련 웹페이지 기획과 디자인만을 참고하여 진행.
- 사용자가 홈페이지에서부터 예매를 완료, 확인할 수 있는 과정을 담은 프로젝트.

<br>

### 개발 인원 및 기간

- 개발 기간 : 2023/3/27 ~ 2023/4/7 (2주)
- 참여 인원 : 백엔드 2명, 프론트엔드 3명
  - `BACKEND`: 강혁주, 김승태
  - `FRONTEND`: 이솜이, 김수미, 오지수

- [백엔드 github 링크](https://github.com/wecode-bootcamp-korea/43-2nd-See-Other-backend)
- [프론트엔드 github 링크](https://github.com/wecode-bootcamp-korea/43-2nd-See-Other-frontend)

<br>

## 적용 기술 및 구현 기능

### 적용 기술

> - Back-End : Javascript, Node.js, Express.js, Jwt, Bcrypt, Axios, MySQL, Dbmate, Nodemon
> - Common : REST, Vscode
> - 협업: Github, Slack, Notion, Trello, Dbdiagram
<br>

### 구현 목록


| 기능                              | 구현 내용                                                                                                                                                                                        | 개발 담당          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| DB 모델링 설계                     | <img src="https://user-images.githubusercontent.com/121237964/230523775-1e879f27-a079-4b7e-8024-16305da7aa3f.png" width = "500">                                                                               | 강혁주 <br> 김승태 |
| ERD기반 테이블 및 데이터 생성          | - Mysql 및 Dbmate를 활용한 테이블 생성  <br>  - 영화, 지역, 지점, 날짜, 상영관, 상영시간 등 영화 예매에 필요한 데이터 생성                                                                                                             | 강혁주 <br> 김승태  |
| 회원가입 / 로그인 API             | - KAKAO로그인 API와 Axios를 활용한 회원가입 및 로그인 기능 구현 <br> - Bcrypt를 사용한 비밀번호 암호화 <br> - 암호화된 비밀번호 복호화하여 확인 후 Jwt 토큰 발급 <br> - 페이지에 인가 API에 적용  <br>             | 강혁주             |
| 영화 리스트 API | - 홈페이지 영화 정보, 무비차트 영화 정보 <br> - 현재 상영작과 예정작을 필터링 <br> - 예매율, 평점 필터링 기능 구현 <br> - 영화에 해당 하는 정보(한글제목, 영어제목, 이미지, 평점, 개봉날짜) 필터링                                                | 강혁주 <br> 김승태            |
| 예매 API                         | - 예매를 위한 영화 정보들을 조회하고, 선택에 따른 각 조건의 필터 기능 구현 <br> - 선택한 조건에 맞는 상영관 및 시간표 조회 <br> - 해당 상영관의 좌석 정보 조회                                                                    | 김승태             |
| 예매 내역 API              | - 영화, 날짜, 시간, 상영관에 대한 정보를 받고, 예매 내역 CREATE <br> - 해당 사용자에 대한 예매 내역 READ                                                  | 강혁주  |
| 영화 리뷰 API              | - 예매 CRUD <br> - 예매를 한 사람만 한 영화에 한 리뷰만 가능 <br> - 별점을 등록 후 바로 영화 평점 UPDATE                                                 | 강혁주  |
| 프로젝트 팀 <br> 역할 티켓       | <img src="https://user-images.githubusercontent.com/121237964/230524430-20b67b11-9dca-4fe8-a086-b782955eb5f1.png" width = "500">                                                  | 강혁주 <br> 김승태 <br> 이솜이 <br> 김수미 <br> 오지수 |
