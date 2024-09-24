import './profile.css';
import React, { useState, useEffect, useRef } from 'react';
import photo from '../../assets/images/photo.png'; // Make sure the path is correct
import Header from './Header';
// import FetchData from './Fetchdata';
import axios from 'axios';

function Profile() {
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

  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch seller data on component mount
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/seller/profile', {
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
    if (!taxDetails.State) errors.State = 'State is required';
    if (!taxDetails.TaxImposed) errors.TaxImposed = 'Tax Imposed is required';
    if (!taxDetails.GST) errors.GST = 'GST is required';
    if (!storeDetails.StoreAddress) errors.StoreAddress = 'Store Address is required';
    if (!bankDetails.AccountType) errors.AccountType = 'Account Type is required';
    if (!bankDetails.AccountHolderName) errors.AccountHolderName = 'Account Holder Name is required';
    if (!bankDetails.IfscCode) errors.IfscCode = 'IFSC Code is required';

    return errors;
  };

  // Handle file input change for image upload
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  // Trigger file input on image click
  const handleImageClick = () => {
    hiddenFileInput.current.click();
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

      if (image) {
        formData.append("file", image);
      }

      try {
        const response = await fetch("http://localhost:5000/api/seller/profile", {
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
            <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
              {image ? (
                <img src={URL.createObjectURL(image)} alt="upload image" className="img-display-after" />
              ) : (
                <img src={photo} alt="upload image" className="img-display-before" />
              )}

              <input
                id="image-upload-input"
                type="file"
                onChange={handleFileInputChange}
                ref={hiddenFileInput}
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

        <div className="section">
          <div className='busniess-content'>
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
            <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
              {image ? (
                <img src={URL.createObjectURL(image)} alt="upload image" className="img-display-after" />
              ) : (
                <img src={photo} alt="upload image" className="img-display-before" />
              )}

              <input
                id="image-upload-input"
                type="file"
                onChange={handleFileInputChange}
                ref={hiddenFileInput}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>

        <div className="section">
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

        <div className="section">
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

        <div className="section">
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

  
