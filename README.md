# E-Commerce Store Front

A React-based e-commerce platform with product management, cart functionality, search functionality and wishlist features.

[![Deployment Status](https://img.shields.io/badge/deployment-live-success)](https://shopping-spree-site.vercel.app/)

🚀 **Live Demo**: [E-Commerce Store](https://shopping-spree-site.vercel.app/)

## Features

- Product catalog with search and filtering
- Detailed product views
- Wishlist management (add/remove liked items)
- Shopping cart functionality
- Responsive design for mobile and desktop
- Real-time cart total calculation

## Getting Started

### Prerequisites

- Node.js (version 18.18.2 or higher)
- npm (version 10.2.0 or higher)

### Installation and Developement

1. Clone the repository
```bash
[git clone [your-repo-url]](https://github.com/SashLanastra/E-commerce-Website.git)
```
2. Navigate to project directory
```bash
cd Project
```
3. Install all libraries, packages and dependencies
```bash
npm install
```
4. Once packages are done installing, run the development server:
```bash
npm run dev
```

### Testing
NB Make sure that you are in the Project directory

Run tests in terminal:
```bash
npm run test
```
Run tests with UI interface
```bash
npm run test:ui
```

## State Management Architecture

### Why Context API?

I chose the Context API for state management in this e-commerce application for several key reasons:

1. **Appropriate Scale**: For a medium-sized application with predictable state updates (cart items, liked products), Context API provides the right balance of functionality and simplicity. While Redux offers more robust features, it would have been overengineering for our use case.

2. **Component Tree Data Flow**: The application requires cart and likes data to be accessible across multiple components at different levels of the component tree. Context API elegantly solves this prop-drilling problem without introducing the complexity of a third-party state management library.

3. **Predictable Updates**: The state updates in this application are straightforward and synchronous (adding/removing items from cart/likes), making Context API's direct state management approach ideal.

### Local Storage Integration

The decision to persist state in localStorage was driven by performance and user experience considerations:

1. **Improved Data Availibility**: In our use case this is a better caching strategy that allows for a local first approach, reducing the TTI (time to interactive) of the site and provides a fallback for the intermittent API. This strategy enables for greater performance and works because the API response changes infrequently and maintains functionality if our products service is down.

2. **Session Persistence**: Storing cart and likes data in localStorage ensures that users don't lose their selected items on page refreshes or browser closes, providing a seamless shopping experience.

3. **Reduced Server Load**: By maintaining cart state client-side, we minimize unnecessary API calls to fetch cart data on each page load. This improves application performance and reduces server load.

4. **Offline Capabilities**: localStorage enables basic offline functionality, allowing users to maintain their cart and likes even when temporarily disconnected.

The combination of Context API and localStorage provides a lightweight yet effective state management solution that meets the application's needs while prioritizing performance and user experience.

## useReducer Implementation

### Why useReducer?

I implemented useReducer for managing cart and likes state because it provides several advantages for handling complex state logic:

1. **Predictable State Updates**: 
The reducer pattern ensures that all state transitions are handled through well-defined actions. Each action (ADD, REMOVE, QUANTITY, SUBMIT) follows a strict contract, making state changes predictable and easier to debug.

2. **Centralized State Logic**:
Instead of spreading state update logic across multiple components, the reducer centralizes all state transformation logic in one place. For example, the cart reducer handles all cart-related operations:
- Adding items with quantity tracking
- Removing items
- Updating quantities
- Clearing the cart on submission

3. **Type Safety and Error Handling**:
The implementation leverages TypeScript to ensure type safety and includes robust error handling:
```typescript
type CartReducerAction = {
    type: string,
    payload?: CartItemType
}
```

## useScreenSize Custom Hook

### Purpose and Benefits

The `useScreenSize` hook provides a robust solution for responsive design implementation, offering several key advantages:

1. **Centralized Responsive Logic**
Instead of repeating media query checks across components, this hook centralizes breakpoint logic in one place:
```typescript
type Breakpoints = {
  isMobile: boolean;   // < 639px
  isTablet: boolean;   // >= 639px && < 1024px
  isDesktop: boolean;  // >= 1024px
};
```

## useNavbar Custom Hook

### Purpose and Benefits

The `useNavbar` hook provides an elegant solution for implementing scroll-based navigation bar behavior, which is crucial for modern web applications:

1. **Dynamic Navigation Styling**
The hook monitors scroll position to trigger navigation bar state changes:
```typescript
const changeBackground = () => {
    if(window.scrollY >= 60) {
        setNavBar(true);
    } else {
        setNavBar(false);
    }
};
```

## Vitest Testing Configuration

### Strategic Testing Approach

The Vitest configuration leverages jsdom and several key features to provide a robust testing environment:

1. **JSDOM Environment**
```typescript
test: {
    environment: "jsdom",
    globals: true,
}
```
### Benefits of Using Test UI

The Vitest UI interface (`npm run test:ui`) provides several significant advantages for test development and debugging:

1. **Real-Time Test Execution**
- Tests run and update in real-time as you make code changes
- Immediate visual feedback on test status
- Helps identify failing tests quickly
- Supports test-driven development (TDD) workflow

2. **Visual Test Organization**
```bash
npm run test:ui
```

## Error Boundaries

Error boundaries are used in this project to:

1. **Prevent Crashes**
- Catch errors in specific components to avoid a full app crash.

2. **Isolate Failures**
- Replace only the affected component with a fallback UI while keeping the rest of the app functional.

3. **Improve UX**
- Provide clear error messages during issues, especially with lazy loading and asynchronous data fetching.

4. **Simplify Debugging**
- Log errors centrally for easier troubleshooting.

```typescript
<main>
    <ErrorBoundary>
        <Outlet />
    </ErrorBoundary>
</main>
```
