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
  const [initialLoad, setInitialLoad] = useState(true);
  const [widths, setWidths] = useState([]);
  const containerRefs = useRef([]);

  const { certificates, loading, error } = useSelector((state) => state.certificate);

  useEffect(() => {
    dispatch(fetchCertificate());
  }, [dispatch]);

  useEffect(() => {
    setInitialLoad(loading === undefined || loading === true);
  }, [loading]);

  const updateWidths = () => {
    const newWidths = containerRefs.current.map((ref) => ref?.offsetWidth || 0);
    setWidths(newWidths);
  };

  useEffect(() => {
    updateWidths();
    window.addEventListener('resize', updateWidths);
    return () => window.removeEventListener('resize', updateWidths);
  }, [certificates]);

  if (initialLoad) return <LoadingPage />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="mt-14">
      <div className="">Certificates</div>
    <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
      {certificates.map((certificate, index) => (
        <div
          key={certificate._id || certificate.issuer}
          ref={(el) => (containerRefs.current[index] = el)}
          className=" shadow bg-white flex flex-col items-center "
          title={certificate.issuer + " - "+ certificate.title}
        >
          <Document
            file={certificate.certificate}
            onLoadError={(err) => console.error('PDF load error:', err)}
          >
            <Page pageNumber={1} width={widths[index] || 300} />
          </Document>
        </div>
      ))}
    </div></div>
  );
};

export default CertificateBlock;
