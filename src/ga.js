// src/ga.js
export const pageview = (url) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
    });
  }
};