import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import loginAPI from './login';

const mock = new MockAdapter(axios);


// 登录
mock.onPost('/login/loginbyemail').reply(loginAPI.loginByEmail);


export default mock;