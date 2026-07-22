import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthPage extends BasePage {
  readonly portalHeader: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly guestBypassButton: Locator;
  readonly forgotPasswordButton: Locator;
  readonly resetPasswordSubmitButton: Locator;
  readonly backToSignInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.portalHeader = page.locator('h3', { hasText: /Candidate Access Portal|Reset Password/i });
    this.fullNameInput = page.locator('input[placeholder*="James Manoj"]');
    this.emailInput = page.locator('input[placeholder*="developer@prepwise.ai"]');
    this.passwordInput = page.locator('input[placeholder*="madhu3378"]');
    this.submitButton = page.locator('button[type="submit"]', { hasText: /Launch App Workspace/i });
    this.guestBypassButton = page.locator('button', { hasText: /Skip authentication and enter as guest/i });
    this.forgotPasswordButton = page.locator('button', { hasText: /Forgot Password\?/i });
    this.resetPasswordSubmitButton = page.locator('button[type="submit"]', { hasText: /Dispatch Reset Link/i });
    this.backToSignInButton = page.locator('button', { hasText: /Back to Sign In/i });
  }

  async loginAsGuest() {
    await this.navigateTo('/');
    if (await this.guestBypassButton.isVisible()) {
      await this.guestBypassButton.click();
    }
  }

  async registerUser(name: string, email: string, pass: string) {
    await this.fullNameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
  }

  async triggerForgotPassword(email: string) {
    await this.forgotPasswordButton.click();
    if (email) {
      await this.emailInput.fill(email);
    }
    await this.resetPasswordSubmitButton.click();
  }
}
