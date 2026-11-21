# AI Trip Planner ✈️

An AI-powered travel planning web application that helps users create personalized travel itineraries based on their preferences, budget, group size, and trip duration.

## Features

- **AI-Powered Planning:** Generate personalized travel plans using AI.
- **Smart Itineraries:** Get organized day-wise travel itineraries.
- **Budget Selection:** Plan trips according to your budget.
- **Group Preferences:** Customize plans based on your travel group.
- **Hotel Recommendations:** Explore accommodation options.
- **Place Recommendations:** Discover destinations and attractions.
- **Interactive Maps:** Explore travel destinations using Mapbox.
- **Authentication:** Secure user authentication.
- **Responsive Interface:** User-friendly web experience.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React & TypeScript | UI development |
| Tailwind CSS | Styling |
| Convex | Database and backend |
| Clerk | Authentication |
| OpenAI (via OpenRouter) | AI integration |
| Google Places API | Location and place information |
| Unsplash API | Destination images |
| Arcjet | Security and rate limiting |

## Getting Started

### Prerequisites

- Node.js
- npm
- Required API keys and service accounts

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd AI-Trip-Planner
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and configure the required environment variables.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

The application requires API credentials and configuration for its integrated services, including:

- Clerk
- Convex
- OpenRouter / OpenAI
- Google Places API
- Unsplash
- Arcjet

Never commit actual API keys or secret credentials to GitHub.

## Project Type

Web Application

## Author

Harsh Pandey