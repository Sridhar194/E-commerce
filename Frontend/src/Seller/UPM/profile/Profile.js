import './sellerprofile.css';
import React, { useState, useEffect, useRef } from 'react';
import photo from '../../assets/images/photo.png'; // Make sure the path is correct
import Header from './Header';
// import FetchData from './Fetchdata';
import axios from 'axios';

function Profile() {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/;
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    phone: '',
    Address: '',
    email: '',
  });

  const [businessDetails, setBusinessDetails] = useState({
    CompanyName: '',
    WebsiteUrl: '',
    BusinessType: '',
    BusinessAddress: '',
  });

  const [taxDetails, setTaxDetails] = useState({
    State: '',
    TaxImposed: '',
    GST: '',
  });

  const [storeDetails, setStoreDetails] = useState({
    StoreAddress: '',
  });

  const [bankDetails, setBankDetails] = useState({
    AccountType: '',
    AccountHolderName: '',
    IfscCode: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);  const hiddenFileInput = useRef(null);
  const hiddenProfileInput = useRef(null);
  const hiddenLogoInput = useRef(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch seller data on component mount
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/seller/profile', {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        const data = response.data.user;
        
        setPersonalDetails({
          name: response.data.user.name, // Update based on API response structure
          phone: response.data.user.phone,
          email: response.data.user.email,
          Address: response.data.user.Address
        });
        setBusinessDetails({
          CompanyName: data.CompanyName,
          WebsiteUrl: data.WebsiteUrl,
          BusinessType: data.BusinessType,
          BusinessAddress: data.BusinessAddress,
        });
        setTaxDetails({
          State: data.State,
          TaxImposed: data.TaxImposed,
          GST: data.GST,
        });
        setStoreDetails({
          StoreAddress: data.StoreAddress,
        });
        setBankDetails({
          AccountType: data.AccountType,
          AccountHolderName: data.AccountHolderName,
          IfscCode: data.IfscCode,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    fetchSellerData();
  }, []);

  // Handle input changes
  const handleInputChange = (e, section, field) => {
    const { value } = e.target;
    switch (section) {
      case 'personal':
        setPersonalDetails({ ...personalDetails, [field]: value });
        break;
      case 'business':
        setBusinessDetails({ ...businessDetails, [field]: value });
        break;
      case 'tax':
        setTaxDetails({ ...taxDetails, [field]: value });
        break;
      case 'store':
        setStoreDetails({ ...storeDetails, [field]: value });
        break;
      case 'bank':
        setBankDetails({ ...bankDetails, [field]: value });
        break;
      default:
        break;
    }
  };

  // Validate the form before submission
  const validateForm = () => {
    const errors = {};
    if (!businessDetails.CompanyName) errors.CompanyName = 'Company Name is required';
  if (!businessDetails.BusinessType) errors.BusinessType = 'Business Type is required';
  if (!businessDetails.BusinessAddress) errors.BusinessAddress = 'Business Address is required';

  // Conditional validation for Website URL
  if (businessDetails.WebsiteUrl && !urlRegex.test(businessDetails.WebsiteUrl)) {
    errors.WebsiteUrl = 'Please enter a valid website URL';
  }

  // Tax details validation
  if (!taxDetails.State) errors.State = 'State is required';
  if (!taxDetails.TaxImposed) errors.TaxImposed = 'Tax Imposed is required';

  // Conditional validation for GST
  if (taxDetails.GST && !gstRegex.test(taxDetails.GST)) {
    errors.GST = 'Please enter a valid GST number';
  }

  // Store and bank details validation
  if (!storeDetails.StoreAddress) errors.StoreAddress = 'Store Address is required';
  if (!bankDetails.AccountType) errors.AccountType = 'Account Type is required';
  if (!bankDetails.AccountHolderName) errors.AccountHolderName = 'Account Holder Name is required';
  if (!bankDetails.IfscCode) errors.IfscCode = 'IFSC Code is required';

    return errors;
  };
 // Handle file input change for profile image upload
 const handleProfileFileInputChange = (event) => {
  const file = event.target.files[0];
  setProfileImage(file);
};

// Handle file input change for logo upload
const handleLogoFileInputChange = (event) => {
  const file = event.target.files[0];
  setLogoImage(file);
};

// Trigger file input for profile image on click
const handleProfileImageClick = () => {
  hiddenProfileInput.current.click();
};

// Trigger file input for logo on click
const handleLogoImageClick = () => {
  hiddenLogoInput.current.click();
};

  // Handle form submission
  const handleConfirmClick = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append("name", personalDetails.name);
      formData.append("phone", personalDetails.phone);
      formData.append("Address", personalDetails.Address);
      formData.append("email", personalDetails.email);
      formData.append("CompanyName", businessDetails.CompanyName);
      formData.append("WebsiteUrl", businessDetails.WebsiteUrl);
      formData.append("BusinessType", businessDetails.BusinessType);
      formData.append("BusinessAddress", businessDetails.BusinessAddress);
      formData.append("State", taxDetails.State);
      formData.append("TaxImposed", taxDetails.TaxImposed);
      formData.append("GST", taxDetails.GST);
      formData.append("StoreAddress", storeDetails.StoreAddress);
      formData.append("AccountType", bankDetails.AccountType);
      formData.append("AccountHolderName", bankDetails.AccountHolderName);
      formData.append("IfscCode", bankDetails.IfscCode);

     // Append profile image if uploaded
     if (profileImage) {
      formData.append("profileImage", profileImage);
    }
    
    // Append logo image if uploaded
    if (logoImage) {
      formData.append("logoImage", logoImage);
    }

      try {
        const response = await fetch("http://localhost:5000/seller/profile", {
            method: 'PUT',
            credentials: 'include', // Ensure cookies are sent with the request
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Profile updated successfully:", data.message);
            alert(data.message);
        } else {
            const errorData = await response.json();
            console.error("Error updating profile:", errorData.message || response.statusText);
            alert(`Error: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error("Error updating profile:", error);
    }
} else {
    setErrors(validationErrors);
}
};
  return (
    <>
      <Header />
      {/ <FetchData setPersonalDetails={setPersonalDetails} /> /} */}
      <div className="container">
        <div className="profile-section">
          <div className="box-decoration">
            <h1 className="img-heading">Add photo</h1>
            <div onClick={handleProfileImageClick} style={{ cursor: "pointer" }}>
              {profileImage ? (
                <img src={URL.createObjectURL(profileImage)} alt="Profile" className="img-display-after" />
              ) : (
                <img src={photo} alt="Upload" className="img-display-before" />
              )}

              <input
                type="file"
                onChange={handleProfileFileInputChange}
                ref={hiddenProfileInput}
                style={{ display: "none" }}
              />
            </div>
          </div>
        
          <div className="personal-details">
            <h2>Personal details</h2>
            {['name', 'phone', 'Address', 'email'].map((field, index) => (
              <div className="field" key={index}>
                <label>{field.replace(/([A-Z])/g, ' $1')}:</label>
                <input
                  className='personal-input'
                  type={field === 'Dob' ? 'date' : 'text'}
                  value={personalDetails[field]}
                  onChange={(e) => handleInputChange(e, 'personal', field)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="section1">
          <div className='busniess-content1'>
            <h2>Business details</h2>
            {['CompanyName', 'WebsiteUrl', 'BusinessType', 'BusinessAddress'].map((field, index) => (
              <div className="field" key={index}>
                <label>{field.replace(/([A-Z])/g, ' $1')}:</label>
                <input
                  className='business-input'
                  type="text"
                  value={businessDetails[field]}
                  onChange={(e) => handleInputChange(e, 'business', field)}
                />
                {errors[field] && <p className="error">{errors[field]}</p>}
              </div>
            ))}
          </div>
          <div className="box-decoration">
            <h1 className="img-heading">Add Logo</h1>
            <div onClick={handleLogoImageClick} style={{ cursor: "pointer" }}>
              {logoImage ? (
                <img src={URL.createObjectURL(logoImage)} alt="Logo" className="img-display-after" />
              ) : (
                <img src={photo} alt="Upload" className="img-display-before" />
              )}
              <input
                type="file"
                onChange={handleLogoFileInputChange}
                ref={hiddenLogoInput}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>

        <div className="section2">
          <div className='busniess-content'>
            <h2>Tax details</h2>
            {['State', 'TaxImposed', 'GST'].map((field, index) => (
              <div className="field" key={index}>
                <label>{field.replace(/([A-Z])/g, ' $1')}:</label>
                <input
                  className='tax-input'
                  type="text"
                  value={taxDetails[field]}
                  onChange={(e) => handleInputChange(e, 'tax', field)}
                />
                {errors[field] && <p className="error">{errors[field]}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="section2">
          <div className='busniess-content'>
            <h2>Store Address</h2>
            <div className="field">
              <label>Store Address:</label>
              <input
                type="text"
                className='store-input'
                value={storeDetails.StoreAddress}
                onChange={(e) => handleInputChange(e, 'store', 'StoreAddress')}
              />
              {errors.StoreAddress && <p className="error">{errors.StoreAddress}</p>}
            </div>
          </div>
        </div>

        <div className="section2">
          <div className='busniess-content'>
            <h2>Bank details</h2>
            {['AccountType', 'AccountHolderName', 'IfscCode'].map((field, index) => (
              <div className="field" key={index}>
                <label>{field.replace(/([A-Z])/g, ' $1')}:</label>
                <input
                  type="text"
                  className='bank-input'
                  value={bankDetails[field]}
                  onChange={(e) => handleInputChange(e, 'bank', field)}
                />
                {errors[field] && <p className="error">{errors[field]}</p>}
              </div>
            ))}
          </div>
        </div>
        <button type="button" className="confirm-button" onClick={handleConfirmClick}>Confirm</button>
      </div>
    </>
  );
}

export default Profile;  

  


  
