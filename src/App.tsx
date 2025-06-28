import { ResumeEditor } from './components/ResumeEditor/ResumeEditor.tsx';
import { ResumePreview } from './components/ResumePreview/ResumePreview.tsx';
import { ResumeProvider } from './store/ResumeContext.tsx';
import { useEffect, useState } from 'react';


function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);


  return (
    <ResumeProvider>
      <div className={ `flex ${ isDarkMode ? 'dark' : '' }` }>
        <ResumeEditor />
        <ResumePreview />
      </div>
    </ResumeProvider>

  )
}

export default App
