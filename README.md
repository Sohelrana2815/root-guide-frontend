### 1. `.env.example` File

Create this file in your root directory to guide other developers on what environment variables are needed.

```env
# API URL (Backend Connection)
NEXT_PUBLIC_BASE_API_URL=https://root-guide-backend.vercel.app/api

# JWT Configuration (For client-side decoding if needed)
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret

# Environment
NODE_ENV=development

```

---

### 2. `README.md` File

```markdown
# 🗺️ Root Guide Frontend

Root Guide is a modern, high-performance web application designed for tour management. It provides a seamless interface for Tourists to book trips, Guides to manage their earnings/tours, and Admins to oversee the entire platform ecosystem.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://root-guide-frontend.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend-API-blue)](https://root-guide-backend.vercel.app)

---

## 🚀 Tech Stack

- **Framework:** [Next.js 16.0.10](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **Visualizations:** [Recharts](https://recharts.org/) (Data Dashboards)
- **State Management:** React Hooks & Server Actions
- **Forms & Validation:** [Zod](https://zod.dev/)
- **Animations:** [Swiper.js](https://swiperjs.com/) & [tw-animate-css](https://www.npmjs.com/package/tw-animate-css)

---

## 📊 Dashboard Overviews

The application features three distinct, data-driven dashboards using **Recharts** for visual analytics:

### 🎒 Tourist Dashboard
- **Stats:** Total trips taken, total amount spent, upcoming trips, and pending reviews.
- **Visuals:** - **Pie Chart:** Distribution of booking statuses.
    - **Bar Chart:** Monthly appointment/booking overview.

### 🗺️ Guide Dashboard
- **Stats:** Total earnings, active bookings (confirmed), successfully completed tours, pending requests, average rating, and total reviews.
- **Visuals:** - **Booking Status Distribution:** Pie chart for status overview.
    - **Growth Chart:** Monthly booking trends.

### 👑 Admin Dashboard
- **Stats:** Total transaction volume, **Platform Profit (15% commission)**, total bookings, total tourists, total guides, and active tours.
- **Visuals:** - **Financial Overview:** Monthly booking volume vs. booking statuses.
    - **User Distribution:** Comprehensive charts on platform growth.

---

## 📂 Folder Structure

```text
src/
├── app/                # Next.js App Router (Pages & Layouts)
├── components/         
│   ├── modules/        # Feature-specific components (Guide, Admin, Tourist)
│   ├── shared/         # Reusable UI (Buttons, Tables, Navbar, Footer)
│   └── ui/             # Radix UI primitives & Shadcn-like components
├── services/           # API call logic & Server Actions
├── hooks/              # Custom React hooks
├── types/              # TypeScript interfaces & Zod schemas
├── lib/                # Utility functions (formatting, tailwind merge)
└── assets/             # Global images and icons

```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone [https://github.com/Sohelrana2815/root-guide-frontend.git](https://github.com/Sohelrana2815/root-guide-frontend.git)
cd root-guide-frontend

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Environment Setup

Create a `.env.local` file and add your environment variables:

```bash
NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api
JWT_ACCESS_SECRET=your_secret

```

### 4. Run the Development Server

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to see the result.

---

## 🛠️ Key Functionalities

### 💳 Payment Integration

Seamlessly integrated with the backend **SSLCommerz** flow. Users can track payment success/failure/cancellation directly through dedicated frontend routes.

### 🖼️ Responsive UI

Fully optimized for mobile, tablet, and desktop views using Tailwind CSS v4. Includes a specialized **Swiper.js** slider for tour gallery and featured guides.

### 🔐 Secure Routing

Role-based middleware protection ensures that Tourists, Guides, and Admins can only access their respective dashboards and actions.

---

## 📦 Scripts Summary

* `npm run dev`: Runs the app in development mode.
* `npm run build`: Builds the production application.
* `npm run start`: Starts the production server.
* `npm run lint`: Runs ESLint for code quality checks.

---

## 🤝 Contributing

Contributions are welcome! If you have a suggestion that would make this better, please fork the repo and create a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**.
