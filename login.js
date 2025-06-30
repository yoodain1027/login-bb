require('dotenv').config();
const fetch = require('node-fetch');

// ────── 회원가입 요청 함수 ──────
async function register(email, password) {
  try {
    const res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log('[REGISTER]', data.message);
  } catch (err) {
    console.error('[REGISTER ERROR]', err.message);
  }
}

// ────── 로그인 요청 함수 ──────
async function login(email, password) {
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log('[LOGIN]', data.message);
  } catch (err) {
    console.error('[LOGIN ERROR]', err.message);
  }
}

// ────── 테스트 실행 ──────
(async () => {
  const email = 'yoodain1027@naver.com';
  const password = '1234';

  await register(email, password);
  await login(email, password);
})();
