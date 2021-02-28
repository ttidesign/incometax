import React, { useState } from 'react';

function Base() {
	const [enteredIncome, setEnteredIncome] = useState();
	const [taxableIncome, setTaxableIncome] = useState()
	const [tax, setTax] = useState();
	const [deduction, setDeduction] = useState();
    const [IRA,setIRA] = useState()
	const [FinalTakeHome, setFinalTakeHome] = useState();
	const [socialSec, setSocialSec] = useState();
	const [medicareTax, setMedicareTax] = useState()
    const [taxRate,setTaxRate] = useState([])
	const [usState, setUsState] = useState('CA')
	const [statesTax, setStateTax] = useState(0)
	const [payType, setPayType] = useState('')
	const [annualIncome, setAnnualIncome] = useState()
	
	function handleChangeIncome(event) {
		setEnteredIncome(parseInt(event.target.value));
	}
	function handlePayTypeChange(event) {
		setPayType(event.target.value)
	}
	function handleChangeDeduction(event) {
		setDeduction(parseInt(event.target.value));
    }
    function handleIRAChange(event) {
        setIRA(parseInt(event.target.value));
    }
	function handleStateChange(event) {
		event.preventDefault();
		setUsState(event.target.value)
	}
	let grossIncome;
	let fica;
	let medicare;
	function handleGrossIncome() {
		if(payType === 'Hourly'){
			grossIncome = enteredIncome * 40 * 52
		} else {
			grossIncome = enteredIncome
		}
		setAnnualIncome(grossIncome)
		return grossIncome
	}
	function handleFica() {
		if (grossIncome >= 137700) {
			fica = 8537.4;
			medicare = grossIncome * 0.0145
		} else {
			fica = grossIncome * 0.062;
			medicare = grossIncome * 0.0145;			
		}
		setSocialSec(fica)
		setMedicareTax(medicare)
		return (fica,medicare)
	}
	function stateTaxRate () {
		let state =['WA','NV','WY','SD','TX','TN','FL','NH','AK']
		if (state.includes(usState)) {
			setStateTax(0)
		}
		else {
			setStateTax(0.13)
		}
	}
	function calculateTaxableIncome () {
			setTaxableIncome(grossIncome - deduction - IRA)
		
		
		// taxincome = grossIncome - deduction - IRA
		// return taxincome
	}
	
 	const handleCalculateTax = (event) => {
		event.preventDefault();
		
		
		//setTaxableIncome(taxincome)
		//stateTaxRate()
		
		//console.log(fica)
		//console.log(taxincome)
		let takeHome;
		let fedBracket1 = 9950;
		let fedBracket2 = 40525 - 9951;
		let fedBracket3 = 86375 - 40526;
		let fedBracket4 = 164925 - 86376;
		let fedBracket5 = 209425 - 164926;
		let fedBracket6 = 528600 - 209426;
		let fedBracket7 = grossIncome - 523601;
		let fedTaxRate1 = 0.1;
		let fedTaxRate2 = 0.12;
		let fedTaxRate3 = 0.22;
		let fedTaxRate4 = 0.24;
		let fedTaxRate5 = 0.32;
		let fedTaxRate6 = 0.35;
		let fedTaxRate7 = 0.37;
		console.log(grossIncome,deduction)
		if (grossIncome <= deduction) {
			console.log(
				'your income is less than standard deduction you are not required to file tax return'
			);
			return
		} else {
		handleGrossIncome()	
		handleFica();	
		calculateTaxableIncome();
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
			setTax(grossIncome - takeHome);
			setFinalTakeHome(takeHome);
			setTaxRate(((grossIncome - takeHome) / grossIncome) * 100);
		} else if (grossIncome >= 209426 && grossIncome <= 510300) {
			fedBracket6 = grossIncome - 209426;
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
			setTax(grossIncome - takeHome);
			setFinalTakeHome(takeHome);
			setTaxRate(((grossIncome - takeHome) / grossIncome) * 100);
		} else if (grossIncome >= 164926 && grossIncome <= 209425) {
			fedBracket5 = grossIncome - 160726;
			takeHome =
				grossIncome -
				fica -
				medicare -
				(fedBracket5 * fedTaxRate5 +
					fedBracket4 * fedTaxRate4 +
					fedBracket3 * fedTaxRate3 +
					fedBracket2 * fedTaxRate2 +
					fedBracket1 * fedTaxRate1);
			setTax(grossIncome - takeHome);
			setFinalTakeHome(takeHome);
			setTaxRate(((grossIncome - takeHome) / grossIncome) * 100);
		} else if (grossIncome >= 86376 && grossIncome <= 164925) {
			fedBracket4 = grossIncome - 86376;
			takeHome =
				grossIncome -
				fica -
				medicare -
				(fedBracket4 * fedTaxRate4 +
					fedBracket3 * fedTaxRate3 +
					fedBracket2 * fedTaxRate2 +
					fedBracket1 * fedTaxRate1);

			setTax(grossIncome - takeHome);
			setFinalTakeHome(takeHome);
			setTaxRate(((grossIncome - takeHome) / grossIncome) * 100);
		} else if (grossIncome >= 40526 && grossIncome <= 86375) {
			fedBracket3 = grossIncome - 40526;
			takeHome =
				grossIncome -
				fica -
				medicare -
				(fedBracket3 * fedTaxRate3 +
					fedBracket2 * fedTaxRate2 +
					fedBracket1 * fedTaxRate1);
			setTax(grossIncome - takeHome);
			setFinalTakeHome(takeHome);
			setTaxRate(((grossIncome - takeHome) / grossIncome) * 100);
		} else if (grossIncome >= 9951 && grossIncome <= 40525) {
			fedBracket2 = grossIncome - 9950;
			takeHome =
				grossIncome -
				fica -
				medicare -
				(fedBracket2 * fedTaxRate2 + fedBracket1 * fedTaxRate1);

			setTax(grossIncome - takeHome);
			setFinalTakeHome(takeHome);
			setTaxRate(((grossIncome - takeHome) / grossIncome) * 100);
		}}
	}

	return (
		<div>
			Please enter your Annual Income
			<form onSubmit={handleCalculateTax}>
				<input
					placeholder='Pay Rate'
					type='text'
					onChange={handleChangeIncome}></input>
				<label className='radio-button-label'>
					Hourly
					<input
						className='radio-button'
						type='radio'
						name='tearOff'
						value='Hourly'
						required
						onChange={handlePayTypeChange}></input>
				</label>
				<label className='radio-button-label'>
					Annually
					<input
						className='radio-button'
						type='radio'
						name='tearOff'
						value='Annually'
						required
						onChange={handlePayTypeChange}></input>
				</label>
				<select onChange={handleStateChange}>
					<optgroup label='State'>
						<option value='CA' defaultValue>
							California{' '}
						</option>
						<option value='AK'>Alaska </option>
						<option value='FL'>Florida </option>
						<option value='NH'>New Hampshire </option>
						<option value='NV'>Nevada </option>
						<option value='TN'>Tennessee </option>
						<option value='TX'>Texas </option>
						<option value='SD'>South Dakota </option>
						<option value='WA'>Washington </option>
						<option value='WY'>Wyoming </option>
					</optgroup>
				</select>
				<input
					required
					placeholder='Deduction'
					type='text'
					onChange={handleChangeDeduction}></input>
				<input
					required
					placeholder='401K and/or IRA Contribution'
					type='text'
					onChange={handleIRAChange}></input>
				<button type='submit'>Calculate </button>
			</form>
			<h3> Break Down</h3>
			<h4> Your Annual Income Is ${annualIncome}</h4>
			<p>Your Deduction Is ${deduction}</p>
			<p>Your Total Taxable Income Is ${taxableIncome}</p>
			<p>Your Social Security Tax Is ${socialSec}</p>
			<p>Your Medicare Tax Is ${medicareTax}</p>
			<p>Your Tax Burden Is ${tax}</p>
			<p>Your Effective Tax Rate Is {taxRate}% </p>
			<p>Your State Is {usState} </p>
			<p>Your State Tax Rate Is {statesTax * 100}% </p>
			<p>Your Final Take Home Is ${FinalTakeHome}</p>
		</div>
	);
}
export default Base;
