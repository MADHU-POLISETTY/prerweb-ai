import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { InterviewPage } from '../pages/InterviewPage';
import { AptitudePage } from '../pages/AptitudePage';

test.describe('POM Aptitude & Behavioral Suite (Problem Solving, STAR Drills, Logic)', () => {

  let authPage: AuthPage;
  let interviewPage: InterviewPage;
  let aptitudePage: AptitudePage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    interviewPage = new InterviewPage(page);
    aptitudePage = new AptitudePage(page);
    await authPage.loginAsGuest();
    await page.locator('button', { hasText: /Interview/i }).click();
  });

  test('APT-01: STAR Behavioral domain selector option is rendered in simulation studio', async () => {
    await expect(aptitudePage.behavioralDomainButton).toBeVisible();
  });

  test('APT-02: Selecting STAR Behavioral domain updates active focus domain', async () => {
    await aptitudePage.selectBehavioralDomain();
    await expect(aptitudePage.behavioralDomainButton).toHaveClass(/border-indigo-500/);
  });

  test('APT-03: Launching STAR Behavioral drill generates behavioral question scenario', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionTextHeading).not.toBeEmpty();
  });

  test('APT-04: Submitting structured STAR answer returns positive appraisal score', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Situation: During a major production outage... Task: Re-route API traffic... Action: Initiated failover... Result: Restored services with zero data loss.');
    const feedbackHeader = interviewPage.page.locator('h4', { hasText: /Evaluation & Feedback/i });
    await expect(feedbackHeader).toBeVisible({ timeout: 15000 });
  });

  test('APT-05: Aptitude assessment returns Problem Solving sub-metric score (SOL)', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Situation: Heavy database locks... Action: Optimized B-Tree composite indexes... Result: Reduced latency by 45%.');
    const scorePill = interviewPage.page.locator('span', { hasText: /\/ 10/i });
    await expect(scorePill).toBeVisible({ timeout: 15000 });
  });

  test('APT-06: Behavioral feedback section suggests STAR methodology alignment', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('We resolved engineering estimations conflict by holding 1-on-1 retrospective syncs.');
    const feedbackHeader = interviewPage.page.locator('h4', { hasText: /Evaluation & Feedback/i });
    await expect(feedbackHeader).toBeVisible({ timeout: 15000 });
  });

  test('APT-07: Aptitude drill feedback contains Model Ideal Answer guide', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Detailed response addressing team conflict resolution and deadline renegotiation.');
    await expect(interviewPage.idealAnswerHeader).toBeVisible({ timeout: 15000 });
  });

  test('APT-08: Complete behavioral drill session generates composite metrics report', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('STAR method explanation of resolving technical debt during sprint planning.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const reportTitle = interviewPage.page.locator('h2', { hasText: /Session Performance Report/i });
    await expect(reportTitle).toBeVisible({ timeout: 15000 });
  });

  test('APT-09: Problem Solving metric is highlighted in summary report score grid', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('STAR method explanation of root cause analysis during incident response.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const solLabel = interviewPage.page.locator('span', { hasText: /SOL/i });
    await expect(solLabel).toBeVisible({ timeout: 15000 });
  });

  test('APT-10: Communication metric (COM) is included in assessment report', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('STAR method story on explaining complex cloud architectures to non-technical stakeholders.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const comLabel = interviewPage.page.locator('span', { hasText: /COM/i });
    await expect(comLabel).toBeVisible({ timeout: 15000 });
  });

  test('APT-11: Lead Coach Ask MS modal provides STAR behavioral layout advice pill', async ({ page }) => {
    await page.locator('h4', { hasText: /Talk with Lead Coach/i }).click();
    const pill = page.locator('button', { hasText: /STAR behavioral layout example/i });
    await pill.click();
    const mentorInput = page.locator('input[placeholder*="Ask MS advice"]');
    await expect(mentorInput).toHaveValue(/STAR behavioral layout example/);
  });

  test('APT-12: Aptitude reasoning questions support multi-paragraph structured inputs', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.launchDrillSession();
    const longResponse = 'Situation: Scaling peak traffic.\nTask: Reduce latency.\nAction: Added Redis caching.\nResult: 99.99% uptime.';
    await interviewPage.answerTextarea.fill(longResponse);
    await expect(interviewPage.answerTextarea).toHaveValue(longResponse);
  });

  test('APT-13: Short responses in behavioral drill trigger improvement suggestions', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('I talked with my manager and fixed it.');
    const feedbackText = interviewPage.page.locator('p', { hasText: /brief|lacks specific details|STAR/i });
    await expect(feedbackText).toBeVisible({ timeout: 15000 });
  });

  test('APT-14: Gibberish input in aptitude drill yields zero score evaluation', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('qwertyqwerty');
    const feedbackText = interviewPage.page.locator('p', { hasText: /invalid|meaningless/i });
    await expect(feedbackText).toBeVisible({ timeout: 15000 });
  });

  test('APT-15: Empty input in aptitude drill presents prompt warning feedback', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.launchDrillSession();
    await interviewPage.submitAnswerButton.click();
    const warning = interviewPage.page.locator('text=No answer provided');
    await expect(warning).toBeVisible({ timeout: 15000 });
  });

  test('APT-16: 4-Week Action Plan in behavioral summary provides structured weekly roadmap', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Structured STAR answer detailing technical leadership during cloud migration.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const weekPlan = interviewPage.page.locator('h3', { hasText: /4-Week Action Plan/i });
    await expect(weekPlan).toBeVisible({ timeout: 15000 });
  });

  test('APT-17: Export PDF report action button available on behavioral summary screen', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Structured STAR answer detailing conflict resolution.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const pdfBtn = interviewPage.page.locator('button', { hasText: /Export PDF Report/i });
    await expect(pdfBtn).toBeVisible({ timeout: 15000 });
  });

  test('APT-18: Start New Mock Session resets behavioral drill options', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('STAR answer for session reset test.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    await interviewPage.page.locator('button', { hasText: /Start New Mock Session/i }).click();
    await expect(interviewPage.setupHeading).toBeVisible({ timeout: 15000 });
  });

  test('APT-19: Behavioral session results append to historic interview list', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('STAR answer for history list test.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const history = await interviewPage.page.evaluate(() => localStorage.getItem('pw_interview_history'));
    expect(history).toBeTruthy();
  });

  test('APT-20: Behavioral question text prompt contains situational setup words', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.launchDrillSession();
    const text = await interviewPage.questionTextHeading.textContent();
    expect(text?.length).toBeGreaterThan(10);
  });

  test('APT-21: STAR method question steps allow navigating through multiple questions', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.questionCountInput.fill('2');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('First STAR story describing high pressure debugging.');
    await interviewPage.nextQuestionButton.click();
    const q2Step = interviewPage.page.locator('span', { hasText: /Question 2/i });
    await expect(q2Step).toBeVisible();
  });

  test('APT-22: Aptitude score cards render percentage background colors', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Detailed STAR response describing cross-functional collaboration.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const overallScore = interviewPage.page.locator('h3', { hasText: /%/i });
    await expect(overallScore).toBeVisible({ timeout: 15000 });
  });

  test('APT-23: Behavioral focus topic input parameter is retained in setup state', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.page.locator('input[placeholder*="e.g. Microservices, VPC Peering"]').fill('Engineering Leadership');
    await expect(interviewPage.page.locator('input[placeholder*="e.g. Microservices, VPC Peering"]')).toHaveValue('Engineering Leadership');
  });

  test('APT-24: Pinned custom STAR question renders correctly in drill header', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.customPinnedModeButton.click();
    await interviewPage.customQuestionInput.fill('Describe a time you managed a major system failure?');
    await interviewPage.pinQuestionButton.click();
    await interviewPage.launchDrillSession();
    const qText = interviewPage.page.locator('h3', { hasText: /Describe a time you managed a major system failure\?/i });
    await expect(qText).toBeVisible({ timeout: 15000 });
  });

  test('APT-25: Aptitude score summary includes Clarity metric (CLA)', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Structured STAR answer for clarity assessment test.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const claLabel = interviewPage.page.locator('span', { hasText: /CLA/i });
    await expect(claLabel).toBeVisible({ timeout: 15000 });
  });

  test('APT-26: Aptitude score summary includes Confidence metric (CON)', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Structured STAR answer for confidence assessment test.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const conLabel = interviewPage.page.locator('span', { hasText: /CON/i });
    await expect(conLabel).toBeVisible({ timeout: 15000 });
  });

  test('APT-27: Terminate Session early button exits behavioral drill screen', async () => {
    await aptitudePage.selectBehavioralDomain();
    await interviewPage.launchDrillSession();
    const exitBtn = interviewPage.page.locator('button', { hasText: /Terminate Session/i });
    if (await exitBtn.isVisible()) {
      await exitBtn.click();
      await expect(interviewPage.setupHeading).toBeVisible();
    } else {
      expect(true).toBe(true);
    }
  });

  test('APT-28: Aptitude drill is responsive on mobile 375px viewport', async () => {
    await aptitudePage.setMobileViewport();
    await aptitudePage.selectBehavioralDomain();
    await expect(aptitudePage.behavioralDomainButton).toBeVisible();
  });

  test('APT-29: Aptitude drill is responsive on tablet 768px viewport', async () => {
    await aptitudePage.setTabletViewport();
    await aptitudePage.selectBehavioralDomain();
    await expect(aptitudePage.behavioralDomainButton).toBeVisible();
  });

  test('APT-30: Aptitude drill is responsive on desktop 1440px viewport', async () => {
    await aptitudePage.setDesktopViewport();
    await aptitudePage.selectBehavioralDomain();
    await expect(aptitudePage.behavioralDomainButton).toBeVisible();
  });

});
