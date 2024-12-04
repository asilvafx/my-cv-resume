import React from 'react';
import avatarPlaceholder from '../assets/avatar.jpg';

const CV = ({data}) => {

    return (
        <div id="cv-content" className="max-w-6xl mx-auto bg-white p-6 shadow-lg rounded-lg mb-10">
            <div className="flex flex-col sm:flex-row items-center mb-6">
                <img alt={`Photo of ${data.personalInfo.name}`} className="w-24 h-24 rounded-full mr-4" src={localStorage.getItem('cvImage') || avatarPlaceholder } />
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-gray-800">{data.personalInfo.name}</h1>
                    <p className="text-lg text-gray-600">{data.personalInfo.title}</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center mb-6">
                <div className="text-center sm:text-left">
                    <p className="text-gray-600"><i className="fas fa-phone mr-2"></i>{data.personalInfo.phone}</p>
                    <p className="text-gray-600"><i className="fas fa-envelope mr-2"></i>{data.personalInfo.email}</p>
                    <p className="text-gray-600"><i className="fas fa-map-marker-alt mr-2"></i>{data.personalInfo.address}</p>
                </div>
            </div>
            <hr className="my-6" />
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4" contentEditable={true} suppressContentEditableWarning={true}>Profil</h2>
                <p className="text-gray-700 mb-6">{data.profile.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-gray-800 font-semibold" contentEditable={true} suppressContentEditableWarning={true}>DATE / LIEU NAISSANCE</p>
                        <p className="text-gray-600">{data.profile.birthDate}</p>
                        <p className="text-gray-600">{data.profile.birthPlace}</p>
                    </div>
                    <div>
                        <p className="text-gray-800 font-semibold" contentEditable={true} suppressContentEditableWarning={true}>NATIONALITE</p>
                        <p className="text-gray-600">{data.profile.nationality}</p>
                    </div>
                    <div>
                        <p className="text-gray-800 font-semibold" contentEditable={true} suppressContentEditableWarning={true}>PERMIS CONDUIRE</p>
                        <p className="text-gray-600">{data.profile.drivingLicense}</p>
                    </div>
                    <div>
                        <p className="text-gray-800 font-semibold" contentEditable={true} suppressContentEditableWarning={true}>LANGUES</p>
                        {data.profile.languages.map((language, index) => (
                            <p key={index} className="text-gray-600">{language}</p>
                        ))}
                    </div>
                </div>
            </section>
            <hr className="my-6" />
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4" contentEditable={true} suppressContentEditableWarning={true}>Compétences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {data.skills.map((skillCategory, index) => (
                        <div key={index}>
                            <h3 className="text-gray-800 font-semibold">{skillCategory.title}</h3>
                            <p className="text-gray-600">{skillCategory.tags.join(', ')}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h3 className="text-gray-800 font-semibold" contentEditable={true} suppressContentEditableWarning={true}>Expertise Complémentaire</h3>
                    <p className="text-gray-600">{data.additionalExpertise}</p>
                </div>
            </section>
            <hr className="my-6" />
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4" contentEditable={true} suppressContentEditableWarning={true}>Projets Clés</h2>
                <ul className="list-disc list-inside text-gray-700">
                    {data .projects.map((project, index) => (
                        <li key={index} className="mb-2">
                            {project}
                        </li>
                    ))}
                </ul>
            </section>
            <hr className="my-6" />
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4" contentEditable={true} suppressContentEditableWarning={true}>Expérience</h2>
                {data.experience.map((job, index) => (
                    <div key={index} className="mb-6">
                        <p className="font-semibold text-gray-600">{job.period}</p>
                        <p className="font-bold text-lg text-blue-600">{job.title}</p>
                        <p className="italic text-gray-500">{job.company}</p>
                        <ul className="list-disc list-inside mt-2 text-gray-700">
                            {job.responsibilities.map((responsibility, idx) => (
                                <li key={idx}>{responsibility}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
            <hr className="my-6" />
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4" contentEditable={true} suppressContentEditableWarning={true}>Formation</h2>
                {data.education.map((edu, index) => (
                    <div key={index} className="mb-6">
                        <p className="font-semibold text-gray-600">{edu.period}</p>
                        <p className="font-bold text-lg text-blue-600">{edu.title}</p>
                        <p className="italic text-gray-500">{edu.institution}</p>
                        <ul className="list-disc list-inside mt-2 text-gray-700">
                            {edu.details.map((detail, idx) => (
                                <li key={idx}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
            <hr className="my-6" />
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4" contentEditable={true} suppressContentEditableWarning={true}>Certificats</h2>
                {data.certifications.map((cert, index) => (
                    <div key={index} className="mb-6">
                        <p className="font-semibold text-gray-600">{cert.year}</p>
                        <p className="font-bold text-lg text-blue-600">{cert.title}</p>
                        <p className="italic text-gray-500">{cert.institution}</p>
                    </div>
                ))}
            </section>
            <footer className="text-center">
                <p className="text-gray-500 font-bold text-sm">
                    {data.footer.one} | {data.footer.two} | {data.footer.three}
                </p>
            </footer>
        </div>
    );
};

export default CV;