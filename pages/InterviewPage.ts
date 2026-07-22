import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InterviewPage extends BasePage {
  readonly setupHeading: Locator;
  readonly backToHomeButton: Locator;
  readonly awsDomainButton: Locator;
  readonly dockerDomainButton: Locator;
  readonly k8sDomainButton: Locator;
  readonly customDomainButton: Locator;
  readonly customDomainInput: Locator;
  readonly targetRoleInput: Locator;
  readonly targetCompanyInput: Locator;
  readonly advancedDifficultyButton: Locator;
  readonly questionCountInput: Locator;
  readonly customPinnedModeButton: Locator;
  readonly customQuestionInput: Locator;
  readonly pinQuestionButton: Locator;
  readonly launchSessionButton: Locator;
  readonly activeDrillHeader: Locator;
  readonly questionStepCounter: Locator;
  readonly questionTextHeading: Locator;
  readonly answerTextarea: Locator;
  readonly submitAnswerButton: Locator;
  readonly nextQuestionButton: Locator;
  readonly idealAnswerHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.setupHeading = page.locator('h2', { hasText: /Mock Interview Setup/i });
    this.backToHomeButton = page.locator('button', { hasText: /Back to Home/i });
    this.awsDomainButton = page.locator('button', { hasText: /^AWS$/i });
    this.dockerDomainButton = page.locator('button', { hasText: /^Docker$/i });
    this.k8sDomainButton = page.locator('button', { hasText: /^Kubernetes$/i });
    this.customDomainButton = page.locator('button', { hasText: /^Custom$/i });
    this.customDomainInput = page.locator('input[placeholder*="e.g. Snowflake"]');
    this.targetRoleInput = page.locator('input[placeholder*="e.g. Lead DevOps Engineer"]');
    this.targetCompanyInput = page.locator('input[placeholder*="e.g. Stripe, AWS"]');
    this.advancedDifficultyButton = page.locator('button', { hasText: /Advanced/i });
    this.questionCountInput = page.locator('input[type="number"]');
    this.customPinnedModeButton = page.locator('button', { hasText: /Custom Pinned Bank/i });
    this.customQuestionInput = page.locator('input[placeholder*="Type custom question text"]');
    this.pinQuestionButton = page.locator('button', { hasText: /Pin Question/i });
    this.launchSessionButton = page.locator('button', { hasText: /Launch Interview Session/i });
    this.activeDrillHeader = page.locator('span', { hasText: /LIVE INTERVIEW DRILL/i });
    this.questionStepCounter = page.locator('span', { hasText: /Question/i });
    this.questionTextHeading = page.locator('h3');
    this.answerTextarea = page.locator('textarea[placeholder*="Write your response"]');
    this.submitAnswerButton = page.locator('button', { hasText: /Submit Answer/i });
    this.nextQuestionButton = page.locator('button', { hasText: /Next Question/i });
    this.idealAnswerHeader = page.locator('h4', { hasText: /Model Ideal Answer/i });
  }

  async launchDrillSession() {
    await this.launchSessionButton.click();
    await expect(this.activeDrillHeader).toBeVisible({ timeout: 15000 });
  }

  async submitResponse(text: string) {
    await this.answerTextarea.fill(text);
    await this.submitAnswerButton.click();
  }
}
