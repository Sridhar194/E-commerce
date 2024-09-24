import React, { useEffect } from 'react';
import axios from 'axios';

function FetchData({ setPersonalDetails }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://your-backend-endpoint.com/api/user-details");
        const data = response.data;
        // Assuming the data returned has the structure { Name, ContactNumber, Address, Email, Dob }
        setPersonalDetails({
          Name: data.Name || '',
          ContactNumber: data.ContactNumber || '',
          Address: data.Address || '',
          Email: data.Email || '',
        //   Dob: data.Dob || '',
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setPersonalDetails]);

  return null; // This component only handles fetching, so it doesn't render anything
}

export default FetchData;
