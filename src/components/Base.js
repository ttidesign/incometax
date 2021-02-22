import React, { useState } from 'react';

function Base() {
	const [income, setIncome] = useState();
	const [taxableIncome, setTaxableIncome] = useState();
	const [tax, setTax] = useState();
	const [deduction, setDeduction] = useState();
    const [IRA,setIRA] = useState()
	const [FinalTakeHome, setFinalTakeHome] = useState();
    const [socialSec, setSocialSec] = useState();
    const [taxRate,setTaxRate] = useState()

	function handleChangeIncome(event) {
		setIncome(event.target.value);
	}
	function handleChangeDeduction(event) {
		setDeduction(event.target.value);
    }
    function handleIRAChange(event) {
        setIRA(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault();
       console.log('t')
    }
	function handleCalculateTax(event) {
		event.preventDefault();
		handleFica()
		setSocialSec(fica);
		stateTaxRate()
		let takeHome;
        let grossIncome = income - deduction;
        if(grossIncome < 0) {
            setTaxableIncome(income);

        } else if (grossIncome > 0){
            setTaxableIncome(grossIncome)
        }
		
		
		let fedBracket1 = 9875;
		let fedBracket2 = 40125 - 9876;
		let fedBracket3 = 85525 - 40126;
		let fedBracket4 = 163300 - 85526;
		let fedBracket5 = 207350 - 163301;
		let fedBracket6 = 518400 - 207351;
		let fedBracket7 = grossIncome - 518401;
		let fedTaxRate1 = 0.1;
		let fedTaxRate2 = 0.12;
		let fedTaxRate3 = 0.22;
		let fedTaxRate4 = 0.24;
		let fedTaxRate5 = 0.32;
		let fedTaxRate6 = 0.35;
		let fedTaxRate7 = 0.37;
		if (grossIncome > 510300) {
			takeHome =
				grossIncome -
				fica -
				medicare -
				(fedBracket7 * fedTaxRate7 +
					fedBracket6 * fedTaxRate6 +
					fedBracket5 * fedTaxRate5 +
					fedBracket4 * fedTaxRate4 +
					fedBracket3 * fedTaxRate3 +
					fedBracket2 * fedTaxRate2 +
					fedBracket1 * fedTaxRate1);
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income-takeHome)/income)*100)
		} else if (grossIncome > 204100 && grossIncome <= 510300) {
			fedBracket6 = grossIncome - 204100;
			takeHome =
				grossIncome -
				fica -
				medicare -
				(fedBracket6 * fedTaxRate6 +
					fedBracket5 * fedTaxRate5 +
					fedBracket4 * fedTaxRate4 +
					fedBracket3 * fedTaxRate3 +
					fedBracket2 * fedTaxRate2 +
					fedBracket1 * fedTaxRate1);
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income - takeHome) / income) * 100);
		} else if (grossIncome > 160725 && grossIncome <= 204100) {
			fedBracket5 = grossIncome - 160725;
			takeHome =
				grossIncome -
				fica -
				medicare -
				(fedBracket5 * fedTaxRate5 +
					fedBracket4 * fedTaxRate4 +
					fedBracket3 * fedTaxRate3 +
					fedBracket2 * fedTaxRate2 +
					fedBracket1 * fedTaxRate1);
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income - takeHome) / income) * 100);
		} else if (grossIncome > 84200 && grossIncome <= 160725) {
			fedBracket4 = grossIncome - 84200;
			takeHome =
				grossIncome -
				fica -
				medicare -
				(fedBracket4 * fedTaxRate4 +
					fedBracket3 * fedTaxRate3 +
					fedBracket2 * fedTaxRate2 +
					fedBracket1 * fedTaxRate1);
			
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income - takeHome) / income) * 100);
		} else if (grossIncome > 39475 && grossIncome <= 84200) {
			fedBracket3 = grossIncome - 39475;
			takeHome =
				grossIncome -
				fica -
				medicare -
				(fedBracket3 * fedTaxRate3 + fedBracket2 * fedTaxRate2 + fedBracket1 * fedTaxRate1);
			
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income - takeHome) / income) * 100);
		} else if (grossIncome > 9700 && grossIncome <= 39475) {
			fedBracket2 = grossIncome - 9700;
			takeHome =
				grossIncome - fica - medicare - (fedBracket2 * fedTaxRate2 + fedBracket1 * fedTaxRate1);
			
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income - takeHome) / income) * 100);
		} else if (grossIncome < 0){
			takeHome = income - fica - medicare - (fedBracket1 * fedTaxRate1);
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income - takeHome) / income) * 100);
            
        }
	}
	return (
		<div>
			Please enter your Annual Income
			<form onSubmit={handleCalculateTax}>
				<input
					placeholder='Income'
					type='text'
					onChange={handleChangeIncome}></input>
				<input
					required
					placeholder='Deduction'
					type='text'
					onChange={handleChangeDeduction}></input>
				<input
					required
					placeholder='401K or IRA Contribution Deduction'
					type='text'
					onChange={handleIRAChange}></input>
				<button type='submit'>Calculate Tax</button>
			</form>
			<h3> Break Down</h3>
			<h4> Your Annual Income is ${income}</h4>
			<p>Your deduction is ${deduction}</p>
			<p>Your Total Taxable Income is ${taxableIncome}</p>
			<p>Your Take Home is ${FinalTakeHome}</p>
			<p>Your Social Security Tax is ${socialSec}</p>
			<p>Your Tax burden is ${tax}</p>
			<p>You effective tax rate is {taxRate}% </p>
			<p>You State is {usState} </p>
			<p>You State tax rate is {statesTax*100}% </p>
		</div>
	);
}
export default Base;
