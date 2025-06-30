// node_login_test.js
const fetch = require('node-fetch'); // 설치 필요: npm install node-fetch

async function register(email, password) {
  const res = await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log('[REGISTER]', data.message);
}

async function login(email, password) {
  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log('[LOGIN]', data.message);
}

// 테스트 실행
(async () => {
  const email = 'yoodain1027@naver.com';
  const password = '1234';

  await register(email, password);
  await login(email, password);
})();
