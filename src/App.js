// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
// context provider
import { AppProvider } from "./context/AppContext";
// ----------------------------------------------------------------------

export default function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </ThemeProvider>
    </AppProvider>
  );
}
