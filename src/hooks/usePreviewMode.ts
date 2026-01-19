import { useState, useEffect } from 'react';

const PREVIEW_KEY = 'moneyhive2024';
const STORAGE_KEY = 'moneyhive-preview-mode';

/**
 * Preview Mode Hook
 * 
 * AUTO-ENABLED ON:
 * - localhost (for development)
 * - 127.0.0.1 (for development)
 * 
 * MANUALLY ENABLED VIA:
 * - URL param: ?preview=moneyhive2024 (for stakeholders)
 * - Persists in localStorage after first activation
 */
export function usePreviewMode() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    
    // AUTO-ENABLE: Always enable preview mode on localhost (for development)
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      setIsPreviewMode(true);
      return;
    }

    // Check URL parameter (for stakeholder access)
    const urlParams = new URLSearchParams(window.location.search);
    const previewParam = urlParams.get('preview');
    
    if (previewParam === PREVIEW_KEY) {
      // Valid preview key - enable and save to localStorage
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsPreviewMode(true);
      // Clean URL without reloading (so they can share the clean URL)
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }

    // Check localStorage for existing preview mode (stakeholders who already activated)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      setIsPreviewMode(true);
    }
  }, []);

  const disablePreviewMode = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsPreviewMode(false);
  };

  return { isPreviewMode, disablePreviewMode };
}
