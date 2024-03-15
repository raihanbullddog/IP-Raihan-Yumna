import { useEffect } from 'react';

const DisqusComments = ({ shortname, pageUrl, pageIdentifier }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://${shortname}.disqus.com/embed.js`;
    script.setAttribute('data-timestamp', +new Date());
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [shortname]);

  useEffect(() => {
    // Update Disqus thread with new page URL and identifier
    if (typeof window !== 'undefined' && window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = pageUrl;
          this.page.identifier = pageIdentifier;
        },
      });
    }
  }, [pageUrl, pageIdentifier]);

  return <div id="disqus_thread"></div>;
};

export default DisqusComments;
