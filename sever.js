require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // index.html, login.js 위치

const USERS_FILE = 'users.json';

// 회원가입 처리
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  if (users[email]) {
    return res.status(409).json({ message: '이미 가입된 이메일입니다.' });
  }

  users[email] = password;
  saveUsers(users);
  res.json({ message: '회원가입 성공!' });
});

// 로그인 처리
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  if (!users[email]) {
    return res.status(404).json({ message: '등록되지 않은 이메일입니다.' });
  }

  if (users[email] !== password) {
    return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
  }

  res.json({ message: '로그인 성공! 환영합니다.' });
});

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE));
  } catch {
    return {};
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
