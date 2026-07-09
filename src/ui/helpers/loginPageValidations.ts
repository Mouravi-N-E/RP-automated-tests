import { checkReferenceLink } from './simpleHelpers';
import { LoginPage } from '../pages/loginPage';

export class LoginPageValidations extends LoginPage {
    async validateSocialLinks() {
    const githubLink = this.githubLink;
    const facebookLink = this.facebookLink;
    // all urls is constants in that case, so we should move it to env variables or create them in constant.ts
    const socialLinks = [
      { 'link': githubLink, 'url': 'https://github.com/reportportal' },
      { 'link': facebookLink, 'url': 'https://www.facebook.com/ReportPortal.io' }
    ];
    for (const pair of socialLinks) {
      await checkReferenceLink(this.page, pair.link, pair.url, true);
    }
  }

  async validatePrivacyPolicyLink() {
    await checkReferenceLink(this.page, this.privacyPolicyLink, 'https://privacy.epam.com/core/interaction/showpolicy?type=PrivacyPolicy', true);
  }
}
