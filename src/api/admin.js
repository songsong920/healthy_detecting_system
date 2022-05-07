import fetch from 'utils/fetch';

export function arrangeDoctor(data) {
  return fetch({
    url: '/api/manager/arrangeDoctor',
    method: 'post',
    data
  });
}
export function findall(data) {
  return fetch({
    url: '/api/manager/findall',
    method: 'post',
    data
  });
}
export function findallDoctor(data) {
  return fetch({
    url: '/api/manager/findallDoctor',
    method: 'post',
    data
  });
}

export function operateDoctor(data) {
  return fetch({
    url: '/api/manager/operateDoctor',
    method: 'post',
    data
  });
} 
export function deleteDoctor(data) {
  return fetch({
    url: '/api/manager/deleteDoctor',
    method: 'post',
    data
  });
}
export function updateDoctor(data) {
  return fetch({
    url: '/api/manager/updateDoctor',
    method: 'post',
    data
  });
}
export function showRoaster(data) {
  return fetch({
    url: '/api/manager/showRoaster',
    method: 'post',
    data
  });
}

export function operatePatient(data) {
  return fetch({
    url: '/api/manager/operatePatient',
    method: 'post',
    data
  });
}
export function sendMessage(data) {
  return fetch({
    url: '/api/manager/sendMessage',
    method: 'post',
    data
  });
}
export function showPatientHealthStatus(data) {
  return fetch({
    url: '/api/manager/showPatientHealthStatus',
    method: 'post',
    data
  });
}
export function showAllHealthStatus(data) {
  return fetch({
    url: `/api/manager/showAllHealthStatus`,
    method: 'post',
    data
  });
}
export function findAllDept(data) {
  return fetch({
    url: `/api/manager/findAllDept`,
    method: 'post',
    data
  });
}
export function showManagerInfo(data) {
  return fetch({
    url: `/api/manager/showManagerInfo`,
    method: 'post',
    data
  });
}

export function modify(data) {
  return fetch({
    url: `/api/manager/modify`,
    method: 'post',
    data
  });
}
export function showWeeklyRoaster(data) {
  return fetch({
    url: `/api/manager/showWeeklyRoaster`,
    method: 'post',
    data
  });
}
