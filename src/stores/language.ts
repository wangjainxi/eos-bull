import { observable, action } from 'mobx';

const STORAGE_LANGUAGE = '__language__';

class LanguageStore {
  @observable
  locale!: string;

  fallbackLocale = 'en-US';

  @action.bound
  changeLanguage(language: string) {
    this.locale = language;
    localStorage.setItem(STORAGE_LANGUAGE, language);
  }
}

export default new LanguageStore();
