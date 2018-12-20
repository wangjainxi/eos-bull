import get from 'lodash/get';
import { observable, action } from 'mobx';

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
  private locale!: string;

  private fallbackLocale = 'en-US';

  get resource(): any {
    const { locale, fallbackLocale } = this;
    return get(languageMap, locale) || get(languageMap, fallbackLocale);
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
