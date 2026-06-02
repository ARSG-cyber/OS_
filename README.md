# Khan OS - Enterprise AI Operating System Dashboard

A futuristic, enterprise-grade AI operating system dashboard built with React 18, TypeScript, TailwindCSS, and Framer Motion.

## 🚀 Features

### Core Modules

- **Executive Dashboard**: Real-time KPIs, system health monitoring, AI recommendations
- **Nexus Pulse**: AI-powered feed with advanced filtering, search, and engagement tracking
- **Project Evolution**: Interactive architecture visualization with node graphs and export capabilities
- **AI Control Center**: Manage multiple AI agents with performance tracking and activity logs
- **Analytics Center**: Comprehensive metrics, trend analysis, and report generation
- **Settings**: Theme customization, account management, security controls

### Technical Highlights

- ✨ Modern React 18 with Hooks and Context API
- 🎨 TailwindCSS with custom cyber-luxury theme
- 🎬 Framer Motion animations and transitions
- 📦 Organized modular component architecture
- 🎯 TypeScript for type safety
- 🚀 Performance optimized (memoization, code splitting, lazy loading)
- ♿ Accessibility standards compliance
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🌙 Dark/Light theme support
- 🔐 Role-based access control ready

## 📁 Project Structure

```
src/
├── app/                    # Main application shell and routing
├── pages/                  # Page components
│   ├── Dashboard.tsx       # Executive overview
│   ├── NexusPulse.tsx      # AI feed
│   ├── ProjectEvolution.tsx # Architecture visualization
│   ├── AIControlCenter.tsx # AI agents management
│   ├── AnalyticsCenter.tsx # Analytics and metrics
│   └── Settings.tsx        # User settings
├── components/
│   ├── common/             # Reusable UI components
│   ├── dashboard/          # Dashboard-specific components
│   ├── nexus/             # Nexus Pulse components
│   ├── evolution/         # Project Evolution components
│   ├── ai/                # AI Control Center components
│   └── analytics/         # Analytics components
├── hooks/                  # Custom React hooks
│   └── index.ts           # useDebounce, useThrottle, useLocalStorage, etc.
├── services/               # API services and utilities
│   └── api.ts             # API client and domain services
├── context/                # React Context providers
│   ├── providers.tsx       # Theme and Notification providers
│   └── hooks.ts            # Context hooks
├── types/                  # TypeScript type definitions
│   └── index.ts           # Global interfaces
├── utils/                  # Utility functions
│   └── index.ts           # Formatting, calculations, helpers
├── store/                  # Global state management (Zustand ready)
├── data/                   # Mock data and constants
├── assets/                 # Images, icons, fonts
└── index.css              # Global styles and animations
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Router v6** - Routing
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Axios** - HTTP client
- **Zustand** - State management (optional)
- **Vite** - Build tool

## 🎨 Design System

### Color Palette

- **Primary**: Cyber Cyan (#06b6d4)
- **Secondary**: Cyber Indigo (#6366f1)
- **Accent**: Cyber Purple (#a855f7)
- **Success**: Emerald (#10b981)
- **Dark Background**: #0a0a0f

### Typography

- **Sans**: Inter
- **Mono**: Fira Code

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Khan OS
VITE_APP_VERSION=1.0.0
```

## 🎯 Component Usage Examples

### Using the Button Component

```typescript
import { Button } from '@components/common/Components';

<Button variant="primary" size="md" onClick={() => {}}>
  Click me
</Button>
```

### Using Hooks

```typescript
import { useDebounce, useTheme } from '@hooks';

const { searchQuery, setSearchQuery } = useState('');
const debouncedSearch = useDebounce((query: string) => {
  // Search logic
}, 300);

const { theme, toggleTheme } = useTheme();
```

### Using API Services

```typescript
import { dashboardService, aiService } from '@services/api';

const metrics = await dashboardService.getMetrics();
const agents = await aiService.getAgents();
```

## 🔧 Configuration

### Tailwind Theme Customization

Edit `tailwind.config.ts` to customize colors, fonts, and animations.

### Vite Configuration

Modify `vite.config.ts` to adjust build settings and aliases.

## 📊 Performance Optimization

- React.memo for component memoization
- useMemo for expensive computations
- useCallback for function memoization
- Code splitting with React.lazy
- Virtualized lists for large datasets
- Optimized re-renders with proper dependency arrays

## 🎬 Animations

Framer Motion animations are pre-configured:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Animated content
</motion.div>
```

## 🔐 Security

- Input validation utilities
- API interceptors for auth tokens
- Role-based access control ready
- XSS protection with React
- CSRF token handling in API service

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible sidebar navigation
- Optimized touch targets for mobile

## ♿ Accessibility

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Focus management
- Screen reader optimization

## 🧪 Testing

```bash
# Run tests
npm run test

# Coverage report
npm run test:coverage
```

## 📚 API Integration

The app is ready to integrate with any REST API. Example:

```typescript
// In src/services/api.ts, define your endpoints:
export const customService = {
  getCustomData: async () => apiService.get('/custom/data'),
  postCustomData: async (data) => apiService.post('/custom/data', data),
};
```

## 🚢 Deployment

### Vercel

```bash
vercel
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📖 Documentation

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is proprietary to Khan Productions. All rights reserved.

## 👨‍💼 Author

**Khan Productions**  
Enterprise-Grade AI Solutions

---

**Version**: 1.0.0  
**Status**: Production Ready  
**Last Updated**: June 2026
