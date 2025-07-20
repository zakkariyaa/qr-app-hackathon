# MatchAid - Volunteer Matching Platform

A React Native application that connects humanitarian organizations with skilled volunteers using intelligent matching algorithms.

## Features

### For Volunteers

- Register with skills, availability, and motivation
- Multi-step onboarding process
- Skills categorization and custom skill input

### For Organizers

- Register with approved humanitarian organizations
- View available volunteers
- Filter volunteers by skills, location, and requirements
- **NEW: Semantic Similarity Matching** - Match volunteers based on how well their motivations align with your specific requirements

## Semantic Similarity Matching

The app now includes an advanced matching system that analyzes the semantic similarity between organizer requirements and volunteer motivations. This goes beyond simple keyword matching to understand context and meaning.

### Key Features:

- **Always-On Smart Matching**: Automatic semantic matching when requirements are provided
- **Adjustable Threshold**: Set minimum similarity scores (20%, 40%, 60%, 80%)
- **Match Visualization**: See similarity scores and matched keywords
- **Domain Awareness**: Recognizes terminology in medical, humanitarian, technology, and other fields

### How It Works:

1. **Exact Word Matching** (40%): Direct word overlap between requirements and motivations
2. **Domain Keywords** (35%): Recognition of specialized vocabulary in relevant fields
3. **Semantic Groups** (25%): Understanding of related concepts and synonyms

See `docs/semantic-similarity.md` for detailed documentation.

## Getting Started

```bash
npm install
npm start
```

## Project Structure

- `/screens/` - React Native screen components
- `/utils/` - Utility functions including semantic similarity
- `/styles/` - Shared styling
- `/data/` - Static data and configurations
- `/docs/` - Documentation
- `/tests/` - Test files and examples
