import './App.css'
import { ResumeEditor } from './components/ResumeEditor/ResumeEditor.tsx';
import { ResumePreview } from './components/ResumePreview/ResumePreview.tsx';
import { ResumeProvider } from './store/ResumeContext.tsx';


function App() {


  return (
    <ResumeProvider>
      <div className="flex h-screen">
        <ResumeEditor />
        <ResumePreview />
      </div>
    </ResumeProvider>

  )
}

export default App
