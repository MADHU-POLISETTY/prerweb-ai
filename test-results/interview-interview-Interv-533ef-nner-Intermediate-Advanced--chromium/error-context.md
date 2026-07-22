# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: interview\interview.spec.ts >> Interview Simulation Framework Specs >> INT-10: Target difficulty level selector options exist (Beginner, Intermediate, Advanced)
- Location: tests\interview\interview.spec.ts:64:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button').filter({ hasText: /Beginner/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button').filter({ hasText: /Beginner/i })

```

```yaml
- banner:
  - heading "PrepWise AI" [level=1]
  - paragraph: Candidate Control Center
  - text: SYS ACTIVE
  - button
- main:
  - button "Back to Home"
  - text: Simulation Studio
  - heading "Mock Interview Setup" [level=2]
  - paragraph: Tailor your evaluation. Gemini will render customized professional queries.
  - text: Session Focus domain
  - button "Cloud Computing"
  - button "AWS"
  - button "GCP"
  - button "Azure"
  - button "Linux"
  - button "Docker"
  - button "Kubernetes"
  - button "Terraform"
  - button "Jenkins"
  - button "Git & GitHub"
  - button "Networking"
  - button "Cloud Security"
  - button "DevOps"
  - button "STAR Behavioral"
  - button "System Design"
  - button "Custom"
  - text: Target professional role
  - textbox "e.g. AWS Cloud Engineer, DevOps Lead, SRE": Cloud DevOps Architect
  - text: Target company standard focus
  - textbox "e.g. Stripe, Netflix, Google": Google
  - text: Appraisal intensity level
  - button "Easy"
  - button "Medium"
  - button "Hard"
  - text: Number of questions
  - button "3 Qs"
  - button "5 Qs"
  - button "10 Qs"
  - text: Question Source Architecture
  - button "Curated Bank Secure repository"
  - button "Dynamic AI Custom Gemini scenario"
  - button "Hybrid Mix Curated + dynamic AI"
  - heading "Curated Database Explorer" [level=4]
  - paragraph: Select, pin, or upload custom questions for your session.
  - text: 0 / 5 Pinned
  - button "Curated Vault"
  - button "Upload / Add Custom"
  - textbox "Search verified questions..."
  - button "What are standard cloud security best practices for protecting data at rest and in transit?":
    - paragraph: What are standard cloud security best practices for protecting data at rest and in transit?
  - button "How does a multi-region cloud architecture provide high availability and geographical disaster recovery?":
    - paragraph: How does a multi-region cloud architecture provide high availability and geographical disaster recovery?
  - button "What is horizontal scaling vs vertical scaling in a cloud environment, and when is each appropriate?":
    - paragraph: What is horizontal scaling vs vertical scaling in a cloud environment, and when is each appropriate?
  - button "How do Content Delivery Networks (CDNs) leverage edge caching to improve global latency?":
    - paragraph: How do Content Delivery Networks (CDNs) leverage edge caching to improve global latency?
  - button "What is cloud tenant isolation, and how do public cloud providers ensure secure multi-tenancy?":
    - paragraph: What is cloud tenant isolation, and how do public cloud providers ensure secure multi-tenancy?
  - text: Focus Topics / Key Skills (Optional)
  - textbox "e.g. Concurrency pipelines, system design"
  - button "Compile Prep Session"
