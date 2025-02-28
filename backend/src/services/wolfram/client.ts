import WolframAlphaAPI from 'wolfram-alpha-api';

export class WolframService {
  private client: any;

  constructor(appId: string) {
    if (!appId) {
      console.warn('Wolfram Alpha API key not provided. Analysis features will be limited.');
    }
    this.client = WolframAlphaAPI(appId);
  }

  async analyzeIssue(description: string) {
    try {
      // Get computational results from Wolfram
      const result = await this.client.getShort(description);
      
      // Basic classification based on keywords
      const classification = this.classifyIssue(description);
      
      return {
        wolframResult: result,
        classification: classification.category,
        confidence: classification.confidence
      };
    } catch (error) {
      console.error('Wolfram analysis failed:', error);
      // Return basic classification if Wolfram fails
      const classification = this.classifyIssue(description);
      return {
        classification: classification.category,
        confidence: classification.confidence
      };
    }
  }

  private classifyIssue(text: string): { category: string; confidence: number } {
    const keywords = {
      infrastructure: ['road', 'bridge', 'building', 'street', 'sidewalk', 'construction'],
      environmental: ['pollution', 'waste', 'trash', 'green', 'tree', 'park', 'water'],
      safety: ['crime', 'dangerous', 'unsafe', 'security', 'emergency', 'accident'],
      services: ['utility', 'power', 'water', 'electricity', 'internet', 'garbage'],
      transportation: ['traffic', 'bus', 'train', 'parking', 'vehicle', 'transport']
    };

    const textLower = text.toLowerCase();
    let maxCount = 0;
    let bestCategory = 'other';
    
    for (const [category, words] of Object.entries(keywords)) {
      const count = words.filter(word => textLower.includes(word)).length;
      if (count > maxCount) {
        maxCount = count;
        bestCategory = category;
      }
    }

    // Calculate confidence based on keyword matches
    const confidence = maxCount > 0 ? Math.min(maxCount * 0.2, 0.9) : 0.3;

    return {
      category: bestCategory,
      confidence
    };
  }

  async classifyProblem(data: {
    description: string;
    category: string;
    location: string;
  }) {
    try {
      const query = `classify problem: ${data.description} in category ${data.category} at ${data.location}`;
      return await this.client.getFull(query);
    } catch (error) {
      console.error('Wolfram classification failed:', error);
      return null;
    }
  }
}
