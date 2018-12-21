import get from 'lodash/get';
import { observable, action, computed } from 'mobx';

import esUS from '@/locales/en';
import zhCN from '@/locales/zh';
import { format } from '@/utils/common';

const languageMap = {
  'en-US': esUS,
  'zh-CN': zhCN,
};
const STORAGE_LANGUAGE = '__language__';

class LanguageStore {
  @observable
  locale = localStorage.getItem(STORAGE_LANGUAGE);

  locales = [
    {
      label: '简体中文',
      mark: 'zh-CN',
    },
    {
      label: 'English',
      mark: 'en-US',
    },
  ];

  private fallbackLocale = 'en-US';

  @computed
  get currentLocale() {
    return this.locale || this.fallbackLocale;
  }

  @computed
  get resource(): any {
    return get(languageMap, this.currentLocale);
  }

  @action.bound
  changeLanguage(language: string) {
    this.locale = language;
    localStorage.setItem(STORAGE_LANGUAGE, language);
  }

  getIntlText(key: string, ...params: any[]) {
    const intlText = get(this.resource, key) || '';
    return params.length > 0 ? format(intlText, ...params) : intlText;
  }
}

export default new LanguageStore();
