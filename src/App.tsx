import { ResumeEditor } from './components/ResumeEditor/ResumeEditor.tsx';
import { ResumePreview } from './components/ResumePreview/ResumePreview.tsx';
import { useDarkMode } from './hooks/useDarkMode.tsx';
import { ResumeProvider } from './store/ResumeContext.tsx';

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
