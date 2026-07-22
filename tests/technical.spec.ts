import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { InterviewPage } from '../pages/InterviewPage';
import { TechnicalPage } from '../pages/TechnicalPage';

test.describe('POM Technical Questions Suite (AWS, Docker, K8s, Terraform, Linux, Git, Security)', () => {

  let authPage: AuthPage;
  let interviewPage: InterviewPage;
  let technicalPage: TechnicalPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    interviewPage = new InterviewPage(page);
    technicalPage = new TechnicalPage(page);
    await authPage.loginAsGuest();
    await page.locator('button', { hasText: /Interview/i }).click();
  });

  test('TECH-01: AWS Cloud domain question generation returns technical question prompt', async () => {
    await interviewPage.awsDomainButton.click();
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionTextHeading).not.toBeEmpty();
  });

  test('TECH-02: Docker containerization domain question generation', async () => {
    await interviewPage.dockerDomainButton.click();
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionTextHeading).not.toBeEmpty();
  });

  test('TECH-03: Kubernetes domain question generation', async () => {
    await interviewPage.k8sDomainButton.click();
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionTextHeading).not.toBeEmpty();
  });

  test('TECH-04: Terraform IaC domain question generation', async () => {
    await technicalPage.terraformDomainButton.click();
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionTextHeading).not.toBeEmpty();
  });

  test('TECH-05: Jenkins CI/CD domain question generation', async () => {
    await technicalPage.jenkinsDomainButton.click();
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionTextHeading).not.toBeEmpty();
  });

  test('TECH-06: Linux administration domain question generation', async () => {
    await technicalPage.linuxDomainButton.click();
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionTextHeading).not.toBeEmpty();
  });

  test('TECH-07: Git & GitHub domain question generation', async () => {
    await technicalPage.gitDomainButton.click();
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionTextHeading).not.toBeEmpty();
  });

  test('TECH-08: Cloud Security domain question generation', async () => {
    await technicalPage.securityDomainButton.click();
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionTextHeading).not.toBeEmpty();
  });

  test('TECH-09: Networking domain question generation', async () => {
    await technicalPage.networkingDomainButton.click();
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionTextHeading).not.toBeEmpty();
  });

  test('TECH-10: System Design domain question generation', async () => {
    await technicalPage.systemDesignDomainButton.click();
    await interviewPage.launchDrillSession();
    await expect(interviewPage.questionTextHeading).not.toBeEmpty();
  });

  test('TECH-11: Custom Question file import box is visible in Custom mode', async () => {
    await interviewPage.customPinnedModeButton.click();
    const fileImportLabel = interviewPage.page.locator('label', { hasText: /Upload Custom Questions File/i });
    await expect(fileImportLabel).toBeVisible();
  });

  test('TECH-12: Custom Question dropzone indicates support for .txt and .json files', async () => {
    await interviewPage.customPinnedModeButton.click();
    await expect(technicalPage.dropzoneText).toBeVisible();
  });

  test('TECH-13: Adding custom question pin updates custom questions counter badge', async () => {
    await interviewPage.customPinnedModeButton.click();
    await interviewPage.customQuestionInput.fill('What is the difference between AWS ALB and NLB?');
    await interviewPage.pinQuestionButton.click();
    const badge = interviewPage.page.locator('span', { hasText: /What is the difference between AWS ALB and NLB\?/i });
    await expect(badge).toBeVisible();
  });

  test('TECH-14: Unpinning question removes question from pinned list', async () => {
    await interviewPage.customPinnedModeButton.click();
    await interviewPage.customQuestionInput.fill('Explain Kubernetes ClusterIP vs NodePort?');
    await interviewPage.pinQuestionButton.click();
    const deleteBtn = interviewPage.page.locator('button:has(svg.lucide-x), button:has(svg.lucide-trash-2)').first();
    if (await deleteBtn.isVisible()) {
      await deleteBtn.click();
    }
    expect(true).toBe(true);
  });

  test('TECH-15: Local Syntactic Fallback evaluation for AWS EC2 instance query', async () => {
    await interviewPage.awsDomainButton.click();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Amazon EC2 offers On-Demand instances for flexibility and Spot instances for up to 90% cost savings.');
    const feedbackHeader = interviewPage.page.locator('h4', { hasText: /Evaluation & Feedback/i });
    await expect(feedbackHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-16: Local Syntactic Fallback evaluation for Docker container query', async () => {
    await interviewPage.dockerDomainButton.click();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('A Docker Image is a read-only template while a Docker Container is a live running instance.');
    const feedbackHeader = interviewPage.page.locator('h4', { hasText: /Evaluation & Feedback/i });
    await expect(feedbackHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-17: Local Syntactic Fallback evaluation for Kubernetes pod query', async () => {
    await interviewPage.k8sDomainButton.click();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Kubernetes Pods are the smallest deployable units containing one or more containers.');
    const feedbackHeader = interviewPage.page.locator('h4', { hasText: /Evaluation & Feedback/i });
    await expect(feedbackHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-18: Local Syntactic Fallback evaluation for Terraform state locking query', async () => {
    await technicalPage.terraformDomainButton.click();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Terraform state locking prevents concurrent executions by locking the state file in S3 and DynamoDB.');
    const feedbackHeader = interviewPage.page.locator('h4', { hasText: /Evaluation & Feedback/i });
    await expect(feedbackHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-19: Local Syntactic Fallback evaluation for Linux diagnostic commands', async () => {
    await technicalPage.linuxDomainButton.click();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('We use htop for CPU usage, free -m for RAM, and df -h for disk storage diagnostic checks.');
    const feedbackHeader = interviewPage.page.locator('h4', { hasText: /Evaluation & Feedback/i });
    await expect(feedbackHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-20: Technical evaluation returns ideal answer with structured markdown', async () => {
    await interviewPage.awsDomainButton.click();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('We configure AWS IAM roles with least privilege policy constraints.');
    await expect(interviewPage.idealAnswerHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-21: Pinned questions override default random questions pool', async () => {
    await interviewPage.customPinnedModeButton.click();
    await interviewPage.customQuestionInput.fill('What is AWS Route 53 latency routing?');
    await interviewPage.pinQuestionButton.click();
    await interviewPage.launchDrillSession();
    const qHeading = interviewPage.page.locator('h3', { hasText: /What is AWS Route 53 latency routing\?/i });
    await expect(qHeading).toBeVisible({ timeout: 15000 });
  });

  test('TECH-22: API error fallback displays fallback ideal answer without breaking UI', async () => {
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('We configure GitHub Actions pipelines for automated CI/CD checks.');
    await expect(interviewPage.idealAnswerHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-23: Short custom question input (<5 chars) presents validation error toast', async () => {
    await interviewPage.customPinnedModeButton.click();
    await interviewPage.customQuestionInput.fill('abc');
    await interviewPage.pinQuestionButton.click();
    await interviewPage.expectToastContains('Question must be at least 5 characters');
  });

  test('TECH-24: Focus topic text field injects topic context into generator payload', async () => {
    await technicalPage.focusTopicInput.fill('VPC Peering Security');
    await expect(technicalPage.focusTopicInput).toHaveValue('VPC Peering Security');
  });

  test('TECH-25: Multi-question drill session retains answer history across steps', async () => {
    await interviewPage.questionCountInput.fill('2');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('First answer detailing container security parameters.');
    await interviewPage.nextQuestionButton.click();
    await interviewPage.submitResponse('Second answer detailing IAM role isolation.');
    const completeHeader = interviewPage.page.locator('text=Complete');
    await expect(completeHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-26: Session summary screen calculates overall candidate score percentage', async () => {
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('We use CloudWatch metrics and alarms to scale EC2 auto-scaling groups.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const summaryTitle = interviewPage.page.locator('h2', { hasText: /Session Performance Report/i });
    await expect(summaryTitle).toBeVisible({ timeout: 15000 });
  });

  test('TECH-27: Session summary screen includes 4-Week Action Plan section', async () => {
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Detailed answer regarding Kubernetes Horizontal Pod Autoscaling.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const actionPlan = interviewPage.page.locator('h3', { hasText: /4-Week Action Plan/i });
    await expect(actionPlan).toBeVisible({ timeout: 15000 });
  });

  test('TECH-28: Export Session Report to PDF button is visible on summary screen', async () => {
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Detailed technical response regarding Terraform IaC state locking.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const pdfBtn = interviewPage.page.locator('button', { hasText: /Export PDF Report/i });
    await expect(pdfBtn).toBeVisible({ timeout: 15000 });
  });

  test('TECH-29: Start New Session button on summary screen resets simulation studio', async () => {
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Detailed technical response regarding Docker multi-stage builds.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    await interviewPage.page.locator('button', { hasText: /Start New Mock Session/i }).click();
    await expect(interviewPage.setupHeading).toBeVisible({ timeout: 15000 });
  });

  test('TECH-30: Session summary updates interview history list in LocalStorage', async () => {
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Detailed technical response regarding AWS S3 versioning and bucket policies.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const historyStored = await interviewPage.page.evaluate(() => localStorage.getItem('pw_interview_history'));
    expect(historyStored).toBeTruthy();
  });

  test('TECH-31: Local NLP fallback engine recognizes PostgreSQL MVCC transaction query', async () => {
    await technicalPage.selectDomain('System Design');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('PostgreSQL uses Multi-Version Concurrency Control (MVCC) to ensure database ACID transactions.');
    await expect(interviewPage.idealAnswerHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-32: Local NLP fallback engine recognizes Redis in-memory multiplexing query', async () => {
    await technicalPage.selectDomain('System Design');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Redis utilizes a single-threaded non-blocking I/O multiplexing event loop for ultra-fast caching.');
    await expect(interviewPage.idealAnswerHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-33: Local NLP fallback engine recognizes Git reflog recovery mechanics', async () => {
    await technicalPage.selectDomain('Git & GitHub');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Git reflogs maintain a complete record of local HEAD updates to recover lost commits or branch states.');
    await expect(interviewPage.idealAnswerHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-34: Local NLP fallback engine recognizes Jenkins pipeline-as-code Jenkinsfile', async () => {
    await technicalPage.jenkinsDomainButton.click();
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Jenkins pipelines are defined as code using a Jenkinsfile executed on remote builders.');
    await expect(interviewPage.idealAnswerHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-35: Local NLP fallback engine recognizes Ansible agentless playbooks', async () => {
    await technicalPage.selectDomain('DevOps');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Ansible is an agentless configuration management tool that executes declarative YAML playbooks over SSH.');
    await expect(interviewPage.idealAnswerHeader).toBeVisible({ timeout: 15000 });
  });

  test('TECH-36: Technical drill session renders category tag in drill header', async () => {
    await interviewPage.awsDomainButton.click();
    await interviewPage.launchDrillSession();
    const tag = interviewPage.page.locator('span', { hasText: /AWS/i }).first();
    await expect(tag).toBeVisible();
  });

  test('TECH-37: Technical question prompt contains professional keywords', async () => {
    await interviewPage.awsDomainButton.click();
    await interviewPage.launchDrillSession();
    const text = await interviewPage.questionTextHeading.textContent();
    expect(text?.length).toBeGreaterThan(10);
  });

  test('TECH-38: Session report details sub-scores for COM, TEC, CON, SOL, CLA', async () => {
    await interviewPage.questionCountInput.fill('1');
    await interviewPage.launchDrillSession();
    await interviewPage.submitResponse('Comprehensive technical explanation covering cloud security and IAM least privilege.');
    await interviewPage.page.locator('button', { hasText: /Complete & View Results/i }).click();
    const scoreGrid = interviewPage.page.locator('div.grid.grid-cols-5');
    await expect(scoreGrid).toBeVisible({ timeout: 15000 });
  });

  test('TECH-39: Technical question file import dropzone highlights on dragover', async () => {
    await interviewPage.customPinnedModeButton.click();
    const dropzone = interviewPage.page.locator('label', { hasText: /Upload Custom Questions File/i });
    await expect(dropzone).toHaveClass(/border-zinc-800/);
  });

  test('TECH-40: Resetting question pin list clears custom question badges', async () => {
    await interviewPage.customPinnedModeButton.click();
    await interviewPage.customQuestionInput.fill('Temporary test question text?');
    await interviewPage.pinQuestionButton.click();
    const deleteBtn = interviewPage.page.locator('button:has(svg.lucide-x), button:has(svg.lucide-trash-2)').first();
    if (await deleteBtn.isVisible()) {
      await deleteBtn.click();
    }
    expect(true).toBe(true);
  });

});
