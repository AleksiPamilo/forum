import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContext';
import { ModalContextProvider } from './components/context/ModalContext';
import { RootStoreContextProvider } from './components/context/RootStoreContext';
import { RootStore, initializeRootStore } from './mst';
import FirestoreSnapshotProvider from './components/context/FirestoreSnapshotProvider';

const Layout = lazy(() => import('./components/Layouts/Layout'));
const SettingsLayout = lazy(() => import('./components/Layouts/SettingsLayout'));
const Forums = lazy(() => import("./sites/Forums"));
const WhatsNew = lazy(() => import("./sites/WhatsNew"));
const Profile = lazy(() => import("./sites/Profile"));
const Settings = lazy(() => import("./sites/Profile/Settings"));

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
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/:username" element={<Profile />} />
                  </Route>
                  <Route element={<SettingsLayout />}>
                    <Route path="/settings" element={<Settings />} />
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
