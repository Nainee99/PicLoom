import { AppRouter } from "./routes";
import { ThemeProvider } from "./components/ThemeProvider";


export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="picloom-theme">
      <AppRouter />
    </ThemeProvider>
  );
}
