import WolframAlphaAPI from 'wolfram-alpha-api';

export class WolframService {
  private client: WolframAlphaAPI | null;

  constructor(appId: string) {
    if (!appId) {
      console.warn('Wolfram Alpha API key not provided. Analysis features will be limited.');
      this.client = null;
    } else {
      this.client = new WolframAlphaAPI(appId);
    }
  }

  async analyzeIssue(description: string) {
    try {
      if (!this.client) {
        return {
          analysis: 'Analysis not available - Wolfram Alpha API key not configured',
          confidence: 'low'
        };
      }

      const prompt = `Analyze this civic issue: ${description}`;
      const analysis = await this.client.getShort(prompt);
      return {
        analysis,
        confidence: 'high',
      };
    } catch (error) {
      console.error('Wolfram Alpha analysis error:', error);
      return {
        analysis: 'Failed to analyze issue',
        confidence: 'low'
      };
    }
  }
}
