import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaCheckCircle, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { bills as initialBills } from "../data/bills";
import toast from "react-hot-toast";

const Bills = () => {
  const [bills, setBills] = useState(initialBills);
  const [filter, setFilter] = useState("all");
  const [billTypes, setBillTypes] = useState(["all"]);
  const [activeTab, setActiveTab] = useState("unpaid"); // "unpaid" or "paid"
  
  // Load bills from localStorage on component mount
  useEffect(() => {
    try {
      const storedBills = localStorage.getItem("bills");
      if (storedBills) {
        setBills(JSON.parse(storedBills));
      }
      
      // Extract unique bill types for the filter dropdown
      const types = ["all", ...new Set(initialBills.map(bill => bill.bill_type))];
      setBillTypes(types);
    } catch (error) {
      console.error("Error loading bills:", error);
    }
  }, []);
  
  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedBills = localStorage.getItem("bills");
        if (storedBills) {
          setBills(JSON.parse(storedBills));
        }
      } catch (error) {
        console.error("Error handling storage change:", error);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  const handleBillClick = (bill) => {
    if (bill.isPaid) {
      toast.error("This bill has already been paid!");
      return;
    }
  };
  
  // Filter bills based on paid status and type
  const filteredBills = bills
    .filter(bill => activeTab === "paid" ? bill.isPaid : !bill.isPaid)
    .filter(bill => filter === "all" || bill.bill_type === filter);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Bills</h1>
      
      {/* Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <button 
          className={`tab ${activeTab === "unpaid" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("unpaid")}
        >
          Unpaid Bills
        </button>
        <button 
          className={`tab ${activeTab === "paid" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("paid")}
        >
          Paid Bills
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <p className="text-gray-600 text-lg">
          {filteredBills.length} {filteredBills.length === 1 ? "bill" : "bills"} found
        </p>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <FaFilter className="text-gray-500" />
          <select
            value={filter}
            onChange={handleFilterChange}
            className="select select-bordered w-full sm:w-auto"
          >
            {billTypes.map(type => (
              <option key={type} value={type}>
                {type === "all" ? "All Bills" : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {filteredBills.length === 0 ? (
          <div className="text-center py-12 bg-base-200 rounded-xl">
            <p className="text-xl text-gray-500">No {activeTab} bills found</p>
          </div>
        ) : (
          filteredBills.map(bill => {
            const dueDate = new Date(bill["due-date"]);
            
            return (
              <div 
                key={bill.id} 
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="card-body p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Organization Image */}
                    <div className="flex-shrink-0 flex justify-center sm:justify-start">
                      <div className="relative">
                        <div className="w-24 h-24 bg-base-200 rounded-xl flex items-center justify-center">
                          <img
                            src={bill.icon}
                            alt={bill.organization}
                            className="w-20 h-20 object-contain"
                          />
                        </div>
                        {bill.isPaid && (
                          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                            <FaCheckCircle className="text-green-500 text-2xl" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bill Details */}
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="space-y-3">
                          <div>
                            <h2 className="text-2xl font-bold">{bill.organization}</h2>
                            <p className="text-lg text-gray-500 capitalize">{bill.bill_type}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <FaMoneyBillWave className="text-primary" />
                              <span className="text-lg">
                                Amount: <span className="font-bold text-primary">{bill.amount} BDT</span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-primary" />
                              <span className="text-lg">
                                Due: <span className="font-semibold">
                                  {dueDate.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex-shrink-0 flex justify-center sm:justify-end">
                          {bill.isPaid ? (
                            <span className="badge badge-success badge-lg p-4 text-base">Paid</span>
                          ) : (
                            <Link 
                              to={`/bills/${bill.id}`} 
                              className="btn btn-primary btn-lg"
                              onClick={() => handleBillClick(bill)}
                            >
                              Pay Now
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Bills;