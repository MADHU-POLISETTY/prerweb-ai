import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResumePage extends BasePage {
  readonly auditHeader: Locator;
  readonly fileDropzone: Locator;
  readonly supportedFormatsBadge: Locator;
  readonly rawTextarea: Locator;
  readonly targetJobTextarea: Locator;
  readonly analyzeButton: Locator;
  readonly scanningText: Locator;
  readonly scoreGauge: Locator;
  readonly verdictBadge: Locator;
  readonly executiveSummary: Locator;
  readonly identifiedSkillsHeader: Locator;
  readonly missingSkillsHeader: Locator;
  readonly coreStrengthsHeader: Locator;
  readonly optimizationAreasHeader: Locator;
  readonly keywordMatrixHeader: Locator;
  readonly actionItemsHeader: Locator;
  readonly rescanButton: Locator;

  constructor(page: Page) {
    super(page);
    this.auditHeader = page.locator('h2', { hasText: /ATS Resume Audit Engine/i });
    this.fileDropzone = page.locator('label', { hasText: /Drag & Drop your Resume/i });
    this.supportedFormatsBadge = page.locator('span', { hasText: /Supports PDF & TXT up to 5MB/i });
    this.rawTextarea = page.locator('textarea[placeholder*="Paste your resume text here"]');
    this.targetJobTextarea = page.locator('textarea[placeholder*="Paste the target job description"]');
    this.analyzeButton = page.locator('button', { hasText: /Analyze Resume Compliance/i });
    this.scanningText = page.locator('text=Analyzing ATS compliance');
    this.scoreGauge = page.locator('span', { hasText: /ATS Score/i });
    this.verdictBadge = page.locator('span', { hasText: /Suitable|Match/i });
    this.executiveSummary = page.locator('h3', { hasText: /Executive Summary/i });
    this.identifiedSkillsHeader = page.locator('h3', { hasText: /Identified Skills/i });
    this.missingSkillsHeader = page.locator('h3', { hasText: /Missing Critical Skills/i });
    this.coreStrengthsHeader = page.locator('h3', { hasText: /Core Strengths/i });
    this.optimizationAreasHeader = page.locator('h3', { hasText: /Areas for Optimization/i });
    this.keywordMatrixHeader = page.locator('h3', { hasText: /Keyword Alignment Matrix/i });
    this.actionItemsHeader = page.locator('h3', { hasText: /Action Items to Add/i });
    this.rescanButton = page.locator('button', { hasText: /Audit Another Resume/i });
  }

  async runAnalysis(resumeText: string, jobDescText?: string) {
    await this.rawTextarea.fill(resumeText);
    if (jobDescText) {
      await this.targetJobTextarea.fill(jobDescText);
    }
    await this.analyzeButton.click();
  }
}
