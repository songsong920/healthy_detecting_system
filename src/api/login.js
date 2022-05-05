import fetch from 'utils/fetch';
// 登录示例（Post）
export function loginByPhone(data) {
  return fetch({
    url: '/api/serverApi/login',
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
