/**
 * Device Detection Module
 * Detects tablets, foldables, and other specific devices
 */

let deviceInfo = {
    type: 'desktop',
    isTablet: false,
    isFoldable: false,
    isMobile: false,
    orientation: 'portrait',
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
};

/**
 * Initialize device detection
 */
export function initDeviceDetection() {
    detectDevice();
    detectOrientation();
    detectFoldable();
    
    // Listen for orientation changes
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Add device class to body
    updateBodyClasses();
}

/**
 * Detect device type
 */
function detectDevice() {
    const width = window.innerWidth;
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Mobile detection
    if (width < 768 || /android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
        deviceInfo.type = 'mobile';
        deviceInfo.isMobile = true;
    }
    // Tablet detection
    else if ((width >= 768 && width <= 1024) || /ipad|android(?!.*mobile)|tablet/i.test(userAgent)) {
        deviceInfo.type = 'tablet';
        deviceInfo.isTablet = true;
    }
    // Desktop
    else {
        deviceInfo.type = 'desktop';
    }
    
    deviceInfo.screenWidth = width;
    deviceInfo.screenHeight = window.innerHeight;
}

/**
 * Detect orientation
 */
function detectOrientation() {
    if (window.innerHeight > window.innerWidth) {
        deviceInfo.orientation = 'portrait';
    } else {
        deviceInfo.orientation = 'landscape';
    }
}

/**
 * Detect foldable devices
 */
function detectFoldable() {
    // Check for foldable environment variables
    if (CSS.supports('(env(fold-top))')) {
        deviceInfo.isFoldable = true;
    }
    
    // Check for Samsung Galaxy Fold
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('samsung') && (window.innerWidth === 1536 || window.innerWidth === 768)) {
        deviceInfo.isFoldable = true;
    }
    
    // Check for Microsoft Surface Duo
    if (userAgent.includes('surface duo')) {
        deviceInfo.isFoldable = true;
    }
}

/**
 * Handle resize
 */
function handleResize() {
    detectDevice();
    detectOrientation();
    updateBodyClasses();
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('devicechange', {
        detail: { ...deviceInfo }
    }));
}

/**
 * Handle orientation change
 */
function handleOrientationChange() {
    setTimeout(() => {
        detectOrientation();
        updateBodyClasses();
        
        window.dispatchEvent(new CustomEvent('orientationchange', {
            detail: { orientation: deviceInfo.orientation }
        }));
    }, 100);
}

/**
 * Update body classes
 */
function updateBodyClasses() {
    const body = document.body;
    
    // Remove existing device classes
    body.classList.remove('device-mobile', 'device-tablet', 'device-desktop', 'device-foldable');
    body.classList.remove('orientation-portrait', 'orientation-landscape');
    
    // Add current device classes
    body.classList.add(`device-${deviceInfo.type}`);
    body.classList.add(`orientation-${deviceInfo.orientation}`);
    
    if (deviceInfo.isFoldable) {
        body.classList.add('device-foldable');
    }
}

/**
 * Get device info
 */
export function getDeviceInfo() {
    return { ...deviceInfo };
}

/**
 * Check if device is tablet
 */
export function isTablet() {
    return deviceInfo.isTablet;
}

/**
 * Check if device is foldable
 */
export function isFoldable() {
    return deviceInfo.isFoldable;
}

/**
 * Check if device is mobile
 */
export function isMobile() {
    return deviceInfo.isMobile;
}

/**
 * Get orientation
 */
export function getOrientation() {
    return deviceInfo.orientation;
}

