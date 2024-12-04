import React, { useState, useEffect } from 'react';

const EditCVModal = ({ isOpen, onClose, cvData, onSave }) => {
    const [formData, setFormData] = useState(cvData);
    const [imagePreview, setImagePreview] = useState(null);
    const [expandedSkills, setExpandedSkills] = useState([]); // State for toggling skills

    // Update formData whenever cvData changes
    useEffect(() => {
        setFormData(cvData);
        setImagePreview(cvData.personalInfo.photo); // Set initial image preview
    }, [cvData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            personalInfo: {
                ...prevData.personalInfo,
                [name]: value,
            },
        }));
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            profile: {
                ...prevData.profile,
                [name]: value,
            },
        }));
    };

    const handleSkillsChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSkills = [...formData.skills];
        updatedSkills[index][name] = value.split(',').map(skill => skill.trim());
        setFormData((prevData) => ({
            ...prevData,
            skills: updatedSkills,
        }));
    };

    // Expand/Collapse functionality
    const toggleSkill = (index) => {
        setExpandedSkills((prev) => {
            const newExpanded = prev.includes(index ) ? prev.filter(i => i !== index) : [...prev, index];
            return newExpanded;
        });
    };

    const handleProjectsChange = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            projects: value.split('\n'), // Split by new line
        }));
    };

    const handleExperienceChange = (index, field, value) => {
        const updatedExperience = formData.experience.map((job, idx) => {
            if (idx === index) {
                return { ...job, [field]: value };
            }
            return job;
        });
        setFormData((prevData) => ({
            ...prevData,
            experience: updatedExperience,
        }));
    };

    const handleEducationChange = (index, field, value) => {
        const updatedEducation = formData.education.map((edu, idx) => {
            if (idx === index) {
                return { ...edu, [field]: value };
            }
            return edu;
        });
        setFormData((prevData) => ({
            ...prevData,
            education: updatedEducation,
        }));
    };

    const handleCertificationChange = (index, field, value) => {
        const updatedCertifications = formData.certifications.map((cert, idx) => {
            if (idx === index) {
                return { ...cert, [field]: value };
            }
            return cert;
        });
        setFormData((prevData) => ({
            ...prevData,
            certifications: updatedCertifications,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl); // Set the image preview
            // Save the image URL to local storage
            localStorage.setItem('cvImage', imageUrl);
        }
    };

    const handleSave = () => {
        // Basic validation can be added here
        if (!formData.personalInfo.name || !formData.personalInfo.email) {
            alert("Name and Email are required fields.");
            return;
        }
        // Update the photo URL in formData
        formData.personalInfo.photo = imagePreview || formData.personalInfo.photo;
        onSave(formData); // Pass the updated data back to the parent
        onClose(); // Close the modal
    };

    // Expand/Collapse functionality
    const [expandedExperience, setExpandedExperience] = useState([]);
    const [expandedEducation, setExpandedEducation] = useState([]);
    const [expandedCertifications, setExpandedCertifications] = useState([]);

    const toggleExperience = (index) => {
        setExpandedExperience((prev) => {
            const newExpanded = prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index];
            return newExpanded;
        });
    };

    const toggleEducation = (index) => {
        setExpandedEducation((prev) => {
            const newExpanded = prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index];
            return newExpanded;
        });
    };

    const toggleCertification = (index) => {
        setExpandedCertifications((prev) => {
            const newExpanded = prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index];
            return newExpanded;
        });
    };

    const addExperience = () => {
        setFormData((prevData) => ({
            ...prevData,
            experience: [...prevData.experience, { period: '', title: '', company: '', responsibilities: [] }],
        }));
    };

    const addEducation = () => {
        setFormData((prevData) => ({
            ...prevData,
            education: [...prevData.education, { period: '', title: '', institution: '', details: [] }],
        }));
    };

    const addCertification = () => {
        setFormData((prevData) => ({
            ...prevData,
            certifications: [...prevData.certifications, { year: '', title: '', institution: '' }],
        }));
    };

    const removeExperience = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            experience: prevData.experience.filter((_, idx) => idx !== index),
        }));
    };

    const removeEducation = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            education: prevData.education.filter((_, idx) => idx !== index),
        }));
    };

    const removeCertification = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            certifications: prevData.certifications.filter((_, idx) => idx !== index),
        }));
    };

    const addSkillCategory = () => {
        setFormData((prevData) => ({
            ...prevData,
            skills: [...prevData.skills, { title: '', tags: [] }],
        }));
    };

    const removeSkillCategory = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            skills: prevData.skills.filter((_, idx) => idx !== index),
        }));
    };

    const handleReset = () => {
        localStorage.removeItem('cvData'); // Clean local storage
        window.location.reload();
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal bg-white">
                <div className="modal-body">
                <h2 className="text-xl mb-4">Edit CV</h2>

                {/* Image Upload */}
                <div className="flex flex-col gap-1 mb-3">
                    <label>Upload Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover"/>}
                </div>

                {/* Personal Info */}
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.personalInfo.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.personalInfo.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.personalInfo.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.personalInfo.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.personalInfo.address}
                        onChange={handleChange}
                    />
                </div>

                {/* Profile Info */}
                <h3 className="text-lg font-semibold mt-4">Profile</h3>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.profile.description}
                        onChange={handleProfileChange}
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Birth Date:</label>
                    <input
                        type="text"
                        name="birthDate"
                        value={formData.profile.birthDate}
                        onChange={handleProfileChange}
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Birth Place:</label>
                    <input
                        type="text"
                        name="birthPlace"
                        value={formData.profile.birthPlace}
                        onChange={handleProfileChange}
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Nationality:</label>
                    <input
                        type="text"
                        name="nationality"
                        value={formData.profile.nationality}
                        onChange={handleProfileChange}
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Driving License:</label>
                    <input
                        type="text"
                        name="drivingLicense"
                        value={formData.profile.drivingLicense}
                        onChange={handleProfileChange}
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Languages (comma separated):</label>
                    <input
                        type="text"
                        name="languages"
                        value={formData.profile.languages.join(', ')}
                        onChange={handleSkillsChange}
                    />
                </div>

                {/* Skills */}
                <h3 className="text-lg font-semibold mt-4">Skills</h3>
                {formData.skills.map((skillCategory, index) => (
                    <div key={index} className="mb-3">
                        <h4 className="font-semibold cursor-pointer" onClick={() => toggleSkill(index)}>
                            Skill Category {index + 1} {expandedSkills.includes(index) ? '-' : '+'}
                        </h4>
                        {expandedSkills.includes(index) && (
                            <div className="ml-4">
                                <div className="flex flex-col gap-1">
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        value={skillCategory.title}
                                        onChange={(e) => {
                                            const updatedSkills = [...formData.skills];
                                            updatedSkills[index].title = e.target.value; // Update the title
                                            setFormData({...formData, skills: updatedSkills});
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label>Tags (comma separated):</label>
                                    <input
                                        type="text"
                                        value={skillCategory.tags.join(', ')} // Join tags for display
                                        onChange={(e) => {
                                            const updatedSkills = [...formData.skills];
                                            updatedSkills[index].tags = e.target.value.split(',').map(tag => tag.trim()); // Update the tags
                                            setFormData({...formData, skills: updatedSkills});
                                        }}
                                    />
                                </div>
                                <button onClick={() => removeSkillCategory(index)} className="text-red-500">Remove Skill
                                    Category
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                <button onClick={addSkillCategory} className="bg-green-500 text-white py-1 px-2 rounded">Add Skill
                    Category
                </button>

                <div className="flex flex-col gap-1 mb-3">
                    <label>Additional Expertise:</label>
                    <input
                        type="text"
                        name="additionalExpertise"
                        value={formData.additionalExpertise}
                        onChange={handleProfileChange}
                    />
                </div>

                {/* Projects */}
                <h3 className="text-lg font-semibold mt-4">Projects</h3>
                <textarea
                    value={formData.projects.join('\n')}
                    onChange={handleProjectsChange}
                    placeholder="Enter each project on a new line"
                />

                {/* Experience */}
                <h3 className="text-lg font-semibold mt-4">Experience</h3>
                {formData.experience.map((job, index) => (
                    <div key={index} className="mb-3">
                        <h4 className="font-semibold cursor-pointer" onClick={() => toggleExperience(index)}>
                            Job {index + 1} {expandedExperience.includes(index) ? '-' : '+'}
                        </h4>
                        {expandedExperience.includes(index) && (
                            <div className="ml-4">
                                <div className="flex flex-col gap-1">
                                    <label>Period:</label>
                                    <input
                                        type="text"
                                        value={job.period}
                                        onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        value={job.title}
                                        onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label>Company:</label>
                                    <input
                                        type="text"
                                        value={job.company}
                                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label>Responsibilities (comma separated):</label>
                                    <textarea
                                        value={job.responsibilities.join(', ')}
                                        onChange={(e) => handleExperienceChange(index, 'responsibilities', e.target.value.split(',').map(res => res.trim()))}
                                    />
                                </div>
                                <button onClick={() => removeExperience(index)} className="text-red-500">Remove</button>
                            </div>
                        )}
                    </div>
                ))}
                <button onClick={addExperience} className="bg-green-500 text-white py-1 px-2 rounded">Add Experience
                </button>

                {/* Education */}
                <h3 className="text-lg font-semibold mt-4">Education</h3>
                {formData.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                        <h4 className="font-semibold cursor-pointer" onClick={() => toggleEducation(index)}>
                            Education {index + 1} {expandedEducation.includes(index) ? '-' : '+'}
                        </h4>
                        {expandedEducation.includes(index) && (
                            <div className="ml-4">
                                <div className="flex flex-col gap-1">
                                    <label>Period:</label>
                                    <input
                                        type="text"
                                        value={edu.period}
                                        onChange={(e) => handleEducationChange(index, 'period', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        value={edu.title}
                                        onChange={(e) => handleEducationChange(index, 'title', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label>Institution:</label>
                                    <input
                                        type="text"
                                        value={edu.institution}
                                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label>Details (comma separated):</label>
                                    <textarea
                                        value={edu.details.join(', ')}
                                        onChange={(e) => handleEducationChange(index, 'details', e.target.value.split(',').map(detail => detail.trim()))}
                                    />
                                </div>
                                <button onClick={() => removeEducation(index)} className="text-red-500">Remove</button>
                            </div>
                        )}
                    </div>
                ))}
                <button onClick={addEducation} className="bg-green-500 text-white py-1 px-2 rounded">Add Education
                </button>

                {/* Certifications */}
                <h3 className="text-lg font-semibold mt-4">Certifications</h3>
                {formData.certifications.map((cert, index) => (
                    <div key={index} className="mb-3">
                        <h4 className="font-semibold cursor-pointer" onClick={() => toggleCertification(index)}>
                            Certification {index + 1} {expandedCertifications.includes(index) ? '-' : '+'}
                        </h4>
                        {expandedCertifications.includes(index) && (
                            <div className="ml-4">
                                <div className="flex flex-col gap-1">
                                    <label>Year:</label>
                                    <input
                                        type="text"
                                        value={cert.year}
                                        onChange={(e) => handleCertificationChange(index, 'year', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        value={cert.title}
                                        onChange={(e) => handleCertificationChange(index, 'title', e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label>Institution:</label>
                                    <input
                                        type="text"
                                        value={cert.institution}
                                        onChange={(e) => handleCertificationChange(index, 'institution', e.target.value)}
                                    />
                                </div>
                                <button onClick={() => removeCertification(index)} className="text-red-500">Remove
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                <button onClick={addCertification} className="bg-green-500 text-white py-1 px-2 rounded">Add
                    Certification
                </button>

                {/* Footer Links */}
                <h3 className="text-lg font-semibold mt-4">Footer Links</h3>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Link 1:</label>
                    <input
                        type="text"
                        value={formData.footer.one}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                footer: {
                                    ...prevData.footer,
                                    one: e.target.value,
                                },
                            }));
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Link 2:</label>
                    <input
                        type="text"
                        value={formData.footer.two}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                footer: {
                                    ...prevData.footer,
                                    two: e.target.value,
                                },
                            }));
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label>Link 3:</label>
                    <input
                        type="text"
                        value={formData.footer.three}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                footer: {
                                    ...prevData.footer,
                                    three: e.target.value,
                                },
                            }));
                        }}
                    />
                </div>
            </div>

            <div className="modal-footer flex flex-wrap gap-2 items-center">
                    {/* Save and Cancel Buttons */}
                    <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
                        Save
                    </button>
                    <button onClick={handleReset} className="bg-orange-500 text-white py-2 px-4 rounded">
                        Reset
                    </button>
                    <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCVModal;