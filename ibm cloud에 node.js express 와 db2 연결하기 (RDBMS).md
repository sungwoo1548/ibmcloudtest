# ibm cloud에 node.js express 와 db2 연결하기 (RDBMS)

## 1. 기본환경

아래 1.1~1.3 까지는 알아서 각자 환경에 맞게 설치

### 1.1 VScode 설치

### 1.2 nodejs 설치

### 1.3 IBM CLI 설치



## 2. IBM 무료 인스턴스 선택

### 2.1 SDK for Node.js

* ibmcloud 로그인 후 카탈로그 에서 SDK for Node.js 선택
  * ![1566556606776](https://user-images.githubusercontent.com/21153016/63586860-6ab1eb00-c5dd-11e9-9b0a-c771fbb89415.png)
* 앱이름 정하면 호스트이름 자동입력됨
  * 무료버전 선택
  * 메모리는 최소64MB부터 시작함, 최대 256MB임 (64MB 4개만들수 있음)
  * 일단 256MB로 시작
  * ![image](https://user-images.githubusercontent.com/21153016/63588182-db0e3b80-c5e0-11e9-8515-5902abfea644.png)
  * 작성 버튼 누르면 아래그림처럼 앱이 실행됨
    * ![image](https://user-images.githubusercontent.com/21153016/63590674-828e6c80-c5e7-11e9-936b-a1c19a755391.png)
    * 앱이 활성화되었습니다 표시 될 때 까지 대기 후 
    * 앱 url 클릭
    * ![image](https://user-images.githubusercontent.com/21153016/63590718-a356c200-c5e7-11e9-827c-6f75758303f9.png)
    * Hello World 보이면 일단 됨.

### 2.2 SDK for Node.js 에 서버올리기 1단계

* 시작하기 예제 따라하기

  * 왼쪽 메뉴에서 시작하기 클릭
  * ![image](https://user-images.githubusercontent.com/21153016/63590899-3db70580-c5e8-11e9-906f-f3f654090706.png)
  * git clone 하기
    바탕화면에 test폴더 생성 후 cmd창 실행해서
    cd test 명령을 통해 폴더 안으로 접근
  * cmd에서 
    git clone https://github.com/IBM-Cloud/get-started-node 명령어 실행
  * cd get-started-node 명령어로 폴더로 들어감
  * cmd에서 
    npm install 명령어를 통해 모듈설치
    ( 아래와 같이 vulnerabilities 나오면 ![image](https://user-images.githubusercontent.com/21153016/63591201-07c65100-c5e9-11e9-8cf4-9645a67d5bee.png)   npm audit fix 명령어를 통해 취약점 제거 // 제거 안되면 그냥 패스 )
  * cmd에서
    npm start 명령어를 통해 로컬서버 확인하기 (http://localhost:3000)
  * ![image](https://user-images.githubusercontent.com/21153016/63591340-72778c80-c5e9-11e9-8791-d79cfdbaebd0.png)
  * Welcom  페이지 나오면 서버 정상구동됨. 
    ( cmd에 nodatabase 문구 나오는 것은 무시하면됨)

* 시작하기 예제 따라하기 (ibm upload)

  * 우선 cmd에서 ctrl + c 키를 눌러 서버를 중지하고 
    code . 명령어를 통해 VScode 실행
    (code . 명령어 = code 한칸공백 하고 쩜.) // 안되면 VScode 설치 후 진행
  * VScode에서  manifest.yml 파일클릭
    * ![image](https://user-images.githubusercontent.com/21153016/63591687-7061fd80-c5ea-11e9-81fe-ef6151d4b02c.png)
    * name 의 GetStarteNode 를 앱생성시 만든 이름 (test-0823)으로 변경
    * 앱이름 모르겠으면 시작하기의 3단계의
      ![image](https://user-images.githubusercontent.com/21153016/63591824-e0708380-c5ea-11e9-9238-aab01a702107.png)
      빨간 밑줄 부분에 나와있음
  * VScode 에서 terminal을 연다.
    * 왼쪽의 아무파일이나 마우스 우클리 후 open in terminal 하면됨
    * ![image](https://user-images.githubusercontent.com/21153016/63592459-97b9ca00-c5ec-11e9-8244-d8809c2784b0.png)
    * 그림처럼 나오면 됨

  

  * ibmcloud cli 이용

    * ibmcloud -v 명령어로 ibmcloud cli 작동확인
      ![image](https://user-images.githubusercontent.com/21153016/63592551-cb94ef80-c5ec-11e9-9af5-0dcf8d6de520.png)

    * ibmclou login 명령어
      -> id (이메일) 입력 후 
      -> pw 입력하면 로그인됨.
      ![image](https://user-images.githubusercontent.com/21153016/63592728-4958fb00-c5ed-11e9-9301-742d927fac39.png)

    * 리소스 그룹과 CF API 엔드포인트, 조직, 영역을 설정해줘야함
      

    * 리소스 설정
      -> 노란색 알림 글씨 대로
      -> ibmcloud target -g RESOURCE_GROUP 입력 후 엔터
      ![image](https://user-images.githubusercontent.com/21153016/63592968-d439f580-c5ed-11e9-8a9e-ee8d035c0af5.png)
      -> 실패 뜸
      -> 다시 노란색 알림 대로

      -> ibmcloud resource groups 입력 후 엔터

      ![image](https://user-images.githubusercontent.com/21153016/63593008-ee73d380-c5ed-11e9-92d7-1215a2ba8163.png)
      -> 사용가능한 resource 나옴 
      설정 안했으면 Default 가 있을거임 이거 사용
      -> ibmcloud target -g Default 입력 후 엔터
      ![image](https://user-images.githubusercontent.com/21153016/63593119-3b57aa00-c5ee-11e9-8cd4-2c7fca10b2a8.png)
      -> 리소스 그룹이 Default로 지정됨

    * 이제 CF API 엔드포인트, 조직, 영역 지정
      -> 첫줄의 노란색 알림 글씨 대로
      -> ibmcloud target --cf 입력 후 엔터
      ![image](https://user-images.githubusercontent.com/21153016/63593376-d2bcfd00-c5ee-11e9-8a9f-b3805b4f6c61.png)
      ->한번에 안될 수 있음....
      조직 설정을 해주고 다시 시도하면 될지도?

    * 조직 설정 하기
      -> 인터넷 브라우저의 ibmcloud 에서 상단에 관리>계정>cloud foundary 조직 선택
      ![image](https://user-images.githubusercontent.com/21153016/63593682-6ee70400-c5ef-11e9-9759-7e65db5ea0e6.png)
      -> 조직이 비어있으면 작성하기 해서 조직 생성

    * 조직 설정 후  VScode에서
      -> ibmcloud target --cf 다시 입력 후 엔터
      (그래도 안되면 .... 연락바람 ㅋ)

    * 이제 cloud에 올리기
      -> ibmcloud cf push 입력 후 엔터
      ![image](https://user-images.githubusercontent.com/21153016/63594187-bfab2c80-c5f0-11e9-925b-7ca3965f3ba6.png)
      -> 앱 실행 중 확인 후
      -> 다시 브라우저로 이동!

    * 브라우저에서 앱 URL 클릭해서 
      -> 로컬에서 확인한 Wellcome 페이지 나오면 성공!
      ![image](https://user-images.githubusercontent.com/21153016/63594353-31837600-c5f1-11e9-8214-5821a0f7b005.png)
      -> 주소창의 test-0823.mybluemix.net 이 자기 주소임.



### 2.3 DB2 인스턴스 만들기

* 카탈로그 (필터 : lite) 에서 DB2 선택
  * ![image](https://user-images.githubusercontent.com/21153016/63594554-b1a9db80-c5f1-11e9-8b2b-94b5226a12ea.png)
  * 그냥 무료 버전으로 작성하기
    ![image](https://user-images.githubusercontent.com/21153016/63599292-431e4b00-c5fc-11e9-9074-0d5d9422a955.png)
  * 생성 후 리소스 목록에서 DB2 클릭
  * 새 인증정보 작성
    * ![image](https://user-images.githubusercontent.com/21153016/63599618-ed966e00-c5fc-11e9-8f28-cfe5dc4bd4ad.png)
    * test-db 이름으로 추가
  * 인증정보 확인
    * ![image](https://user-images.githubusercontent.com/21153016/63599749-2d5d5580-c5fd-11e9-93fb-07a10a46d943.png)
    * 새로 추가된 test-db의 인증정보 보기 하면 username(ssl86187) 기억하기
  * DB2 console 열기
    * ![image](https://user-images.githubusercontent.com/21153016/63599405-81b40580-c5fc-11e9-82b5-65712245070b.png)
      -> 관리에서 open console 클릭
    * DB console 화면
      ![image](https://user-images.githubusercontent.com/21153016/63599947-9513a080-c5fd-11e9-8763-3d63504471de.png)
      -> explore 의 tables 선택
    * tables 화면
      ![image](https://user-images.githubusercontent.com/21153016/63600049-c7bd9900-c5fd-11e9-9dbc-dad4d43bab5e.png)
      -> 여러개가 보이지만 아까 username 인 ssl86187을 체크 하면 
      오른쪽에 new table할 수있는 창이 뜸.
    * New table 기능으로 test 테이블 생성
      ![image](https://user-images.githubusercontent.com/21153016/63602717-0e61c200-c603-11e9-8bbd-7100be2648e6.png)
      -> 테이블 이름을 test로 하고, 첫번째 열 인자를 test_id로 작성, datatype은 varchar 선택 후 Create 클릭
    * 새로 생긴 테이블 확인
      ![image](https://user-images.githubusercontent.com/21153016/63600364-64803680-c5fe-11e9-8be0-7211a8409a1c.png)
      -> 새로 생긴 TEST 테이블의 글씨를 클릭하면
      테이블의 구조 확인 가능
    * 테이블 데이터내용 확인
      ![image](https://user-images.githubusercontent.com/21153016/63600489-a315f100-c5fe-11e9-94a4-5cbebaca9d05.png)
      -> 구조 확인 후 하단의 View Data 클릭하면
      테이블에 저장된 데이터 확인 가능
    * 데이터 확인
      ![image](https://user-images.githubusercontent.com/21153016/63600654-ecfed700-c5fe-11e9-81dd-8a71d807bac1.png)
      -> 아직 아무데이터도 없음.
      이제 서버에서 DB로 데이터 전송하기 할거임



### 2.4 DB2로 데이터 보내기

* node에서 jquery로 sql 써서 DB로 data 넣을거임

* mysql 처럼 db2용 드라이버 설치해야함
  관련문서 : <https://github.com/ibmdb/node-ibm_db>
  명령어 : npm i ibm_db

* 자 이제 다시 VScode로 가서
  npm i ibm_db 입력 후 엔터

* server.js 수정 5행부터~28행까지 

  * ```js
    var ibmdb = require("ibm_db");
    var dsn = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=ssl86187;PWD=jl629g25j0-8bfgz;";
    
    // inset into 저장
    app.get('/insertDB', (req, res, next) => {
      ibmdb.open(dsn, function (err, conn) {
        conn.prepare("INSERT INTO test (test_id) VALUES (?)", function (err, stmt) {
          if (err) { //에러처리 could not prepare for some reason
            console.log(err);
            return conn.closeSync();
          }
          //Bind and Execute the statment asynchronously
          stmt.execute(['myid001'], function (err, result) {
            if (err) console.log(err);
            else { // 정상처리 후 결과
              res.send(result);
              result.closeSync();
            }
            //Close the connection
            conn.close(function (err) { });
          });
        });
      });
    });
    ```

    

  * 작성 후 npm start 입력 후 엔터 

  * 서버 실행되면  브라우저에서 주소 맨 뒤에 /insertDB 추가 후 엔터
    -> /insertDB get방식 처리하도록 코딩했으니, 결과 화면이 나오면 성공!

    * ![image](https://user-images.githubusercontent.com/21153016/63602857-5aad0200-c603-11e9-8fe9-38be18fdbb3e.png)
      -> fetchMode 라는 결과가 나오면 DB에 data저장된것임

* DB console에서 등록된 data 확인

  * ![image](https://user-images.githubusercontent.com/21153016/63603110-e1fa7580-c603-11e9-84d6-451297a8817f.png)
    -> console의 test 테이블 선택 후 View Data
  * ![image](https://user-images.githubusercontent.com/21153016/63603047-bc6d6c00-c603-11e9-89e9-e071eef5652d.png)
  * sever.js에서 넣은 myid001이 저장되어있음!



* VS code 에서 DB 데이터 읽어오는 기능 작성

  * server.js 수정  29행에서 엔터 치고 30행~47행 작성

    * ```js
      app.get('/readDB', (req, res, next) => {
        ibmdb.open(dsn, function (err, connection) {
          if (err) {
            console.log(err);
            return;
          }
          connection.query("select * from test", function (err1, result) {
            if (err1) console.log(err1);
            else {
              console.log(result);
              res.send(result);
            }
            connection.close(function (err2) {
              if (err2) console.log(err2);
            });
          });
        });
      });
      ```

      

  * 이제 다시 npm start 한다음 브라우저에서 주소 끝에 /readDB
    하면 db내용이 보여야함 (myid001)

    * ![image](https://user-images.githubusercontent.com/21153016/63603593-e4a99a80-c604-11e9-8742-84964a1464b9.png)
      -> 나는 /insertDB를 두번 요청해서 
      /readDB의 결과가 두개임 
    * 결과의 형태가 배열임으로 필요한 정보는 배열에서 꺼내서 쓰면됨 

## 3. 결론

* 기본 예제용 서버로 테스트 했으나, express 로 구축 후 
  cloud에 ibmcloud cf push를 하면 내가 만든 것도 됨
* DB2는 해당 문서(<https://github.com/ibmdb/node-ibm_db>)에 함수들 사용법이 있으니 참고 하면됨
* DB2는 무료 계정이 200MB, 동시 연결 5개, 30일마다 수동으로 사용기간 연장해줘야함
*  본 문서로 충분히 개발 가능할 것으로 보임....