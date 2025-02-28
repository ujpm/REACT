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
      // Use Full Results API for comprehensive analysis
      const fullResult = await this.client.getFull(description);
      
      // Extract relevant pods from full results
      const relevantData = this.extractRelevantData(fullResult);

      // Use LLM API for natural language understanding
      const llmAnalysis = await this.client.getLLMResult(
        `Analyze this civic issue: ${description}. Classify its urgency, impact, and required resources.`
      );

      // Combine both analyses
      return {
        wolframResult: relevantData,
        llmAnalysis: llmAnalysis,
        classification: this.combineAnalyses(relevantData, llmAnalysis),
        confidence: this.calculateConfidence(relevantData, llmAnalysis)
      };
    } catch (error) {
      console.error('Wolfram analysis failed:', error);
      // Fallback to basic classification
      const classification = this.classifyIssue(description);
      return {
        classification: classification.category,
        confidence: classification.confidence
      };
    }
  }

  private extractRelevantData(fullResult: any) {
    // Extract specific pods and subpods that are relevant to civic issues
    const relevantPods = fullResult.pods?.filter((pod: any) => {
      const relevantTitles = [
        'Classification',
        'Properties',
        'Analysis',
        'Statistics',
        'Interpretations'
      ];
      return relevantTitles.some(title => 
        pod.title.toLowerCase().includes(title.toLowerCase())
      );
    });

    return relevantPods?.map((pod: any) => ({
      title: pod.title,
      content: pod.subpods.map((subpod: any) => subpod.plaintext).join(' ')
    }));
  }

  private combineAnalyses(wolframData: any, llmAnalysis: any) {
    // Combine insights from both APIs
    const categories = {
      infrastructure: 0,
      environmental: 0,
      safety: 0,
      services: 0,
      transportation: 0
    };

    // Process Wolfram data
    wolframData?.forEach((pod: any) => {
      Object.keys(categories).forEach(category => {
        if (pod.content.toLowerCase().includes(category)) {
          categories[category as keyof typeof categories] += 1;
        }
      });
    });

    // Process LLM analysis
    Object.keys(categories).forEach(category => {
      if (llmAnalysis.toLowerCase().includes(category)) {
        categories[category as keyof typeof categories] += 2; // Weight LLM higher
      }
    });

    // Return category with highest score
    return Object.entries(categories)
      .reduce((max, [category, score]) => 
        score > max[1] ? [category, score] : max, ['other', 0])[0];
  }

  private calculateConfidence(wolframData: any, llmAnalysis: any): number {
    // Calculate confidence based on agreement between APIs
    if (!wolframData || !llmAnalysis) return 0.3;

    const wolframKeywords = this.extractKeywords(wolframData);
    const llmKeywords = this.extractKeywords(llmAnalysis);
    
    const overlap = wolframKeywords.filter(kw => 
      llmKeywords.includes(kw)).length;
    
    // Calculate confidence based on keyword overlap
    return Math.min(0.3 + (overlap * 0.1), 0.95);
  }

  private extractKeywords(data: any): string[] {
    const text = typeof data === 'string' ? data :
      JSON.stringify(data).toLowerCase();
    
    const keywords = [
      'urgent', 'critical', 'emergency', 'immediate',
      'safety', 'danger', 'hazard', 'risk',
      'infrastructure', 'repair', 'maintenance',
      'environmental', 'pollution', 'waste',
      'public', 'community', 'service'
    ];

    return keywords.filter(kw => text.includes(kw));
  }

  private classifyIssue(text: string): { category: string; confidence: number } {
    // Fallback classification (same as before)
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
