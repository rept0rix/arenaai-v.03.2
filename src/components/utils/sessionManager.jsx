// Session Manager - Handles anonymous session tracking (GDPR compliant)

export const SessionManager = {
  // Generate unique session ID
  generateSessionId() {
    return 'arena_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  // Get or create session ID
  getOrCreateSessionId() {
    let sessionId = localStorage.getItem('arena_session_id');
    
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem('arena_session_id', sessionId);
      localStorage.setItem('arena_session_created', new Date().toISOString());
    }
    
    return sessionId;
  },

  // Get device ID (for returning user detection)
  getOrCreateDeviceId() {
    let deviceId = localStorage.getItem('arena_device_id');
    
    if (!deviceId) {
      deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('arena_device_id', deviceId);
    }
    
    return deviceId;
  },

  // Save anonymous session data
  saveSessionData(data) {
    const sessionId = this.getOrCreateSessionId();
    const sessionData = this.getSessionData() || {};
    
    const updatedData = {
      ...sessionData,
      ...data,
      sessionId,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('arena_session_data', JSON.stringify(updatedData));
    return updatedData;
  },

  // Get session data
  getSessionData() {
    const data = localStorage.getItem('arena_session_data');
    return data ? JSON.parse(data) : null;
  },

  // Check if returning user
  isReturningUser() {
    const sessionId = localStorage.getItem('arena_session_id');
    const sessionData = this.getSessionData();
    return !!(sessionId && sessionData);
  },

  // Clear all session data (GDPR - full deletion)
  clearAllData() {
    localStorage.removeItem('arena_session_id');
    localStorage.removeItem('arena_device_id');
    localStorage.removeItem('arena_session_data');
    localStorage.removeItem('arena_session_created');
  },

  // Get session info
  getSessionInfo() {
    return {
      sessionId: localStorage.getItem('arena_session_id'),
      deviceId: localStorage.getItem('arena_device_id'),
      created: localStorage.getItem('arena_session_created'),
      data: this.getSessionData()
    };
  }
};