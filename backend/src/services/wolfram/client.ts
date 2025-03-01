import WolframAlphaAPI from 'wolfram-alpha-api';

export class WolframService {
  private client: WolframAlphaAPI;

  constructor(appId: string) {
    if (!appId) {
      throw new Error('Wolfram Alpha API key is required');
    }
    this.client = new WolframAlphaAPI(appId);
  }

  async analyzeIssue(description: string) {
    try {
      const prompt = `Analyze this civic issue: ${description}`;
      const analysis = await this.client.getShort(prompt);
      return {
        analysis,
        confidence: 'high',
      };
    } catch (error) {
      console.error('Wolfram Alpha analysis error:', error);
      throw new Error('Failed to analyze issue with Wolfram Alpha');
    }
  }
}
