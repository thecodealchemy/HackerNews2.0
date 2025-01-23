# HackerNews 2.0

HackerNews 2.0 is a modern, responsive web application that provides an improved interface for browsing Hacker News stories. The app allows users to explore top, new, and best stories, view detailed comments, and check user profiles with a sleek dark/light mode switch.

## Features

- 🔥 View Top, New, and Best Hacker News stories.
- 💬 Expand story comments with nested replies.
- 👤 View user profiles and their submissions.
- 🌗 Dark/Light mode toggle.
- 🔄 Refresh stories with ease.
- 📱 Fully responsive design.

## Demo

[Live Demo](https://hackernewspro.netlify.app/)

## Installation

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/thecodealchemy/HackerNews2.0.git

# Navigate to the project directory
cd HackerNews2.0

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app should now be running at `http://localhost:5173` (default Vite dev server).

## Technologies Used

- **React** – Frontend framework.
- **TypeScript** – Strongly typed JavaScript.
- **TailwindCSS** – Utility-first styling.
- **Firebase Hacker News API** – Data source.
- **Vite** – Build tool for fast development.

## Folder Structure

```
HackerNews2.0/
├── public/              # Static assets
├── src/
│   ├── components/      # UI components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom hooks
│   ├── styles/          # Tailwind styles
│   ├── types/           # TypeScript types
│   ├── utils/           # Helper functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── .gitignore
├── package.json
├── README.md
└── vite.config.ts
```

## Usage

1. **Select Story Type:** Choose between top, new, and best stories from the navigation.
2. **View Comments:** Click on a story to see its comments.
3. **Check User Profiles:** Click on a username to view their details.
4. **Dark Mode Toggle:** Use the header button to switch between dark/light mode.

## API Reference

This project uses the [Hacker News API](https://github.com/HackerNews/API):

- Fetch stories: `https://hacker-news.firebaseio.com/v0/{storyType}stories.json`
- Fetch individual story: `https://hacker-news.firebaseio.com/v0/item/{id}.json`
- Fetch user data: `https://hacker-news.firebaseio.com/v0/user/{username}.json`

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

### Steps to Contribute:

1. Fork the repository.
2. Create a new branch (`feature/awesome-feature`).
3. Commit your changes.
4. Push to your fork and submit a PR.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or suggestions, reach out at [thecodealchemy](https://github.com/thecodealchemy).

