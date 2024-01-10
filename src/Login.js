import React, { useState } from 'react';
import './Login.css';
import EcotimeLogo from './ecotime 로고.jpg';

const App = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState(''); 
  const [isLoginMode, setIsLoginMode] = useState(true); 

  const handleLogin = async () => {
    try {
      const response = await fetch('백엔드 로그인 주소', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('로그인 성공:', userData);
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('백엔드 회원가입 주소', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: signupUsername, password: signupPassword, name: signupName, email: signupEmail }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('회원가입 성공:', userData);
      } else {
        console.log('회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="app">
      <div className="form-container">
      <img src={EcotimeLogo} alt="ECOTIME 로고" style={{ width: '210px', marginBottom: '30px' }} />
        {isLoginMode ? (
          <>
            <label>ID</label>
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
              로그인
            </button>
          </>
        ) : (
          <>           
            <label>Name</label>
            <input
              type="text"
              placeholder="이름을 입력하세요."
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
            <label>E-mail</label>
            <input
              type="email" 
              placeholder="이메일을 입력하세요."
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <label>ID</label>
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <button type="button" onClick={handleSignUp}>
              회원가입
            </button>
          </>
        )}

        <p>
          <span style={{ color: 'rgb(75, 190, 96)', cursor: 'pointer' }} onClick={toggleMode}>
            {isLoginMode ? "회원이 아니신가요? 회원가입 하기" : "이미 회원이신가요? 로그인 하기"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default App;