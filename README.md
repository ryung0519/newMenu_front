프로젝트 실행 방법
1. 관련 의존성 설치     
npm install 

2. 안드로이드 스튜디오에서 가상 애뮬레이터 실행 및 설치      
아래는 참고 블로그      
https://chococookiee.tistory.com/50     

3. 애뮬레이터 실행      
  ㄱ.실행 확인 명령어 "adb devices"     
  아래처럼 나오면 ok 안나오면 ㄴ번 진행 나오면 4번 진행      
  ====================================================           
  List of devices attached             
  emulator-5554   device            
  ====================================================                     
  ㄴ.사용가능 애뮬레이터 확인 "emulator -list-avds"
  아래처럼 나오면 ok, 안나오면 2번이 진행이 안된 것 가상 애뮬래이터 다시 설치 할 것 나오면 ㄷ으로               
  =====================================                
  Pixel_9_Pro                 
  Small_Phone_API_34                    
  ======================================              
  
  ㄷ.애뮬레이터 실행 명령어 "emulator -avd '원하는 애뮬레이터 이름'"    
  ㄹ. 애뮬레이터 실행 확인          

4. React Native CLI 실행 명령어 "npx react-native start"       
(원한다면 Expo도 가능)            

5. 에뮬레이터에서 앱 실행 명령어 "npx react-native run-android"         

