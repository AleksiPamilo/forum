import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/context/Auth';
import { ModalContextProvider } from './components/context/Modal';
import { RootStoreContextProvider } from './components/context/RootStore';
import { RootStore, initializeRootStore } from './mst';
import FirestoreSnapshotProvider from './components/context/FirestoreSnapshot';

const Layout = lazy(() => import('./components/Layouts/Layout'));
const Forums = lazy(() => import("./sites/Forums"));
const WhatsNew = lazy(() => import("./sites/WhatsNew"));

const App: React.FC = () => {
  const [state, setState] = useState<RootStore | undefined>();
  document.title = "ForumX";

  useEffect(() => {
    setState(initializeRootStore());
  }, []);

  if (!state) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div />}>
      <RootStoreContextProvider value={state}>
        <FirestoreSnapshotProvider>
          <AuthContextProvider>
            <ModalContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Forums />} />
                    <Route path="/whats-new" element={<WhatsNew />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ModalContextProvider>
          </AuthContextProvider>
        </FirestoreSnapshotProvider>
      </RootStoreContextProvider>
    </Suspense>
  );
}

export default App;
