# Semantic Similarity Matching System

This document explains the new semantic similarity matching feature that allows organizers to filter volunteers based on how well their motivations align with the organizer's requirements.

## How It Works

The semantic similarity system analyzes text using multiple factors:

### 1. Exact Word Matching (40% weight)
- Directly compares words between requirements and volunteer motivations
- Case-insensitive matching

### 2. Domain-Specific Keywords (35% weight)
The system recognizes specialized vocabulary in these domains:
- **Medical**: medical, health, healthcare, clinical, doctor, nurse, patient, hospital, treatment
- **Humanitarian**: humanitarian, aid, relief, emergency, crisis, refugee, shelter, food, water
- **Logistics**: logistics, coordination, transport, supply, distribution, planning, management
- **Translation**: translation, interpret, language, bilingual, multilingual, communicate
- **Mental Health**: mental, psychology, counseling, therapy, emotional, support, trauma, stress
- **Education**: education, teaching, training, workshop, curriculum, learning, knowledge
- **Technology**: technology, software, programming, digital, computer, app, website, data
- **Fundraising**: fundraising, donation, finance, budget, grant, sponsor, money, fund

### 3. Semantic Groups (25% weight)
Groups of related words that convey similar meanings:
- Help/Support: help, assist, support, aid, serve, contribute, volunteer
- Experience: experience, skilled, expertise, knowledge, background, qualified
- Motivation: passionate, motivated, dedicated, committed, enthusiastic, interested
- Community: community, people, society, population, individuals, families
- Urgency: urgent, critical, immediate, emergency, priority, essential

## Features

### Always-On Smart Matching
- Semantic similarity filtering is automatically applied when organizers enter requirements
- No need to toggle the feature on/off - it works seamlessly in the background

### Similarity Score Threshold
- Adjustable minimum similarity score (20%, 40%, 60%, 80%)
- Higher thresholds = more selective matching
- Lower thresholds = broader matching
- Only visible when requirements are entered

### Match Visualization
- Similarity score displayed as percentage with color coding:
  - Green (60%+): High match
  - Orange (40-59%): Medium match
  - Red (<40%): Low match
- Matched keywords highlighted as chips
- Volunteer motivation text displayed for context

## Usage Example

**Organizer Requirements:**
> "We need experienced medical professionals who are passionate about providing healthcare in emergency situations. Candidates should have clinical experience and be comfortable working in high-stress environments."

**Volunteer Motivation (High Match - 85%):**
> "I'm a registered nurse with 5 years of emergency room experience. I'm passionate about humanitarian work and have volunteered in disaster relief efforts. I want to use my medical skills to help people in crisis situations."

**Matched Terms:** medical, emergency, experience, passionate, healthcare, clinical

## Implementation Details

The system is implemented in `utils/semanticSimilarity.ts` and integrated into the `AvailableVolunteersScreen` component. It processes text by:

1. Normalizing and tokenizing (removing punctuation, stop words)
2. Calculating weighted scores across the three similarity dimensions
3. Returning a percentage score and list of matched terms

The filtering is applied in real-time as users adjust their requirements and similarity threshold settings.
