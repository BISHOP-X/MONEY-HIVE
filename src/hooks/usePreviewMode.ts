import { useState, useEffect } from 'react';

const PREVIEW_KEY = 'moneyhive2024';
const STORAGE_KEY = 'moneyhive-preview-mode';

export function usePreviewMode() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const previewParam = urlParams.get('preview');
    
    if (previewParam === PREVIEW_KEY) {
      // Valid preview key - enable and save
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsPreviewMode(true);
      // Clean URL without reloading
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }

    // Check localStorage for existing preview mode
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      setIsPreviewMode(true);
    }
  }, []);

  // Keyboard shortcut: Ctrl+Shift+D to toggle (for you)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        const newValue = !isPreviewMode;
        localStorage.setItem(STORAGE_KEY, String(newValue));
        setIsPreviewMode(newValue);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewMode]);

  const disablePreviewMode = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsPreviewMode(false);
  };

  return { isPreviewMode, disablePreviewMode };
}
