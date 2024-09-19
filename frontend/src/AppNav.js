import React, { Component } from 'react'
import "./AppNav.css";
import { getWeb3, getInstance}  from "./Web3Util";

export class AppNav extends Component {

    constructor(props) {
      super(props); // compulsory call for all class constructors
      this.state = {
            name: '',
            symbol: ''
        };
    }

    // called automatically after component initialisation
    // set symbol and name
    componentDidMount = async () => {
      const web3 = await getWeb3();
      const contractInstance = await getInstance(web3);
      window.user = (await web3.eth.getAccounts())[0];
      const symbol = await contractInstance.methods.get_symbol().call()
      this.setState({ symbol: symbol });
      const name = await contractInstance.methods.get_name().call();
      this.setState({ name: name });
  }


  render() {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark stylish-color">
                <div className="navbar-brand">  
                    <a className="navbar-item text-white" href="/"> 
                        <strong><i className="fa fa-coins"></i>NFT Cloth Market  &#128087; </strong>  
                    </a>  
                </div> 
                <form className="form-inline  my-2 my-lg-0 ml-auto">
                    <a className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" href="/">Cloth Gallery  </a>
                    <a className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" href="/publishArt"> Add Your Cloth </a>
                    <a className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" href="/mywallet"> Wallet Info </a>
                </form>
            </nav>

    );
  }
} // end of component

export default AppNav;
