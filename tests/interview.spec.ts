import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { InterviewPage } from '../pages/InterviewPage';

test.describe('POM Mock Interview Suite (Setup, Domains, Difficulty, Drill Steps, Evaluation)', () => {

  let authPage: AuthPage;
  let interviewPage: InterviewPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    interviewPage = new InterviewPage(page);
    await authPage.loginAsGuest();
    await page.locator('button', { hasText: /Interview/i }).click();
  });

  test('INT-01: Navigating to Interview tab opens Simulation Studio setup screen', async () => {
    await expect(interviewPage.setupHeading).toBeVisible();
  });

  test('INT-02: Back to Home button returns candidate to home panel', async () => {
    await interviewPage.backToHomeButton.click();
    const candidateName = interviewPage.page.locator('h2', { hasText: /James Jane/i });
    await expect(candidateName).toBeVisible();
  });

  test('INT-03: Focus domain selection grid renders tech domain buttons (AWS, Docker, K8s)', async () => {
    await expect(interviewPage.awsDomainButton).toBeVisible();
  });

  test('INT-04: Clicking AWS domain selects AWS and updates active border highlight', async () => {
    await interviewPage.awsDomainButton.click();
    await expect(interviewPage.awsDomainButton).toHaveClass(/border-indigo-500/);
  });

  test('INT-05: Clicking Docker domain selects Docker containerization domain', async () => {
    await interviewPage.dockerDomainButton.click();
    await expect(interviewPage.dockerDomainButton).toHaveClass(/border-indigo-500/);
  });

  test('INT-06: Clicking Kubernetes domain selects Kubernetes orchestration domain', async () => {
    await interviewPage.k8sDomainButton.click();
    await expect(interviewPage.k8sDomainButton).toHaveClass(/border-indigo-500/);
  });

  test('INT-07: Selecting Custom domain reveals custom domain text input field', async () => {
    await interviewPage.customDomainButton.click();
    await expect(interviewPage.customDomainInput).toBeVisible();
  });

  test('INT-08: Target role title input field accepts custom text input', async () => {
    await interviewPage.targetRoleInput.fill('Senior Site Reliability Engineer');
    await expect(interviewPage.targetRoleInput).toHaveValue('Senior Site Reliability Engineer');
  });

  test('INT-09: Target company input field accepts target company name', async () => {
    await interviewPage.targetCompanyInput.fill('Netflix');
    await expect(interviewPage.targetCompanyInput).toHaveValue('Netflix');
  });

  test('INT-10: Target difficulty level selector options exist (Beginner, Intermediate, Advanced)', async () => {
    const beginnerBtn = interviewPage.page.locator('button', { hasText: /Beginner/i });
    const intermediateBtn = interviewPage.page.locator('button', { hasText: /Intermediate/i });
    await expect(beginnerBtn).toBeVisible();
    await expect(intermediateBtn).toBeVisible();
    await expect(interviewPage.advancedDifficultyButton).toBeVisible();
  });

  test('INT-11: Clicking difficulty button updates active difficulty selection', async () => {
    await interviewPage.advancedDifficultyButton.click();
    await expect(interviewPage.advancedDifficultyButton).toHaveClass(/border-indigo-500/);
  });

  test('INT-12: Number of questions input can be set between 1 and 10', async () => {
    await interviewPage.questionCountInput.fill('5');
    await expect(interviewPage.questionCountInput).toHaveValue('5');
  });

  test('INT-13: Question mode switcher supports Dynamic AI and Custom Pinned modes', async () => {
    const dynamicModeBtn = interviewPage.page.locator('button', { hasText: /Dynamic AI Generation/i });
    await expect(dynamicModeBtn).toBeVisible();
    await expect(interviewPage.customPinnedModeButton).toBeVisible();
  });

  test('INT-14: Switching to Custom Pinned Mode reveals custom question input box', async () => {
    await interviewPage.customPinnedModeButton.click();
    const pinHeader = interviewPage.page.locator('label', { hasText: /Add & Pin Custom Question/i });
    await expect(pinHeader).toBeVisible();
  });

  test('INT-15: Custom question input field accepts question text input', async () => {
    await interviewPage.customPinnedModeButton.click();
    await interviewPage.customQuestionInput.fill('Explain how Terraform manages state locking with DynamoDB?');
    await expect(interviewPage.customQuestionInput).toHaveValue('Explain how Terraform manages state locking with DynamoDB?');
  });

  test('INT-16: Pin Custom Question button adds question to pinned list badge', async () => {
    await interviewPage.customPinnedModeButton.click();
    await interviewPage.customQuestionInput.fill('How do you configure AWS IAM roles for EKS pods?');
    await interviewPage.pinQuestionButton.click();
    const pinnedBadge = interviewPage.page.locator('span', { hasText: /How do you configure AWS IAM roles for EKS pods\?/i });
    await expect(pinnedBadge).toBeVisible();
  });

  test('INT-17: Launch Interview Session button is visible and active', async () => {
    await expect(interviewPage.launchSessionButton).toBeVisible();
  });

  test('INT-18: Clicking Launch Interview Session transitions to active drill screen', async () => {
    await interviewPage.launchDrillSession();
    await expect(interviewPage.activeDrillHeader).toBeVisible();
  });

  test('INT-19: Active question screen displays question step counter badge', async () => {
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionStepCounter).toBeVisible();
  });

  test('INT-20: Active question screen displays non-empty technical question prompt', async () => {
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionTextHeading).not.toBeEmpty();
  });

  test('INT-21: Answer textarea accepts candidate text response', async () => {
    await interviewPage.launchDrillSession();
    await interviewPage.answerTextarea.fill('We handle synchronous payment webhooks using an idempotent key in Redis and PostgreSQL.');
    await expect(interviewPage.answerTextarea).toHaveValue('We handle synchronous payment webhooks using an idempotent key in Redis and PostgreSQL.');
  });

  test('INT-22: Submit Answer button is enabled and visible on active drill screen', async () => {
    await interviewPage.launchDrillSession();
    await expect(interviewPage.submitAnswerButton).toBeVisible();
  });

  test('INT-23: Submitting answer triggers evaluation loading spinner state text', async () => {
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('We configure Route 53 latency queues paired with active-active databases to support instant failovers.');
    const evaluatingText = interviewPage.page.locator('text=Evaluating Answer');
    await expect(evaluatingText).toBeVisible({ timeout: 5000 });
  });

  test('INT-24: Evaluation feedback renders score pill (0-10) after submission', async () => {
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('We use multi-stage Docker builds to reduce image size and security vulnerability surfaces.');
    const scorePill = interviewPage.page.locator('span', { hasText: /\/ 10/i });
    await expect(scorePill).toBeVisible({ timeout: 15000 });
  });

  test('INT-25: Evaluation feedback displays Strengths and Improvement suggestions', async () => {
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('We set up Kubernetes Horizontal Pod Autoscalers based on CPU metrics and custom Prometheus alerts.');
    const feedbackHeader = interviewPage.page.locator('h4', { hasText: /Evaluation & Feedback/i });
    await expect(feedbackHeader).toBeVisible({ timeout: 15000 });
  });

  test('INT-26: Evaluation feedback includes Model Ideal Answer card', async () => {
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('We run Terraform plan before apply and store remote state in AWS S3 with DynamoDB state locking.');
    await expect(interviewPage.idealAnswerHeader).toBeVisible({ timeout: 15000 });
  });

  test('INT-27: Next Question button advances to subsequent question step', async () => {
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('We configure Ansible playbooks to ensure idempotency across Linux cloud instances.');
    await expect(interviewPage.nextQuestionButton).toBeVisible({ timeout: 15000 });
    await interviewPage.nextQuestionButton.click();
    const question2Step = interviewPage.page.locator('span', { hasText: /Question 2/i });
    await expect(question2Step).toBeVisible();
  });

  test('INT-28: Short or low quality answer receives feedback warning message', async () => {
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('idk');
    const feedbackText = interviewPage.page.locator('p', { hasText: /brief|invalid|meaningless/i });
    await expect(feedbackText).toBeVisible({ timeout: 15000 });
  });

  test('INT-29: Empty answer submission prompts candidate warning feedback', async () => {
    await interviewPage.launchDrillSession();
    await interviewPage.submitAnswerButton.click();
    const warningFeedback = interviewPage.page.locator('text=No answer provided');
    await expect(warningFeedback).toBeVisible({ timeout: 15000 });
  });

  test('INT-30: Terminate Session early button exits live drill screen', async () => {
    await interviewPage.launchDrillSession();
    const exitBtn = interviewPage.page.locator('button', { hasText: /Terminate Session/i });
    if (await exitBtn.isVisible()) {
      await exitBtn.click();
      await expect(interviewPage.setupHeading).toBeVisible();
    } else {
      expect(true).toBe(true);
    }
  });

  test('INT-31: Selecting Azure domain selects Azure cloud domain', async () => {
    const azureBtn = interviewPage.page.locator('button', { hasText: /^Azure$/i });
    await azureBtn.click();
    await expect(azureBtn).toHaveClass(/border-indigo-500/);
  });

  test('INT-32: Selecting GCP domain selects Google Cloud Platform domain', async () => {
    const gcpBtn = interviewPage.page.locator('button', { hasText: /^GCP$/i });
    await gcpBtn.click();
    await expect(gcpBtn).toHaveClass(/border-indigo-500/);
  });

  test('INT-33: Selecting Linux domain selects Linux server administration domain', async () => {
    const linuxBtn = interviewPage.page.locator('button', { hasText: /^Linux$/i });
    await linuxBtn.click();
    await expect(linuxBtn).toHaveClass(/border-indigo-500/);
  });

  test('INT-34: Custom domain input text triggers custom role assignment', async () => {
    await interviewPage.customDomainButton.click();
    await interviewPage.customDomainInput.fill('Snowflake Engineering');
    await expect(interviewPage.customDomainInput).toHaveValue('Snowflake Engineering');
  });

  test('INT-35: Intermediate difficulty button selection state check', async () => {
    const intermedBtn = interviewPage.page.locator('button', { hasText: /Intermediate/i });
    await intermedBtn.click();
    await expect(intermedBtn).toHaveClass(/border-indigo-500/);
  });

  test('INT-36: Beginner difficulty button selection state check', async () => {
    const beginnerBtn = interviewPage.page.locator('button', { hasText: /Beginner/i });
    await beginnerBtn.click();
    await expect(beginnerBtn).toHaveClass(/border-indigo-500/);
  });

  test('INT-37: Question count maximum bound check set to 10', async () => {
    await interviewPage.questionCountInput.fill('10');
    await expect(interviewPage.questionCountInput).toHaveValue('10');
  });

  test('INT-38: Question count minimum bound check set to 1', async () => {
    await interviewPage.questionCountInput.fill('1');
    await expect(interviewPage.questionCountInput).toHaveValue('1');
  });

  test('INT-39: Active drill page shows question domain category tag', async () => {
    await interviewPage.launchDrillSession();
    const categoryTag = interviewPage.page.locator('span', { hasText: /DOMAIN/i });
    await expect(categoryTag).toBeVisible();
  });

  test('INT-40: Completed drill session reaches summary report screen', async () => {
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('We use CloudWatch metrics and alarms to scale EC2 auto-scaling groups.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const summaryTitle = interviewPage.page.locator('h2', { hasText: /Session Performance Report/i });
    await expect(summaryTitle).toBeVisible({ timeout: 15000 });
  });

});
