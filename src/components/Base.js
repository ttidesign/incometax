import React, { useState } from 'react';

function Base() {
	const [enteredIncome, setEnteredIncome] = useState();
	const [taxableIncome, setTaxableIncome] = useState(0)
	const [tax, setTax] = useState(0);
	const [deduction, setDeduction] = useState(0);
    const [IRA,setIRA] = useState(0)
	const [FinalTakeHome, setFinalTakeHome] = useState(0);
	const [socialSec, setSocialSec] = useState(0);
	const [medicareTax, setMedicareTax] = useState(0)
    const [taxRate,setTaxRate] = useState([])
	const [usState, setUsState] = useState('CA')
	const [stateTax, setStateTax] = useState(0)
	const [stateTaxRate, setStateTaxRate] = useState(0)
	const [payType, setPayType] = useState('')
	const [annualIncome, setAnnualIncome] = useState(0)
	
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
	let taxIncome
	let fica;
	let medicare;
	let stTax;
	function handleGrossAndTaxableIncome() {
		if(payType === 'Hourly'){
			grossIncome = enteredIncome * 40 * 52
		} else {
			grossIncome = enteredIncome
		}
		taxIncome = grossIncome - deduction -IRA
		setAnnualIncome(grossIncome)
		setTaxableIncome(taxIncome);	
		return (grossIncome, taxIncome)
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
	function calculateStateTaxRate () {
		let state =['WA','NV','WY','SD','TX','TN','FL','NH','AK']
		let stateTaxRate1;
		let stateTaxRate2;
		let stateTaxRate3;
		let stateTaxRate4;
		let stateTaxRate5;
		let stateTaxRate6;
		let stateTaxRate7;
		let stateTaxRate8;
		let stateTaxRate9;
		let stateBracket1;
		let stateBracket2;
		let stateBracket3;
		let stateBracket4;
		let stateBracket5;
		let stateBracket6;
		let stateBracket7;
		let stateBracket8;
		let stateBracket9;
		let totalStateTax
		if (state.includes(usState)) {
			setStateTax(0)
		}
		else if(usState === 'CA'){
			stateTaxRate1 = 0.01
			stateTaxRate2 = 0.02
			stateTaxRate3 = 0.04
			stateTaxRate4 = 0.06
			stateTaxRate5 = 0.08
			stateTaxRate6 = 0.093
			stateTaxRate7 = 0.103
			stateTaxRate8 = 0.113
			stateTaxRate9 = 0.123
			stateBracket1 = 8932 
			stateBracket2 = 21175 - 8933 
			stateBracket3 = 33421 - 21176 
			stateBracket4 = 46394 - 33422
			stateBracket5 = 58634 - 46395 
			stateBracket6 = 299508 - 58635
			stateBracket7 = 359407 - 299509
			stateBracket8 = 599012 - 359408 
			stateBracket9 = taxIncome - 599013; 
			if(taxIncome < deduction) {
				console.log('you are not required to file tax')
			} else if (taxIncome >= 8932 && taxIncome <= 21175) {
				stateBracket2 = taxIncome - 8933
				totalStateTax = (stateTaxRate1 * stateBracket1 + stateBracket2 * stateTaxRate2)
				setStateTax(totalStateTax)
				setStateTaxRate(totalStateTax/taxIncome * 100)
			} else if ( taxIncome >= 21176 && taxIncome <= 33421 ) {
				stateBracket3 = taxIncome - 21175
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( taxIncome >= 33422 && taxIncome <= 46394 ) {
				stateBracket4 = taxIncome - 33421
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( taxIncome >= 46395 && taxIncome <= 58634 ) {
				stateBracket5 = taxIncome - 46394
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( taxIncome >= 58635 && taxIncome <= 299508 ) {
				stateBracket6 = taxIncome - 58634
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5 + stateBracket6 * stateTaxRate6)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( taxIncome >= 299509 && taxIncome <= 359407 ) {
				stateBracket7 = taxIncome - 299508
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5 + stateBracket6 * stateTaxRate6 + stateBracket7 * stateTaxRate7)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( taxIncome >= 359408 && taxIncome <= 599012 ) {
				stateBracket8 = taxIncome - 359407
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5 + stateBracket6 * stateTaxRate6 + stateBracket7 * stateTaxRate7 + stateBracket8 * stateTaxRate8)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( taxIncome >= 599013 ) {
				stateBracket9 = taxIncome - 599012
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5 + stateBracket6 * stateTaxRate6 + stateBracket7 * stateTaxRate7 + stateBracket8 * stateTaxRate8 + stateBracket9 * stateTaxRate9)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} 
		} stTax = totalStateTax
		return stTax 
	}
 	const handleCalculateTax = (event) => {
		event.preventDefault();
		handleGrossAndTaxableIncome();
		handleFica();
		calculateStateTaxRate();
		let takeHome;
		let fedBracket1 = 9950;
		let fedBracket2 = 40525 - 9951;
		let fedBracket3 = 86375 - 40526;
		let fedBracket4 = 164925 - 86376;
		let fedBracket5 = 209425 - 164926;
		let fedBracket6 = 528600 - 209426;
		let fedBracket7 = taxIncome - 523601;
		let fedTaxRate1 = 0.1;
		let fedTaxRate2 = 0.12;
		let fedTaxRate3 = 0.22;
		let fedTaxRate4 = 0.24;
		let fedTaxRate5 = 0.32;
		let fedTaxRate6 = 0.35;
		let fedTaxRate7 = 0.37;
		if (grossIncome <= deduction || grossIncome <= 12200 || taxIncome <= deduction || taxIncome <= 12200) {
			console.log(
				'your income is less than standard deduction you are not required to file tax return'
			);
			return
		} else {
			if (taxIncome > 523601) {
			takeHome =
				grossIncome -
				stTax-
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
		} else if (taxIncome >= 209426 && taxIncome <= 523601) {
			fedBracket6 = taxIncome - 209426;
			takeHome =
				grossIncome -
				stTax-
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
		} else if (taxIncome >= 164926 && taxIncome <= 209425) {
			fedBracket5 = taxIncome - 164926;
			takeHome =
				grossIncome -
				stTax -
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
		} else if (taxIncome >= 86376 && taxIncome <= 164925) {
			fedBracket4 = taxIncome - 86376;
			takeHome =
				grossIncome -
				stTax -
				fica -
				medicare -
				(fedBracket4 * fedTaxRate4 +
					fedBracket3 * fedTaxRate3 +
					fedBracket2 * fedTaxRate2 +
					fedBracket1 * fedTaxRate1);

			setTax(grossIncome - takeHome);
			setFinalTakeHome(takeHome);
			setTaxRate(((grossIncome - takeHome) / grossIncome) * 100);
		} else if (taxIncome >= 40526 && taxIncome <= 86375) {
			fedBracket3 = taxIncome - 40526;
			takeHome =
				grossIncome -
				stTax -
				fica -
				medicare -
				(fedBracket3 * fedTaxRate3 +
					fedBracket2 * fedTaxRate2 +
					fedBracket1 * fedTaxRate1);
			setTax(grossIncome - takeHome);
			setFinalTakeHome(takeHome);
			setTaxRate(((grossIncome - takeHome) / grossIncome) * 100);
		} else if (taxIncome >= 12201 && taxIncome <= 40525) {
			fedBracket2 = taxIncome - 9950;
			takeHome =
				grossIncome -
				stTax -
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
			Please enter your Pay Rate
			<form onSubmit={handleCalculateTax}>
				<input
					placeholder='Pay Rate'
					type='text'
					onChange={handleChangeIncome}></input>
				<label className='radio-button-label'>
					<input
						className='radio-button'
						type='radio'
						name='payType'
						value='Hourly'
						//checked={payType === 'Hourly'}
						required
						onChange={handlePayTypeChange}></input>
					Hourly
				</label>
				<label className='radio-button-label'>
					<input
						className='radio-button'
						type='radio'
						name='payType'
						value='Annually'
						//checked={payType === 'Annually'}
						required
						onChange={handlePayTypeChange}></input>
					Annually
				</label>
				<select onChange={handleStateChange}>
					<optgroup label='State'>
						<option value='CA'>California </option>
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
			<h4>
				{' '}
				Your Annual Income Is $
				{annualIncome.toLocaleString('en', { maximumFractionDigits: 2 })}
			</h4>
			<p>
				Your Deduction Is $
				{deduction.toLocaleString('en', { maximumFractionDigits: 2 })}
			</p>
			<p>
				Your Total Taxable Income Is $
				{taxableIncome.toLocaleString('en', { maximumFractionDigits: 2 })}
			</p>
			<p>
				Your Social Security Tax Is $
				{socialSec.toLocaleString('en', { maximumFractionDigits: 2 })}
			</p>
			<p>
				Your Medicare Tax Is $
				{medicareTax.toLocaleString('en', { maximumFractionDigits: 2 })}
			</p>
			<p>
				Your Tax Burden Is $
				{tax.toLocaleString('en', { maximumFractionDigits: 2 })}
			</p>
			<p>
				Your Effective Tax Rate Is{' '}
				{taxRate.toLocaleString('en', { maximumFractionDigits: 2 })}%{' '}
			</p>
			<p>Your State Is {usState} </p>
			<p>Your State Tax Is {stateTax} </p>
			<p>
				Your Effective State Tax Rate Is{' '}
				{stateTaxRate.toLocaleString('en', { maximumFractionDigits: 2 })}%{' '}
			</p>
			<p>
				Your Final Take Home Is $
				{FinalTakeHome.toLocaleString('en', { maximumFractionDigits: 2 })}
			</p>
		</div>
	);
}
export default Base;
