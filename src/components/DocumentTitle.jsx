
import { useEffect } from 'react';

const DocumentTitle = ({ title, description }) => {
  useEffect(() => {
    document.title = `RISE | ${title}`; // Update page title

    // Update meta description
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', description);
    } else {
      // If meta description tag doesn't exist, create it
      const newMetaTag = document.createElement('meta');
      newMetaTag.setAttribute('name', 'description');
      newMetaTag.setAttribute('content', description);
      document.head.appendChild(newMetaTag);
    }
  }, [title, description]);

  return null;
};

export default DocumentTitle;