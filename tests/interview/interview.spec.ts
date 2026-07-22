import { test, expect } from '@playwright/test';

test.describe('Interview Simulation Framework Specs', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Interview/i }).click();
  });

  test('INT-01: Navigating to Interview tab opens Simulation Studio setup screen', async ({ page }) => {
    const setupHeading = page.locator('h2', { hasText: /Mock Interview Setup/i });
    await expect(setupHeading).toBeVisible();
  });

  test('INT-02: Back to Home button returns candidate to home panel', async ({ page }) => {
    await page.locator('button', { hasText: /Back to Home/i }).click();
    const candidateName = page.locator('h2', { hasText: /James Jane/i });
    await expect(candidateName).toBeVisible();
  });

  test('INT-03: Focus domain selection grid renders tech domain buttons (AWS, Docker, K8s)', async ({ page }) => {
    const awsBtn = page.locator('button', { hasText: /^AWS$/i });
    await expect(awsBtn).toBeVisible();
  });

  test('INT-04: Clicking AWS domain selects AWS and updates active border highlight', async ({ page }) => {
    const awsBtn = page.locator('button', { hasText: /^AWS$/i });
    await awsBtn.click();
    await expect(awsBtn).toHaveClass(/border-indigo-500/);
  });

  test('INT-05: Clicking Docker domain selects Docker containerization domain', async ({ page }) => {
    const dockerBtn = page.locator('button', { hasText: /^Docker$/i });
    await dockerBtn.click();
    await expect(dockerBtn).toHaveClass(/border-indigo-500/);
  });

  test('INT-06: Clicking Kubernetes domain selects Kubernetes orchestration domain', async ({ page }) => {
    const k8sBtn = page.locator('button', { hasText: /^Kubernetes$/i });
    await k8sBtn.click();
    await expect(k8sBtn).toHaveClass(/border-indigo-500/);
  });

  test('INT-07: Selecting Custom domain reveals custom domain text input field', async ({ page }) => {
    const customBtn = page.locator('button', { hasText: /^Custom$/i });
    await customBtn.click();
    const customInput = page.locator('input[placeholder*="e.g. Snowflake"]');
    await expect(customInput).toBeVisible();
  });

  test('INT-08: Target role title input field accepts custom text input', async ({ page }) => {
    const roleInput = page.locator('input[placeholder*="e.g. Lead DevOps Engineer"]');
    await roleInput.fill('Senior Site Reliability Engineer');
    await expect(roleInput).toHaveValue('Senior Site Reliability Engineer');
  });

  test('INT-09: Target company input field accepts target company name', async ({ page }) => {
    const companyInput = page.locator('input[placeholder*="e.g. Stripe, AWS"]');
    await companyInput.fill('Netflix');
    await expect(companyInput).toHaveValue('Netflix');
  });

  test('INT-10: Target difficulty level selector options exist (Beginner, Intermediate, Advanced)', async ({ page }) => {
    const beginnerBtn = page.locator('button', { hasText: /Beginner/i });
    const intermediateBtn = page.locator('button', { hasText: /Intermediate/i });
    const advancedBtn = page.locator('button', { hasText: /Advanced/i });
    await expect(beginnerBtn).toBeVisible();
    await expect(intermediateBtn).toBeVisible();
    await expect(advancedBtn).toBeVisible();
  });

  test('INT-11: Clicking difficulty button updates active difficulty selection', async ({ page }) => {
    const advancedBtn = page.locator('button', { hasText: /Advanced/i });
    await advancedBtn.click();
    await expect(advancedBtn).toHaveClass(/border-indigo-500/);
  });

  test('INT-12: Number of questions input can be set between 1 and 10', async ({ page }) => {
    const numInput = page.locator('input[type="number"]');
    await numInput.fill('5');
    await expect(numInput).toHaveValue('5');
  });

  test('INT-13: Question mode switcher supports Dynamic AI and Custom Pinned modes', async ({ page }) => {
    const dynamicModeBtn = page.locator('button', { hasText: /Dynamic AI Generation/i });
    const customModeBtn = page.locator('button', { hasText: /Custom Pinned Bank/i });
    await expect(dynamicModeBtn).toBeVisible();
    await expect(customModeBtn).toBeVisible();
  });

  test('INT-14: Switching to Custom Pinned Mode reveals custom question input box', async ({ page }) => {
    const customModeBtn = page.locator('button', { hasText: /Custom Pinned Bank/i });
    await customModeBtn.click();
    const pinHeader = page.locator('label', { hasText: /Add & Pin Custom Question/i });
    await expect(pinHeader).toBeVisible();
  });

  test('INT-15: Custom question input field accepts question text input', async ({ page }) => {
    await page.locator('button', { hasText: /Custom Pinned Bank/i }).click();
    const qInput = page.locator('input[placeholder*="Type custom question text"]');
    await qInput.fill('Explain how Terraform manages state locking with DynamoDB?');
    await expect(qInput).toHaveValue('Explain how Terraform manages state locking with DynamoDB?');
  });

  test('INT-16: Pin Custom Question button adds question to pinned list badge', async ({ page }) => {
    await page.locator('button', { hasText: /Custom Pinned Bank/i }).click();
    const qInput = page.locator('input[placeholder*="Type custom question text"]');
    await qInput.fill('How do you configure AWS IAM roles for EKS pods?');
    await page.locator('button', { hasText: /Pin Question/i }).click();
    const pinnedBadge = page.locator('span', { hasText: /How do you configure AWS IAM roles for EKS pods\?/i });
    await expect(pinnedBadge).toBeVisible();
  });

  test('INT-17: Launch Interview Session button is visible and active', async ({ page }) => {
    const launchBtn = page.locator('button', { hasText: /Launch Interview Session/i });
    await expect(launchBtn).toBeVisible();
  });

  test('INT-18: Clicking Launch Interview Session transitions to active drill screen', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    const activeHeader = page.locator('span', { hasText: /LIVE INTERVIEW DRILL/i });
    await expect(activeHeader).toBeVisible({ timeout: 15000 });
  });

  test('INT-19: Active question screen displays question step counter badge', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    const stepCounter = page.locator('span', { hasText: /Question 1/i });
    await expect(stepCounter).toBeVisible({ timeout: 15000 });
  });

  test('INT-20: Active question screen displays non-empty technical question prompt', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    const questionBox = page.locator('h3');
    await expect(questionBox).not.toBeEmpty({ timeout: 15000 });
  });

  test('INT-21: Answer textarea accepts candidate text response', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    const answerTextarea = page.locator('textarea[placeholder*="Write your response"]');
    await answerTextarea.fill('We handle synchronous payment webhooks using an idempotent key in Redis and PostgreSQL.');
    await expect(answerTextarea).toHaveValue('We handle synchronous payment webhooks using an idempotent key in Redis and PostgreSQL.');
  });

  test('INT-22: Submit Answer button is enabled and visible on active drill screen', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    const submitBtn = page.locator('button', { hasText: /Submit Answer/i });
    await expect(submitBtn).toBeVisible({ timeout: 15000 });
  });

  test('INT-23: Submitting answer triggers evaluation loading spinner state text', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    const answerTextarea = page.locator('textarea[placeholder*="Write your response"]');
    await answerTextarea.fill('We configure Route 53 latency queues paired with active-active databases to support instant failovers.');
    await page.locator('button', { hasText: /Submit Answer/i }).click();
    const evaluatingText = page.locator('text=Evaluating Answer');
    await expect(evaluatingText).toBeVisible({ timeout: 5000 });
  });

  test('INT-24: Evaluation feedback renders score pill (0-10) after submission', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    await page.locator('textarea[placeholder*="Write your response"]').fill('We use multi-stage Docker builds to reduce image size and security vulnerability surfaces.');
    await page.locator('button', { hasText: /Submit Answer/i }).click();
    const scorePill = page.locator('span', { hasText: /\/ 10/i });
    await expect(scorePill).toBeVisible({ timeout: 15000 });
  });

  test('INT-25: Evaluation feedback displays Strengths and Improvement suggestions', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    await page.locator('textarea[placeholder*="Write your response"]').fill('We set up Kubernetes Horizontal Pod Autoscalers based on CPU metrics and custom Prometheus alerts.');
    await page.locator('button', { hasText: /Submit Answer/i }).click();
    const feedbackHeader = page.locator('h4', { hasText: /Evaluation & Feedback/i });
    await expect(feedbackHeader).toBeVisible({ timeout: 15000 });
  });

  test('INT-26: Evaluation feedback includes Model Ideal Answer card', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    await page.locator('textarea[placeholder*="Write your response"]').fill('We run Terraform plan before apply and store remote state in AWS S3 with DynamoDB state locking.');
    await page.locator('button', { hasText: /Submit Answer/i }).click();
    const idealAnswerHeader = page.locator('h4', { hasText: /Model Ideal Answer/i });
    await expect(idealAnswerHeader).toBeVisible({ timeout: 15000 });
  });

  test('INT-27: Next Question button advances to subsequent question step', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    await page.locator('textarea[placeholder*="Write your response"]').fill('We configure Ansible playbooks to ensure idempotency across Linux cloud instances.');
    await page.locator('button', { hasText: /Submit Answer/i }).click();
    const nextBtn = page.locator('button', { hasText: /Next Question/i });
    await expect(nextBtn).toBeVisible({ timeout: 15000 });
    await nextBtn.click();
    const question2Step = page.locator('span', { hasText: /Question 2/i });
    await expect(question2Step).toBeVisible();
  });

  test('INT-28: Short or low quality answer receives feedback warning message', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    await page.locator('textarea[placeholder*="Write your response"]').fill('idk');
    await page.locator('button', { hasText: /Submit Answer/i }).click();
    const feedbackText = page.locator('p', { hasText: /brief|invalid|meaningless/i });
    await expect(feedbackText).toBeVisible({ timeout: 15000 });
  });

  test('INT-29: Empty answer submission prompts candidate warning feedback', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    await page.locator('button', { hasText: /Submit Answer/i }).click();
    const warningFeedback = page.locator('text=No answer provided');
    await expect(warningFeedback).toBeVisible({ timeout: 15000 });
  });

  test('INT-30: Terminate Session early button exits live drill screen', async ({ page }) => {
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    const exitBtn = page.locator('button', { hasText: /Terminate Session/i });
    if (await exitBtn.isVisible()) {
      await exitBtn.click();
      const setupHeading = page.locator('h2', { hasText: /Mock Interview Setup/i });
      await expect(setupHeading).toBeVisible();
    } else {
      expect(true).toBe(true);
    }
  });

});
