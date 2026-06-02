# Khan OS - Development Guide

## Architecture Overview

Khan OS is built on a modular, scalable architecture that separates concerns into distinct layers:

### 1. **Presentation Layer** (`/pages` and `/components`)
- Page-level components that handle routing
- Reusable UI components organized by feature
- Layout components for structure

### 2. **Business Logic Layer** (`/hooks` and `/services`)
- Custom React hooks for stateful logic
- API service layer with Axios client
- Business logic separation from UI

### 3. **State Management** (`/context` and `/store`)
- Theme management via Context API
- Notification system
- Ready for Zustand (global state)

### 4. **Type Safety** (`/types`)
- Central TypeScript definitions
- Interfaces for all major entities

### 5. **Utilities** (`/utils`)
- Formatting functions
- Calculation helpers
- Common utilities

## Key Design Patterns

### Component Composition
```typescript
// Compound component pattern
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

### Custom Hooks
```typescript
// Extract logic into hooks
const { data, loading, error } = useAsync(fetchData);
```

### Context for Global State
```typescript
// Use context for theme, auth, etc.
const { theme, toggleTheme } = useTheme();
```

## Common Tasks

### Adding a New Page

1. Create file: `src/pages/MyPage.tsx`
```typescript
import React from 'react';
import { Card } from '@components/common';

const MyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 p-8">
      <h1 className="gradient-text text-4xl font-bold">My Page</h1>
      <Card className="mt-8 p-6">
        Content here
      </Card>
    </div>
  );
};

export default MyPage;
```

2. Add to routing in `src/app/App.tsx`:
```typescript
<Route path="/mypage" element={<MyPage />} />
```

3. Add to sidebar navigation:
```typescript
{ label: 'My Page', icon: '📄', href: '/mypage' }
```

### Adding a New Component

1. Create file: `src/components/common/MyComponent.tsx`
```typescript
import React from 'react';
import { cn } from '@utils/index';

interface MyComponentProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  variant = 'primary',
}) => {
  return (
    <div className={cn(
      'p-4 rounded-lg',
      variant === 'primary' && 'bg-cyber-cyan/10 border border-cyber-cyan/30',
      variant === 'secondary' && 'bg-slate-800/30 border border-slate-700'
    )}>
      {title}
    </div>
  );
};
```

2. Export from `src/components/common/index.ts`

### Adding API Integration

1. Define service in `src/services/api.ts`:
```typescript
export const customService = {
  fetchData: async () => apiService.get('/custom/data'),
  createItem: async (data) => apiService.post('/custom/items', data),
};
```

2. Use in component:
```typescript
import { customService } from '@services/api';

const { data } = useAsync(() => customService.fetchData());
```

### Implementing Dark/Light Mode

Use the `useTheme()` hook:
```typescript
const { theme, toggleTheme } = useTheme();

return (
  <div className={theme === 'dark' ? 'bg-dark-900' : 'bg-white'}>
    <button onClick={toggleTheme}>Toggle</button>
  </div>
);
```

### Adding Animations

Use Framer Motion:
```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ duration: 0.3 }}
>
  Animated content
</motion.div>
```

## Performance Tips

1. **Use React.memo for expensive components**
```typescript
const MemoizedComponent = React.memo(MyComponent);
```

2. **Memoize callbacks with useCallback**
```typescript
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);
```

3. **Lazy load components**
```typescript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

4. **Use virtualization for large lists**
```typescript
// Use react-window for very large lists
import { FixedSizeList } from 'react-window';
```

## Testing

### Unit Tests
```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@components/common/MyComponent';

test('renders correctly', () => {
  render(<MyComponent title="Test" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

### Integration Tests
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('user interaction', async () => {
  const user = userEvent.setup();
  render(<MyForm />);
  
  await user.type(screen.getByRole('textbox'), 'input');
  await user.click(screen.getByRole('button'));
  
  await waitFor(() => {
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

## Debugging

### Enable React DevTools
- Install React DevTools browser extension
- Use Component profiler to find performance bottlenecks

### API Debugging
- Check Network tab in DevTools
- Log API responses in console

### State Debugging
- Use React DevTools to inspect component state
- Add console.log in critical sections

## Folder Structure Best Practices

```
Feature folder example:
src/components/dashboard/
├── Dashboard.tsx          # Main component
├── DashboardCard.tsx      # Subcomponent
├── dashboard.hooks.ts     # Feature-specific hooks
├── dashboard.styles.ts    # Feature-specific styles
└── index.ts              # Exports
```

## Naming Conventions

- **Components**: PascalCase (`MyComponent.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Functions**: camelCase (`fetchData()`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case (`cyber-card`)

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: description"

# Push and create PR
git push origin feature/feature-name
```

## Deployment Checklist

- [ ] All tests passing
- [ ] No console errors
- [ ] Performance optimized
- [ ] Environment variables configured
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] Accessibility reviewed

## Useful Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/)

## Common Issues & Solutions

### Issue: Components not updating
**Solution**: Check dependencies in useEffect and useCallback

### Issue: Styles not applying
**Solution**: Verify TailwindCSS class names and check specificity

### Issue: API calls failing
**Solution**: Check network tab, verify endpoints, check auth headers

### Issue: Animations jittering
**Solution**: Use GPU acceleration with `transform` and `opacity`

## Performance Monitoring

```typescript
// Measure component render time
import { Profiler } from 'react';

<Profiler
  id="MyComponent"
  onRender={(id, phase, actualDuration) => {
    console.log(`${id} (${phase}) took ${actualDuration}ms`);
  }}
>
  <MyComponent />
</Profiler>
```
