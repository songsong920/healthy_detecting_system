import fetch from 'utils/fetch';
// 登录示例（Post）
export function login(data) {
  return fetch({
    url: `/api/loginController/login?${data}`,
    method: 'post',
  });
}
export function login1(data) {
  return fetch({
    url: '/api/loginController/login1',
    method: 'post',
    data
  });
}

// 获取用户信息示例（Get请求）
export function getInfo(token) {
  return fetch({
    url: `/api/admin/user/front/info`,
    method: 'get',
    params: { token }
  });
}
