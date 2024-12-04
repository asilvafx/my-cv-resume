import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CV from '../components/CV';
import EditCVModal from '../components/EditCVModal';
import cvData from '../data/cvData.json';

const Home = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cvContent, setCvContent] = useState(cvData);

    useEffect(() => {
        // Load CV data from local storage if available
        const savedData = localStorage.getItem('cvData');
        if (savedData) {
            setCvContent(JSON.parse(savedData));
        }
    }, []);

    const handleEdit = () => {
        setIsModalOpen(true);
    };

    const handleSave = (updatedData) => {
        setCvContent(updatedData);
        localStorage.setItem('cvData', JSON.stringify(updatedData)); // Save to local storage
    };

    const handlePrint = () => {
        const cvContent = document.getElementById('cv-content').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
      <html>
        <head>
        <title>Print CV</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
        <style>
            body {
                font-family: 'Roboto', sans-serif;
            }
            section {
                margin-bottom: 2rem;
            }
        </style>
        </head>
        <body>
          <div>${cvContent}</div>
          <script defer>
          "use strict" 
          window.print();  
           </script>
        </body>
      </html>
    `);
    };

    return (
        <>
            <Helmet>
                <title>{t('seo_title')}</title>
                <meta name='description' content={t('seo_description')} />
            </Helmet>

            <Header onPrint={handlePrint} onEdit={handleEdit} />
            <div className="px-4">
                <CV data={cvContent} />
            </div>
            <EditCVModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                cvData={cvContent}
                onSave={handleSave}
            />
        </>
    );
};

export default Home;