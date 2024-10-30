import reactLogo from '@/assets/react.svg';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>
          <h1 className="h-1"> hi </h1>
          <a href="https://vitejs.dev" target="_blank">
            <img src={reactLogo} className="logo vite" alt="Vite logo" />
          </a>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
