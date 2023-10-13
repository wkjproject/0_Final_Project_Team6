import mongoose from 'mongoose';
import { usersSchema } from './mongoSchema/usersSchema.mjs';
import { projectsSchema } from './mongoSchema/projectsSchema.mjs';
import { userProjectsSchema } from './mongoSchema/userProjectsSchema.mjs';
import { countProjectsSchema } from './mongoSchema/countProjectsSchema.mjs';
import jwt from 'jsonwebtoken';

const uri =
  'mongodb+srv://team6mongo:team6mongo@finalprojectteam6.psuivab.mongodb.net/Database'; //제일 뒤에 userData가 Database 이름

mongoose
  .connect(uri)
  .then(() => {
    console.log('MongoDB 연결 성공');
  })
  .catch((error) => {
    console.error('MongoDB 연결 실패: ', error);
  });

// JWT 토큰 생성
usersSchema.methods.generateToken = function (cb) {
  const expiration = '1m'; // 토큰 만료 시간 (예: 1분)
  const secretKey = 'team6mongo'; // 비밀 키 (보안을 위해 변경해야 함)
  // 사용자의 ID를 토큰 페이로드로 설정합니다.
  const payload = {
    userId: this._id, // 예: 사용자의 MongoDB _id
  };
  // 'team6mongo' 는 key로서 보안관리 필요
  let token = jwt.sign(payload, secretKey, {
    expiresIn: expiration,
  });
  this.token = token;
  // mongoDB에 토큰 저장하는부분
  this.save()
    .then((data) => {
      cb(null, data);
    })
    .catch((err) => {
      cb(err);
    });
};

export const users = mongoose.model('users', usersSchema);
export const projects = mongoose.model('projects', projectsSchema);
export const userProjects = mongoose.model('userProjects', userProjectsSchema);
export const countProjects = mongoose.model(
  'countProjects',
  countProjectsSchema
);

// 만료된 토큰 자동 삭제
function removeExpiredTokens() {
  const currentTime = new Date();

  users
    .deleteMany({ expiration: { $lte: currentTime } })
    .then((result) => {
      console.log(`${result.deleteCount}개 만료 토큰 삭제`);
    })
    .catch((err) => {
      console.error(err);
    });
}

/* setInterval(removeExpiredTokens, 36000);
 */
