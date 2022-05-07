import fetch from 'utils/fetch';

export function regist(data) {
  return fetch({
    url: `/api/Patient/regist?${data}`,
    method: 'post',
  });
}
export function addMyDoctor(data) {
  return fetch({
    url: '/api/Patient/addMyDoctor',
    method: 'post',
    data
  });
}
export function alluser() {
  return fetch({
    url: '/api/Patient/alluser',
    method: 'get',
  });
}

export function daily_punchIn(data) {
  return fetch({
    url: '/api/Patient/daily_punchIn',
    method: 'post',
    data
  });
}
export function deleteMyDoctor(data) {
  return fetch({
    url: '/api/Patient/deleteMyDoctor',
    method: 'post',
    data
  });
}
export function deleteMyPrescriptionList(data) {
  return fetch({
    url: '/api/Patient/deleteMyPrescriptionList',
    method: 'post',
    data
  });
}
export function modify(data) {
  return fetch({
    url: '/api/Patient/modify',
    method: 'post',
    data
  });
}
export function searchDoctorByDept(data) {
  return fetch({
    url: '/api/Patient/searchDoctorByDept',
    method: 'post',
    data
  });
}
export function searchDoctorByName(data) {
  return fetch({
    url: '/api/Patient/searchDoctorByName',
    method: 'post',
    data
  });
}
export function searchDoctorBySex(data) {
  return fetch({
    url: '/api/Patient/searchDoctorBySex',
    method: 'post',
    data
  });
}
export function showInfo(data) {
  return fetch({
    url: '/api/Patient/showInfo',
    method: 'post',
    data
  });
}
export function showMyDoctor(data) {
  return fetch({
    url: '/api/Patient/showMyDoctor',
    method: 'post',
    data
  });
}
export function showMyPrescription(data) {
  return fetch({
    url: '/api/Patient/showMyPrescription',
    method: 'post',
    data
  });
}
export function findAllReport(data) {
  return fetch({
    url: '/api/Patient/findAllReport',
    method: 'post',
    data
  });
}
export function searchDurgByNmae(data) {
  return fetch({
    url: '/api/Patient/searchDurgByNmae',
    method: 'post',
    data
  });
}

