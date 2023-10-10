import express from 'express';
import cors from 'cors';
import { users } from './mongo.mjs';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import KakaoStategy from 'passport-kakao';
import axios from 'axios';

const port = 5000;
const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//일반 로그인 부분
app.post('/login', async (req, res) => {
  try {
    // 서버의 userMail과 클라이언트의 userMail을 비교하는 부분
    const userFind = await users
      .findOne({ userMail: req.body.userMail })
      .exec();

    if (!userFind) {
      return res.json({
        loginSuccess: false,
        // 차후 보안을 위해 문구를 이메일 또는 비밀번호가 틀렸습니다. 라고 교체
        message: '해당되는 이메일이 없습니다.',
      });
    }
    // 이메일이 DB에 있을 경우 비밀번호 확인하는 부분
    // 차후 bcrypt를 사용해 bcrypt.compare로 비교할예정
    if (userFind.userPassword === req.body.userPassword) {
      // 해당 이메일 데이터에 토큰 생성
      await userFind.generateToken((err, data) => {
        if (err) return res.status(400).send(err);
        // token을 클라이언트로 보냄
        res.status(200).json({
          loginSuccess: true,
          message: '로그인 성공',
          token: userFind.token,
          userName: userFind.userName,
          _id: userFind._id,
        });
      });
    }
  } catch (e) {
    res.status(500).json({ loginSuccess: false, message: '서버 에러' });
  }
});

// 카카오 로그인 부분
app.post('/login/kakao', async (req, res) => {
  try {
    //req.body.userMail : 카카오아이디, req.body.token : 카카오토큰
    const userFind = await users
      .findOne({ userMail: req.body.userMail })
      .exec();
    if (!userFind) {
      const sendData = new users(req.body);
      sendData.save();
      /*       if (userFind) {
        const inputToken = { token: req.body.token };
        inputToken.save().then(() => {
          return res.status(200).json({
            kakaoLoginSuccess: true,
          });
        });
      } */
    }
  } catch (err) {
    console.log(err);
  }
});

// 네이버 로그인 부분

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(`${port}번 포트`);
});
