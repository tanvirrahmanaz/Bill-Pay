// src/pages/BillDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bills as initialBills } from "../data/bills";
import useAuth from "../hooks/useAuth";
import { FaArrowLeft, FaCreditCard } from "react-icons/fa";
import toast from "react-hot-toast";

const BillDetails = () => {
  const { id } = useParams();
  const { payBill, balance } = useAuth();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  useEffect(() => {
    // Get bills from local storage if available
    const storedBills = localStorage.getItem("bills");
    const bills = storedBills ? JSON.parse(storedBills) : initialBills;
    
    const foundBill = bills.find(bill => bill.id === parseInt(id));
    if (foundBill) {
      if (foundBill.isPaid) {
        toast.error("This bill has already been paid!");
        navigate("/bills");
        return;
      }
      setBill(foundBill);
    } else {
      setError("Bill not found");
    }
    setLoading(false);
  }, [id, navigate]);
  
  const handlePayment = () => {
    if (bill.isPaid) {
      toast.error("This bill has already been paid!");
      return;
    }
    
    if (balance < bill.amount) {
      toast.error("Insufficient balance to pay this bill!");
      return;
    }
    
    const success = payBill(bill.amount);
    if (success) {
      setPaymentSuccess(true);
      toast.success("Payment successful!");
      
      // Update the bill's paid status in local storage
      const storedBills = localStorage.getItem("bills");
      const bills = storedBills ? JSON.parse(storedBills) : initialBills;
      const updatedBills = bills.map(b => 
        b.id === parseInt(id) ? { ...b, isPaid: true } : b
      );
      localStorage.setItem("bills", JSON.stringify(updatedBills));
      
      // Trigger storage event to update other components
      window.dispatchEvent(new Event('storage'));
      
      setTimeout(() => {
        navigate("/bills");
      }, 2000);
    } else {
      toast.error("Payment failed. Please try again.");
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  
  if (error && !bill) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">{error}</h1>
        <button 
          onClick={() => navigate("/bills")} 
          className="btn btn-primary"
        >
          <FaArrowLeft className="mr-2" /> Back to Bills
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <button 
        onClick={() => navigate("/bills")} 
        className="btn btn-ghost mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Bills
      </button>
      
      {error && (
        <div className="alert alert-error mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {paymentSuccess ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-3xl font-bold mb-4 text-success">Payment Successful!</h2>
            <p className="text-xl mb-6">
              Your payment of <span className="font-bold">{bill.amount} BDT</span> to {bill.organization} has been processed successfully.
            </p>
            <p className="text-gray-600 mb-6">
              You will be redirected to the bills page shortly...
            </p>
            <div className="card-actions justify-center">
              <button 
                onClick={() => navigate("/bills")} 
                className="btn btn-primary"
              >
                Return to Bills
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          {/* Organization Header */}
          <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-xl shadow-md flex items-center justify-center">
                <img 
                  src={bill.icon} 
                  alt={bill.organization} 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{bill.organization}</h2>
                <p className="text-lg capitalize text-gray-600">{bill.bill_type} Bill</p>
              </div>
            </div>
          </div>

          {/* Bill Details */}
          <div className="card-body">
            <div className="space-y-6">
              {/* Amount Section */}
              <div className="bg-base-200 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Amount</span>
                  <span className="font-bold text-2xl text-primary">{bill.amount} BDT</span>
                </div>
              </div>

              {/* Due Date Section */}
              <div className="bg-base-200 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Due Date</span>
                  <span className="font-semibold text-lg">
                    {new Date(bill["due-date"]).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Balance Section */}
              <div className="bg-base-200 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Your Balance</span>
                  <span className={`font-bold text-2xl ${balance < bill.amount ? 'text-error' : 'text-success'}`}>
                    {balance} BDT
                  </span>
                </div>
              </div>

              {/* Payment Button Section */}
              <div className="mt-8">
                {balance < bill.amount ? (
                  <div className="alert alert-warning">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>Insufficient balance to pay this bill</span>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handlePayment} 
                    className="btn btn-primary btn-lg w-full text-lg"
                    disabled={balance < bill.amount}
                  >
                    <FaCreditCard className="mr-2" /> Pay {bill.amount} BDT
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;