- navigation:
  - button "Home"
  - button "Interview"
  - button "Resume"
  - button "Analytics"
  - button "Profile"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Interview Simulation Framework Specs', () => {
  4   | 
  5   |   test.beforeEach(async ({ page }) => {
  6   |     await page.goto('/');
  7   |     await page.locator('button', { hasText: /Skip authentication and enter as guest/i }).click();
  8   |     await page.locator('button', { hasText: /Interview/i }).click();
  9   |   });
  10  | 
  11  |   test('INT-01: Navigating to Interview tab opens Simulation Studio setup screen', async ({ page }) => {
  12  |     const setupHeading = page.locator('h2', { hasText: /Mock Interview Setup/i });
  13  |     await expect(setupHeading).toBeVisible();
  14  |   });
  15  | 
  16  |   test('INT-02: Back to Home button returns candidate to home panel', async ({ page }) => {
  17  |     await page.locator('button', { hasText: /Back to Home/i }).click();
  18  |     const candidateName = page.locator('h2', { hasText: /James Jane/i });
  19  |     await expect(candidateName).toBeVisible();
  20  |   });
  21  | 
  22  |   test('INT-03: Focus domain selection grid renders tech domain buttons (AWS, Docker, K8s)', async ({ page }) => {
  23  |     const awsBtn = page.locator('button', { hasText: /^AWS$/i });
  24  |     await expect(awsBtn).toBeVisible();
  25  |   });
  26  | 
  27  |   test('INT-04: Clicking AWS domain selects AWS and updates active border highlight', async ({ page }) => {
  28  |     const awsBtn = page.locator('button', { hasText: /^AWS$/i });
  29  |     await awsBtn.click();
  30  |     await expect(awsBtn).toHaveClass(/border-indigo-500/);
  31  |   });
  32  | 
  33  |   test('INT-05: Clicking Docker domain selects Docker containerization domain', async ({ page }) => {
  34  |     const dockerBtn = page.locator('button', { hasText: /^Docker$/i });
  35  |     await dockerBtn.click();
  36  |     await expect(dockerBtn).toHaveClass(/border-indigo-500/);
  37  |   });
  38  | 
  39  |   test('INT-06: Clicking Kubernetes domain selects Kubernetes orchestration domain', async ({ page }) => {
  40  |     const k8sBtn = page.locator('button', { hasText: /^Kubernetes$/i });
  41  |     await k8sBtn.click();
  42  |     await expect(k8sBtn).toHaveClass(/border-indigo-500/);
  43  |   });
  44  | 
  45  |   test('INT-07: Selecting Custom domain reveals custom domain text input field', async ({ page }) => {
  46  |     const customBtn = page.locator('button', { hasText: /^Custom$/i });
  47  |     await customBtn.click();
  48  |     const customInput = page.locator('input[placeholder*="e.g. Snowflake"]');
  49  |     await expect(customInput).toBeVisible();
  50  |   });
  51  | 
  52  |   test('INT-08: Target role title input field accepts custom text input', async ({ page }) => {
  53  |     const roleInput = page.locator('input[placeholder*="e.g. Lead DevOps Engineer"]');
  54  |     await roleInput.fill('Senior Site Reliability Engineer');
  55  |     await expect(roleInput).toHaveValue('Senior Site Reliability Engineer');
  56  |   });
  57  | 
  58  |   test('INT-09: Target company input field accepts target company name', async ({ page }) => {
  59  |     const companyInput = page.locator('input[placeholder*="e.g. Stripe, AWS"]');
  60  |     await companyInput.fill('Netflix');
  61  |     await expect(companyInput).toHaveValue('Netflix');
  62  |   });
  63  | 
  64  |   test('INT-10: Target difficulty level selector options exist (Beginner, Intermediate, Advanced)', async ({ page }) => {
  65  |     const beginnerBtn = page.locator('button', { hasText: /Beginner/i });
  66  |     const intermediateBtn = page.locator('button', { hasText: /Intermediate/i });
  67  |     const advancedBtn = page.locator('button', { hasText: /Advanced/i });
> 68  |     await expect(beginnerBtn).toBeVisible();
      |                               ^ Error: expect(locator).toBeVisible() failed
  69  |     await expect(intermediateBtn).toBeVisible();
  70  |     await expect(advancedBtn).toBeVisible();
  71  |   });
  72  | 
  73  |   test('INT-11: Clicking difficulty button updates active difficulty selection', async ({ page }) => {
  74  |     const advancedBtn = page.locator('button', { hasText: /Advanced/i });
  75  |     await advancedBtn.click();
  76  |     await expect(advancedBtn).toHaveClass(/border-indigo-500/);
  77  |   });
  78  | 
  79  |   test('INT-12: Number of questions input can be set between 1 and 10', async ({ page }) => {
  80  |     const numInput = page.locator('input[type="number"]');
  81  |     await numInput.fill('5');
  82  |     await expect(numInput).toHaveValue('5');
  83  |   });
  84  | 
  85  |   test('INT-13: Question mode switcher supports Dynamic AI and Custom Pinned modes', async ({ page }) => {
  86  |     const dynamicModeBtn = page.locator('button', { hasText: /Dynamic AI Generation/i });
  87  |     const customModeBtn = page.locator('button', { hasText: /Custom Pinned Bank/i });
  88  |     await expect(dynamicModeBtn).toBeVisible();
  89  |     await expect(customModeBtn).toBeVisible();
  90  |   });
  91  | 
  92  |   test('INT-14: Switching to Custom Pinned Mode reveals custom question input box', async ({ page }) => {
  93  |     const customModeBtn = page.locator('button', { hasText: /Custom Pinned Bank/i });
  94  |     await customModeBtn.click();
  95  |     const pinHeader = page.locator('label', { hasText: /Add & Pin Custom Question/i });
  96  |     await expect(pinHeader).toBeVisible();
  97  |   });
  98  | 
  99  |   test('INT-15: Custom question input field accepts question text input', async ({ page }) => {
  100 |     await page.locator('button', { hasText: /Custom Pinned Bank/i }).click();
  101 |     const qInput = page.locator('input[placeholder*="Type custom question text"]');
  102 |     await qInput.fill('Explain how Terraform manages state locking with DynamoDB?');
  103 |     await expect(qInput).toHaveValue('Explain how Terraform manages state locking with DynamoDB?');
  104 |   });
  105 | 
  106 |   test('INT-16: Pin Custom Question button adds question to pinned list badge', async ({ page }) => {
  107 |     await page.locator('button', { hasText: /Custom Pinned Bank/i }).click();
  108 |     const qInput = page.locator('input[placeholder*="Type custom question text"]');
  109 |     await qInput.fill('How do you configure AWS IAM roles for EKS pods?');
  110 |     await page.locator('button', { hasText: /Pin Question/i }).click();
  111 |     const pinnedBadge = page.locator('span', { hasText: /How do you configure AWS IAM roles for EKS pods\?/i });
  112 |     await expect(pinnedBadge).toBeVisible();
  113 |   });
  114 | 
  115 |   test('INT-17: Launch Interview Session button is visible and active', async ({ page }) => {
  116 |     const launchBtn = page.locator('button', { hasText: /Launch Interview Session/i });
  117 |     await expect(launchBtn).toBeVisible();
  118 |   });
  119 | 
  120 |   test('INT-18: Clicking Launch Interview Session transitions to active drill screen', async ({ page }) => {
  121 |     await page.locator('button', { hasText: /Launch Interview Session/i }).click();
  122 |     const activeHeader = page.locator('span', { hasText: /LIVE INTERVIEW DRILL/i });
  123 |     await expect(activeHeader).toBeVisible({ timeout: 15000 });
  124 |   });
  125 | 
  126 |   test('INT-19: Active question screen displays question step counter badge', async ({ page }) => {
  127 |     await page.locator('button', { hasText: /Launch Interview Session/i }).click();
  128 |     const stepCounter = page.locator('span', { hasText: /Question 1/i });
  129 |     await expect(stepCounter).toBeVisible({ timeout: 15000 });
  130 |   });
  131 | 
  132 |   test('INT-20: Active question screen displays non-empty technical question prompt', async ({ page }) => {
  133 |     await page.locator('button', { hasText: /Launch Interview Session/i }).click();
  134 |     const questionBox = page.locator('h3');
  135 |     await expect(questionBox).not.toBeEmpty({ timeout: 15000 });
  136 |   });
  137 | 
  138 |   test('INT-21: Answer textarea accepts candidate text response', async ({ page }) => {
  139 |     await page.locator('button', { hasText: /Launch Interview Session/i }).click();
  140 |     const answerTextarea = page.locator('textarea[placeholder*="Write your response"]');
  141 |     await answerTextarea.fill('We handle synchronous payment webhooks using an idempotent key in Redis and PostgreSQL.');
  142 |     await expect(answerTextarea).toHaveValue('We handle synchronous payment webhooks using an idempotent key in Redis and PostgreSQL.');
  143 |   });
  144 | 
  145 |   test('INT-22: Submit Answer button is enabled and visible on active drill screen', async ({ page }) => {
  146 |     await page.locator('button', { hasText: /Launch Interview Session/i }).click();
  147 |     const submitBtn = page.locator('button', { hasText: /Submit Answer/i });
  148 |     await expect(submitBtn).toBeVisible({ timeout: 15000 });
  149 |   });
  150 | 
  151 |   test('INT-23: Submitting answer triggers evaluation loading spinner state text', async ({ page }) => {
  152 |     await page.locator('button', { hasText: /Launch Interview Session/i }).click();
  153 |     const answerTextarea = page.locator('textarea[placeholder*="Write your response"]');
  154 |     await answerTextarea.fill('We configure Route 53 latency queues paired with active-active databases to support instant failovers.');
  155 |     await page.locator('button', { hasText: /Submit Answer/i }).click();
  156 |     const evaluatingText = page.locator('text=Evaluating Answer');
  157 |     await expect(evaluatingText).toBeVisible({ timeout: 5000 });
  158 |   });
  159 | 
  160 |   test('INT-24: Evaluation feedback renders score pill (0-10) after submission', async ({ page }) => {
  161 |     await page.locator('button', { hasText: /Launch Interview Session/i }).click();
  162 |     await page.locator('textarea[placeholder*="Write your response"]').fill('We use multi-stage Docker builds to reduce image size and security vulnerability surfaces.');
  163 |     await page.locator('button', { hasText: /Submit Answer/i }).click();
  164 |     const scorePill = page.locator('span', { hasText: /\/ 10/i });
  165 |     await expect(scorePill).toBeVisible({ timeout: 15000 });
  166 |   });
  167 | 
  168 |   test('INT-25: Evaluation feedback displays Strengths and Improvement suggestions', async ({ page }) => {
```