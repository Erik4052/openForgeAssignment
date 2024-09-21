# Open Forge App

# A GitHub Users App

This is an Ionic + Angular application that fetches and displays GitHub users using GitHub's public API. The project is built with **standalone components** and uses Angular's **new dependency injection system** introduced in Angular 14. The app includes a search functionality and infinite scroll to load more users from the GitHub API.

## Prerequisites

1. **GitHub Personal Access Token (PAT)**
   
   To use the GitHub API in this application, you will need a **GitHub Personal Access Token** (PAT). This token is required to authenticate requests to GitHub's API. Without it, you may encounter errors due to rate limiting or unauthorized access.

   ### How to Generate a GitHub Personal Access Token

   1. Go to your GitHub account.
   2. Navigate to **Settings > Developer settings > Personal access tokens**.
   3. Click **Generate new token**.
   4. Select the required scopes (usually `read:user` and `user:email` are sufficient).
   5. Copy and save the token, as you will not be able to see it again.

   Once you have your token, place it in the environment configuration of the project (`src/environments/environment.ts` and `src/environments/environment.prod.ts`) like this:

   ```typescript
   export const environment = {
     production: false,
     githubToken: 'your-github-token-here',
     githubApi: 'https://api.github.com/users'
   };

## Proyect Overview
### Key Features

Standalone Components: This application follows Angular's standalone components feature, which allows for more modular development without the need for NgModules.
New Dependency Injection System: The project uses Angular's new dependency injection system (inject()) for cleaner and more concise code, eliminating the need for constructor-based injection.
GitHub API Integration: Fetches user data from the GitHub API with the ability to paginate and search users by login.
Search Functionality: Includes a search bar to find users by their GitHub login.
Infinite Scroll: Loads more users as you scroll down, utilizing Ionic's infinite scroll component.
Removed Test Files
During the development of this project, all unnecessary test files (such as *.spec.ts) were removed, as they were not required for this proof-of-concept application.

## Installation and Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/github-users-app.git
cd github-users-app
Install dependencies:

npm install
Add your GitHub Personal Access Token: Replace 'your-github-token-here' in src/environments/environment.ts and src/environments/environment.prod.ts with your actual token.

Run the application:
Copy code:
ionic serve
The app will run on http://localhost:8100.

Running the Application
Once the app is running, you can:

Search for users: Type a GitHub login name into the search bar.
Load more users: Scroll down to load more users from GitHub.
View user details: Click on a user to view their GitHub profile details.
Technologies Used
Ionic Framework: For UI components and mobile support.
Angular: Using standalone components and the latest dependency injection improvements.
NgRx: For state management of the user list and search results.
Capacitor: For platform-specific functionality, like opening external URLs.
License
This project is licensed under the MIT License.
