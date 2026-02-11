# Shin-Byul History Adventure (별별 히스토리 어드벤처)

An interactive Korean history learning application for elementary students, featuring "Big Star Teacher" style lectures, cartoons, rhythm games, and a gamified ranking system.

## Project Structure

- `src/app`: Next.js App Router pages (Dashboard, Lecture Dynamic Routes).
- `src/components`: Reusable UI components (CartoonViewer, RhythmGame, QuizComponent).
- `src/data`: JSON data for curriculum, scripts, quizzes, storyboards, and games.
- `src/store`: Zustand state management for gamification.
- `src/styles`: Global CSS and Tailwind configuration.

## Key Features

1.  **Curriculum**: 20 lectures covering Gojoseon to Modern Korea.
2.  **Gamification**: Earn ranks (Commoner -> King) by completing lectures and quizzes.
3.  **Visualization**:
    -   **Art Board**: Visual summaries of lectures (Placeholder images included).
    -   **4-Cut Cartoons**: Story-based learning for key events.
4.  **Interactive Learning**:
    -   **Rhythm Game**: Memorize keywords through rhythm.
    -   **Quizzes**: 5-minute concept checks with instant feedback.

## Getting Started

### Prerequisites

-   **Node.js**: Version 20 or higher is recommended.
-   **npm**: Included with Node.js.

### Installation & Run

1.  **Navigate to the project directory**:
    ```bash
    cd "초등역사 앱"
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the application**:
    Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal, e.g., 3001, 3002) with your browser.

## Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Styling**: TailwindCSS
-   **Animation**: Framer Motion
-   **State Management**: Zustand
