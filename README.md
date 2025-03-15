프로젝트 실행 방법
1. 관련 의존성 설치     
npm install 

2. 사용가능 애뮬레이터 확인(가상 애뮬레이터 설치 확인)   
   "emulator -list-avds"      
  아래처럼 나오면 ok, 안나오면 2-1번이 에뮬레이터가 안깔린 것 가상 애뮬래이터 설치할 것 나오면 3번으로               
  =====================================                
  Pixel_9_Pro                 
  Small_Phone_API_34                    
  ======================================                 
  2-1. 안드로이드 스튜디오에서 가상 애뮬레이터 설치     
  아래는 참고 블로그               
  https://chococookiee.tistory.com/50             

3. 애뮬레이터 실행      
  ㄱ. 애뮬레이터 실행 명령어 "emulator -avd '원하는 애뮬레이터 이름'"    
  ㄱ-1. 에뮬레이터 이름은 아래에서 확인     
     "emulator -list-avds"      
     =====================================                
      Pixel_9_Pro                 
      Small_Phone_API_34                    
     ======================================                 
  ㄴ. 실행 확인 명령어 "adb devices"     
  아래처럼 나오면 ok 안나오면 ㄷ번 진행 나오면 4번 진행      
  ====================================================           
  List of devices attached             
  emulator-5554   device            
  ====================================================                   
  ㄷ. 서버 껐다키기
  "adb kill-server"
  "adb start-server"
  
4. React Native CLI 실행 명령어 "npx react-native start"       
(원한다면 Expo도 가능)            

5. 에뮬레이터에서 앱 실행 명령어 "npx react-native run-android"            

