// Google Sheets Integration Utility
export interface WaitlistData {
  fullName: string;
  email: string;
  country: string;
  devicePreference: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
}

export class AnalyticsService {
  private static readonly GOOGLE_SHEETS_URL = process.env.VITE_GOOGLE_SHEETS_URL || '';
  
  static async submitToGoogleSheets(data: WaitlistData): Promise<boolean> {
    try {
      // Validate and sanitize data
      const sanitizedData = this.sanitizeData(data);
      
      // In a real implementation, this would call Google Sheets API
      // For now, we'll log the data and store locally
      console.log('Submitting to Google Sheets:', sanitizedData);
      
      // Store in localStorage as backup
      const existingData = JSON.parse(localStorage.getItem('moneyhive_analytics') || '[]');
      existingData.push(sanitizedData);
      localStorage.setItem('moneyhive_analytics', JSON.stringify(existingData));
      
      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      return false;
    }
  }
  
  private static sanitizeData(data: WaitlistData): WaitlistData {
    return {
      fullName: data.fullName.trim().substring(0, 100),
      email: data.email.trim().toLowerCase().substring(0, 255),
      country: data.country.trim().substring(0, 100),
      devicePreference: data.devicePreference.trim(),
      timestamp: data.timestamp,
      userAgent: data.userAgent.substring(0, 500),
      referrer: data.referrer.substring(0, 500)
    };
  }
  
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  static trackEvent(eventName: string, properties: Record<string, any> = {}): void {
    // Track user interactions for analytics
    const event = {
      name: eventName,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      }
    };
    
    console.log('Analytics Event:', event);
    
    // Store events locally
    const events = JSON.parse(localStorage.getItem('moneyhive_events') || '[]');
    events.push(event);
    localStorage.setItem('moneyhive_events', JSON.stringify(events.slice(-100))); // Keep last 100 events
  }
}