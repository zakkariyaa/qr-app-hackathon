// Semantic similarity utility for matching volunteer motivations with organizer requirements

interface SimilarityResult {
  score: number;
  matchedTerms: string[];
}

/**
 * Calculate semantic similarity between two texts using a combination of:
 * - Word overlap
 * - Keyword matching
 * - Contextual relevance
 */
export function calculateSemanticSimilarity(
  requirements: string,
  motivation: string
): SimilarityResult {
  if (!requirements.trim() || !motivation.trim()) {
    return { score: 0, matchedTerms: [] };
  }

  const reqWords = normalizeAndTokenize(requirements);
  const motWords = normalizeAndTokenize(motivation);

  // Define domain-specific keywords with weights
  const domainKeywords = {
    medical: [
      "medical",
      "health",
      "healthcare",
      "clinical",
      "doctor",
      "nurse",
      "patient",
      "hospital",
      "treatment",
    ],
    humanitarian: [
      "humanitarian",
      "aid",
      "relief",
      "emergency",
      "crisis",
      "refugee",
      "shelter",
      "food",
      "water",
    ],
    logistics: [
      "logistics",
      "coordination",
      "transport",
      "supply",
      "distribution",
      "planning",
      "management",
    ],
    translation: [
      "translation",
      "interpret",
      "language",
      "bilingual",
      "multilingual",
      "communicate",
    ],
    mentalHealth: [
      "mental",
      "psychology",
      "counseling",
      "therapy",
      "emotional",
      "support",
      "trauma",
      "stress",
    ],
    education: [
      "education",
      "teaching",
      "training",
      "workshop",
      "curriculum",
      "learning",
      "knowledge",
    ],
    technology: [
      "technology",
      "software",
      "programming",
      "digital",
      "computer",
      "app",
      "website",
      "data",
    ],
    fundraising: [
      "fundraising",
      "donation",
      "finance",
      "budget",
      "grant",
      "sponsor",
      "money",
      "fund",
    ],
  };

  let score = 0;
  const matchedTerms: string[] = [];

  // 1. Exact word matches (40% weight)
  const exactMatches = reqWords.filter((word) => motWords.includes(word));
  score += (exactMatches.length / Math.max(reqWords.length, 1)) * 0.4;
  matchedTerms.push(...exactMatches);

  // 2. Domain keyword matching (35% weight)
  let domainScore = 0;
  const reqDomains = new Set<string>();
  const motDomains = new Set<string>();

  Object.entries(domainKeywords).forEach(([domain, keywords]) => {
    const reqHasDomain = keywords.some((keyword) => reqWords.includes(keyword));
    const motHasDomain = keywords.some((keyword) => motWords.includes(keyword));

    if (reqHasDomain) reqDomains.add(domain);
    if (motHasDomain) motDomains.add(domain);

    if (reqHasDomain && motHasDomain) {
      domainScore += 1;
      const commonKeywords = keywords.filter(
        (k) => reqWords.includes(k) && motWords.includes(k)
      );
      matchedTerms.push(...commonKeywords);
    }
  });

  score += (domainScore / Math.max(reqDomains.size, 1)) * 0.35;

  // 3. Semantic proximity (25% weight)
  const semanticGroups = [
    ["help", "assist", "support", "aid", "serve", "contribute", "volunteer"],
    [
      "experience",
      "skilled",
      "expertise",
      "knowledge",
      "background",
      "qualified",
    ],
    [
      "passionate",
      "motivated",
      "dedicated",
      "committed",
      "enthusiastic",
      "interested",
    ],
    ["community", "people", "society", "population", "individuals", "families"],
    ["urgent", "critical", "immediate", "emergency", "priority", "essential"],
  ];

  let semanticScore = 0;
  semanticGroups.forEach((group) => {
    const reqHasGroup = group.some((word) => reqWords.includes(word));
    const motHasGroup = group.some((word) => motWords.includes(word));
    if (reqHasGroup && motHasGroup) {
      semanticScore += 1;
      const commonWords = group.filter(
        (w) => reqWords.includes(w) && motWords.includes(w)
      );
      matchedTerms.push(...commonWords);
    }
  });

  score += (semanticScore / semanticGroups.length) * 0.25;

  // Normalize score to 0-1 range and convert to percentage
  score = Math.min(score, 1) * 100;

  return {
    score: Math.round(score),
    matchedTerms: [...new Set(matchedTerms)], // Remove duplicates
  };
}

/**
 * Normalize and tokenize text for comparison
 */
function normalizeAndTokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // Replace punctuation with spaces
    .split(/\s+/)
    .filter((word) => word.length > 2) // Filter out very short words
    .filter((word) => !isStopWord(word)); // Remove stop words
}

/**
 * Check if a word is a stop word
 */
function isStopWord(word: string): boolean {
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "can",
    "this",
    "that",
    "these",
    "those",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
    "my",
    "your",
    "his",
    "her",
    "its",
    "our",
    "their",
    "am",
  ]);

  return stopWords.has(word);
}

/**
 * Sort volunteers by similarity score
 */
export function sortVolunteersBySimilarity(
  volunteers: any[],
  requirements: string
): Array<any & { similarityScore: number; matchedTerms: string[] }> {
  if (!requirements.trim()) {
    return volunteers.map((v) => ({
      ...v,
      similarityScore: 0,
      matchedTerms: [],
    }));
  }

  return volunteers
    .map((volunteer) => {
      const motivationText = volunteer.motivation?.motivations || "";
      const similarity = calculateSemanticSimilarity(
        requirements,
        motivationText
      );
      return {
        ...volunteer,
        similarityScore: similarity.score,
        matchedTerms: similarity.matchedTerms,
      };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore);
}
