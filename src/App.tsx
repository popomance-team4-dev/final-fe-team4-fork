import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* -----이 부분은 지워질 예정 */}
        <div>
          <h1 className="h-1"> hi </h1>
          <a href="https://vitejs.dev" target="_blank"></a>
        </div>
        {/* -----이 부분은 지워질 예정 */}
      </QueryClientProvider>
    </>
  );
}

export default App;
