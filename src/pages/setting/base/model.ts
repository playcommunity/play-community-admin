import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { fakeSaveBaseSetting, fakeGetBaseSetting } from './service';

export interface BaseSetting {
  name: string;
  url: string;
  title: string;
  logo: string;
  favorite: string;
  seoDescription: string;
  seoKeyword: string;
}

export interface ModelState {
  current: BaseSetting
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ModelState) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ModelState;
  effects: {
    saveBaseSetting: Effect;
    fetchBaseSetting: Effect;
  };
  reducers: {
    refreshBaseSetting: Reducer<ModelState>;
  };
}
const Model: ModelType = {
  namespace: 'systemSetting',

  state: {
    current: {
      name: '0',
      url: '0',
      title: '0',
      logo: '0',
      favorite: '0',
      seoDescription: '0',
      seoKeyword: '0',
    }
  },

  effects: {
    *saveBaseSetting({ payload }, { call }) {
      yield call(fakeSaveBaseSetting, payload);
      message.success('提交成功');
    },

    *fetchBaseSetting({ payload }, { call, put }) {
      const response = yield call(fakeGetBaseSetting, payload);
      yield put({
        type: 'refreshBaseSetting',
        payload: response,
      });
    },
  },

  reducers: {
    refreshBaseSetting(state, action) {
      console.log('refreshBaseSetting ...');
      console.dir(action);
      return {
        current: action.payload,
      };
    },
  },
};

export default Model;
