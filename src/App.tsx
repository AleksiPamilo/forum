import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContext';
import { ModalContextProvider } from './components/context/ModalContext';

const Layout = lazy(() => import('./components/Layout'));
const Forums = lazy(() => import("./sites/Forums"));
const WhatsNew = lazy(() => import("./sites/WhatsNew"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div />}>
      <ModalContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Forums />} />
                <Route path="/whats-new" element={<WhatsNew />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </ModalContextProvider>
    </Suspense>
  );
}

export default App;