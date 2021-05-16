'use strict';


const element = React.createElement;

class calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        display: "",
        disabled: false
    }
  }

  handleclick(num ) {
    if (num == ".") {
        this.setState({disabled : true})
    }
    else if (num == "+" || num == "-" || num == "*" || num == "/" || num=="AC") {
        this.setState({disabled : false})
    }

    this.setState(state => ({
        display : (num == "AC" || (this.state.display=="" && num==0)) ? "": state.display.concat(num),
    }))
  }


  calculate(f,s,opr,numstack) {
    switch(opr) {
        case("+"):
            return numstack.push(f + s);
        case("-"):
            return numstack.push(f - s);
        case("*"):
            return numstack.push(f * s);
        case("/"):
            return numstack.push(f / s);
    }
  }

  evaluate(postfix,numstack){
    for (let i=0; i<postfix.length; i++){
        let x= postfix[i]
        if (typeof(x)==typeof(1)){
            numstack.push(x)
        }
        else {
            let s = numstack.pop()
            let f = numstack.pop()
            this.calculate(f,s,x,numstack)
        }
    }
  }

  opstackpush(op,opstack,postfix) {
    let opPriority = {'+':1,'-':1,'*':2,'/':2}
    if (opstack.length == 0) {
        opstack.push(op)
    }
    else if (opPriority[op]>opPriority[opstack[opstack.length-1]]) {
        opstack.push(op)
    }
    else {
        let opr = opstack.pop()
        postfix.push(opr)
        this.opstackpush(op,opstack,postfix)
    } 
  }

  handelEquals(){
    let str = this.state.display
    let filteredstr = ''
    let opx = ''
    let neg = false
    let number = [] 
    let opstack = []
    let postfix =[]
    let numstack = [] 
    
    for (let i=0; i<str.length; i++){ 
        let x=str[i]
        if ((x>='0' && x<='9') || x =='.') {
            if (opx!='') {
                filteredstr = filteredstr.concat(opx)
                opx=''
            }
            if (neg==true) {
                filteredstr = filteredstr.concat('-')
                neg=false
            }
            filteredstr = filteredstr.concat(x)
    
        } else {
            if (x=="-" && neg==false) {
                neg=true
            }
            else if (x=='-'&& neg==true) {
                opx="-"
            }
            else if (neg == true) {
                neg=false
                opx=x
            } else {
                opx=x
    
            }
        }
    }    
    
    var num = ''
    for (let i=0; i<filteredstr.length; i++) {
        let x = filteredstr[i]
        if (x=='+' || x=='-' || x=='*' || x=='/') {
            if(num=='' && x=='-'){
                num=num.concat('-')
            } else {
                number.push(parseFloat(num))
                num=''
                number.push(x)
            }
    
        } else {
                num = num.concat(x)
        }
    }

    number.push(parseFloat(num))

    for (let i=0; i<number.length; i++) {
        let x = number[i]
        if (typeof(x)==typeof(1)) {
            postfix.push(x)
    
        } else {
            this.opstackpush(x,opstack,postfix)
        }    
    }
    while(opstack.length !=0){
        let opr = opstack.pop()
        postfix.push(opr)
    }
    this.evaluate(postfix,numstack)
    
    this.setState(state => ({
        display : numstack[0].toString()

    }))

  }

 
  
  render() {
      
    return  element('div', {id:"container", style:{textAlign:"center", padding:"5%"}},
                element('div',{id:"display", className:"display"},`${(this.state.display=="") ? "0" : this.state.display}`), 
                element('br'),
                element('button',{id:"equals", className:"equal", onClick: this.handelEquals.bind(this)}, "="), 
                element('br'),
                element('button',{id:"seven", className:"style", onClick: this.handleclick.bind(this,"7")}, "7"), 
                element('button',{id:"eight", className:"style", onClick: this.handleclick.bind(this,8)}, "8"), 
                element('button',{id:"nine", className:"style", onClick: this.handleclick.bind(this,9)}, "9"),
                element('button',{id:"multiply", className:"style", onClick: this.handleclick.bind(this,"*")}, "*"),
                element('br'),
                element('button',{id:"four", className:"style", onClick: this.handleclick.bind(this,4)}, "4"), 
                element('button',{id:"five", className:"style", onClick: this.handleclick.bind(this,5)}, "5"), 
                element('button',{id:"six", className:"style", onClick: this.handleclick.bind(this,6)}, "6"),
                element('button',{id:"subtract", className:"style", onClick: this.handleclick.bind(this,"-")}, "-"),
                element('br'),
                element('button',{id:"one", className:"style", onClick: this.handleclick.bind(this,1)}, "1"), 
                element('button',{id:"two", className:"style", onClick: this.handleclick.bind(this,2)}, "2"), 
                element('button',{id:"three", className:"style", onClick: this.handleclick.bind(this,3)}, "3"), 
                element('button',{id:"add", className:"style", onClick: this.handleclick.bind(this,"+")}, "+"),
                element('br'),
                element('button',{id:"decimal", disabled:this.state.disabled ,className:"style", onClick: this.handleclick.bind(this,".")},"."), 
                element('button',{id:"zero", className:"style", onClick: this.handleclick.bind(this,0)}, "0"), 
                element('button',{id:"clear", className:"style", onClick: this.handleclick.bind(this,"AC")}, "AC"), 
                element('button',{id:"divide", className:"style", onClick: this.handleclick.bind(this,"/")}, "/"))
                
  }
}

const domContainer = document.getElementById('root')
ReactDOM.render(element(calculator), domContainer);