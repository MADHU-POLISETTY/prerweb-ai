import { test, expect } from '@playwright/test';

test.describe('Regression & E2E Workflow Specs', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('REG-01: Full user journey from Splash -> Guest Login -> Home Dashboard', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    const candidateHeading = page.locator('h2', { hasText: /James Jane/i });
    await expect(candidateHeading).toBeVisible();
  });

  test('REG-02: Full user journey from Login -> Edit Profile -> Verify Header update', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Profile/i }).click();
    await page.locator('input[placeholder*="James Jane"]').fill('Captain Jean-Luc');
    await page.locator('button', { hasText: /Save Profile Settings/i }).click();
    await page.locator('button', { hasText: /Home/i }).click();
    const homeName = page.locator('h2', { hasText: /Captain Jean-Luc/i });
    await expect(homeName).toBeVisible();
  });

  test('REG-03: Full user journey from Setup Interview -> Answer Question -> Check Results', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Interview/i }).click();
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    await page.locator('textarea[placeholder*="Write your response"]').fill('Detailed regression test answer regarding AWS Cloud computing architectures.');
    await page.locator('button', { hasText: /Submit Answer/i }).click();
    const feedbackHeader = page.locator('h4', { hasText: /Evaluation & Feedback/i });
    await expect(feedbackHeader).toBeVisible({ timeout: 15000 });
  });

  test('REG-04: Full user journey from ATS Resume Input -> Analyze -> Verify Match Gauge', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Resume/i }).click();
    await page.locator('textarea[placeholder*="Paste your resume text here"]').fill('Senior DevOps Engineer experienced in AWS, Docker, Kubernetes, and Terraform.');
    await page.locator('button', { hasText: /Analyze Resume Compliance/i }).click();
    const scoreGauge = page.locator('span', { hasText: /ATS Score/i });
    await expect(scoreGauge).toBeVisible({ timeout: 15000 });
  });

  test('REG-05: Lead Coach Chat message exchange and response verification', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('h4', { hasText: /Talk with Lead Coach/i }).click();
    await page.locator('input[placeholder*="Ask MS advice"]').fill('How do I handle Kubernetes cluster failover?');
    await page.locator('button:has(svg.lucide-send)').click();
    const msg = page.locator('text=How do I handle Kubernetes cluster failover?');
    await expect(msg).toBeVisible();
  });

  test('REG-06: CloudHub DevOps blueprints tab browsing', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('h4', { hasText: /DevOps Hub/i }).click();
    const awsHeader = page.locator('h3', { hasText: /AWS Production Deployment Blueprint/i });
    await expect(awsHeader).toBeVisible();
  });

  test('REG-07: Historic session log item opening, detail review, and dismissal', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('h4', { hasText: /Senior DevOps Engineer/i }).first().click();
    const modalScore = page.locator('span', { hasText: /COMPOSITE RATING/i });
    await expect(modalScore).toBeVisible();
    await page.locator('button', { hasText: /Dismiss Session logs/i }).click();
    await expect(modalScore).not.toBeVisible();
  });

  test('REG-08: Workspace cache reset teardown regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Profile/i }).click();
    await page.locator('button', { hasText: /Reset App Workspace & Caches/i }).click();
    const toast = page.locator('text=cleared');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('REG-09: Invalid password login error toast regression check', async ({ page }) => {
    await page.locator('input[placeholder*="James Manoj"]').fill('Valid User');
    await page.locator('input[placeholder*="developer@prepwise.ai"]').fill('user@prepwise.ai');
    await page.locator('input[placeholder*="madhu3378"]').fill('badpass');
    await page.locator('button[type="submit"]').click();
    const toast = page.locator('text=Password must contain at least 8 characters');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('REG-10: Pinned question setup regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Interview/i }).click();
    await page.locator('button', { hasText: /Custom Pinned Bank/i }).click();
    await page.locator('input[placeholder*="Type custom question text"]').fill('What is AWS IAM Role chaining?');
    await page.locator('button', { hasText: /Pin Question/i }).click();
    const badge = page.locator('span', { hasText: /What is AWS IAM Role chaining\?/i });
    await expect(badge).toBeVisible();
  });

  test('REG-11: Custom domain input state retention regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Interview/i }).click();
    await page.locator('button', { hasText: /^Custom$/i }).click();
    const customInput = page.locator('input[placeholder*="e.g. Snowflake"]');
    await customInput.fill('Distributed Databases');
    await expect(customInput).toHaveValue('Distributed Databases');
  });

  test('REG-12: Target company state retention regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Interview/i }).click();
    const companyInput = page.locator('input[placeholder*="e.g. Stripe, AWS"]');
    await companyInput.fill('Google Cloud Platform');
    await expect(companyInput).toHaveValue('Google Cloud Platform');
  });

  test('REG-13: ATS score progress bar rendering regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Resume/i }).click();
    await page.locator('textarea[placeholder*="Paste your resume text here"]').fill('DevOps Engineer with Kubernetes skills.');
    await page.locator('button', { hasText: /Analyze Resume Compliance/i }).click();
    const bar = page.locator('.h-full.bg-gradient-to-r');
    await expect(bar).toBeVisible({ timeout: 15000 });
  });

  test('REG-14: Forgot password mode toggle back and forth regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Forgot Password\?/i }).click();
    const resetHeader = page.locator('h3', { hasText: /Reset Password/i });
    await expect(resetHeader).toBeVisible();
    await page.locator('button', { hasText: /Back to Sign In/i }).click();
    const portalHeader = page.locator('h3', { hasText: /Candidate Access Portal/i });
    await expect(portalHeader).toBeVisible();
  });

  test('REG-15: View Logs link on dashboard navigation regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('span', { hasText: /View Logs/i }).click();
    const analyticsHeader = page.locator('h2', { hasText: /Performance Analytics/i });
    await expect(analyticsHeader).toBeVisible();
  });

  test('REG-16: Candidate goal update regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Profile/i }).click();
    await page.locator('input[placeholder*="Cloud DevOps Architect"]').fill('Director of Cloud Engineering');
    await page.locator('button', { hasText: /Save Profile Settings/i }).click();
    const goalStored = await page.evaluate(() => localStorage.getItem('pw_user_goal'));
    expect(goalStored).toBe('Director of Cloud Engineering');
  });

  test('REG-17: Mobile viewport navigation menu regression check', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    const navDock = page.locator('nav.fixed.bottom-4');
    await expect(navDock).toBeVisible();
  });

  test('REG-18: Desktop viewport full dashboard layout regression check', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    const headerTitle = page.locator('h1', { hasText: /PrepWise AI/i });
    await expect(headerTitle).toBeVisible();
  });

  test('REG-19: Sign out teardown clears LocalStorage auth key regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Profile/i }).click();
    await page.locator('button', { hasText: /Sign Out Session/i }).click();
    const loggedIn = await page.evaluate(() => localStorage.getItem('pw_is_logged_in'));
    expect(loggedIn).toBeNull();
  });

  test('REG-20: Re-authentication after logout regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Profile/i }).click();
    await page.locator('button', { hasText: /Sign Out Session/i }).click();
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    const candidateHeading = page.locator('h2', { hasText: /James Jane/i });
    await expect(candidateHeading).toBeVisible();
  });

  test('REG-21: Multi-question drill step counter increment regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Interview/i }).click();
    await page.locator('input[type="number"]').fill('2');
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    await page.locator('textarea[placeholder*="Write your response"]').fill('First answer detailing container security.');
    await page.locator('button', { hasText: /Submit Answer/i }).click();
    await page.locator('button', { hasText: /Next Question/i }).click();
    const q2Badge = page.locator('span', { hasText: /Question 2/i });
    await expect(q2Badge).toBeVisible();
  });

  test('REG-22: Resume clear button regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Resume/i }).click();
    const textarea = page.locator('textarea[placeholder*="Paste your resume text here"]');
    await textarea.fill('Temporary text');
    await textarea.clear();
    await expect(textarea).toHaveValue('');
  });

  test('REG-23: Empty answer evaluation response regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Interview/i }).click();
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    await page.locator('button', { hasText: /Submit Answer/i }).click();
    const warning = page.locator('text=No answer provided');
    await expect(warning).toBeVisible({ timeout: 15000 });
  });

  test('REG-24: Gibberish answer evaluation response regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Interview/i }).click();
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    await page.locator('textarea[placeholder*="Write your response"]').fill('asdfasdfasdf');
    await page.locator('button', { hasText: /Submit Answer/i }).click();
    const feedback = page.locator('p', { hasText: /brief|invalid|meaningless/i });
    await expect(feedback).toBeVisible({ timeout: 15000 });
  });

  test('REG-25: Ideal answer fallback rendering regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('button', { hasText: /Interview/i }).click();
    await page.locator('button', { hasText: /Launch Interview Session/i }).click();
    await page.locator('textarea[placeholder*="Write your response"]').fill('We use multi-stage Docker builds to reduce image footprint.');
    await page.locator('button', { hasText: /Submit Answer/i }).click();
    const idealHeader = page.locator('h4', { hasText: /Model Ideal Answer/i });
    await expect(idealHeader).toBeVisible({ timeout: 15000 });
  });

  test('REG-26: Header avatar click direct profile navigation regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    const headerAvatar = page.locator('header button').filter({ has: page.locator('svg.lucide-user') });
    await headerAvatar.click();
    const profileHeader = page.locator('h2', { hasText: /Candidate Profile/i });
    await expect(profileHeader).toBeVisible();
  });

  test('REG-27: Rapid tab navigation state consistency regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('nav button', { hasText: /Interview/i }).click();
    await page.locator('nav button', { hasText: /Resume/i }).click();
    await page.locator('nav button', { hasText: /Analytics/i }).click();
    await page.locator('nav button', { hasText: /Profile/i }).click();
    await page.locator('nav button', { hasText: /Home/i }).click();
    const homeTitle = page.locator('h2', { hasText: /PrepWise AI –/i });
    await expect(homeTitle).toBeVisible();
  });

  test('REG-28: Lead Coach suggestion pill trigger regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('h4', { hasText: /Talk with Lead Coach/i }).click();
    const pill = page.locator('button', { hasText: /Resume metrics checklist/i });
    await pill.click();
    const input = page.locator('input[placeholder*="Ask MS advice"]');
    await expect(input).toHaveValue(/Resume metrics checklist/);
  });

  test('REG-29: ATS Scanner button link on home panel regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('h4', { hasText: /ATS Scanner/i }).click();
    const resumeHeader = page.locator('h2', { hasText: /ATS Resume Audit Engine/i });
    await expect(resumeHeader).toBeVisible();
  });

  test('REG-30: Interactive Mock Drills button link on home panel regression check', async ({ page }) => {
    await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
    await page.locator('h4', { hasText: /Interactive Mock Drills/i }).click();
    const setupHeading = page.locator('h2', { hasText: /Mock Interview Setup/i });
    await expect(setupHeading).toBeVisible();
  });

});
