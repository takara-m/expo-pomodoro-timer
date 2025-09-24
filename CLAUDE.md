# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Expo + Tamagui template repository** designed for universal React Native development with production-ready
foundation including code quality tools, development optimization settings, and cross-platform support for iOS, Android,
and Web.

The application uses Expo Router for file-based navigation, Tamagui for universal UI components, Zustand for state
management, and includes comprehensive theming with dark/light mode support.

## Development Commands

### Core Development

- `npm run start` or `npx expo start` - Start the Expo development server
- `npm run android` - Start development server and open Android emulator
- `npm run ios` - Start development server and open iOS simulator
- `npm run web` - Start development server for web
- `npm run reset-project` - Reset project to blank state (moves current code to app-example/)

### Quality Checks (Always run after changes)

- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are properly formatted

### Testing

- `npm test` - Run unit and integration tests (Jest)
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run e2e:setup` - Show Maestro installation instructions (Windows: see e2e/README.md)
- `npm run e2e:setup:wsl` - Install Maestro CLI in WSL environment (Windows)
- `npm run e2e:test` - Run default E2E test (template-demo.yaml)
- `npm run e2e:test:all` - Run all E2E tests in e2e/ directory
- `npm run maestro:template` - Run template demo test
- `npm run maestro:help` - Show Maestro command help
- `npm run maestro test <options>` - Run Maestro with custom options (e.g., `npm run maestro test e2e/user-flow.yaml`)
- `npm run e2e:test:wsl` - Run default E2E test in WSL environment (Windows)
- `npm run e2e:test:all:wsl` - Run all E2E tests in WSL environment (Windows)
- `npm run maestro:template:wsl` - Run template demo test in WSL environment (Windows)
- `npm run maestro:help:wsl` - Show Maestro help in WSL environment (Windows)
- `npm run maestro:wsl <options>` - Run Maestro with custom options in WSL environment (Windows)

## Architecture

### Technology Stack

- **React 19.1.0** + **React Native 0.81.4** + **Expo ~54.0.0**
- **Tamagui v1.132** - Universal UI components with design tokens
- **Zustand v5.0.8** - Global state management with persistence
- **Expo Router v6.0.0** - File-based routing with typed routes
- **React Hook Form + Zod** - Form state management with validation
- **TypeScript** - Full type safety with path aliases (`@/*` → project root)

### State Management Architecture

**Zustand Stores** (`/stores/` directory):

- `themeStore.ts` - Dark/light mode with localStorage persistence
- `userStore.ts` - User authentication and profile data
- `formStore.ts` - Global form state and validation helpers

**Optimized Hooks** (`/hooks/useStores.ts`):

- `useTheme()` - Theme state with backward compatibility
- `useUser()` - User management with async operations
- `useForm()` - Form state with validation helpers
- `useStores()` - Combined access to all stores

**Critical Pattern - Selective Subscriptions**:

```typescript
// ✅ CORRECT - State with equality checks
const isDarkMode = useThemeStore(
  state => state.isDarkMode,
  (a, b) => a === b
);

// ✅ CORRECT - Actions without equality checks (prevents stale closures)
const toggleTheme = useThemeStore(state => state.toggleTheme);
```

### UI Component Architecture

**Tamagui System**:

- Design tokens in `tamagui.config.ts` - Custom themes, media queries, typography
- Universal components: `YStack`, `XStack`, `Text`, `Button`, `Input`, etc.
- Theme switching via `$background`, `$color` tokens
- iOS-style components: Use `ToggleSwitch` instead of Tamagui Switch

**Component Migration Pattern**:

- `View` → `YStack` (vertical), `XStack` (horizontal), `Card` (elevated)
- `Text` → `Text`, `Paragraph`, `H1-H6` (semantic)
- `TouchableOpacity` → `Button` with theme variants
- Manual styling → Token-based props (`p="$4"`, `bg="$background"`)

### Form System Architecture

**Pattern**: Zod + React Hook Form + Zustand integration

- Schemas in `/schemas/` with TypeScript integration
- Form components in `/components/FormComponents/` extending `BaseFormProps`
- Types in `/types/` for form data consistency
- Example implementation: `app/form-demo.tsx`

### Navigation Structure

- File-based routing in `/app` directory
- `_layout.tsx` files define navigation and theme providers
- Typed routes enabled via `experiments.typedRoutes: true`

## Critical Web Environment Issues

### React 19 + Expo Web Event Handling

**Problem**: React 19's event delegation system fails in Expo Web for Zustand store operations.

**Solution Strategy**: Use manual `addEventListener` for pages with Zustand integration:

```typescript
// Required for Web + Zustand operations
{Platform.OS === 'web' && (
  <script dangerouslySetInnerHTML={{__html: `
    (function() {
      if (typeof window === 'undefined') return;

      function setupEventListeners() {
        const button = document.getElementById('button-id');
        if (button) {
          button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Direct localStorage manipulation for Zustand persistence
            const theme = localStorage.getItem('theme-storage');
            // Update Zustand store via localStorage
          });
        }
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupEventListeners);
      } else {
        setTimeout(setupEventListeners, 100);
      }
    })();
  `}} />
)}

// Use HTML button for Web, Tamagui Button for Native
{Platform.OS === 'web' ? (
  <button id="button-id">Web Action</button>
) : (
  <Button onPress={handleNativePress}>Native Action</Button>
)}
```

**When to Use**:

- ✅ **Standard React Events**: Form inputs, navigation, local state (useState)
- ⚠️ **Manual addEventListener**: Theme switching, Zustand store updates, localStorage operations

## Development Workflow

### Required Quality Checks

Always run after file modifications:

1. `npm test` - Run unit and integration tests
2. `npm run lint` - Check for ESLint errors
3. `npm run format` - Format code with Prettier
4. `npm run e2e:test` - Run E2E tests (when applicable)

### Git Workflow

- **Pre-commit Hooks**: Husky runs lint-staged (ESLint + Prettier) automatically
- **Commit Prevention**: Blocked if quality checks fail
- **File Processing**: JS/TS/JSX → ESLint + Prettier, JSON/MD → Prettier only

### E2E Testing with Maestro

**Purpose**: Basic display verification for template validation (~30 seconds)

**Setup Requirements**:

1. Expo development server running (`npm run start`)
2. iOS Simulator or Android device with app loaded
3. Maestro CLI installed (see `/e2e/README.md` for Windows)

**Execution Examples**:

```bash
# Run default test (template-demo.yaml)
npm run e2e:test

# Run all tests in e2e/ directory
npm run e2e:test:all

# Run template demo test
npm run maestro:template

# Run specific test files (advanced usage)
npm run maestro test e2e/user-flow.yaml
npm run maestro test e2e/form-validation.yaml
npm run maestro test e2e/ --format=JUNIT

# WSL environment (Windows)
npm run e2e:test:wsl                      # Default test
npm run e2e:test:all:wsl                 # All tests
npm run maestro:template:wsl             # Template demo
npm run maestro:wsl test e2e/user-flow.yaml  # Specific test
```

## Testing Strategy

### Overview

The project implements a three-layer testing strategy optimized for the Expo + Tamagui + Zustand + React Hook Form
technology stack:

1. **Unit Tests** - Fast, isolated testing of business logic
2. **Integration Tests** - Component-store integration and form validation
3. **E2E Tests** - User flow validation across platforms

### Unit Testing

**Scope**: Business logic, utilities, stores, hooks, and validation schemas

**Technology Stack**:

- **Jest** - Test runner and assertion library
- **@testing-library/react-hooks** - Custom hook testing
- **@testing-library/jest-dom** - DOM assertion utilities

**Test Targets**:

- **Business Logic** (`/utils/`) - Pure functions, data transformations, calculations
- **Zustand Stores** (`/stores/`) - State management logic, store actions, persistence
- **Zod Schemas** (`/schemas/`) - Validation rules, error handling, type inference
- **Custom Hooks** (`/hooks/`) - Hook behavior, state updates, side effects
- **Navigation Logic** - Route validation, parameter handling

**Best Practices**:

```typescript
// Zustand Store Testing Pattern
describe('themeStore', () => {
  beforeEach(() => {
    useThemeStore.getState().reset?.(); // Reset store state
  });

  it('should toggle theme correctly', () => {
    const { result } = renderHook(() => useThemeStore());
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.isDarkMode).toBe(true);
  });
});

// Zod Schema Testing Pattern
describe('userSchema', () => {
  it('should validate valid user data', () => {
    const validData = { name: 'John', email: 'john@example.com' };
    expect(() => userSchema.parse(validData)).not.toThrow();
  });

  it('should reject invalid email format', () => {
    const invalidData = { name: 'John', email: 'invalid-email' };
    expect(() => userSchema.parse(invalidData)).toThrow();
  });
});
```

### Integration Testing

**Scope**: Component-store interactions, form workflows, theme integration

**Technology Stack**:

- **Jest** + **@testing-library/react-native** - Component rendering and interaction
- **Tamagui Mock Configuration** - UI component mocking for consistent testing
- **Zustand Test Utils** - Store integration testing utilities

**Test Targets**:

- **Component + Store Integration** - Theme switching, state updates, data flow
- **Form Components** (`/components/FormComponents/`) - Validation, submission, error handling
- **Navigation Flows** - Page transitions, route parameters, deep linking
- **Theme System** - Dark/light mode switching, token application, persistence

**Tamagui Mock Setup**:

```typescript
// jest.setup.js
jest.mock('tamagui', () => ({
  YStack: 'View',
  XStack: 'View',
  Text: 'Text',
  Button: 'TouchableOpacity',
  Input: 'TextInput',
  // ... other component mocks
}));

// Mock theme tokens
jest.mock('@/tamagui.config', () => ({
  tokens: {
    color: { primary: '#007AFF', background: '#FFFFFF' },
    space: { 1: 4, 2: 8, 3: 12, 4: 16 },
  },
}));
```

**Integration Test Pattern**:

```typescript
describe('ThemeToggleComponent', () => {
  it('should update UI when theme changes', async () => {
    const { getByTestId } = render(<ThemeToggleComponent />);
    const toggleButton = getByTestId('theme-toggle');

    fireEvent.press(toggleButton);

    await waitFor(() => {
      expect(useThemeStore.getState().isDarkMode).toBe(true);
    });
  });
});
```

### E2E Testing with Maestro

**Scope**: Critical user journeys, cross-platform compatibility, visual validation

**Current Implementation**:

- **Template Validation** - Basic component rendering and interaction (~30 seconds)
- **Platform Coverage** - iOS Simulator, Android device/emulator, Web browser
- **Test Location** - `e2e/template-demo.yaml`

**Recommended E2E Test Coverage**:

1. **App Launch & Navigation** - Home screen load, tab navigation, deep links
2. **Theme System** - Light/dark mode toggle, persistence across sessions
3. **Form Workflows** - Input validation, submission, error states
4. **State Persistence** - App backgrounding/foregrounding, data retention
5. **Cross-Platform Behavior** - iOS vs Android vs Web consistency

**Maestro Test Structure**:

```yaml
# e2e/user-flow.yaml
appId: expo.temp.app
---
- launchApp
- assertVisible: 'Welcome to Expo + Tamagui'
- tapOn:
    id: 'theme-toggle'
- assertVisible:
    text: 'Dark Mode'
- tapOn:
    text: 'Form Demo'
- inputText:
    id: 'name-input'
    text: 'Test User'
- tapOn:
    text: 'Submit'
- assertVisible:
    text: 'Form submitted successfully'
```

### Testing Environment Configuration

**Jest Configuration** (`jest.config.js`):

```javascript
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@tamagui/.*|tamagui|zustand)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

**Mock Setup** (`jest.setup.js`):

```javascript
import 'react-native-gesture-handler/jestSetup';

// Mock Zustand persist
jest.mock('zustand/middleware', () => ({
  persist: fn => fn,
  subscribeWithSelector: fn => fn,
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Expo modules
jest.mock('expo-font');
jest.mock('expo-asset');
```

### Test Organization

```
__tests__/
├── unit/
│   ├── stores/              # Zustand store tests
│   ├── hooks/               # Custom hook tests
│   ├── utils/               # Business logic tests
│   └── schemas/             # Zod validation tests
├── integration/
│   ├── components/          # Component + store integration
│   ├── forms/              # Form workflow tests
│   └── navigation/         # Navigation flow tests
└── __mocks__/              # Global mocks and test utilities
```

### Continuous Integration

- **Pre-commit Hooks** - Run unit tests before commit
- **Quality Gates** - Tests must pass before merge
- **Coverage Reports** - Maintain 70%+ code coverage
- **E2E Automation** - Run Maestro tests on PR builds

## Implementation Patterns

### State Management Best Practices

- Use optimized hooks from `@/hooks/useStores` instead of direct Zustand access
- Apply equality checks for state values, not for action functions
- Leverage `useThemeContext()` hook for backward compatibility
- Store complex form state in Zustand, use React Hook Form for validation

### Theme Integration

- Access theme via `useTheme()` hook or `useThemeContext()` (backward compatible)
- Use Tamagui tokens (`$background`, `$color`) for consistency
- Custom colors in `tamagui.config.ts` theme definitions
- Theme persistence automatic via Zustand middleware

### Form Development Pattern

1. Create schema in `/schemas/` with Zod validation
2. Build component in `/components/FormComponents/` extending `BaseFormProps`
3. Export from `/components/FormComponents/index.ts`
4. Follow `app/form-demo.tsx` integration pattern

### Cross-Platform Considerations

- Test UI components on multiple platforms
- Use Tamagui universal components when possible
- Avoid React Native Web-specific props
- Web deprecation warnings for `shadow*` props are expected

## Important Notes

### Port Configuration

- Development server may use port 8082 if 8081 is occupied
- Always check Expo CLI output for actual port assignment

### Component Usage Guidelines

- **Prefer**: Tamagui components over React Native components
- **Import Structure**: Use `@/` prefix for all internal imports
- **Toggle Switches**: Use `ToggleSwitch` component for iOS-style behavior
- **Forms**: Follow established patterns in existing demo components

### Claude Code Instructions

- Always run quality checks after file modifications
- Only commit after all quality checks pass (enforced by pre-commit hooks)
- Follow established patterns in existing components
- Use Zustand stores for shared state, local state for component-specific data
- Test cross-platform compatibility when adding new UI components
