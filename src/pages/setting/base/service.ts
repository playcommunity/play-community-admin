import request from '@/utils/request';

export async function fakeSaveBaseSetting(params: any) {
  return request('/board/setting/base', {
    method: 'POST',
    data: params,
  });
}

export async function fakeGetBaseSetting(params: any) {
  console.log('fakeGetBaseSetting ...');
  return request('/board/setting/base', {
    method: 'GET',
    data: params,
  });
}
