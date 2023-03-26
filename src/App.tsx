import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContext';
import { ModalContextProvider } from './components/context/ModalContext';
import { RootStoreContextProvider } from './components/context/RootStoreContext';
import { RootStore, initializeRootStore } from './mst';
import FirestoreSnapshotProvider from './components/context/FirestoreSnapshotProvider';
import { ThemeContextProvider } from './components/context/ThemeContext';
import NotFound from './sites/NotFound';

const Layout = lazy(() => import('./components/Layouts/Layout'));
const SettingsLayout = lazy(() => import('./components/Layouts/SettingsLayout'));
const SecuredLayout = lazy(() => import('./components/Layouts/SecuredLayout'));
const LandingPage = lazy(() => import('./sites/LandingPage'));
const Forums = lazy(() => import("./sites/Forums"));
const WhatsNew = lazy(() => import("./sites/WhatsNew"));
const Profile = lazy(() => import("./sites/Profile/Profile"));
const Settings = lazy(() => import("./sites/Profile/Settings"));
const SocialSettings = lazy(() => import("./sites/Profile/SocialSettings"));
const Threads = lazy(() => import("./sites/Threads"));
const Thread = lazy(() => import("./sites/Thread"));
const PostThread = lazy(() => import("./sites/PostThread"));
const AdminPage = lazy(() => import("./sites/Admin"));
const AdminForums = lazy(() => import("./sites/Admin/ManageForums"));

const App: React.FC = () => {
  const [state, setState] = useState<RootStore | undefined>();
  document.title = "ForumX";

  useEffect(() => {
    setState(initializeRootStore());
  }, []);

  const loading = <div className="absolute z-50 w-screen h-screen flex items-center justify-center bg-black">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zinc-900"></div>
  </div>

  if (!state) { return loading; }

  return (
    <Suspense fallback={loading}>
      <RootStoreContextProvider value={state}>
        <FirestoreSnapshotProvider>
          <AuthContextProvider>
            <ThemeContextProvider>
              <BrowserRouter>
                <ModalContextProvider>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route element={<Layout />}>
                      <Route path="/whats-new" element={<WhatsNew />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/profile/:username" element={<Profile />} />
                      <Route path="/thread" element={<Thread />} />
                      <Route path="/threads/:title_id" element={<Thread />} />
                      <Route path="/forums" element={<Forums />} />
                      <Route path="/:slug/threads" element={<Threads />} />
                      <Route path="/post-thread" element={<PostThread />} />
                    </Route>
                    <Route element={<SettingsLayout />}>
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/settings/social" element={<SocialSettings />} />
                    </Route>
                    <Route element={<SecuredLayout />}>
                      <Route path="/admin" element={<AdminPage />} />
                      <Route path="/admin/forums" element={<AdminForums />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ModalContextProvider>
              </BrowserRouter>
            </ThemeContextProvider>
          </AuthContextProvider>
        </FirestoreSnapshotProvider>
      </RootStoreContextProvider>
    </Suspense>
  );
}

export default App;
