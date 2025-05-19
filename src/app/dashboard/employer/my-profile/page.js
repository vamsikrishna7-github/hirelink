'use client';
import styles from './Profile.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ClipLoader from 'react-spinners/ClipLoader';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import { 
  FaBuilding, 
  FaGlobe, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaIndustry,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaIdCard,
  FaUserCircle,
  FaCamera,
  FaCheck,
  FaPencilAlt,
  FaDownload,
  FaUpload
} from 'react-icons/fa';

export default function Profile() {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    user: {},
    profile: {},
    education: [],
    experience: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    name: '',
    company_name: '',
    designation: '',
    industry: '',
    company_size: '',
    company_address: '',
    website_url: '',
    phone_number: '',
    education: [],
    experience: [],
    company_description: '',
    core_business: '',
    company_culture: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get/profile/`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.code === 'token_not_valid') {
            Cookies.remove('access_token');
            router.push('/login');
            return;
          }
          throw new Error(errorData.detail || 'Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileData(data);
        setEditedData({
          name: data.user.name || '',
          company_name: data.profile.company_name || '',
          designation: data.profile.designation || '',
          industry: data.profile.industry || '',
          company_size: data.profile.company_size || '',
          company_address: data.profile.company_address || '',
          website_url: data.profile.website_url || '',
          phone_number: data.profile.phone_number || '',
          education: data.education || [],
          experience: data.experience || [],
          company_description: data.profile.company_description || '',
          core_business: data.profile.core_business || '',
          company_culture: data.profile.company_culture || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatEducationType = (type) => {
    const types = {
      'secondary': 'Secondary School',
      'bachelors': 'Bachelor\'s Degree',
      'masters': 'Master\'s Degree',
      'phd': 'PhD',
      'other': 'Other'
    };
    return types[type] || type;
  };

  // Function to get company logo URL
  const getCompanyLogo = (companyName) => {
    if (!companyName) return 'https://img.icons8.com/fluency/96/company.png';
    
    // Common company domain mappings
    const domainMap = {
      'google': 'google.com',
      'amazon': 'amazon.com',
      'netflix': 'netflix.com',
      'microsoft': 'microsoft.com',
      'apple': 'apple.com',
      'facebook': 'meta.com',
      'twitter': 'x.com',
      'linkedin': 'linkedin.com',
      'github': 'github.com',
      'microsoft': 'microsoft.com',
      'ibm': 'ibm.com',
      'oracle': 'oracle.com',
      'intel': 'intel.com',
      'adobe': 'adobe.com',
      'salesforce': 'salesforce.com'
    };
    
    const domain = domainMap[companyName.toLowerCase()] || 
                  `${companyName.toLowerCase().replace(/\s+/g, '')}.com`;
    
    // Try multiple sources in order of preference
    return [
      `https://logo.clearbit.com/${domain}?size=256`,
      `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,
      `https://icons.duckduckgo.com/ip3/${domain}.ico`,
      'https://img.icons8.com/fluency/96/company.png'
    ];
  };

  // Function to get school logo URL
  const getSchoolLogo = (schoolName) => {
    if (!schoolName) return 'https://img.icons8.com/external-nawicon-outline-color-nawicon/64/external-school-back-to-school-nawicon-outline-color-nawicon.png';
    
    // Common school domain mappings
    const schoolDomainMap = {
      'harvard university': 'harvard.edu',
      'stanford university': 'stanford.edu',
      'mit': 'mit.edu',
      'california institute of technology': 'caltech.edu',
      'university of oxford': 'ox.ac.uk',
      'university of cambridge': 'cam.ac.uk',
      'university of toronto': 'utoronto.ca',
      'university of british columbia': 'ubc.ca',
      'university of melbourne': 'unimelb.edu.au',
      'national university of singapore': 'nus.edu.sg'
    };
    
    const domain = schoolDomainMap[schoolName.toLowerCase()] || 
                  `${schoolName.toLowerCase().replace(/\s+/g, '')}.edu`;
    
    // Try multiple sources in order of preference
    return [
      `https://logo.clearbit.com/${domain}?size=256`,
      `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,
      `https://icons.duckduckgo.com/ip3/${domain}.ico`,
      'https://img.icons8.com/external-nawicon-outline-color-nawicon/64/external-school-back-to-school-nawicon-outline-color-nawicon.png'

    ];
  };

  // Custom image component with better error handling and multiple fallbacks
  const LogoImage = ({ src, alt, width, height, defaultSrc }) => {
    const [imgSrc, setImgSrc] = useState(Array.isArray(src) ? src[0] : src);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleError = () => {
      if (Array.isArray(src)) {
        const nextIndex = currentIndex + 1;
        if (nextIndex < src.length) {
          setCurrentIndex(nextIndex);
          setImgSrc(src[nextIndex]);
        } else {
          setImgSrc(defaultSrc);
        }
      } else {
        setImgSrc(defaultSrc);
      }
    };

    return (
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onError={handleError}
        className="rounded"
        style={{ 
          objectFit: 'contain',
          backgroundColor: 'white',
          padding: '4px'
        }}
      />
    );
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload a JPEG, JPG, PNG, GIF, or WebP image.');
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileImageUpload = async () => {
    if (!selectedImage) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('profile_image', selectedImage);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update-profile-image/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Cookies.get('access_token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile image');
      }

      const data = await response.json();
      console.log('Image upload response:', data);
      
      setProfileData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          profile_image: data.profile_image
        }
      }));

      setSelectedImage(null);
      setImagePreview(null);
      toast.success('Profile image updated successfully');
    } catch (error) {
      console.error('Error uploading profile image:', error);
      toast.error('Failed to upload profile image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setEditedData(prev => {
      const newEducation = [...prev.education];
      newEducation[index] = {
        ...newEducation[index],
        [field]: value
      };
      return {
        ...prev,
        education: newEducation
      };
    });
  };

  const handleExperienceChange = (index, field, value) => {
    setEditedData(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = {
        ...newExperience[index],
        [field]: value
      };
      return {
        ...prev,
        experience: newExperience
      };
    });
  };

  const handleAddEducation = () => {
    setEditedData(prev => ({
      ...prev,
      education: [...prev.education, {
        school_name: '',
        degree: '',
        education_type: '',
        field_of_study: '',
        grade: '',
        start_date: '',
        end_date: ''
      }]
    }));
  };

  const handleAddExperience = () => {
    setEditedData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company_name: '',
        designation: '',
        start_date: '',
        end_date: '',
        currently_working: false,
        location: '',
        job_description: ''
      }]
    }));
  };

  const handleDeleteEducation = async (index) => {
    try {
      const education = editedData.education[index];
      
      // If the education entry has an ID, delete it from the database
      if (education.id) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/educations/${education.id}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete education entry');
        }
      }

      // Update the local state
      setEditedData(prev => ({
        ...prev,
        education: prev.education.filter((_, i) => i !== index)
      }));

      toast.success('Education entry deleted successfully');
    } catch (error) {
      console.error('Error deleting education:', error);
      toast.error('Failed to delete education entry');
    }
  };

  const handleDeleteExperience = async (index) => {
    try {
      const experience = editedData.experience[index];
      
      // If the experience entry has an ID, delete it from the database
      if (experience.id) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experiences/${experience.id}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete experience entry');
        }
      }

      // Update the local state
      setEditedData(prev => ({
        ...prev,
        experience: prev.experience.filter((_, i) => i !== index)
      }));

      toast.success('Experience entry deleted successfully');
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast.error('Failed to delete experience entry');
    }
  };

  const handleUpdate = async () => {
    console.log('Updated Profile Data:', editedData);
    try {
      setIsUpdating(true);

      // Update user information
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update-user/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${Cookies.get('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: editedData.name
        })
      });

      if (!userResponse.ok) {
        throw new Error('Failed to update user information');
      }

      // Update profile information
      const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employer/profile/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${Cookies.get('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          company_name: editedData.company_name,
          designation: editedData.designation,
          industry: editedData.industry,
          company_size: editedData.company_size,
          company_address: editedData.company_address,
          website_url: editedData.website_url,
          phone_number: editedData.phone_number,
          company_description: editedData.company_description,
          core_business: editedData.core_business,
          company_culture: editedData.company_culture
        })
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to update profile');
      }

      // Refresh profile data
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get/profile/`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('access_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch updated profile');
      }

      const data = await response.json();
      setProfileData(data);
      setIsEditMode(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload a PDF or Word document.');
      return;
    }

    try {
      setUploadingResume(true);
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('email', profileData.user.email);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload-documents/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Cookies.get('access_token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload resume');
      }

      const data = await response.json();
      
      // Update profile data with new resume URL
      setProfileData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          resume: data.resume
        }
      }));

      toast.success('Resume uploaded successfully');
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume');
    } finally {
      setUploadingResume(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="text-center">
          <ClipLoader color="#0d6efd" size={50} />
          <p className="mt-3 text-black">Fetching content, please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <h2 className="text-red-600 text-xl font-semibold mb-2">Error Loading Profile</h2>
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => router.push('/login')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container pb-5">
      {/* Profile Header */}
      <div className={`${styles.profileHeader} position-relative mb-5`}>
        <div className={styles.coverImage}>
          <div className={styles.coverImageOverlay}>
            {isEditMode && (
              <label htmlFor="coverImageUpload" className={styles.coverImageUpload}>
                <FaCamera />
                <input
                  type="file"
                  id="coverImageUpload"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
        </div>
        <div className={styles.profileImageWrapper}>
          <div className={styles.profileImage}>
            {!isEditMode ? (
              <Image 
                src={profileData.profile.profile_image || `https://robohash.org/${profileData.user.name}.png?set=set3`} 
                alt="Profile" 
                width={180} 
                height={180} 
                className="rounded-circle"
                style={{ 
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%'
                }}
              />
            ) : (
              <div className="position-relative w-100 h-100">
                <div className="position-relative w-100 h-100">
                  <Image 
                    src={imagePreview || profileData.profile.profile_image || `https://robohash.org/${profileData.user.name}.png?set=set3`} 
                    alt="Profile" 
                    width={180} 
                    height={180} 
                    className="rounded-circle"
                    style={{ 
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      opacity: uploadingImage ? 0.5 : 1
                    }}
                  />
                  {uploadingImage && (
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <ClipLoader color="#0d6efd" size={30} />
                    </div>
                  )}
                </div>
                <div className={styles.profileImageUpload}>
                  <label htmlFor="profileImageUpload" className={styles.uploadButton}>
                    <FaCamera />
                  </label>
                  <input
                    type="file"
                    id="profileImageUpload"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                  />
                </div>
                {selectedImage && (
                  <button
                    className={`btn btn-primary btn-sm position-absolute bottom-0 start-50 translate-middle-x mb-2 ${styles.updatePhotoButton}`}
                    onClick={handleProfileImageUpload}
                    disabled={uploadingImage}
                    style={{
                      zIndex: 2,
                      minWidth: '150px'
                    }}
                  >
                    {uploadingImage ? (
                      <>
                        <ClipLoader color="#ffffff" size={12} className="me-2" />
                        Uploading...
                      </>
                    ) : (
                      'Update Profile Photo'
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={`${styles.profileInfo} text-center`}>
          {isEditMode ? (
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Your name"
            />
          ) : (
            <h1 className="h2 mb-2">{(profileData.user.name).toUpperCase()}</h1>
          )}
          {isEditMode ? (
            <input
              type="text"
              name="designation"
              value={editedData.designation}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Your designation"
            />
          ) : (
            <div className="text-muted mb-2">
              {profileData.profile.designation || 'No designation available'}
            </div>
          )}
          <div className="d-flex align-items-center justify-content-center">
            <FaBuilding className="me-2" />
            {isEditMode ? (
              <input
                type="text"
                name="company_name"
                value={editedData.company_name}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Company name"
              />
            ) : (
              <span>{profileData.profile.company_name || 'Company not specified'}</span>
            )}
          </div>
        </div>
      </div>

      {/* About Company Section */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={`${styles.sectionCard} mb-4`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>About Company</h2>
          {!isEditMode && (
            <button className={styles.actionButton} onClick={handleEditToggle}>
              <FaPencilAlt />
              Edit Information
            </button>
          )}
        </div>
        {isEditMode ? (
          <div className={styles.aboutCompanyEdit}>
            <div className={styles.companyInfoItem}>
              <label className={styles.companyInfoLabel}>
                <FaBuilding />
                Company Description
              </label>
              <textarea
                name="company_description"
                value={editedData.company_description || ''}
                onChange={handleInputChange}
                className={styles.companyInfoTextarea}
                placeholder="Tell us about your company, its mission, and values..."
                rows="4"
              />
            </div>
            <div className={styles.companyInfoItem}>
              <label className={styles.companyInfoLabel}>
                <FaIndustry />
                Core Business
              </label>
              <textarea
                name="core_business"
                value={editedData.core_business || ''}
                onChange={handleInputChange}
                className={styles.companyInfoTextarea}
                placeholder="Describe your core business activities and services..."
                rows="3"
              />
            </div>
            <div className={styles.companyInfoItem}>
              <label className={styles.companyInfoLabel}>
                <FaUsers />
                Company Culture
              </label>
              <textarea
                name="company_culture"
                value={editedData.company_culture || ''}
                onChange={handleInputChange}
                className={styles.companyInfoTextarea}
                placeholder="Share your company culture, work environment, and values..."
                rows="3"
              />
            </div>
          </div>
        ) : (
          <div className={styles.aboutCompanyView}>
            <div className={styles.companyInfoItem}>
              <div className={styles.companyInfoLabel}>
                <FaBuilding />
                Company Description
              </div>
              <p className={styles.companyInfoValue}>
                {profileData.profile.company_description || 'No company description available'}
              </p>
            </div>
            <div className={styles.companyInfoItem}>
              <div className={styles.companyInfoLabel}>
                <FaIndustry />
                Core Business
              </div>
              <p className={styles.companyInfoValue}>
                {profileData.profile.core_business || 'No core business information available'}
              </p>
            </div>
            <div className={styles.companyInfoItem}>
              <div className={styles.companyInfoLabel}>
                <FaUsers />
                Company Culture
              </div>
              <p className={styles.companyInfoValue}>
                {profileData.profile.company_culture || 'No company culture information available'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Company Information Section */}
      <div className={`${styles.sectionCard} mb-4`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Company Information</h2>
          {!isEditMode && (
            <button className={styles.actionButton} onClick={handleEditToggle}>
              <FaPencilAlt />
              Edit Information
            </button>
          )}
        </div>
        {isEditMode ? (
          <div className={styles.companyInfoGrid}>
            <div className={styles.companyInfoItem}>
              <label className={styles.companyInfoLabel}>
                <FaIndustry />
                Industry
              </label>
              <input
                type="text"
                name="industry"
                value={editedData.industry}
                onChange={handleInputChange}
                className={styles.companyInfoInput}
                placeholder="Enter industry"
              />
            </div>
            <div className={styles.companyInfoItem}>
              <label className={styles.companyInfoLabel}>
                <FaUsers />
                Company Size
              </label>
              <select
                name="company_size"
                value={editedData.company_size}
                onChange={handleInputChange}
                className={styles.companyInfoSelect}
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1001-5000">1001-5000 employees</option>
                <option value="5001+">5001+ employees</option>
                <option value="10000+">10000+ employees</option>
                <option value="100000+">100000+ employees</option>
                <option value="1000000+">1000000+ employees</option>
              </select>
            </div>
            <div className={`${styles.companyInfoItem} ${styles.companyInfoItem.fullWidth}`}>
              <label className={styles.companyInfoLabel}>
                <FaMapMarkerAlt />
                Company Address
              </label>
              <textarea
                name="company_address"
                value={editedData.company_address}
                onChange={handleInputChange}
                className={styles.companyInfoTextarea}
                placeholder="Enter company address"
              />
            </div>
            <div className={styles.companyInfoItem}>
              <label className={styles.companyInfoLabel}>
                <FaGlobe />
                Website URL
              </label>
              <input
                type="url"
                name="website_url"
                value={editedData.website_url}
                onChange={handleInputChange}
                className={styles.companyInfoInput}
                placeholder="Enter website URL"
              />
            </div>
            <div className={styles.companyInfoItem}>
              <label className={styles.companyInfoLabel}>
                <FaPhone />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={editedData.phone_number}
                onChange={handleInputChange}
                className={styles.companyInfoInput}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        ) : (
          <div className={styles.companyInfoGrid}>
            <div className={styles.companyInfoItem}>
              <div className={styles.companyInfoLabel}>
                <FaIndustry />
                Industry
              </div>
              <p className={styles.companyInfoValue}>
                {profileData.profile.industry || 'Not specified'}
              </p>
            </div>
            <div className={styles.companyInfoItem}>
              <div className={styles.companyInfoLabel}>
                <FaUsers />
                Company Size
              </div>
              <p className={styles.companyInfoValue}>
                {profileData.profile.company_size || 'Not specified'}
              </p>
            </div>
            <div className={`${styles.companyInfoItem} ${styles.companyInfoItem.fullWidth}`}>
              <div className={styles.companyInfoLabel}>
                <FaMapMarkerAlt />
                Company Address
              </div>
              <p className={styles.companyInfoValue}>
                {profileData.profile.company_address || 'Not specified'}
              </p>
            </div>
            <div className={styles.companyInfoItem}>
              <div className={styles.companyInfoLabel}>
                <FaGlobe />
                Website
              </div>
              <p className={styles.companyInfoValue}>
                {profileData.profile.website_url ? (
                  <a href={profileData.profile.website_url} target="_blank" rel="noopener noreferrer">
                    {profileData.profile.website_url}
                  </a>
                ) : (
                  'Not specified'
                )}
              </p>
            </div>
            <div className={styles.companyInfoItem}>
              <div className={styles.companyInfoLabel}>
                <FaPhone />
                Phone Number
              </div>
              <p className={styles.companyInfoValue}>
                {profileData.profile.phone_number || 'Not specified'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Documents Section */}
      <div className={`${styles.sectionCard} mb-4`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Company Documents</h2>
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <div className={styles.documentCard}>
              <div className={styles.documentIcon}>
                <FaFileAlt />
              </div>
              <div className={styles.documentInfo}>
                <h3 className={styles.documentTitle}>MSME/Incorporation Certificate</h3>
                <p className={styles.documentStatus}>
                  {profileData.profile.msme_or_incorporation_certificate ? 'Uploaded' : 'Not uploaded'}
                </p>
              </div>
              {profileData.profile.msme_or_incorporation_certificate && (
                <a 
                  href={profileData.profile.msme_or_incorporation_certificate} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.documentAction}
                >
                  <FaDownload />
                  View
                </a>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.documentCard}>
              <div className={styles.documentIcon}>
                <FaFileInvoiceDollar />
              </div>
              <div className={styles.documentInfo}>
                <h3 className={styles.documentTitle}>GSTIN Certificate</h3>
                <p className={styles.documentStatus}>
                  {profileData.profile.gstin_certificate ? 'Uploaded' : 'Not uploaded'}
                </p>
              </div>
              {profileData.profile.gstin_certificate && (
                <a 
                  href={profileData.profile.gstin_certificate} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.documentAction}
                >
                  <FaDownload />
                  View
                </a>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.documentCard}>
              <div className={styles.documentIcon}>
                <FaIdCard />
              </div>
              <div className={styles.documentInfo}>
                <h3 className={styles.documentTitle}>PAN Card</h3>
                <p className={styles.documentStatus}>
                  {profileData.profile.pan_card ? 'Uploaded' : 'Not uploaded'}
                </p>
              </div>
              {profileData.profile.pan_card && (
                <a 
                  href={profileData.profile.pan_card} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.documentAction}
                >
                  <FaDownload />
                  View
                </a>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.documentCard}>
              <div className={styles.documentIcon}>
                <FaUserCircle />
              </div>
              <div className={styles.documentInfo}>
                <h3 className={styles.documentTitle}>POC Document</h3>
                <p className={styles.documentStatus}>
                  {profileData.profile.poc_document ? 'Uploaded' : 'Not uploaded'}
                </p>
              </div>
              {profileData.profile.poc_document && (
                <a 
                  href={profileData.profile.poc_document} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.documentAction}
                >
                  <FaDownload />
                  View
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Application Status */}
      <div className={`${styles.sectionCard} mb-4`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Application Status</h2>
        </div>
        <div className={`${styles.statusBadge} ${styles.statusBadge[profileData.profile.application_status]}`}>
          <FaCheck />
          Status: {profileData.profile.application_status?.toUpperCase() || 'PENDING'}
        </div>
      </div>

      {/* Floating Edit/Update Button */}
      <button 
        className={styles.floatingEditButton}
        onClick={isEditMode ? handleUpdate : handleEditToggle}
        disabled={isUpdating}
      >
        {isUpdating ? (
          <>
            <span>Updating...</span>
            <ClipLoader color="#ffffff" size={12} className="ms-2" />
          </>
        ) : (
          <>
            <span>{isEditMode ? 'Update' : 'Edit'}</span>
            {isEditMode ? <FaCheck /> : <FaPencilAlt />}
          </>
        )}
      </button>
    </div>
  );
}