# TCP Echo 서버 만들기 (1)

[내일배움캠프] 스파르타) _Node.js 게임서버개발 주특기 플러스+ 1주차 강의_ 에서 다뤄진 TCP Echo 서버 만들기 입니다.

<br>

내용 정리 블로그 링크: [https://donkim0122.tistory.com/90](https://donkim0122.tistory.com/90)

<br>

### 다뤄진 내용 요약
- Node.js 기본 네트워크 모듈인 'net' 을 사용한 socket 서버 생성
- Node.js의 Buffer 객체의 Buffer.from() 을 이용한 데이터 직렬화
- Buffer.alloc() 을 이용한 버퍼 객체 생성과 버퍼 객체의 write method들을 이용한 헤더 작성
- 헤더 버퍼와 데이터 버퍼의 결합/송신 및 수신/분리
- Buffer 객체의 toString(), toJSON() method 및 template literal을 이용한 역직렬화
- BE(Big Endian)와 LE(Little Endian) 개념
