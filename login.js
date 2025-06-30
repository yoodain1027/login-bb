// server.js
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

const USERS_FILE = path.join(__dirname, 'users.json');

// ────── Middleware ──────
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// ────── 회원가입 라우터 ──────
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readUsers();

    if (users[email]) {
      return res.status(409).json({ message: '이미 가입된 이메일입니다.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    users[email] = hashed;
    saveUsers(users);
    res.json({ message: '회원가입 성공!' });
  } catch (err) {
    console.error('[SIGNUP ERROR]', err.message);
    res.status(500).json({ message: '서버 에러: 회원가입 실패' });
  }
});

// ────── 로그인 라우터 ──────
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readUsers();

    if (!users[email]) {
      return res.status(404).json({ message: '등록되지 않은 이메일입니다.' });
    }

    const match = await bcrypt.compare(password, users[email]);
    if (!match) {
      return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
    }

    res.json({ message: '로그인 성공! 환영합니다.' });
  } catch (err) {
    console.error('[LOGIN ERROR]', err.message);
    res.status(500).json({ message: '서버 에러: 로그인 실패' });
  }
});

// ────── 유저 파일 관련 함수 ──────
function readUsers() {
  try {
    const file = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(file);
  } catch {
    return {};
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// ────── 서버 실행 ──────
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});

// ────── 글로벌 에러 핸들러 (선택사항) ──────
process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception]', err);
});
