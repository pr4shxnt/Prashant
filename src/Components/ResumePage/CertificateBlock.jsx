import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCertificate } from '../../Features/Personals/certificationSlice';
import LoadingPage from '../../Utils/loadingpage';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CertificateBlock = () => {
  const dispatch = useDispatch();
  const { certificates, loading, error } = useSelector((state) => state.certificate);

  const [isClient, setIsClient] = useState(false);
  const containerRefs = useRef([]);
  const [widths, setWidths] = useState([]);

  useEffect(() => {
    setIsClient(true);
    dispatch(fetchCertificate());
  }, [dispatch]);

  useEffect(() => {
    if (!isClient) return;

    const updateWidths = () => {
      const newWidths = containerRefs.current.map((el) => el?.offsetWidth || 0);
      setWidths(newWidths);
    };

    updateWidths();
    window.addEventListener('resize', updateWidths);
    return () => window.removeEventListener('resize', updateWidths);
  }, [certificates, isClient]);

  if (!isClient || loading) return <LoadingPage />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!certificates?.length) return <div className="p-4">No certificates found</div>;

  return (
    <div className="mt-14">
      <div className="px-5">Certificates</div>
      <div className="w-full px-5 md:px-0 mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificates.map((certificate, i) => {
          const pageWidth = widths[i] > 100 ? widths[i] - 50 : 250;
          return (
            <div
              key={certificate._id || certificate.issuer + i}
              ref={(el) => (containerRefs.current[i] = el)}
              aria-label={`Certificate issued by ${certificate.issuer} for ${certificate.title}`}
              className={`bg-white flex flex-col items-center`}
              style={{
                maxHeight: 420,      
                overflow: 'hidden',  
                marginBottom: 12,    
                paddingBottom: 0,   
              }}
            >
              <Document
                file={certificate.certificate}
                onLoadError={(err) => console.error('PDF load error:', err)}
              >
                {widths[i] > 0 && <Page pageNumber={1} width={pageWidth} />}
              </Document>
              <div className="mt-4  px-4 pb-2 text-center">
                <h1 className="text-sm">
                  {certificate.issuer} certified {certificate.title}
                </h1>
                <a
                  href={certificate.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline"
                >
                  View {certificate.credentialId}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CertificateBlock;
