import { useEffect } from 'react';

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = 'PII TA';//Default
    };
  }, [title]);
};

export default useDocumentTitle;
//custom hook ganti title tab browser