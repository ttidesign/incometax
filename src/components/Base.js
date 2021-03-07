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
    const [taxRate,setTaxRate] = useState(0)
	const [usState, setUsState] = useState('CA')
	const [stateTax, setStateTax] = useState(0)
	const [stateTaxRate, setStateTaxRate] = useState(0)
	const [payType, setPayType] = useState('')
	const [fileStatus, setFileStatus] = useState('')
	const [annualIncome, setAnnualIncome] = useState(0)
	
	function handleChangeIncome(event) {
		setEnteredIncome(parseInt(event.target.value));
	}
	function handlePayTypeChange(event) {
		setPayType(event.target.value)
	}
	function handleFileStatusChange(event) {
		setFileStatus(event.target.value)
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
	let stateBracket1;
	let stateBracket2;
	let stateBracket3;
	let stateBracket4;
	let stateBracket5;
	let stateBracket6;
	let stateBracket7;
	let stateBracket8;
	let stateBracket9;
	let	stateTaxRate1 = 0.01;
	let	stateTaxRate2 = 0.02;
	let	stateTaxRate3 = 0.04;
	let	stateTaxRate4 = 0.06;
	let	stateTaxRate5 = 0.08;
	let	stateTaxRate6 = 0.093;
	let	stateTaxRate7 = 0.103;
	let	stateTaxRate8 = 0.113;
	let	stateTaxRate9 = 0.123;
	let fedBracket1 
	let fedBracket2 
	let fedBracket3 
	let fedBracket4 
	let fedBracket5
	let fedBracket6 
	let fedBracket7
	let fedTaxRate1 = 0.1;
	let fedTaxRate2 = 0.12;
	let fedTaxRate3 = 0.22;
	let fedTaxRate4 = 0.24;
	let fedTaxRate5 = 0.32;
	let fedTaxRate6 = 0.35;
	let fedTaxRate7 = 0.37;
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
	function handleFilingStatusBracket() {
		if(fileStatus === 'Single') {
			stateBracket1 = 8932;
			stateBracket2 = 21175 - 8933;
			stateBracket3 = 33421 - 21176;
			stateBracket4 = 46394 - 33422;
			stateBracket5 = 58634 - 46395;
			stateBracket6 = 299508 - 58635;
			stateBracket7 = 359407 - 299509;
			stateBracket8 = 599012 - 359408;
			stateBracket9 = taxIncome - 599013;
			fedBracket1 = 9950;
			fedBracket2 = 40525 - 9951;
			fedBracket3 = 86375 - 40526;
			fedBracket4 = 164925 - 86376;
			fedBracket5 = 209425 - 164926;
			fedBracket6 = 528600 - 209426;
			fedBracket7 = taxIncome - 523601; 
		} else {
			stateBracket1 = 17864;
			stateBracket2 = 42350 - 17845;
			stateBracket3 = 66842 - 42351;
			stateBracket4 = 92788 - 66843;
			stateBracket5 = 117268 - 92789;
			stateBracket6 = 599016 - 117269;
			stateBracket7 = 718814 - 599017;
			stateBracket8 = 1198024 - 718815;
			stateBracket9 = taxIncome - 1198025;
			fedBracket1 = 19900;
			fedBracket2 = 81050 - 19901;
			fedBracket3 = 172750 - 81051;
			fedBracket4 = 329850 - 172751;
			fedBracket5 = 418850 - 329851;
			fedBracket6 = 628300 - 418851;
			fedBracket7 = taxIncome - 628301; 
		}
		return (stateTaxRate1, stateTaxRate2, stateTaxRate3, stateTaxRate4, stateTaxRate5, stateTaxRate6, stateTaxRate7, stateTaxRate8, stateTaxRate9, fedTaxRate1, fedTaxRate2, fedTaxRate3, fedTaxRate4, fedTaxRate5, fedTaxRate6, fedTaxRate7)
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
		let totalStateTax
		if (state.includes(usState)) {
			setStateTax(0)
		}
		else if(usState === 'CA'){		
			if(taxIncome < deduction) {
				console.log('you are not required to file tax')
				//Single Filer
			} else if ( fileStatus === 'Single' && taxIncome >= 8932 && taxIncome <= 21175) {
				stateBracket2 = taxIncome - 8933
				totalStateTax = (stateTaxRate1 * stateBracket1 + stateBracket2 * stateTaxRate2)
				setStateTax(totalStateTax)
				setStateTaxRate(totalStateTax/taxIncome * 100)
			} else if ( fileStatus === 'Single' && taxIncome >= 21176 && taxIncome <= 33421 ) {
				stateBracket3 = taxIncome - 21175
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( fileStatus === 'Single' && taxIncome >= 33422 && taxIncome <= 46394 ) {
				stateBracket4 = taxIncome - 33421
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( fileStatus === 'Single' && taxIncome >= 46395 && taxIncome <= 58634 ) {
				stateBracket5 = taxIncome - 46394
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if (fileStatus === 'Single' && taxIncome >= 58635 && taxIncome <= 299508 ) {
				stateBracket6 = taxIncome - 58634
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5 + stateBracket6 * stateTaxRate6)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( fileStatus === 'Single' && taxIncome >= 299509 && taxIncome <= 359407 ) {
				stateBracket7 = taxIncome - 299508
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5 + stateBracket6 * stateTaxRate6 + stateBracket7 * stateTaxRate7)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( fileStatus === 'Single' && taxIncome >= 359408 && taxIncome <= 599012 ) {
				stateBracket8 = taxIncome - 359407
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5 + stateBracket6 * stateTaxRate6 + stateBracket7 * stateTaxRate7 + stateBracket8 * stateTaxRate8)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( fileStatus === 'Single' && taxIncome >= 599013 ) {
				stateBracket9 = taxIncome - 599012
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5 + stateBracket6 * stateTaxRate6 + stateBracket7 * stateTaxRate7 + stateBracket8 * stateTaxRate8 + stateBracket9 * stateTaxRate9)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} 
			//Married Filer
			else if ( fileStatus === 'Married' && taxIncome >= 17865 && taxIncome <= 42350) {
				stateBracket2 = taxIncome - 17865
				totalStateTax = (stateTaxRate1 * stateBracket1 + stateBracket2 * stateTaxRate2)
				setStateTax(totalStateTax)
				setStateTaxRate(totalStateTax/taxIncome * 100)
			} else if ( fileStatus === 'Married' && taxIncome >= 42351 && taxIncome <= 66842 ) {
				stateBracket3 = taxIncome - 42351
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( fileStatus === 'Married' && taxIncome >= 66843 && taxIncome <= 92788 ) {
				stateBracket4 = taxIncome - 66843
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( fileStatus === 'Married' && taxIncome >= 92789 && taxIncome <= 117268 ) {
				stateBracket5 = taxIncome - 92789
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if (fileStatus === 'Married' && taxIncome >= 117269 && taxIncome <= 599016 ) {
				stateBracket6 = taxIncome - 117269
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5 + stateBracket6 * stateTaxRate6)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( fileStatus === 'Married' && taxIncome >= 599017 && taxIncome <= 718814 ) {
				stateBracket7 = taxIncome - 599017
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5 + stateBracket6 * stateTaxRate6 + stateBracket7 * stateTaxRate7)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( fileStatus === 'Married' && taxIncome >= 718815 && taxIncome <= 1198024 ) {
				stateBracket8 = taxIncome - 718815
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5 + stateBracket6 * stateTaxRate6 + stateBracket7 * stateTaxRate7 + stateBracket8 * stateTaxRate8)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} else if ( fileStatus === 'Married' && taxIncome >= 1198025 ) {
				stateBracket9 = taxIncome - 1198025
				totalStateTax = (stateBracket1 * stateTaxRate1 + stateBracket2 * stateTaxRate2 + stateBracket3 * stateTaxRate3 + stateBracket4 * stateTaxRate4 + stateBracket5 * stateTaxRate5 + stateBracket6 * stateTaxRate6 + stateBracket7 * stateTaxRate7 + stateBracket8 * stateTaxRate8 + stateBracket9 * stateTaxRate9)
				setStateTax(totalStateTax);
				setStateTaxRate((totalStateTax / taxIncome) * 100);
			} 
		} stTax = totalStateTax
		return stTax 
	}
	function calculateFedTax() {
		let takeHome;
		if (
			grossIncome <= deduction ||
			grossIncome <= 12200 ||
			taxIncome <= deduction ||
			taxIncome <= 12200
		) {
			console.log(
				'your income is less than standard deduction you are not required to file tax return'
			);
			return;
		} else {
			//Single Filer
			if (fileStatus === 'Single' && taxIncome > 523601) {
				takeHome =
					grossIncome -
					stTax -
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
			} else if ( fileStatus === 'Single' && taxIncome >= 209426 && taxIncome <= 523601) {
				fedBracket6 = taxIncome - 209426;
				takeHome =
					grossIncome -
					stTax -
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
			} else if ( fileStatus === 'Single' && taxIncome >= 164926 && taxIncome <= 209425) {
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
			} else if ( fileStatus === 'Single' && taxIncome >= 86376 && taxIncome <= 164925) {
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
			} else if ( fileStatus === 'Single' && taxIncome >= 40526 && taxIncome <= 86375) {
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
			} else if (fileStatus === 'Single' && taxIncome >= 12201 && taxIncome <= 40525) {
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
			}
			//Married Filer
			else if (fileStatus === 'Married' && taxIncome > 628301) {
				takeHome =
					grossIncome -
					stTax -
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
			} else if (
				fileStatus === 'Married' && taxIncome >= 418851 && taxIncome <= 628301
			) {
				fedBracket6 = taxIncome - 418851;
				takeHome =
					grossIncome -
					stTax -
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
			} else if (
				fileStatus === 'Married' && taxIncome >= 329851 && taxIncome <= 418850
			) {
				fedBracket5 = taxIncome - 329581;
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
			} else if (
				fileStatus === 'Married' && taxIncome >= 172751 && taxIncome <= 329850
			) {
				fedBracket4 = taxIncome - 172751;
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
			} else if (
				fileStatus === 'Married' && taxIncome >= 81051 && taxIncome <= 172750
			) {
				fedBracket3 = taxIncome - 81051;
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
			} else if (
				fileStatus === 'Married' && taxIncome >= 19901 && taxIncome <= 81050
			) {
				fedBracket2 = taxIncome - 19901;
				takeHome =
					grossIncome -
					stTax -
					fica -
					medicare -
					(fedBracket2 * fedTaxRate2 + fedBracket1 * fedTaxRate1);
				setTax(grossIncome - takeHome);
				setFinalTakeHome(takeHome);
				setTaxRate(((grossIncome - takeHome) / grossIncome) * 100);
			}
		}
	}
 	const handleCalculateTax = (event) => {
		event.preventDefault();
		handleGrossAndTaxableIncome();
		handleFica();
		handleFilingStatusBracket()
		calculateStateTaxRate();
		calculateFedTax()
	}
	return (
		<div className='main-board'>
			<div className='left-div'>
				<h5> Take Home Calculator</h5>
				<h4 className='header4'> Your Pay Rate </h4>
				<form onSubmit={handleCalculateTax}>
					<input
						placeholder='Pay Rate'
						type='text'
						onChange={handleChangeIncome}
						className='input_field'></input>
					<label className='radio-button-label'>
						<input
							className='radio-button'
							type='radio'
							name='payType'
							value='Hourly'
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
							required
							onChange={handlePayTypeChange}></input>
						Annually
					</label>
					<div>
						{' '}
						Filing Status
						<label className='radio-button-label'>
							<input
								className='radio-button'
								type='radio'
								name='fileStatus'
								value='Single'
								required
								onChange={handleFileStatusChange}></input>
							Single
						</label>
						<label className='radio-button-label'>
							<input
								className='radio-button'
								type='radio'
								name='fileStatus'
								value='Married'
								required
								onChange={handleFileStatusChange}></input>
							Married
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
					</div>
					<p>Standard or Itemize Deduction</p>
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
					Your Annual Income Is: $
					{annualIncome.toLocaleString('en', { maximumFractionDigits: 2 })}
				</h4>
				<p>
					Your Deduction Is: $
					{deduction.toLocaleString('en', { maximumFractionDigits: 2 })}
				</p>
				<p>
					Your Total Taxable Income Is: $
					{taxableIncome.toLocaleString('en', { maximumFractionDigits: 2 })}
				</p>
				<p>
					Your Social Security Tax Is: $
					{socialSec.toLocaleString('en', { maximumFractionDigits: 2 })}
				</p>
				<p>
					Your Medicare Tax Is: $
					{medicareTax.toLocaleString('en', { maximumFractionDigits: 2 })}
				</p>
				<p>
					Your Tax Burden Is: $
					{tax.toLocaleString('en', { maximumFractionDigits: 2 })}
				</p>
				<p>
					Your Effective Tax Rate Is:{' '}
					{taxRate.toLocaleString('en', { maximumFractionDigits: 2 })}%
				</p>
				<p>Your State Is: {usState} </p>
				<p>
					Your State Tax Is:{' '}
					{stateTax.toLocaleString('en', { maximumFractionDigits: 2 })}{' '}
				</p>
				<p>
					Your Effective State Tax Rate Is:{' '}
					{stateTaxRate.toLocaleString('en', { maximumFractionDigits: 2 })}%
				</p>
				<p>
					Your Final Take Home Is: $
					{FinalTakeHome.toLocaleString('en', { maximumFractionDigits: 2 })}
				</p>
			</div>
			<div className='right-div'>
				Information
				<fieldset>
					<legend> Federal Tax Bracket 2021</legend>
					<div className='tax-table'>
						<table>
							<tbody>
								<tr>
									<th> Tax Rate </th>
									<th> For Single Individuals </th>
									<th> Married Filling Joint Return </th>
								</tr>
								<tr>
									<td> 10% </td>
									<td> Up to $9,950 </td>
									<td> Up to $19,900 </td>
								</tr>
								<tr>
									<td> 12% </td>
									<td> $9,951 to $40,525</td>
									<td> $19,901 to $81,050 </td>
								</tr>
								<tr>
									<td> 22% </td>
									<td> $40,526 to $86,375 </td>
									<td> $81,051 to $172,750 </td>
								</tr>
								<tr>
									<td> 24% </td>
									<td> $86,376 to $164,925 </td>
									<td> $172,751 to $329,850 </td>
								</tr>
								<tr>
									<td> 32% </td>
									<td> $164,926 to $209,425 </td>
									<td> $329,851 to $418,850</td>
								</tr>
								<tr>
									<td> 35% </td>
									<td> $209,426 to $523,600 </td>
									<td> $418,851 to $628,300 </td>
								</tr>
								<tr>
									<td> 37% </td>
									<td> $523,601 Or More </td>
									<td> $628,301 Or More</td>
								</tr>
							</tbody>
						</table>
					</div>
				</fieldset>
				<fieldset>
					<legend> Standard Deduction 2021</legend>
					<table>
						<tbody>
							<tr>
								<th> Filling Status </th>
								<th> Deduction Amount </th>
							</tr>
							<tr>
								<td> Single </td>
								<td> $12,550</td>
							</tr>
							<tr>
								<td> Married Filling Jointly </td>
								<td> $25,100</td>
							</tr>
						</tbody>
					</table>
				</fieldset>
				<fieldset>
					<legend> California Tax Bracket 2021</legend>
					<div className='tax-table'>
						<table>
							<tbody>
								<tr>
									<th> Tax Rate </th>
									<th> For Single Individuals </th>
									<th> Married Filling Joint Return </th>
								</tr>
								<tr>
									<td> 1% </td>
									<td> Up to $8,932 </td>
									<td> Up to $17,864 </td>
								</tr>
								<tr>
									<td> 2% </td>
									<td> $8,933 to $21,175</td>
									<td> $17,865 to $42,350 </td>
								</tr>
								<tr>
									<td> 4% </td>
									<td> $21,176 to $33,421</td>
									<td> $42,351 to $66,842 </td>
								</tr>
								<tr>
									<td> 6% </td>
									<td> $33,422 to $46,394 </td>
									<td> $66,843 to $92,788 </td>
								</tr>
								<tr>
									<td> 8% </td>
									<td> $46,395 to $58,634</td>
									<td> $92,789 to $117,268</td>
								</tr>
								<tr>
									<td> 9.3% </td>
									<td> $58,635 to $299,508</td>
									<td> $117,269 to $599,016 </td>
								</tr>
								<tr>
									<td> 10.3% </td>
									<td> $299,509 to $359,407</td>
									<td> $599,017 to $718,814 </td>
								</tr>
								<tr>
									<td> 11.3% </td>
									<td> $359,408 to $599,012</td>
									<td> $718,815 to $1,198,024</td>
								</tr>
								<tr>
									<td> 12.3% </td>
									<td> $599,013 Or More</td>
									<td> $1,198,025 Or More</td>
								</tr>
							</tbody>
						</table>
					</div>
				</fieldset>
				<p>
					Tax Bracket Information Taken from:
					<a href='https://taxfoundation.org/2021-tax-brackets/'>
						Tax Foundation
					</a>
					<span> and </span>
					<a href='https://www.nerdwallet.com/article/taxes/california-state-tax'>
						Nerd Wallet
					</a>
				</p>
			</div>
		</div>
	);
}
export default Base;
