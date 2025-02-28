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
      // Use LLM API for comprehensive analysis
      const prompt = `
        Analyze this civic issue report:
        "${description}"
        
        Provide analysis in the following aspects:
        1. Category (infrastructure/environmental/safety/services/transportation)
        2. Urgency level (low/medium/high/critical)
        3. Estimated impact on community (scale 1-10)
        4. Required resources or authorities
      `;

      const analysis = await this.client.getLLMResult(prompt);
      
      // Parse the LLM response
      const result = this.parseAnalysis(analysis);

      return {
        analysis: result.analysis,
        classification: result.category,
        urgencyLevel: result.urgency,
        impact: result.impact,
        confidence: result.confidence,
        recommendations: result.recommendations
      };
    } catch (error) {
      console.error('Wolfram analysis failed:', error);
      // Fallback to basic classification
      const classification = this.classifyIssue(description);
      return {
        classification: classification.category,
        urgencyLevel: 'medium',
        impact: 5,
        confidence: classification.confidence,
        recommendations: ['Report requires manual review']
      };
    }
  }

  private parseAnalysis(analysis: string) {
    // Extract key information from LLM response
    const categoryMatch = analysis.match(/Category:\s*(\w+)/i);
    const urgencyMatch = analysis.match(/Urgency:\s*(\w+)/i);
    const impactMatch = analysis.match(/Impact:\s*(\d+)/i);

    return {
      analysis: analysis,
      category: categoryMatch?.[1]?.toLowerCase() || 'other',
      urgency: urgencyMatch?.[1]?.toLowerCase() || 'medium',
      impact: parseInt(impactMatch?.[1] || '5'),
      confidence: this.calculateConfidence(analysis),
      recommendations: this.extractRecommendations(analysis)
    };
  }

  private calculateConfidence(analysis: string): number {
    // Calculate confidence based on response completeness
    const requiredElements = [
      'Category:',
      'Urgency:',
      'Impact:',
      'Required resources:'
    ];

    const presentElements = requiredElements.filter(elem => 
      analysis.includes(elem)).length;

    return Math.min(0.3 + (presentElements / requiredElements.length) * 0.6, 0.95);
  }

  private extractRecommendations(analysis: string): string[] {
    const resourcesSection = analysis.match(/Required resources:(.*?)(?:\n|$)/is);
    if (!resourcesSection) return ['Manual review recommended'];

    return resourcesSection[1]
      .split(/[,.]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
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

    return {
      category: bestCategory,
      confidence: maxCount > 0 ? Math.min(maxCount * 0.2, 0.9) : 0.3
    };
  }
}
