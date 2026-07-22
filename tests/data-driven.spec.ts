import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';
import { InterviewPage } from '../pages/InterviewPage';
import { ResumePage } from '../pages/ResumePage';
import * as fs from 'fs';
import * as path from 'path';

const fixturePath = path.resolve('./fixtures/data-driven.json');
const dataDrivenJson = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));

test.describe('POM Data-Driven Testing Suite (JSON & CSV Datasets - 30 Tests)', () => {

  let authPage: AuthPage;
  let dashboardPage: DashboardPage;
  let interviewPage: InterviewPage;
  let resumePage: ResumePage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    interviewPage = new InterviewPage(page);
    resumePage = new ResumePage(page);
    await authPage.loginAsGuest();
  });

  // Iterating JSON Test Users dataset
  dataDrivenJson.testUsers.forEach((user: any, index: number) => {
    test(`DD-JSON-USER-${index + 1}: Data-driven user profile update for ${user.name}`, async ({ page }) => {
      await page.locator('button', { hasText: /Profile/i }).click();
      await page.locator('input[placeholder*="James Jane"]').fill(user.name);
      await page.locator('input[placeholder*="Cloud DevOps Architect"]').fill(user.goal);
      await page.locator('button', { hasText: /Save Profile Settings/i }).click();
      await page.locator('button', { hasText: /Home/i }).click();
      const nameHeading = page.locator('h2', { hasText: new RegExp(user.name, 'i') });
      await expect(nameHeading).toBeVisible();
    });
  });

  // Iterating JSON Interview Domains dataset
  dataDrivenJson.interviewDomains.forEach((item: any, index: number) => {
    test(`DD-JSON-DOMAIN-${index + 1}: Data-driven interview setup for ${item.domain}`, async ({ page }) => {
      await page.locator('button', { hasText: /Interview/i }).click();
      const domainBtn = page.locator('button', { hasText: new RegExp(`^${item.domain}$`, 'i') });
      await domainBtn.click();
      await page.locator('input[placeholder*="e.g. Lead DevOps Engineer"]').fill(item.role);
      await page.locator('input[placeholder*="e.g. Stripe, AWS"]').fill(item.company);
      await page.locator('button', { hasText: /Launch Interview Session/i }).click();
      const activeHeader = page.locator('span', { hasText: /LIVE INTERVIEW DRILL/i });
      await expect(activeHeader).toBeVisible({ timeout: 15000 });
    });
  });

  // Iterating JSON Resume Profiles dataset
  dataDrivenJson.resumeProfiles.forEach((profile: any, index: number) => {
    test(`DD-JSON-RESUME-${index + 1}: Data-driven ATS analysis for ${profile.name}`, async ({ page }) => {
      await page.locator('button', { hasText: /Resume/i }).click();
      await resumePage.runAnalysis(profile.text, profile.jobDesc);
      await expect(resumePage.scoreGauge).toBeVisible({ timeout: 15000 });
    });
  });

  // CSV-based Data-driven tests
  const csvRows = [
    { name: 'James Jane', email: 'guest.user@prepwise-sim.ai', role: 'Cloud DevOps Architect', domain: 'AWS' },
    { name: 'Sarah Connor', email: 'sarah@cyberdyne.io', role: 'Lead Security Engineer', domain: 'Cloud Security' },
    { name: 'Alex Rivera', email: 'alex@prepwise.io', role: 'Senior Site Reliability Engineer', domain: 'Kubernetes' }
  ];

  csvRows.forEach((row, index) => {
    test(`DD-CSV-ROW-${index + 1}: Data-driven CSV row execution for ${row.name}`, async ({ page }) => {
      await page.locator('button', { hasText: /Profile/i }).click();
      await page.locator('input[placeholder*="James Jane"]').fill(row.name);
      await page.locator('button', { hasText: /Save Profile Settings/i }).click();
      const storedName = await page.evaluate(() => localStorage.getItem('pw_user_name'));
      expect(storedName).toBe(row.name);
    });

    test(`DD-CSV-DOMAIN-${index + 1}: Data-driven CSV domain selection for ${row.domain}`, async ({ page }) => {
      await page.locator('button', { hasText: /Interview/i }).click();
      const btn = page.locator('button', { hasText: new RegExp(row.domain, 'i') }).first();
      await btn.click();
      await expect(btn).toHaveClass(/border-indigo-500/);
    });
  });

  // Additional data-driven edge cases
  test('DD-EDGE-01: Data-driven handling for minimal valid resume text', async () => {
    await resumePage.page.locator('button', { hasText: /Resume/i }).click();
    await resumePage.runAnalysis('DevOps AWS Docker Kubernetes.');
    await expect(resumePage.scoreGauge).toBeVisible({ timeout: 15000 });
  });

  test('DD-EDGE-02: Data-driven handling for multi-line job description', async () => {
    await resumePage.page.locator('button', { hasText: /Resume/i }).click();
    await resumePage.runAnalysis('DevOps Engineer resume.', 'Line 1: AWS\nLine 2: Terraform\nLine 3: Jenkins');
    await expect(resumePage.scoreGauge).toBeVisible({ timeout: 15000 });
  });

  test('DD-EDGE-03: Data-driven handling for custom topic prompt injection', async () => {
    await interviewPage.page.locator('button', { hasText: /Interview/i }).click();
    await interviewPage.page.locator('input[placeholder*="e.g. Microservices, VPC Peering"]').fill('Event-Driven Idempotency');
    await interviewPage.launchDrillSession();
    await expect(interviewPage.activeDrillHeader).toBeVisible({ timeout: 15000 });
  });

  test('DD-EDGE-04: Data-driven handling for max 10 questions count', async () => {
    await interviewPage.page.locator('button', { hasText: /Interview/i }).click();
    await interviewPage.questionCountInput.fill('10');
    await expect(interviewPage.questionCountInput).toHaveValue('10');
  });

  test('DD-EDGE-05: Data-driven handling for min 1 question count', async () => {
    await interviewPage.page.locator('button', { hasText: /Interview/i }).click();
    await interviewPage.questionCountInput.fill('1');
    await expect(interviewPage.questionCountInput).toHaveValue('1');
  });

  test('DD-EDGE-06: Data-driven verification of session performance report rating output', async () => {
    await interviewPage.page.locator('button', { hasText: /Interview/i }).click();
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Detailed data-driven test response covering container security.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const score = interviewPage.page.locator('h3', { hasText: /%/i });
    await expect(score).toBeVisible({ timeout: 15000 });
  });

  test('DD-EDGE-07: Data-driven verification of ATS suitability verdict text', async () => {
    await resumePage.page.locator('button', { hasText: /Resume/i }).click();
    await resumePage.runAnalysis('Full Stack Engineer resume text.');
    await expect(resumePage.verdictBadge).toBeVisible({ timeout: 15000 });
  });

  test('DD-EDGE-08: Data-driven verification of Lead Coach suggestion prompts', async () => {
    await dashboardPage.leadCoachBanner.click();
    const sug = dashboardPage.page.locator('button', { hasText: /Stripe webhooks alignment/i });
    await sug.click();
    await expect(dashboardPage.page.locator('input[placeholder*="Ask MS advice"]')).toHaveValue(/Stripe webhooks alignment/);
  });

  test('DD-EDGE-09: Data-driven verification of historic activity feed item score badge styling', async () => {
    const badge = dashboardPage.page.locator('span', { hasText: /88%/i });
    await expect(badge).toHaveClass(/bg-emerald-500\/10/);
  });

  test('DD-EDGE-10: Data-driven verification of streak count persistence after reload', async () => {
    await dashboardPage.page.reload();
    const streak = dashboardPage.streakCounter;
    await expect(streak).toBeVisible();
  });

  test('DD-EDGE-11: Data-driven verification of dark theme background styling', async () => {
    const bg = dashboardPage.page.locator('.bg-gradient-to-b').first();
    await expect(bg).toBeVisible();
  });

  test('DD-EDGE-12: Data-driven verification of LocalStorage pw_user_goal parameter', async () => {
    const goal = await dashboardPage.page.evaluate(() => localStorage.getItem('pw_user_goal'));
    expect(goal).toBeTruthy();
  });

  test('DD-EDGE-13: Data-driven verification of LocalStorage pw_interview_history array', async () => {
    const history = await dashboardPage.page.evaluate(() => localStorage.getItem('pw_interview_history'));
    expect(history).toBeTruthy();
  });

  test('DD-EDGE-14: Data-driven verification of Lead Coach MS avatar badge', async () => {
    await dashboardPage.leadCoachBanner.click();
    const avatar = dashboardPage.page.locator('div', { hasText: /MS/i }).first();
    await expect(avatar).toBeVisible();
  });

  test('DD-EDGE-15: Data-driven verification of bottom dock 5-icon structure', async () => {
    const icons = dashboardPage.page.locator('nav button svg');
    const count = await icons.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

});
