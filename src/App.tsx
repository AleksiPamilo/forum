import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContext';
import { ModalContextProvider } from './components/context/ModalContext';
import { RootStoreContextProvider } from './components/context/RootStoreContext';
import { RootStore, initializeRootStore } from './mst';
import FirestoreSnapshotProvider from './components/context/FirestoreSnapshotProvider';

const Layout = lazy(() => import('./components/Layouts/Layout'));
const SettingsLayout = lazy(() => import('./components/Layouts/SettingsLayout'));
const LandingPage = lazy(() => import("./sites/LandingPage"));
const WhatsNew = lazy(() => import("./sites/WhatsNew"));
const Profile = lazy(() => import("./sites/Profile/Profile"));
const Settings = lazy(() => import("./sites/Profile/Settings"));
const SocialSettings = lazy(() => import("./sites/Profile/SocialSettings"));
const Forums = lazy(() => import("./sites/Forums"));
const Thread = lazy(() => import("./sites/Thread"));
const PostThread = lazy(() => import("./sites/PostThread"));

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
    <Suspense fallback={<div className="absolute z-50 w-screen h-screen flex items-center justify-center bg-black">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zinc-900"></div>
    </div>}>
      <RootStoreContextProvider value={state}>
        <FirestoreSnapshotProvider>
          <AuthContextProvider>
            <ModalContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/whats-new" element={<WhatsNew />} />
                    <Route path="/profiles" element={<Profile />} />
                    <Route path="/profiles/:username" element={<Profile />} />
                    <Route path="/thread" element={<Thread />} />
                    <Route path="/thread/:title_id" element={<Thread />} />
                    <Route path="/forums" element={<LandingPage />} />
                    <Route path="/forums/:slug" element={<Forums />} />
                    <Route path="/post-thread" element={<PostThread />} />
                  </Route>
                  <Route element={<SettingsLayout />}>
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/settings/social" element={<SocialSettings />} />
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
