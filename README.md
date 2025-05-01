# Website Audit Tool

A comprehensive website auditing tool built with Next.js that analyzes websites for SEO, performance, accessibility, and security issues. The tool generates detailed reports with recommendations that can be downloaded as PDF documents.

## Features

- **Performance Analysis**: Evaluates page load speed, rendering time, and other performance metrics
- **SEO Assessment**: Analyzes meta tags, headings, content structure, and other SEO factors
- **Accessibility Testing**: Checks for WCAG compliance and identifies accessibility issues
- **Security Verification**: Examines HTTPS implementation, security headers, and potential vulnerabilities
- **Detailed Reports**: Generates comprehensive reports with specific recommendations
- **PDF Export**: Allows users to download branded PDF reports

## Tech Stack

- **Next.js**: React framework for the frontend and API routes
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling
- **Lighthouse**: For performance and SEO audits
- **Axe-core**: For accessibility testing
- **Puppeteer**: For headless browser automation
- **OpenAI GPT**: For generating plain-English recommendations
- **React-PDF**: For PDF report generation

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/website-audit-tool.git
   cd website-audit-tool
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the project root with the following variables:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Enter a URL in the input field
2. Click "Run Audit" to analyze the website
3. View the audit results including performance, SEO, accessibility, and security scores
4. Download the PDF report for sharing or future reference

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
