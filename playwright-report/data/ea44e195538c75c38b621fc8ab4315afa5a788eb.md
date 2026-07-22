# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: interview\interview.spec.ts >> Interview Simulation Framework Specs >> INT-22: Submit Answer button is enabled and visible on active drill screen
- Location: tests\interview\interview.spec.ts:145:3

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Interview Simulation Framework Specs', () => {
  4   | 
  5   |   test.beforeEach(async ({ page }) => {
> 6   |     await page.goto('/');
      |                ^ Error: page.goto: Target page, context or browser has been closed
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
  68  |     await expect(beginnerBtn).toBeVisible();
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
```