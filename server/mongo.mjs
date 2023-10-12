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

usersSchema.methods.generateToken = function (cb) {
  // 'team6mongo' 는 key로서 보안관리 필요
  let token = jwt.sign(this._id.toHexString(), 'team6mongo');
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
