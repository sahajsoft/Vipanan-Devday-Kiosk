# Vipanan DevDay Kiosk

A Next.js application for managing attendance at DevDay events. This kiosk application allows event managers to track attendees and mark their attendance status.

## Features

- Modern UI with Mulish font
- Responsive design for all screen sizes
- Attendance tracking with present/absent status
- Clean and intuitive interface

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS for styling
- Radix UI for accessible components
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/vipanan-devday-kiosk.git
cd vipanan-devday-kiosk
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Add the required images to the `/public/images` directory:
   - `sahaj-logo.png` - The Sahaj company logo
   - `avatar.png` - User profile picture
   - `devday-icon.png` - DevDay event icon

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

- `/src/app` - Next.js App Router pages
- `/src/components` - React components
  - `/ui` - Reusable UI components
  - `/layout` - Layout components (Navbar, Banner)
  - `/attendance` - Attendance-related components
- `/public/images` - Static images

## License

MIT
