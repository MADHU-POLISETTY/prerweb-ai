import { APIRequestContext, expect } from '@playwright/test';

export class ApiPage {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async generateQuestions(domain: string, difficulty: string = 'Advanced', numQuestions: number = 3) {
    return this.request.post('/api/generate-questions', {
      data: {
        domain,
        difficulty,
        numQuestions,
        role: domain,
        company: 'PrepWise AI',
        questionMode: 'ai'
      }
    });
  }

  async evaluateAnswer(question: string, answer: string) {
    return this.request.post('/api/evaluate-answer', {
      data: { question, answer }
    });
  }

  async analyzeResume(resumeText: string, targetJobDesc: string = '') {
    return this.request.post('/api/analyze-resume', {
      data: { resumeText, targetJobDesc }
    });
  }

  async askMentor(messages: { role: string; text: string }[]) {
    return this.request.post('/api/ask-ms', {
      data: { messages }
    });
  }
}
