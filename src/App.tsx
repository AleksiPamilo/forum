import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContext';
import { ModalContextProvider } from './components/context/ModalContext';

const Layout = lazy(() => import('./components/Layout'));
const Home = lazy(() => import("./sites/Home"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div />}>
      <ModalContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </ModalContextProvider>
    </Suspense>
  );
}

export default App;