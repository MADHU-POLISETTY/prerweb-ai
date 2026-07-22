# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: interview\interview.spec.ts >> Interview Simulation Framework Specs >> INT-16: Pin Custom Question button adds question to pinned list badge
- Location: tests\interview\interview.spec.ts:106:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button').filter({ hasText: /Custom Pinned Bank/i })

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - banner [ref=e5]:
    - generic [ref=e6]:
      - img [ref=e8]
      - generic [ref=e11]:
        - heading "PrepWise AI" [level=1] [ref=e12]
        - paragraph [ref=e13]: Candidate Control Center
    - generic [ref=e14]:
      - generic [ref=e17]: SYS ACTIVE
      - button [ref=e18]:
        - img [ref=e19]
  - main [ref=e22]:
    - generic [ref=e24]:
      - button "Back to Home" [ref=e25] [cursor=pointer]:
        - img [ref=e26]
        - generic [ref=e28]: Back to Home
      - generic [ref=e29]:
        - generic [ref=e30]: Simulation Studio
        - heading "Mock Interview Setup" [level=2] [ref=e31]
        - paragraph [ref=e32]: Tailor your evaluation. Gemini will render customized professional queries.
      - generic [ref=e33]:
        - generic [ref=e34]: Session Focus domain
        - generic [ref=e35]:
          - button "Cloud Computing" [ref=e36] [cursor=pointer]:
            - generic [ref=e37]:
              - img [ref=e38]
              - generic [ref=e40]: Cloud Computing
            - img [ref=e41]
          - button "AWS" [ref=e44] [cursor=pointer]:
            - generic [ref=e45]:
              - img [ref=e46]
              - generic [ref=e50]: AWS
          - button "GCP" [ref=e51] [cursor=pointer]:
            - generic [ref=e52]:
              - img [ref=e53]
              - generic [ref=e56]: GCP
          - button "Azure" [ref=e57] [cursor=pointer]:
            - generic [ref=e58]:
              - img [ref=e59]
              - generic [ref=e63]: Azure
          - button "Linux" [ref=e64] [cursor=pointer]:
            - generic [ref=e65]:
              - img [ref=e66]
              - generic [ref=e68]: Linux
          - button "Docker" [ref=e69] [cursor=pointer]:
            - generic [ref=e70]:
              - img [ref=e71]
              - generic [ref=e74]: Docker
          - button "Kubernetes" [ref=e75] [cursor=pointer]:
            - generic [ref=e76]:
              - img [ref=e77]
              - generic [ref=e80]: Kubernetes
          - button "Terraform" [ref=e81] [cursor=pointer]:
            - generic [ref=e82]:
              - img [ref=e83]
              - generic [ref=e85]: Terraform
          - button "Jenkins" [ref=e86] [cursor=pointer]:
            - generic [ref=e87]:
              - img [ref=e88]
              - generic [ref=e90]: Jenkins
          - button "Git & GitHub" [ref=e91] [cursor=pointer]:
            - generic [ref=e92]:
              - img [ref=e93]
              - generic [ref=e97]: Git & GitHub
          - button "Networking" [ref=e98] [cursor=pointer]:
            - generic [ref=e99]:
              - img [ref=e100]
              - generic [ref=e105]: Networking
          - button "Cloud Security" [ref=e106] [cursor=pointer]:
            - generic [ref=e107]:
              - img [ref=e108]
              - generic [ref=e111]: Cloud Security
          - button "DevOps" [ref=e112] [cursor=pointer]:
            - generic [ref=e113]:
              - img [ref=e114]
              - generic [ref=e116]: DevOps
          - button "STAR Behavioral" [ref=e117] [cursor=pointer]:
            - generic [ref=e118]:
              - img [ref=e119]
              - generic [ref=e123]: STAR Behavioral
          - button "System Design" [ref=e124] [cursor=pointer]:
            - generic [ref=e125]:
              - img [ref=e126]
              - generic [ref=e128]: System Design
          - button "Custom" [ref=e129] [cursor=pointer]:
            - generic [ref=e130]:
              - img [ref=e131]
              - generic [ref=e134]: Custom
      - generic [ref=e135]:
        - generic [ref=e136]:
          - generic [ref=e137]: Target professional role
          - textbox "e.g. AWS Cloud Engineer, DevOps Lead, SRE" [ref=e138]: Cloud DevOps Architect
        - generic [ref=e139]:
          - generic [ref=e140]: Target company standard focus
          - textbox "e.g. Stripe, Netflix, Google" [ref=e141]: Google
        - generic [ref=e142]:
          - generic [ref=e143]:
            - generic [ref=e144]: Appraisal intensity level
            - generic [ref=e145]:
              - button "Easy" [ref=e146] [cursor=pointer]
              - button "Medium" [ref=e147] [cursor=pointer]
              - button "Hard" [ref=e148] [cursor=pointer]
          - generic [ref=e149]:
            - generic [ref=e150]: Number of questions
            - generic [ref=e151]:
              - button "3 Qs" [ref=e152] [cursor=pointer]
              - button "5 Qs" [ref=e153] [cursor=pointer]
              - button "10 Qs" [ref=e154] [cursor=pointer]
        - generic [ref=e155]:
          - generic [ref=e156]: Question Source Architecture
          - generic [ref=e157]:
            - button "Curated Bank Secure repository" [ref=e158] [cursor=pointer]:
              - generic [ref=e160]: Curated Bank
              - generic [ref=e161]: Secure repository
            - button "Dynamic AI Custom Gemini scenario" [ref=e162] [cursor=pointer]:
              - generic [ref=e164]: Dynamic AI
              - generic [ref=e165]: Custom Gemini scenario
            - button "Hybrid Mix Curated + dynamic AI" [ref=e166] [cursor=pointer]:
              - generic [ref=e168]: Hybrid Mix
              - generic [ref=e170]: Curated + dynamic AI
        - generic [ref=e171]:
          - generic [ref=e172]:
            - generic [ref=e173]:
              - heading "Curated Database Explorer" [level=4] [ref=e174]:
                - img [ref=e175]
                - generic [ref=e179]: Curated Database Explorer
              - paragraph [ref=e180]: Select, pin, or upload custom questions for your session.
            - generic [ref=e181]: 0 / 5 Pinned
          - generic [ref=e182]:
            - button "Curated Vault" [ref=e183]
            - button "Upload / Add Custom" [ref=e184]
          - generic [ref=e185]:
            - img [ref=e186]
            - textbox "Search verified questions..." [ref=e189]
          - generic [ref=e190]:
            - button "What is cloud tenant isolation, and how do public cloud providers ensure secure multi-tenancy?" [ref=e191] [cursor=pointer]:
              - img [ref=e194]
              - paragraph [ref=e197]: What is cloud tenant isolation, and how do public cloud providers ensure secure multi-tenancy?
            - button "How do Content Delivery Networks (CDNs) leverage edge caching to improve global latency?" [ref=e198] [cursor=pointer]:
              - img [ref=e201]
              - paragraph [ref=e204]: How do Content Delivery Networks (CDNs) leverage edge caching to improve global latency?
            - button "What is horizontal scaling vs vertical scaling in a cloud environment, and when is each appropriate?" [ref=e205] [cursor=pointer]:
              - img [ref=e208]
              - paragraph [ref=e211]: What is horizontal scaling vs vertical scaling in a cloud environment, and when is each appropriate?
        - generic [ref=e212]:
          - generic [ref=e213]: Focus Topics / Key Skills (Optional)
          - textbox "e.g. Concurrency pipelines, system design" [ref=e214]
      - button "Compile Prep Session" [ref=e215] [cursor=pointer]:
        - img [ref=e216]
        - generic [ref=e218]: Compile Prep Session
  - navigation [ref=e219]:
    - button "Home" [ref=e220] [cursor=pointer]:
      - img [ref=e221]
      - generic [ref=e224]: Home
    - button "Interview" [active] [ref=e225] [cursor=pointer]:
      - img [ref=e226]
      - generic [ref=e228]: Interview
    - button "Resume" [ref=e229] [cursor=pointer]:
      - img [ref=e230]
      - generic [ref=e233]: Resume
    - button "Analytics" [ref=e234] [cursor=pointer]:
      - img [ref=e235]
      - generic [ref=e237]: Analytics
    - button "Profile" [ref=e238] [cursor=pointer]:
      - img [ref=e239]
      - generic [ref=e242]: Profile
