import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User, isFirebaseConfigured } from '../services/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsDemo: () => void;
  logout: () => Promise<void>;
  updatePreferences: (prefs: Partial<UserProfile['preferences']>) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInAsDemo: () => {},
  logout: async () => {},
  updatePreferences: () => {},
});

const DEMO_USER = {
  uid: 'demo-user-123',
  email: 'navdeep@streakr.app',
  displayName: 'Navdeep Singh',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: '',
  tenantId: null,
  phoneNumber: null,
  providerId: 'firebase',
  delete: async () => {},
  getIdToken: async () => 'demo-token',
  getIdTokenResult: async () => ({ token: 'demo-token', authTime: '', issuedAtTime: '', expirationTime: '', signInProvider: 'google.com', claims: {} }) as any,
  reload: async () => {},
  toJSON: () => ({}),
} as unknown as User;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if demo mode was stored in localStorage
    const isDemo = localStorage.getItem('streakr_demo_mode') === 'true';
    if (isDemo) {
      setCurrentUser(DEMO_USER);
      setUserProfile({
        uid: DEMO_USER.uid,
        email: DEMO_USER.email || 'navdeep@streakr.app',
        displayName: DEMO_USER.displayName || 'Navdeep Singh',
        photoURL: DEMO_USER.photoURL || undefined,
        streak: 5,
        lastActiveDate: new Date().toISOString().split('T')[0],
        preferences: {
          defaultWorkspace: 'Work',
          startOfWeek: 'Monday',
          defaultPriority: 'Medium',
          emailReminders: true,
          soundEnabled: true,
        },
      });
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setUserProfile({
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Streakr User',
          photoURL: user.photoURL || undefined,
          streak: 4,
          lastActiveDate: new Date().toISOString().split('T')[0],
          preferences: {
            defaultWorkspace: 'Work',
            startOfWeek: 'Monday',
            defaultPriority: 'Medium',
            emailReminders: true,
            soundEnabled: true,
          },
        });
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      localStorage.removeItem('streakr_demo_mode');
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      // Fallback to demo mode if popup is blocked or firebase not fully configured
      signInAsDemo();
    }
  };

  const signInAsDemo = () => {
    localStorage.setItem('streakr_demo_mode', 'true');
    setCurrentUser(DEMO_USER);
    setUserProfile({
      uid: DEMO_USER.uid,
      email: DEMO_USER.email || 'navdeep@streakr.app',
      displayName: DEMO_USER.displayName || 'Navdeep Singh',
      photoURL: DEMO_USER.photoURL || undefined,
      streak: 5,
      lastActiveDate: new Date().toISOString().split('T')[0],
      preferences: {
        defaultWorkspace: 'Work',
        startOfWeek: 'Monday',
        defaultPriority: 'Medium',
        emailReminders: true,
        soundEnabled: true,
      },
    });
  };

  const logout = async () => {
    localStorage.removeItem('streakr_demo_mode');
    try {
      await signOut(auth);
    } catch (e) {}
    setCurrentUser(null);
    setUserProfile(null);
  };

  const updatePreferences = (prefs: Partial<UserProfile['preferences']>) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        preferences: {
          ...userProfile.preferences,
          ...prefs,
        }
      });
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, signInWithGoogle, signInAsDemo, logout, updatePreferences }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
