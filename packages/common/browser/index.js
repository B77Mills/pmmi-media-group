import ContactUsForm from './contact-us-form.vue';
import LeadersItem from '../leaders/browser/item.vue';

export default (Browser) => {
  // @todo this should be removed once contact us is moved to core.
  Browser.registerComponent('CommonContactUsForm', ContactUsForm);
  Browser.registerComponent('CommonLeadersItem', LeadersItem);
};