```

# Test source

```ts
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
> 107 |     await page.locator('button', { hasText: /Custom Pinned Bank/i }).click();
      |                                                                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  169 |     await page.locator('button', { hasText: /Launch Interview Session/i }).click();
  170 |     await page.locator('textarea[placeholder*="Write your response"]').fill('We set up Kubernetes Horizontal Pod Autoscalers based on CPU metrics and custom Prometheus alerts.');
  171 |     await page.locator('button', { hasText: /Submit Answer/i }).click();
  172 |     const feedbackHeader = page.locator('h4', { hasText: /Evaluation & Feedback/i });
  173 |     await expect(feedbackHeader).toBeVisible({ timeout: 15000 });
  174 |   });
  175 | 
  176 |   test('INT-26: Evaluation feedback includes Model Ideal Answer card', async ({ page }) => {
  177 |     await page.locator('button', { hasText: /Launch Interview Session/i }).click();
  178 |     await page.locator('textarea[placeholder*="Write your response"]').fill('We run Terraform plan before apply and store remote state in AWS S3 with DynamoDB state locking.');
  179 |     await page.locator('button', { hasText: /Submit Answer/i }).click();
  180 |     const idealAnswerHeader = page.locator('h4', { hasText: /Model Ideal Answer/i });
  181 |     await expect(idealAnswerHeader).toBeVisible({ timeout: 15000 });
  182 |   });
  183 | 
  184 |   test('INT-27: Next Question button advances to subsequent question step', async ({ page }) => {
  185 |     await page.locator('button', { hasText: /Launch Interview Session/i }).click();
  186 |     await page.locator('textarea[placeholder*="Write your response"]').fill('We configure Ansible playbooks to ensure idempotency across Linux cloud instances.');
  187 |     await page.locator('button', { hasText: /Submit Answer/i }).click();
  188 |     const nextBtn = page.locator('button', { hasText: /Next Question/i });
  189 |     await expect(nextBtn).toBeVisible({ timeout: 15000 });
  190 |     await nextBtn.click();
  191 |     const question2Step = page.locator('span', { hasText: /Question 2/i });
  192 |     await expect(question2Step).toBeVisible();
  193 |   });
  194 | 
  195 |   test('INT-28: Short or low quality answer receives feedback warning message', async ({ page }) => {
  196 |     await page.locator('button', { hasText: /Launch Interview Session/i }).click();
  197 |     await page.locator('textarea[placeholder*="Write your response"]').fill('idk');
  198 |     await page.locator('button', { hasText: /Submit Answer/i }).click();
  199 |     const feedbackText = page.locator('p', { hasText: /brief|invalid|meaningless/i });
  200 |     await expect(feedbackText).toBeVisible({ timeout: 15000 });
  201 |   });
  202 | 
  203 |   test('INT-29: Empty answer submission prompts candidate warning feedback', async ({ page }) => {
  204 |     await page.locator('button', { hasText: /Launch Interview Session/i }).click();
  205 |     await page.locator('button', { hasText: /Submit Answer/i }).click();
  206 |     const warningFeedback = page.locator('text=No answer provided');
  207 |     await expect(warningFeedback).toBeVisible({ timeout: 15000 });
```