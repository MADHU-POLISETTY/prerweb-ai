import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';
import { InterviewPage } from '../pages/InterviewPage';
import { ResumePage } from '../pages/ResumePage';
import { ProfilePage } from '../pages/ProfilePage';
import { NavigationPage } from '../pages/NavigationPage';

test.describe('POM Regression & End-to-End Suite', () => {

  let authPage: AuthPage;
  let dashboardPage: DashboardPage;
  let interviewPage: InterviewPage;
  let resumePage: ResumePage;
  let profilePage: ProfilePage;
  let navPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);
    interviewPage = new InterviewPage(page);
    resumePage = new ResumePage(page);
    profilePage = new ProfilePage(page);
    navPage = new NavigationPage(page);
    await authPage.navigateTo('/');
  });

  test('REG-01: Full user journey from Splash -> Guest Login -> Home Dashboard', async () => {
    await authPage.guestBypassButton.click();
    await expect(dashboardPage.candidateName).toContainText('James Jane');
  });

  test('REG-02: Full user journey from Login -> Edit Profile -> Verify Header update', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Profile');
    await profilePage.updateProfile('Captain Jean-Luc', 'Cloud DevOps Architect');
    await navPage.goToTab('Home');
    await expect(dashboardPage.candidateName).toContainText('Captain Jean-Luc');
  });

  test('REG-03: Full user journey from Setup Interview -> Answer Question -> Check Results', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Interview');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Detailed regression test answer regarding AWS Cloud computing architectures.');
    const feedbackHeader = interviewPage.page.locator('h4', { hasText: /Evaluation & Feedback/i });
    await expect(feedbackHeader).toBeVisible({ timeout: 15000 });
  });

  test('REG-04: Full user journey from ATS Resume Input -> Analyze -> Verify Match Gauge', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Resume');
    await resumePage.runAnalysis('Senior DevOps Engineer experienced in AWS, Docker, Kubernetes, and Terraform.');
    await expect(resumePage.scoreGauge).toBeVisible({ timeout: 15000 });
  });

  test('REG-05: Lead Coach Chat message exchange and response verification', async () => {
    await authPage.guestBypassButton.click();
    await dashboardPage.leadCoachBanner.click();
    await navPage.mentorInput.fill('How do I handle Kubernetes cluster failover?');
    await navPage.mentorSendButton.click();
    const msg = navPage.page.locator('text=How do I handle Kubernetes cluster failover?');
    await expect(msg).toBeVisible();
  });

  test('REG-06: CloudHub DevOps blueprints tab browsing', async () => {
    await authPage.guestBypassButton.click();
    await dashboardPage.devopsHubButton.click();
    await expect(navPage.cloudHubHeader).toBeVisible();
  });

  test('REG-07: Historic session log item opening, detail review, and dismissal', async () => {
    await authPage.guestBypassButton.click();
    await dashboardPage.openFirstActivityDetail();
    await expect(dashboardPage.detailModalTitle).toBeVisible();
    await dashboardPage.dismissLogsButton.click();
    await expect(dashboardPage.detailModalTitle).not.toBeVisible();
  });

  test('REG-08: Workspace cache reset teardown regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Profile');
    await profilePage.resetCacheButton.click();
    await profilePage.expectToastContains('cleared');
  });

  test('REG-09: Invalid password login error toast regression check', async () => {
    await authPage.registerUser('Valid User', 'user@prepwise.ai', 'badpass');
    await authPage.expectToastContains('Password must contain at least 8 characters');
  });

  test('REG-10: Pinned question setup regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Interview');
    await interviewPage.customPinnedModeButton.click();
    await interviewPage.customQuestionInput.fill('What is AWS IAM Role chaining?');
    await interviewPage.pinQuestionButton.click();
    const badge = interviewPage.page.locator('span', { hasText: /What is AWS IAM Role chaining\?/i });
    await expect(badge).toBeVisible();
  });

  test('REG-11: Custom domain input state retention regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Interview');
    await interviewPage.customDomainButton.click();
    await interviewPage.customDomainInput.fill('Distributed Databases');
    await expect(interviewPage.customDomainInput).toHaveValue('Distributed Databases');
  });

  test('REG-12: Target company state retention regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Interview');
    await interviewPage.targetCompanyInput.fill('Google Cloud Platform');
    await expect(interviewPage.targetCompanyInput).toHaveValue('Google Cloud Platform');
  });

  test('REG-13: ATS score progress bar rendering regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Resume');
    await resumePage.runAnalysis('DevOps Engineer with Kubernetes skills.');
    const bar = resumePage.page.locator('.h-full.bg-gradient-to-r');
    await expect(bar).toBeVisible({ timeout: 15000 });
  });

  test('REG-14: Forgot password mode toggle back and forth regression check', async () => {
    await authPage.forgotPasswordButton.click();
    const resetHeader = authPage.page.locator('h3', { hasText: /Reset Password/i });
    await expect(resetHeader).toBeVisible();
    await authPage.backToSignInButton.click();
    await expect(authPage.portalHeader).toBeVisible();
  });

  test('REG-15: View Logs link on dashboard navigation regression check', async () => {
    await authPage.guestBypassButton.click();
    await dashboardPage.page.locator('span', { hasText: /View Logs/i }).click();
    const analyticsHeader = dashboardPage.page.locator('h2', { hasText: /Performance Analytics/i });
    await expect(analyticsHeader).toBeVisible();
  });

  test('REG-16: Candidate goal update regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Profile');
    await profilePage.goalInput.fill('Director of Cloud Engineering');
    await profilePage.saveSettingsButton.click();
    const goalStored = await profilePage.page.evaluate(() => localStorage.getItem('pw_user_goal'));
    expect(goalStored).toBe('Director of Cloud Engineering');
  });

  test('REG-17: Mobile viewport navigation menu regression check', async () => {
    await navPage.setMobileViewport();
    await authPage.guestBypassButton.click();
    await expect(navPage.navDock).toBeVisible();
  });

  test('REG-18: Desktop viewport full dashboard layout regression check', async () => {
    await navPage.setDesktopViewport();
    await authPage.guestBypassButton.click();
    await expect(navPage.brandTitle).toBeVisible();
  });

  test('REG-19: Sign out teardown clears LocalStorage auth key regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Profile');
    await profilePage.signOut();
    const loggedIn = await authPage.page.evaluate(() => localStorage.getItem('pw_is_logged_in'));
    expect(loggedIn).toBeNull();
  });

  test('REG-20: Re-authentication after logout regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Profile');
    await profilePage.signOut();
    await authPage.guestBypassButton.click();
    await expect(dashboardPage.candidateName).toContainText('James Jane');
  });

  test('REG-21: Multi-question drill step counter increment regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Interview');
    await interviewPage.questionCountInput.fill('2');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('First answer detailing container security.');
    await interviewPage.nextQuestionButton.click();
    const q2Badge = interviewPage.page.locator('span', { hasText: /Question 2/i });
    await expect(q2Badge).toBeVisible();
  });

  test('REG-22: Resume clear button regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Resume');
    await resumePage.rawTextarea.fill('Temporary text');
    await resumePage.rawTextarea.clear();
    await expect(resumePage.rawTextarea).toHaveValue('');
  });

  test('REG-23: Empty answer evaluation response regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Interview');
    await interviewPage.launchDrillSession();
    await interviewPage.submitAnswerButton.click();
    const warning = interviewPage.page.locator('text=No answer provided');
    await expect(warning).toBeVisible({ timeout: 15000 });
  });

  test('REG-24: Gibberish answer evaluation response regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Interview');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('asdfasdfasdf');
    const feedback = interviewPage.page.locator('p', { hasText: /brief|invalid|meaningless/i });
    await expect(feedback).toBeVisible({ timeout: 15000 });
  });

  test('REG-25: Ideal answer fallback rendering regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Interview');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('We use multi-stage Docker builds to reduce image footprint.');
    await expect(interviewPage.idealAnswerHeader).toBeVisible({ timeout: 15000 });
  });

  test('REG-26: Header avatar click direct profile navigation regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.headerProfileButton.click();
    await expect(profilePage.profileHeader).toBeVisible();
  });

  test('REG-27: Rapid tab navigation state consistency regression check', async () => {
    await authPage.guestBypassButton.click();
    await navPage.goToTab('Interview');
    await navPage.goToTab('Resume');
    await navPage.goToTab('Analytics');
    await navPage.goToTab('Profile');
    await navPage.goToTab('Home');
    await expect(dashboardPage.bannerTitle).toBeVisible();
  });

  test('REG-28: Lead Coach suggestion pill trigger regression check', async () => {
    await authPage.guestBypassButton.click();
    await dashboardPage.leadCoachBanner.click();
    const pill = navPage.page.locator('button', { hasText: /Resume metrics checklist/i });
    await pill.click();
    await expect(navPage.mentorInput).toHaveValue(/Resume metrics checklist/);
  });

  test('REG-29: ATS Scanner button link on home panel regression check', async () => {
    await authPage.guestBypassButton.click();
    await dashboardPage.atsScannerButton.click();
    await expect(resumePage.auditHeader).toBeVisible();
  });

  test('REG-30: Interactive Mock Drills button link on home panel regression check', async () => {
    await authPage.guestBypassButton.click();
    await dashboardPage.mockDrillsButton.click();
    await expect(interviewPage.setupHeading).toBeVisible();
  });

});
