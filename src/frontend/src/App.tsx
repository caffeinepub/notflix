import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import BrowsePage from './pages/BrowsePage';
import UploadPage from './pages/UploadPage';
import PlayerPage from './pages/PlayerPage';
import { ThemeProvider } from 'next-themes';

const rootRoute = createRootRoute({
  component: () => <RouterProvider router={router} />
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: BrowsePage
});

const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/upload',
  component: UploadPage
});

const playerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/player/$filmId',
  component: PlayerPage
});

const routeTree = rootRoute.addChildren([indexRoute, uploadRoute, playerRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
