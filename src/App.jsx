import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // State variables
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  // Calculate EMI function
  const calculateEMI = () => {
    // Validation
    if (!loanAmount || !interestRate || !tenure) {
      alert("Please fill in all fields!");
      return;
    }
    
    if (loanAmount <= 0 || interestRate <= 0 || tenure <= 0) {
      alert("All values must be positive numbers!");
      return;
    }

    // Convert to numbers
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const N = parseInt(tenure);

    // Monthly interest rate
    const R = annualRate / 12 / 100;

    // EMI Calculation formula
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    
    // Total Interest
    const totalInterestValue = (emiValue * N) - P;

    // Update state
    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-light p-4">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-xxl-10"> {/* EXTRA WIDE CARD */}
          <div className="card shadow-lg border-0" style={{maxWidth: '1400px', margin: '0 auto'}}> {/* MAXIMUM WIDTH */}
            <div className="card-header bg-primary text-white text-center py-4">
              <h1 className="mb-2 fw-bold display-5">EMI Calculator</h1>
              <h3 className="mb-0">URK23CS1010</h3>
            </div>
            <div className="card-body p-5">
              {/* Input Form - EXTRA WIDE */}
              <div className="row justify-content-center g-4">
                <div className="col-xl-3 col-lg-4 col-md-6 text-center">
                  <div>
                    <label className="form-label h4 fw-semibold">Loan Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control form-control-lg text-center"
                      placeholder="e.g., 100000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="col-xl-3 col-lg-4 col-md-6 text-center">
                  <div>
                    <label className="form-label h4 fw-semibold">Interest Rate (%)</label>
                    <input
                      type="number"
                      className="form-control form-control-lg text-center"
                      placeholder="e.g., 8.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                </div>
                
                <div className="col-xl-3 col-lg-4 col-md-6 text-center">
                  <div>
                    <label className="form-label h4 fw-semibold">Tenure (Months)</label>
                    <input
                      type="number"
                      className="form-control form-control-lg text-center"
                      placeholder="e.g., 24"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="text-center mt-5">
                <button 
                  className="btn btn-primary btn-lg px-5 py-3 fw-bold fs-4" 
                  onClick={calculateEMI}
                  style={{minWidth: '250px'}}
                >
                  Calculate EMI
                </button>
              </div>

              {/* Results Display - EXTRA WIDE */}
              {emi !== null && (
                <div className="mt-5 p-5 bg-light rounded border">
                  <h2 className="text-center mb-5 text-dark display-6">Loan Details</h2>
                  <div className="row justify-content-center g-5">
                    <div className="col-xl-3 col-lg-4 col-md-6 text-center">
                      <div className="p-4 border rounded bg-white shadow-sm h-100">
                        <h4 className="text-primary mb-3">Loan Amount</h4>
                        <h2 className="fw-bold text-primary" style={{fontSize: '2.5rem'}}>
                          ₹{parseFloat(loanAmount).toLocaleString()}
                        </h2>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 text-center">
                      <div className="p-4 border rounded bg-white shadow-sm h-100">
                        <h4 className="text-success mb-3">Monthly EMI</h4>
                        <h2 className="fw-bold text-success" style={{fontSize: '2.5rem'}}>
                          ₹{emi}
                        </h2>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 text-center">
                      <div className="p-4 border rounded bg-white shadow-sm h-100">
                        <h4 className="text-danger mb-3">Total Interest</h4>
                        <h2 className="fw-bold text-danger" style={{fontSize: '2.5rem'}}>
                          ₹{totalInterest}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;