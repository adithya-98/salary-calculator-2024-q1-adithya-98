import React, { useState } from "react";
import "./SalaryCalculator.css";

const SalaryCalculator = () => {
  const [basicSalary, setBasicSalary] = useState(0);
  const [earnings, setEarnings] = useState([{ title: "", amount: 0, epf: true }]);
  const [deductions, setDeductions] = useState([{ title: "", amount: 0 }]);
  const taxPercentage = 0.02; 
  const constant = 500; 

  const handleEarningChange = (index, key, value) => {
    const updatedEarnings = [...earnings];
    updatedEarnings[index][key] = value;
    setEarnings(updatedEarnings);
  };

  const handleDeductionChange = (index, key, value) => {
    const updatedDeductions = [...deductions];
    updatedDeductions[index][key] = value;
    setDeductions(updatedDeductions);
  };

  const addEarning = () => setEarnings([...earnings, { title: "", amount: 0, epf: false }]);
  const addDeduction = () => setDeductions([...deductions, { title: "", amount: 0 }]);
  const removeEarning = (index) => setEarnings(earnings.filter((_, i) => i !== index));
  const removeDeduction = (index) => setDeductions(deductions.filter((_, i) => i !== index));

  const totalEarnings = basicSalary + earnings.reduce((acc, cur) => acc + Number(cur.amount), 0);
  const totalEarningsForEPF = basicSalary + earnings.reduce((acc, cur) => acc + (cur.epf ? Number(cur.amount) : 0), 0);
  const grossDeduction = deductions.reduce((acc, cur) => acc + Number(cur.amount), 0);
  const grossEarnings = totalEarnings - grossDeduction;
  const grossSalaryForEPF = totalEarningsForEPF - grossDeduction;
  const employeeEPF = grossSalaryForEPF * 0.08;
  const employerEPF = grossSalaryForEPF * 0.12;
  const employerETF = grossSalaryForEPF * 0.03;
  const apit = (grossEarnings * taxPercentage) - constant;
  const netSalary = grossEarnings - employeeEPF - apit;
  const ctc = grossEarnings + employerEPF + employerETF;

  return (
    <div className="salary-calculator">
      <div className="calculator">
        <h2>Calculate Your Salary</h2>
        <div>
          <label>Basic Salary</label>
          <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(Number(e.target.value))} />
        </div>
        <div>
          <h3>Earnings</h3>
          {earnings.map((earning, index) => (
            <div key={index} className="earning-item">
              <input
                type="text"
                value={earning.title}
                onChange={(e) => handleEarningChange(index, "title", e.target.value)}
                placeholder="Pay Details (Title)"
              />
              <input
                type="number"
                value={earning.amount}
                onChange={(e) => handleEarningChange(index, "amount", Number(e.target.value))}
                placeholder="Amount"
              />
              <input
                type="checkbox"
                checked={earning.epf}
                onChange={(e) => handleEarningChange(index, "epf", e.target.checked)}
              />
              EPF/ETF
              <button onClick={() => removeEarning(index)}>X</button>
            </div>
          ))}
          <button onClick={addEarning}>Add New Allowance</button>
        </div>
        <div>
          <h3>Deductions</h3>
          {deductions.map((deduction, index) => (
            <div key={index} className="deduction-item">
              <input
                type="text"
                value={deduction.title}
                onChange={(e) => handleDeductionChange(index, "title", e.target.value)}
                placeholder="Deduction Title"
              />
              <input
                type="number"
                value={deduction.amount}
                onChange={(e) => handleDeductionChange(index, "amount", Number(e.target.value))}
                placeholder="Amount"
              />
              <button onClick={() => removeDeduction(index)}>X</button>
            </div>
          ))}
          <button onClick={addDeduction}>Add New Deduction</button>
        </div>
      </div>
      <div className="summary">
        <h2>Your salary</h2>
        <div>Basic Salary: {basicSalary.toFixed(2)}</div>
        <div>Gross Earning: {totalEarnings.toFixed(2)}</div>
        <div>Gross Deduction: {grossDeduction.toFixed(2)}</div>
        <div>Employee EPF (8%): {employeeEPF.toFixed(2)}</div>
        <div>APIT: {apit.toFixed(2)}</div>
        <div className="text">Net Salary (Take Home): {netSalary.toFixed(2)}</div>
        <h3>Contribution from the Employer</h3>
        <div>Employer EPF (12%): {employerEPF.toFixed(2)}</div>
        <div>Employer ETF (3%): {employerETF.toFixed(2)}</div>
        <div>CTC (Cost to Company): {ctc.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
