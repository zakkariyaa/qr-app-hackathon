// Test file to demonstrate semantic similarity functionality
import {
  calculateSemanticSimilarity,
  sortVolunteersBySimilarity,
} from "../utils/semanticSimilarity";

// Example test data
const sampleRequirements =
  "We need experienced medical professionals who are passionate about providing healthcare in emergency situations. Candidates should have clinical experience and be comfortable working in high-stress environments.";

const sampleVolunteers = [
  {
    id: "1",
    name: "Sarah Johnson",
    motivation: {
      motivations:
        "I'm a registered nurse with 5 years of emergency room experience. I'm passionate about humanitarian work and have volunteered in disaster relief efforts. I want to use my medical skills to help people in crisis situations.",
    },
    skills: ["Medical Aid", "Mental Health Support"],
    location: "New York",
  },
  {
    id: "2",
    name: "Mike Chen",
    motivation: {
      motivations:
        "I'm a software engineer interested in using technology to solve humanitarian problems. I have experience building apps and websites and want to contribute my programming skills to help organizations coordinate relief efforts.",
    },
    skills: ["Technology", "Logistics"],
    location: "San Francisco",
  },
  {
    id: "3",
    name: "Dr. Ahmed Hassan",
    motivation: {
      motivations:
        "As a practicing physician specializing in emergency medicine, I have extensive experience treating patients in critical care settings. I am deeply committed to providing medical aid to underserved populations and have participated in medical missions.",
    },
    skills: ["Medical Aid", "Emergency Response"],
    location: "Chicago",
  },
  {
    id: "4",
    name: "Lisa Rodriguez",
    motivation: {
      motivations:
        "I speak fluent Spanish and English and have worked as a translator for immigration services. I want to help bridge communication gaps during humanitarian crises and ensure people can access the help they need.",
    },
    skills: ["Translation", "Cultural Liaison"],
    location: "Los Angeles",
  },
];

// Test function to run similarity analysis
export function testSemanticSimilarity() {
  console.log("=== Semantic Similarity Test ===\n");
  console.log("Requirements:", sampleRequirements);
  console.log("\n");

  // Test individual similarity calculations
  sampleVolunteers.forEach((volunteer) => {
    const similarity = calculateSemanticSimilarity(
      sampleRequirements,
      volunteer.motivation.motivations
    );

    console.log(`Volunteer: ${volunteer.name}`);
    console.log(`Similarity Score: ${similarity.score}%`);
    console.log(`Matched Terms: ${similarity.matchedTerms.join(", ")}`);
    console.log(
      `Motivation: ${volunteer.motivation.motivations.substring(0, 100)}...`
    );
    console.log("---");
  });

  // Test sorting functionality
  console.log("\n=== Sorted by Similarity ===");
  const sortedVolunteers = sortVolunteersBySimilarity(
    sampleVolunteers,
    sampleRequirements
  );

  sortedVolunteers.forEach((volunteer, index) => {
    console.log(
      `${index + 1}. ${volunteer.name} - ${volunteer.similarityScore}%`
    );
  });

  return sortedVolunteers;
}

// Test with different requirements
export function testDifferentRequirements() {
  const techRequirements =
    "Looking for software developers with experience in mobile app development and web technologies. Should be familiar with React Native, TypeScript, and database management.";

  console.log("\n=== Technology Requirements Test ===");
  console.log("Requirements:", techRequirements);

  const techSorted = sortVolunteersBySimilarity(
    sampleVolunteers,
    techRequirements
  );
  techSorted.forEach((volunteer, index) => {
    console.log(
      `${index + 1}. ${volunteer.name} - ${volunteer.similarityScore}%`
    );
  });

  return techSorted;
}

// Export for potential use in other test files
export { sampleRequirements, sampleVolunteers };
