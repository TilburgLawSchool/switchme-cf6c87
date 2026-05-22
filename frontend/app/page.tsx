'use client';

import { useState, useEffect } from 'react';
import { updatePreferences } from 'https://esm.sh/@/lib/api';
export default function StudentPreferences() {
  const [username, setUsername] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const handleToggle = async () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    await savePreferences(username, nextMode);
  };

  const savePreferences = async (name: string, dark: boolean) => {
    setIsSaving(true);
    try {
      const result = await updatePreferences({ username: name, darkMode: dark });
      setLastSaved(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Failed to save", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className={`min-h-screen transition-theme ${isDarkMode ? 'bg-marine text-white' : 'bg-white text-marine'}`}>
      {/* Header */}
      <header className={`border-b ${isDarkMode ? 'border-white/10' : 'border-marine/10'} p-6`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Tilburg University</h1>
          <div className="text-sm font-medium uppercase tracking-widest opacity-70">Student Portal</div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8 pt-16">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-2">Interface Settings</h2>
          <p className="opacity-80 mb-8">
            Adjust your viewing preferences for the Tilburg University digital learning environment.
          </p>

          <div className="space-y-8">
            {/* Input Field */}
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                Student Name / ID
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name..."
                className={`w-full p-3 border-2 transition-colors focus:outline-none focus:border-brons ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/20 text-white' 
                    : 'bg-gray-50 border-marine/10 text-marine'
                }`}
              />
            </div>

            {/* Switch Toggle */}
            <div className="flex items-center justify-between p-4 border-2 border-dashed border-current border-opacity-20 rounded-lg">
              <div className="flex items-center gap-3">
                {isDarkMode ? <span role="img" aria-label="moon">🌙</span> : <span role="img" aria-label="sun">☀️</span>}
                <div>
                  <div className="font-bold">Dark Mode</div>
                  <div className="text-xs opacity-60">High contrast for night study</div>
                </div>
              </div>
              
              <button
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  isDarkMode ? 'bg-brons' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Status Area */}
            <div className="pt-4 flex items-center gap-2 text-sm">
              {isSaving ? (
                <>
                  <span role="img" aria-label="loader2">✨</span>
                  <span>Syncing with university servers...</span>
                </>
              ) : lastSaved ? (
                <span className="text-mos">✓ Preferences synced at {lastSaved}</span>
              ) : (
                <span className="opacity-40 italic">Waiting for changes...</span>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className={`mt-12 p-6 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-marine/5 border-marine/10'}`}>
            <h3 className="font-bold mb-2">Live Preview</h3>
            <p className="text-sm">
              Hello, <span className="font-bold text-brons">{username || 'Student'}</span>. 
              You are currently viewing the portal in 
              <span className="font-bold"> {isDarkMode ? 'Marine Dark' : 'Standard Light'}</span> mode.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}