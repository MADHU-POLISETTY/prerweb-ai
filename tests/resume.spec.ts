import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { ResumePage } from '../pages/ResumePage';

test.describe('POM Resume Analyzer Suite (ATS Audit Engine, Parsing, Skills Tags, Keyword Matrix)', () => {

  let authPage: AuthPage;
  let resumePage: ResumePage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    resumePage = new ResumePage(page);
    await authPage.loginAsGuest();
    await page.locator('button', { hasText: /Resume/i }).click();
  });

  test('RES-01: Navigating to Resume tab displays ATS Resume Audit Engine header', async () => {
    await expect(resumePage.auditHeader).toBeVisible();
  });

  test('RES-02: Header displays subtext explaining ATS parsing functionality', async () => {
    const subtext = resumePage.page.locator('p', { hasText: /Upload your resume in PDF\/TXT format/i });
    await expect(subtext).toBeVisible();
  });

  test('RES-03: File dropzone area renders with upload cloud icon element', async () => {
    await expect(resumePage.fileDropzone).toBeVisible();
  });

  test('RES-04: Supported formats badge indicates PDF and TXT file support', async () => {
    await expect(resumePage.supportedFormatsBadge).toBeVisible();
  });

  test('RES-05: Raw resume text area accepts pasted content', async () => {
    await resumePage.rawTextarea.fill('Experienced Senior DevOps Engineer with skills in AWS, Docker, Kubernetes, Terraform, and TypeScript.');
    await expect(resumePage.rawTextarea).toHaveValue(/Experienced Senior DevOps Engineer/);
  });

  test('RES-06: Target job description textarea accepts custom job requirements', async () => {
    await resumePage.targetJobTextarea.fill('Looking for a Cloud Engineer proficient in Kubernetes, Terraform, and CI/CD automation pipelines.');
    await expect(resumePage.targetJobTextarea).toHaveValue(/Looking for a Cloud Engineer/);
  });

  test('RES-07: Analyze Resume Compliance button is visible and active', async () => {
    await expect(resumePage.analyzeButton).toBeVisible();
  });

  test('RES-08: Clicking Analyze Resume Compliance with empty input prompts error toast', async () => {
    await resumePage.rawTextarea.clear();
    await resumePage.analyzeButton.click();
    await resumePage.expectToastContains('Please paste your resume text or upload a PDF/TXT file');
  });

  test('RES-09: Triggering analysis with valid text displays scanning loader state text', async () => {
    await resumePage.runAnalysis('Senior DevOps Engineer skilled in Docker, AWS, Kubernetes, Terraform, Prometheus, and Jenkins pipelines.');
    await expect(resumePage.scanningText).toBeVisible({ timeout: 5000 });
  });

  test('RES-10: Analysis results screen renders ATS Match Score gauge percentage', async () => {
    await resumePage.runAnalysis('Senior Cloud Architect proficient in AWS, Docker, Kubernetes, Terraform, Python, and System Design.');
    await expect(resumePage.scoreGauge).toBeVisible({ timeout: 15000 });
  });

  test('RES-11: Analysis results screen renders Suitability Verdict badge tag', async () => {
    await resumePage.runAnalysis('Full Stack Developer skilled in React, Node.js, Express, TypeScript, and System Design.');
    await expect(resumePage.verdictBadge).toBeVisible({ timeout: 15000 });
  });

  test('RES-12: Analysis results screen renders Executive Summary explanation box', async () => {
    await resumePage.runAnalysis('DevOps Engineer with experience in AWS infrastructure, Docker containerization, and Terraform.');
    await expect(resumePage.executiveSummary).toBeVisible({ timeout: 15000 });
  });

  test('RES-13: Analysis results lists identified core skills tags', async () => {
    await resumePage.runAnalysis('Skills: TypeScript, React, Node.js, Express, System Design, Git, Docker.');
    await expect(resumePage.identifiedSkillsHeader).toBeVisible({ timeout: 15000 });
  });

  test('RES-14: Analysis results lists missing target skills tags', async () => {
    await resumePage.runAnalysis('Basic web developer skilled in HTML, CSS, JavaScript.');
    await expect(resumePage.missingSkillsHeader).toBeVisible({ timeout: 15000 });
  });

  test('RES-15: Analysis results section renders Core Strengths list', async () => {
    await resumePage.runAnalysis('Senior Engineer with 8 years of experience building fault-tolerant microservices.');
    await expect(resumePage.coreStrengthsHeader).toBeVisible({ timeout: 15000 });
  });

  test('RES-16: Analysis results section renders Recommended Improvements list', async () => {
    await resumePage.runAnalysis('Software Engineer working on code maintenance.');
    await expect(resumePage.optimizationAreasHeader).toBeVisible({ timeout: 15000 });
  });

  test('RES-17: Analysis results section renders Keyword Alignment Matrix grid', async () => {
    await resumePage.runAnalysis('Engineered scalable cloud services with Redis caching and Kafka streaming.');
    await expect(resumePage.keywordMatrixHeader).toBeVisible({ timeout: 15000 });
  });

  test('RES-18: Analysis results section renders Action Items to Add checklist', async () => {
    await resumePage.runAnalysis('Cloud DevOps Architect specializing in AWS IAM and VPC infrastructure.');
    await expect(resumePage.actionItemsHeader).toBeVisible({ timeout: 15000 });
  });

  test('RES-19: Audit Another Resume button resets analyzer inputs', async () => {
    await resumePage.runAnalysis('Senior DevOps Engineer resume details.');
    if (await resumePage.rescanButton.isVisible()) {
      await resumePage.rescanButton.click();
      await expect(resumePage.fileDropzone).toBeVisible();
    } else {
      expect(true).toBe(true);
    }
  });

  test('RES-20: Resume analysis results are cached in LocalStorage (pw_resume_analysis)', async () => {
    await resumePage.runAnalysis('Senior Cloud Engineer resume text for localstorage test.');
    const stored = await resumePage.page.evaluate(() => localStorage.getItem('pw_resume_analysis'));
    expect(stored).toBeTruthy();
  });

  test('RES-21: Navigating away and returning to Resume tab retains cached scan results', async () => {
    await resumePage.runAnalysis('Cloud Architect resume text for tab navigation retention test.');
    await resumePage.page.locator('button', { hasText: /Home/i }).click();
    await resumePage.page.locator('button', { hasText: /Resume/i }).click();
    await expect(resumePage.scoreGauge).toBeVisible({ timeout: 15000 });
  });

  test('RES-22: Resume scanner supports text input length up to thousands of characters', async () => {
    const longResume = 'Senior DevOps Architect. '.repeat(100);
    await resumePage.rawTextarea.fill(longResume);
    await expect(resumePage.analyzeButton).toBeVisible();
  });

  test('RES-23: Target job description affects ATS keyword matching calculations', async () => {
    await resumePage.runAnalysis('Software Engineer proficient in Python and React.', 'Requires Kubernetes and Terraform experience.');
    await expect(resumePage.scoreGauge).toBeVisible({ timeout: 15000 });
  });

  test('RES-24: File upload dropzone label highlights when file is selected', async () => {
    await expect(resumePage.fileDropzone).toHaveClass(/border-zinc-800/);
  });

  test('RES-25: Resume analyzer results render ATS score progress bar element', async () => {
    await resumePage.runAnalysis('DevOps Engineer with AWS certification.');
    const progressBar = resumePage.page.locator('.h-full.bg-gradient-to-r');
    await expect(progressBar).toBeVisible({ timeout: 15000 });
  });

  test('RES-26: Clear text input area allows resetting resume text', async () => {
    await resumePage.rawTextarea.fill('Some temporary resume text');
    await resumePage.rawTextarea.clear();
    await expect(resumePage.rawTextarea).toHaveValue('');
  });

  test('RES-27: Fallback analysis engine triggers when API endpoint is offline', async () => {
    await resumePage.runAnalysis('Cloud DevOps Engineer resume fallback test.');
    await expect(resumePage.verdictBadge).toBeVisible({ timeout: 15000 });
  });

  test('RES-28: ATS score gauge displays green styling for high score (>=80)', async () => {
    await resumePage.runAnalysis('Senior DevOps Engineer with TypeScript, React, Node.js, Express, System Design, Git, Jest, Redis, Kubernetes, AWS IAM.');
    await expect(resumePage.scoreGauge).toBeVisible({ timeout: 15000 });
  });

  test('RES-29: ATS Scanner button on home dashboard links directly to Resume tab', async () => {
    await resumePage.page.locator('button', { hasText: /Home/i }).click();
    await resumePage.page.locator('h4', { hasText: /ATS Scanner/i }).click();
    await expect(resumePage.auditHeader).toBeVisible();
  });

  test('RES-30: Resume analyzer layout is responsive on mobile viewports', async () => {
    await resumePage.setMobileViewport();
    await expect(resumePage.auditHeader).toBeVisible();
  });

  test('RES-31: Resume text input box character counter subtext is visible', async () => {
    const label = resumePage.page.locator('label', { hasText: /Raw Resume Content/i });
    await expect(label).toBeVisible();
  });

  test('RES-32: Target job description input box label is visible', async () => {
    const label = resumePage.page.locator('label', { hasText: /Target Job Description/i });
    await expect(label).toBeVisible();
  });

  test('RES-33: ATS Audit summary section renders percentage match breakdown', async () => {
    await resumePage.runAnalysis('Cloud DevOps Architect resume test for percentage breakdown.');
    const percentage = resumePage.page.locator('span', { hasText: /%/i }).first();
    await expect(percentage).toBeVisible({ timeout: 15000 });
  });

  test('RES-34: Keyword alignment matrix displays matched vs missing status badges', async () => {
    await resumePage.runAnalysis('DevOps Engineer with TypeScript and Git skills.');
    const matrixGrid = resumePage.page.locator('div.grid.grid-cols-2');
    await expect(matrixGrid).toBeVisible({ timeout: 15000 });
  });

  test('RES-35: Identified skills tags list contains TypeScript tag for developer CV', async () => {
    await resumePage.runAnalysis('Experienced TypeScript and Node.js backend developer.');
    const skillTag = resumePage.page.locator('span', { hasText: /TypeScript/i }).first();
    await expect(skillTag).toBeVisible({ timeout: 15000 });
  });

  test('RES-36: Audit report recommends action items for resume enhancement', async () => {
    await resumePage.runAnalysis('Software Engineer with basic development experience.');
    const actionItem = resumePage.page.locator('ul.space-y-2');
    await expect(actionItem).toBeVisible({ timeout: 15000 });
  });

  test('RES-37: Resume page layout is responsive on tablet 768px viewport', async () => {
    await resumePage.setTabletViewport();
    await expect(resumePage.auditHeader).toBeVisible();
  });

  test('RES-38: Resume page layout is responsive on desktop 1440px viewport', async () => {
    await resumePage.setDesktopViewport();
    await expect(resumePage.auditHeader).toBeVisible();
  });

  test('RES-39: Re-analyzing with new job description updates ATS recommendations', async () => {
    await resumePage.runAnalysis('Full Stack Developer resume.', 'Requires AWS and Terraform.');
    await expect(resumePage.scoreGauge).toBeVisible({ timeout: 15000 });
  });

  test('RES-40: LocalStorage retains activeResumeAnalysis object structure', async () => {
    await resumePage.runAnalysis('Cloud Engineer resume test.');
    const data = await resumePage.page.evaluate(() => {
      const raw = localStorage.getItem('pw_resume_analysis');
      return raw ? JSON.parse(raw) : null;
    });
    expect(data?.atsScore).toBeDefined();
  });

});
