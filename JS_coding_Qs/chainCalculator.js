// How would you implement a calculator class with methods for addition,
// subtraction, and multiplication, supporting method chaining?
// calculator.add(3).multiply(4).subtract(5).getValue()

// class Calculator { 
// 	// write code here
// }

// const calculator = new Calculator(2);
// console.log(calculator.add(3).multiply(4).subtract(5).getValue()); //15

class Calculator { 
	constructor(val){
	    this.val = val;
	}
	
	add(x){
	    this.val +=x;
	    return this;
	}
	
	multiply(x){
	    this.val *=x;
	    return this;
	}
	
	subtract(x){
	    this.val -=x;
	    return this;
	}
	
	getValue(){
	    return this;
	}
}

const calculator = new Calculator(2);
console.log(calculator.add(3).multiply(4).subtract(5).getValue()); //15