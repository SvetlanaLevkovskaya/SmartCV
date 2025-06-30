import { ResumeEditor } from '@/components/ResumeEditor';
import { ResumePreview } from '@/components/ResumePreview';

import { useDarkMode } from '@/hooks/useDarkMode.tsx';

import { ResumeProvider } from '@/store/ResumeContext.tsx';

function App() {
  const isDarkMode = useDarkMode();

  return (
    <ResumeProvider>
      <main className={`flex ${isDarkMode ? 'dark' : ''}`}>
        <ResumeEditor />
        <ResumePreview />
      </main>
    </ResumeProvider>
  );
}

export default App;
