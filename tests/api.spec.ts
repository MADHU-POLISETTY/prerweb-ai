import { test, expect } from '@playwright/test';
import { ApiPage } from '../pages/ApiPage';

test.describe('POM API Testing Suite (40 Tests)', () => {

  let apiPage: ApiPage;

  test.beforeEach(async ({ request }) => {
    apiPage = new ApiPage(request);
  });

  test('API-01: POST /api/generate-questions with AWS domain returns status 200', async () => {
    const res = await apiPage.generateQuestions('AWS', 'Advanced', 3);
    expect(res.status()).toBe(200);
  });

  test('API-02: POST /api/generate-questions returns non-empty questions array payload', async () => {
    const res = await apiPage.generateQuestions('Docker', 'Intermediate', 2);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test('API-03: POST /api/generate-questions question objects contain id and text fields', async () => {
    const res = await apiPage.generateQuestions('Kubernetes', 'Advanced', 2);
    const data = await res.json();
    expect(data[0].id).toBeDefined();
    expect(data[0].text).toBeDefined();
  });

  test('API-04: POST /api/generate-questions with Terraform domain succeeds', async () => {
    const res = await apiPage.generateQuestions('Terraform', 'Advanced', 1);
    expect(res.status()).toBe(200);
  });

  test('API-05: POST /api/generate-questions with Linux domain succeeds', async () => {
    const res = await apiPage.generateQuestions('Linux', 'Intermediate', 1);
    expect(res.status()).toBe(200);
  });

  test('API-06: POST /api/generate-questions with Cloud Security domain succeeds', async () => {
    const res = await apiPage.generateQuestions('Cloud Security', 'Advanced', 1);
    expect(res.status()).toBe(200);
  });

  test('API-07: POST /api/generate-questions with System Design domain succeeds', async () => {
    const res = await apiPage.generateQuestions('System Design', 'Advanced', 1);
    expect(res.status()).toBe(200);
  });

  test('API-08: POST /api/evaluate-answer returns status 200 OK', async () => {
    const res = await apiPage.evaluateAnswer(
      'How do you manage Docker multi-stage builds?',
      'We use multi-stage builds to split builder and production runner environments.'
    );
    expect(res.status()).toBe(200);
  });

  test('API-09: POST /api/evaluate-answer response payload contains score, feedback, idealAnswer', async () => {
    const res = await apiPage.evaluateAnswer(
      'What is AWS S3 bucket versioning?',
      'Versioning saves past versions of objects to prevent accidental deletion.'
    );
    const data = await res.json();
    expect(data.score).toBeDefined();
    expect(data.feedback).toBeDefined();
    expect(data.idealAnswer).toBeDefined();
  });

  test('API-10: POST /api/evaluate-answer score is within 0-10 range', async () => {
    const res = await apiPage.evaluateAnswer(
      'Explain Terraform state locking.',
      'State locking locks state in S3 and DynamoDB during apply.'
    );
    const data = await res.json();
    expect(data.score).toBeGreaterThanOrEqual(0);
    expect(data.score).toBeLessThanOrEqual(10);
  });

  test('API-11: POST /api/evaluate-answer with empty answer text handles score gracefully', async () => {
    const res = await apiPage.evaluateAnswer('Explain Kubernetes pods.', '');
    const data = await res.json();
    expect(data.score).toBe(0);
  });

  test('API-12: POST /api/evaluate-answer with gibberish answer text yields 0 score', async () => {
    const res = await apiPage.evaluateAnswer('Explain AWS IAM roles.', 'asdfasdfasdf');
    const data = await res.json();
    expect(data.score).toBe(0);
  });

  test('API-13: POST /api/analyze-resume returns status 200 OK', async () => {
    const res = await apiPage.analyzeResume(
      'Senior DevOps Engineer skilled in AWS, Docker, Kubernetes, Terraform, and TypeScript.',
      'Looking for a Cloud Engineer.'
    );
    expect(res.status()).toBe(200);
  });

  test('API-14: POST /api/analyze-resume payload contains atsScore, skills, strengths', async () => {
    const res = await apiPage.analyzeResume(
      'Senior Cloud Architect resume text.',
      'Cloud Architect job description.'
    );
    const data = await res.json();
    expect(data.atsScore).toBeDefined();
    expect(data.skills).toBeDefined();
    expect(data.strengths).toBeDefined();
  });

  test('API-15: POST /api/analyze-resume atsScore is within 0-100 percentage', async () => {
    const res = await apiPage.analyzeResume('Software Engineer resume text.');
    const data = await res.json();
    expect(data.atsScore).toBeGreaterThanOrEqual(0);
    expect(data.atsScore).toBeLessThanOrEqual(100);
  });

  test('API-16: POST /api/ask-ms returns status 200 OK for Lead Coach interaction', async () => {
    const res = await apiPage.askMentor([
      { role: 'user', text: 'How do I prepare for a Senior DevOps interview at Stripe?' }
    ]);
    expect(res.status()).toBe(200);
  });

  test('API-17: POST /api/ask-ms payload contains text advice response', async () => {
    const res = await apiPage.askMentor([
      { role: 'user', text: 'Stripe webhooks alignment' }
    ]);
    const data = await res.json();
    expect(data.text).toBeDefined();
  });

  test('API-18: POST /api/generate-questions with GCP domain succeeds', async () => {
    const res = await apiPage.generateQuestions('GCP', 'Intermediate', 1);
    expect(res.status()).toBe(200);
  });

  test('API-19: POST /api/generate-questions with Azure domain succeeds', async () => {
    const res = await apiPage.generateQuestions('Azure', 'Intermediate', 1);
    expect(res.status()).toBe(200);
  });

  test('API-20: POST /api/generate-questions with Git domain succeeds', async () => {
    const res = await apiPage.generateQuestions('Git & GitHub', 'Intermediate', 1);
    expect(res.status()).toBe(200);
  });

  test('API-21: POST /api/generate-questions with STAR Behavioral domain succeeds', async () => {
    const res = await apiPage.generateQuestions('STAR Behavioral', 'Intermediate', 1);
    expect(res.status()).toBe(200);
  });

  test('API-22: POST /api/evaluate-answer for Docker namespaces returns detailed feedback', async () => {
    const res = await apiPage.evaluateAnswer('Explain Docker namespaces.', 'Namespaces isolate container resources.');
    const data = await res.json();
    expect(data.feedback.length).toBeGreaterThan(5);
  });

  test('API-23: POST /api/evaluate-answer for Kubernetes probes returns detailed feedback', async () => {
    const res = await apiPage.evaluateAnswer('Explain liveness and readiness probes.', 'Probes check pod health state.');
    const data = await res.json();
    expect(data.feedback.length).toBeGreaterThan(5);
  });

  test('API-24: POST /api/evaluate-answer for Terraform state returns detailed feedback', async () => {
    const res = await apiPage.evaluateAnswer('Explain Terraform state file.', 'State file tracks infrastructure state.');
    const data = await res.json();
    expect(data.feedback.length).toBeGreaterThan(5);
  });

  test('API-25: POST /api/evaluate-answer for Jenkinsfile returns detailed feedback', async () => {
    const res = await apiPage.evaluateAnswer('Explain Jenkinsfile pipeline as code.', 'Jenkinsfile defines pipeline steps in Git.');
    const data = await res.json();
    expect(data.feedback.length).toBeGreaterThan(5);
  });

  test('API-26: POST /api/analyze-resume keywordMatches array structure validation', async () => {
    const res = await apiPage.analyzeResume('DevOps TypeScript Docker');
    const data = await res.json();
    expect(Array.isArray(data.keywordMatches)).toBe(true);
  });

  test('API-27: POST /api/analyze-resume missingSkills array structure validation', async () => {
    const res = await apiPage.analyzeResume('Basic HTML developer.');
    const data = await res.json();
    expect(Array.isArray(data.missingSkills)).toBe(true);
  });

  test('API-28: POST /api/ask-ms response contains non-empty text string', async () => {
    const res = await apiPage.askMentor([{ role: 'user', text: 'Resume metrics checklist' }]);
    const data = await res.json();
    expect(typeof data.text).toBe('string');
    expect(data.text.length).toBeGreaterThan(0);
  });

  test('API-29: POST /api/generate-questions default content-type header is application/json', async () => {
    const res = await apiPage.generateQuestions('AWS', 'Beginner', 1);
    const headers = res.headers();
    expect(headers['content-type']).toContain('application/json');
  });

  test('API-30: POST /api/evaluate-answer content-type header is application/json', async () => {
    const res = await apiPage.evaluateAnswer('Question text', 'Answer text');
    const headers = res.headers();
    expect(headers['content-type']).toContain('application/json');
  });

  test('API-31: POST /api/analyze-resume content-type header is application/json', async () => {
    const res = await apiPage.analyzeResume('Resume text');
    const headers = res.headers();
    expect(headers['content-type']).toContain('application/json');
  });

  test('API-32: POST /api/ask-ms content-type header is application/json', async () => {
    const res = await apiPage.askMentor([{ role: 'user', text: 'Hello' }]);
    const headers = res.headers();
    expect(headers['content-type']).toContain('application/json');
  });

  test('API-33: POST /api/generate-questions with Custom topic injection', async () => {
    const res = await apiPage.request.post('/api/generate-questions', {
      data: {
        domain: 'AWS',
        difficulty: 'Advanced',
        numQuestions: 1,
        customTopic: 'VPC Peering',
        questionMode: 'ai'
      }
    });
    expect(res.status()).toBe(200);
  });

  test('API-34: POST /api/evaluate-answer with high quality answer returns score >= 7', async () => {
    const res = await apiPage.evaluateAnswer(
      'How do you achieve multi-region high availability on AWS?',
      'We configure Route 53 latency routing paired with active-active databases to support instant failovers across US-East and Europe regions.'
    );
    const data = await res.json();
    expect(data.score).toBeGreaterThanOrEqual(7);
  });

  test('API-35: POST /api/analyze-resume with extensive technical resume yields suitability verdict', async () => {
    const res = await apiPage.analyzeResume(
      'Senior Infrastructure Architect with 10 years experience in AWS, Kubernetes, Terraform, Docker, Python, System Design, and Security.'
    );
    const data = await res.json();
    expect(data.suitabilityVerdict).toBeDefined();
  });

  test('API-36: POST /api/generate-questions supports requesting 5 questions', async () => {
    const res = await apiPage.generateQuestions('Docker', 'Intermediate', 5);
    const data = await res.json();
    expect(data.length).toBe(5);
  });

  test('API-37: POST /api/evaluate-answer ideal answer fallback is non-empty string', async () => {
    const res = await apiPage.evaluateAnswer('What is Object-Oriented Programming in Java?', 'OOP is a programming paradigm.');
    const data = await res.json();
    expect(data.idealAnswer.length).toBeGreaterThan(10);
  });

  test('API-38: POST /api/ask-ms handles single message user turn', async () => {
    const res = await apiPage.askMentor([{ role: 'user', text: 'Advice on system design' }]);
    expect(res.status()).toBe(200);
  });

  test('API-39: POST /api/analyze-resume accepts empty job description without crashing', async () => {
    const res = await apiPage.analyzeResume('Senior DevOps Engineer resume details.');
    expect(res.status()).toBe(200);
  });

  test('API-40: API endpoints respond within acceptable execution duration limits (<5000ms)', async () => {
    const start = Date.now();
    const res = await apiPage.evaluateAnswer('Quick question', 'Quick answer');
    const duration = Date.now() - start;
    expect(res.status()).toBe(200);
    expect(duration).toBeLessThan(5000);
  });

});
