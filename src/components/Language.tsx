import { Observer } from 'mobx-vue';
import { Vue, Component, Prop } from 'vue-property-decorator';
import languageStore from '@/stores/language';

@Observer
@Component
class Language extends Vue {
  @Prop()
  resource!: string;

  @Prop()
  params?: any[];

  render() {
    const { resource, params } = this;
    const intlText = languageStore.getIntlText(resource, ...(params || []));
    return <span>{intlText}</span>;
  }
}

export default Language;
