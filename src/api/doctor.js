import fetch from 'utils/fetch';

export function showMyPatient(data) {
  return fetch({
    url: '/api/doctor/showMyPatient',
    method: 'post',
    data
  });
}
export function setMyAddr(data) {
  return fetch({
    url: '/api/doctor/setMyAddr',
    method: 'post',
    data
  });
}

export function searchDurgByNmae
  (data) {
  return fetch({
    url: '/api/doctor/searchDurgByNmae',
    method: 'post',
    data
  });
}
export function searchDurgById
  (data) {
  return fetch({
    url: '/api/doctor/searchDurgById',
    method: 'post',
    data
  });
}
export function modify(data) {
  return fetch({
    url: '/api/doctor/modify',
    method: 'post',
    data
  });
}
export function makePrescription(data) {
  return fetch({
    url: '/api/doctor/makePrescription',
    method: 'post',
    data
  });
}
export function getMyAddr(data) {
  return fetch({
    url: '/api/doctor/getMyAddr',
    method: 'post',
    data
  });
}
export function showDoctorInfo(data) {
  return fetch({
    url: '/api/doctor/showDoctorInfo',
    method: 'post',
    data
  });
}
export function findAllDrug(data) {
  return fetch({
    url: '/api/doctor/findAllDrug',
    method: 'post',
    data
  });
}
export function getMessage(data) {
  return fetch({
    url: '/api/loginController/getMessage',
    method: 'post',
    data
  });
}

