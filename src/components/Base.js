import React, { useState } from 'react';

function Base() {
	const [income, setIncome] = useState([]);
	const [taxableIncome, setTaxableIncome] = useState([]);
	const [tax, setTax] = useState([]);
	const [deduction, setDeduction] = useState([]);
	const [FinalTakeHome, setFinalTakeHome] = useState([]);
    const [socialSec, setSocialSec] = useState();
    const [taxRate,setTaxRate] = useState([])
    const [input1,setInput1] = useState([])

	function handleChangeIncome(event) {
		setIncome(event.target.value);
	}
	function handleChangeDeduction(event) {
		setDeduction(event.target.value);
    }
    function handleChange(event) {
        setInput1(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault();
       console.log(input1)
	}
	let fica;
	let medicare;
	function handleFica() {
		if (income >= 137700) {
			fica = 8537.4;
			medicare = income * 0.0145
		} else {
			fica = income * 0.062;
			medicare = income * 0.0145;			
		}
		return (fica,medicare)
	}
	function handleCalculateTax(event) {
		event.preventDefault();
		handleFica()
		setSocialSec(fica);
		let takeHome;
        let grossIncome = income - deduction;
        if(grossIncome < 0) {
            setTaxableIncome(income);

        } else if (grossIncome > 0){
            setTaxableIncome(grossIncome)
        }
		
		
		let bracket1 = 9875;
		let bracket2 = 40125 - 9876;
		let bracket3 = 85525 - 40126;
		let bracket4 = 163300 - 85526;
		let bracket5 = 207350 - 163301;
		let bracket6 = 518400 - 207351;
		let bracket7 = grossIncome - 518401;
		let taxRate1 = 0.1;
		let taxRate2 = 0.12;
		let taxRate3 = 0.22;
		let taxRate4 = 0.24;
		let taxRate5 = 0.32;
		let taxRate6 = 0.35;
		let taxRate7 = 0.37;
		if (grossIncome > 510300) {
			takeHome =
				grossIncome -
				fica -
				medicare -
				(bracket7 * taxRate7 +
					bracket6 * taxRate6 +
					bracket5 * taxRate5 +
					bracket4 * taxRate4 +
					bracket3 * taxRate3 +
					bracket2 * taxRate2 +
					bracket1 * taxRate1);
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income-takeHome)/income)*100)
		} else if (grossIncome > 204100 && grossIncome <= 510300) {
			bracket6 = grossIncome - 204100;
			takeHome =
				grossIncome -
				fica -
				medicare -
				(bracket6 * taxRate6 +
					bracket5 * taxRate5 +
					bracket4 * taxRate4 +
					bracket3 * taxRate3 +
					bracket2 * taxRate2 +
					bracket1 * taxRate1);
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income - takeHome) / income) * 100);
		} else if (grossIncome > 160725 && grossIncome <= 204100) {
			bracket5 = grossIncome - 160725;
			takeHome =
				grossIncome -
				fica -
				medicare -
				(bracket5 * taxRate5 +
					bracket4 * taxRate4 +
					bracket3 * taxRate3 +
					bracket2 * taxRate2 +
					bracket1 * taxRate1);
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income - takeHome) / income) * 100);
		} else if (grossIncome > 84200 && grossIncome <= 160725) {
			bracket4 = grossIncome - 84200;
			takeHome =
				grossIncome -
				fica -
				medicare -
				(bracket4 * taxRate4 +
					bracket3 * taxRate3 +
					bracket2 * taxRate2 +
					bracket1 * taxRate1);
			
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income - takeHome) / income) * 100);
		} else if (grossIncome > 39475 && grossIncome <= 84200) {
			bracket3 = grossIncome - 39475;
			takeHome =
				grossIncome -
				fica -
				medicare -
				(bracket3 * taxRate3 + bracket2 * taxRate2 + bracket1 * taxRate1);
			
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income - takeHome) / income) * 100);
		} else if (grossIncome > 9700 && grossIncome <= 39475) {
			bracket2 = grossIncome - 9700;
			takeHome =
				grossIncome - fica - medicare - (bracket2 * taxRate2 + bracket1 * taxRate1);
			
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income - takeHome) / income) * 100);
		} else if (grossIncome < 0){
			takeHome = income - fica - medicare - (bracket1 * taxRate1);
			setTax(income - takeHome);
            setFinalTakeHome(takeHome);
            setTaxRate(((income - takeHome) / income) * 100);
            
        }
    console.log(typeof(taxRate))
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

				<button type='submit'>Calculate </button>
			</form>
			<form onSubmit={handleSubmit}>
				<select onChange={handleChange}>
					<option value='Income'>Income </option>
					<option value='Bonus'>Bonus </option>
					<option value='Cash'>Cash </option>
				</select>
                <button type='submit'>Submit</button>
			</form>
			<h3> Break Down</h3>
			<h4> Your Annual Income is ${income}</h4>
			<p>Your deduction is ${deduction}</p>
			<p>Your Total Taxable Income is ${taxableIncome}</p>
			<p>Your Take Home is ${FinalTakeHome}</p>
			<p>Your Social Security Tax is ${socialSec}</p>
			<p>Your Tax burden is ${tax}</p>
			<p>You effective tax rate is {taxRate}% </p>
		</div>
	);
}
export default Base;
