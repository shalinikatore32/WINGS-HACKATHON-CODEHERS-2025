// SuccessPage.js
import React from "react";
import { useParams } from "react-router-dom";

function SuccessPage() {
 

  const handleDownloadReceipt = () => {
    
    alert("Receipt download functionality is not yet implemented.");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Purchase Successful!</h1>
      <p>Your ticket for the event has been purchased successfully.</p>
      <button
        onClick={handleDownloadReceipt}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Download Receipt
      </button>
    </div>
  );
}

export default SuccessPage;
