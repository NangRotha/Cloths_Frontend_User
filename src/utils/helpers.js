// Helper function to get the correct API URL for images and requests
export const getApiUrl = () => {
  return process.env.REACT_APP_API_URL || 'http://localhost:8000';
};

// Helper function to get the full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  const baseUrl = getApiUrl();
  // Remove any leading slash from imagePath to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  return `${baseUrl}/${cleanPath}`;
};
