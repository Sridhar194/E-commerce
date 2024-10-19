import React, { useEffect, useState ,useRef} from 'react';
import { useNavigate } from "react-router-dom";
import photo from '..//assets/images/photo.png'; // Make sure the path is correct

function AddProduct() {
  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  // State for form fields
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("Groceries");
  const [productDiscount, setProductDiscount] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [charges, setCharges] = useState("");
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountValue, setDiscountValue] = useState("");
  // State for error handling
  const [errors, setErrors] = useState({});

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission

    if (validateForm()) {
      try {
        // Proceed with form submission
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productPrice", parseFloat(productPrice));// backend expect numeric value so converted the string value into num
        formData.append("productCategory", productCategory);
        formData.append("productDiscount", productDiscount);
        formData.append("shippingMethod", shippingMethod);
        formData.append("pickupAddress", pickupAddress);
        // Convert charges to number before appending
        formData.append("charges", parseFloat(charges));
        if (image) {
          formData.append("image", image);
        }

        const response = await fetch("http://localhost:5000/seller/products", {
          method: "POST",
          credentials: 'include',
          body: formData,
        });

        if (response.ok) {
          alert("Product added successfully");
          console.log("Form submitted successfully!");
        } else {
          throw new Error("Failed to add product");
        }
      }catch (error) {
        console.error("Error submitting form:", error);
        alert("There was an error submitting the form.");
      }
    } else {
      console.log("Form has errors.");
    }
  };
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  // Validate form fields
  const validateForm = () => {
    let formErrors = {};

    const nameRegex = /^[A-Za-z\s]+$/; // Regex to allow only alphabetic characters and spaces
    if (!productName) {
      formErrors.productName = "Product Name is required";
    } else if (!nameRegex.test(productName)) {
      formErrors.productName = "Product Name can only contain alphabetic characters";
    }
    // if (!productName) formErrors.productName = "Product Name is required";
    if (!productDescription) formErrors.productDescription = "Product Description is required";
    // if (!productPrice) formErrors.productPrice = "Product Price is required";
    const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/; // Regex to allow only numbers and optional two decimals
  if (!productPrice) {
    formErrors.productPrice = "Product Price is required";
  } else if (!priceRegex.test(productPrice)) {
    formErrors.productPrice = "Product Price can only contain numeric values";
  } 
  if (showDiscountInput && discountValue === "") {
    formErrors.discountValue = "Discount value is required if discount is selected";
  } else if (showDiscountInput && discountValue >= 100) {
    formErrors.discountValue = "Discount value cannot be 100% or more";
  }

    if (!productDiscount) {
      formErrors.productDiscount = "Product Discount option is required";
    }
    if (!shippingMethod) formErrors.shippingMethod = "Shipping Method is required";
    if (!pickupAddress) formErrors.pickupAddress = "Pickup Address is required";
    if (!charges) formErrors.charges = "Charges are required";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0; // Returns true if no errors
  };

  const handleDiscountChange = (e) => {
    setProductDiscount(e.target.value);
    if (e.target.value === "Discount") {
      setShowDiscountInput(true);
    } else {
      setShowDiscountInput(false);
      setDiscountValue(""); // Reset discount value if not selected
    }
  };

  // Combine form submission and image upload
  const handleImageAndFormUpload = () => {
    if (!image) {
      alert("Please select an image first.");
      return; // Ensure an image is selected before uploading
    }
  };
  const[addProduct,setaddProduct]=useState();
  useEffect(() => {
    fetch('/locals/propertyFile.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setaddProduct(data.addProduct);
      })
      .catch(error => {
        console.error('Error fetching navbar items:', error);
      });
  }, []);
  
  return (
    <div className="seller-productPage">
      <h2 className="seller-heading-add">Add Product+</h2>

      <div className="seller-addproduct-container">
        <form className="seller-addproduct-form" onSubmit={handleSubmit} noValidate>
          <label className="seller-productlabels">Product Name </label>
          <input
            type="text"
            className="seller-inputtypes"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          {errors.productName && <span className="error">{errors.productName}</span>}

          <label className="seller-productlabels">Product Description </label>
          <input
            type="text"
            className="seller-inputtypes"
            placeholder="Enter product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          {errors.productDescription && <span className="error">{errors.productDescription}</span>}

          <label className="seller-productlabels">Product Price </label>
          <input
            type="text"
            className="seller-inputtypes"
            placeholder="Enter product price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          {errors.productPrice && <span className="error">{errors.productPrice}</span>}

          <label className="seller-productlabels">Product Category </label>
          <select
            id="category"
            name="category"
            className="seller-inputtypes"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="Groceries">Groceries</option>
            <option value="Fashion">Fashion</option>
            <option value="Bazaar">Bazaar</option>
            <option value="Appliances">Appliances</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Electronics">Electronics</option>
            <option value="Home">Home</option>
            <option value="Beauty">Beauty</option>
            <option value="Furniture">Furniture</option>
          </select>

          <label className="seller-productlabels">Product Discounts </label>
          <div className="seller-discount-options">
              <select
                name="discount"
                className="seller-inputtypes"
                value={productDiscount}
                onChange={handleDiscountChange}              >
            <option value="No Discount">No Discount</option>
            <option value="Discount"> Discount</option>
            </select>
          </div>
          {errors.productDiscount && <span className="error">{errors.productDiscount}</span>}
          
          {showDiscountInput && (
            <>
              <label className="seller-productlabels">Enter Discount Value (%)</label>
              <input
                type="number"
                className="seller-inputtypes"
                placeholder="Enter discount value"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                max="99"
              />
              {errors.discountValue && <span className="error">{errors.discountValue}</span>}
            </>
          )}
          <label className="seller-productlabels">Shipping Method</label>
          <div className="sellerShipping-options">
            <label>
              <input
                type="radio"
                name="shipping"
                value="Shipping on own" 
                className="seller-discount"
                onChange={(e) => setShippingMethod(e.target.value)}
              /> Shipping on own
            </label>
            <label>
              <input
                type="radio"
                name="shipping"
                value="Shipping by us"
                className="seller-discount"
                onChange={(e) => setShippingMethod(e.target.value)}
              /> Shipping by us
            </label>
          </div>
          {errors.shippingMethod && <span className="error">{errors.shippingMethod}</span>}

          <label className="seller-productlabels">Charges Applied</label>
          <input
            type="text"
            className="seller-inputtypes charges"
            value={charges}
            onChange={(e) => setCharges(e.target.value)}
          />
          {errors.charges && <span className="error">{errors.charges}</span>}

          <label className="seller-productlabels">Address of Pickup</label>
          <input
            type="text"
            className="seller-inputtypes"
            placeholder="Enter pickup address"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            disabled={shippingMethod === "Shipping on own"}
          />
          {errors.pickupAddress && <span className="error">{errors.pickupAddress}</span>}

          <button type="submit" className="Sellerconfirm-button">
            Confirm
          </button>
        </form>

        <div className="image-upload-container">
          <div className="box-decoration">
            <h1 className="img-heading">Add product image/thumbnail</h1>
            <div onClick={handleClick} className='div-img'>
              {image ? (
                <img src={URL.createObjectURL(image)} alt="upload image" className="img-display-after" />
              ) : (
                <img src={photo} alt="upload image" className="img-display-before" />
              )}

              <input
                id="image-upload-input"
                type="file"
                onChange={handleImageChange}
                ref={hiddenFileInput}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;