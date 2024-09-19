import React, { Component } from 'react';
import { getWeb3, getInstance}  from "./Web3Util";
import AppNav from './AppNav';
import './Publish.css';


export class Publish extends Component {
        constructor(props) {
        super(props);
        this.state = { 
            imageValue: 'images/images2.png',
            description: '',
            title: '', 
            authorName: '',
            price: 0,
            date:'',
            user: '',
            balance: 0,
            contractInstance: '',
            networkId:'',
            networkType:'',
        };
        this.imageChange = this.imageChange.bind(this); // change image
        this.submitHandler = this.submitHandler.bind(this); // called when we submit the form (i.e. publish)
        this.changeHandler = this.changeHandler.bind(this); // gets called when we edit the image/art form info
      }

    // gets called automatically after component creation
    componentDidMount = async () => {
        const web3 = await getWeb3();
        window.web3 = web3;
        const contractInstance = await getInstance(web3);
        window.user = (await web3.eth.getAccounts())[0];
        const balanceInWei = await web3.eth.getBalance(window.user);
        var balance = web3.utils.fromWei(balanceInWei, 'ether');
        const networkId = await web3.eth.net.getId();
        const networkType = await web3.eth.net.getNetworkType();
        this.setState({ user: window.user });
        this.setState({ balance: balance});
        this.setState({ contractInstance: contractInstance });
        this.setState({ networkId: networkId});
        this.setState({ networkType: networkType});
      }

      isNotEmpty(val) {
        return val && val.length>0;
    }
      // gets called when change in image occurs
      imageChange = (event) => {
        this.setState({ imageValue: event.target.value });
      };

      // get called when any update in the form
      changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
            }, function(){ })
    };
      // gets called when we click publish option
      submitHandler = (event) => {
        event.preventDefault(); // react default function to be called
        const {  imageValue, description, title, authorName, price, date} = this.state;
        if(this.isNotEmpty(title) &&this.isNotEmpty(description) &&this.isNotEmpty(authorName) 
            &&this.isNotEmpty(date)&&this.isNotEmpty(imageValue) && this.isNotEmpty(price)) {
            const priceInWei =  window.web3.utils.toWei(price, 'ether');
            this.publishArt(title, description, date, authorName, priceInWei, imageValue);  
        }
    }; 

      async publishArt(title, description, date, authorName, price, imageValue) {
        try {
            await this.state.contractInstance.methods.createFinxterToken(title,description, date, authorName, price, imageValue).send({
                from: this.state.user
            })
            this.props.history.push(`/home`) // automatically move to home page after publishing
            window.location.reload(); 
        } catch (e) {console.log('Error', e)}
    }

    render() {
    return (
        <div>
            <AppNav></AppNav>

            <section className="sec">
            
                <form className="f-container" onSubmit={this.submitHandler}>
                    <p className="f-title">Submit your NFT today.</p>
                    <div className="p-row">
                        
                        <input className='p-input'  id="title" name="title" type="text" placeholder="Title" onChange={this.changeHandler}  value={this.state.title}/>
                        <input className='p-input'  id="description" name="description"  type="text" placeholder="Description" onChange={this.changeHandler}  value={this.state.description}/>
                        <input className='p-input'  id="authorName" name="authorName" type="text" placeholder="Author Name" onChange={this.changeHandler}  value={this.state.authorName}/>

                        <input className='p-input'  id="price" name="price"  type="text" placeholder="Price (ether)"  onChange={this.changeHandler}  value={this.state.price}/>
                        <input className='p-input'  id="date" name="date"  type="date" placeholder="Date" onChange={this.changeHandler}   value={this.state.date}/>
                        <div className="f-options">
                            <div className="">
                                <select className='options' onChange={this.imageChange} value={this.state.imageValue}>
                                    
                                    <option value="./images/images1.png">Darkgreen-caport</option>
                                    <option value="./images/images2.png">white-collared-shirt</option>
                                    <option value="./images/images3.png">Brown-Boho-overalls</option>
                                    <option value="./images/images4.png">Red-Zipup-Hoodie</option>
                                    <option value="./images/images5.png">Red-sleevless-shirt</option>
                                    <option value="./images/images6.png">Red-Tshirt</option>
                                    <option value="./images/images7.png">Dirty-Green-Short</option>
                                    <option value="./images/images8.png">Mother-Abdomen-Shirt</option>
                                    <option value="./images/images9.png">Striped-Shirt</option>
                                    <option value="./images/images10.png">Purple-Patterned-Kneelength-Dress</option>
                                    <option value="./images/images11.png">Red-pokedot-Dress</option>
                                    <option value="./images/images12.png">Puffer-Jacket</option>
                                    <option value="./images/images13.png">Shirocolor-Trouser</option>
                                    <option value="./images/images14.png">Pink-terry-cloth</option>

                                </select>
                            </div>
                            <div className="">
                                <img className="optionImg" alt="art" src={this.state.imageValue} />
                            </div>
                        </div>
                    </div>
                    <div className="p-row">    
                        <button className='publish-btn' type="submit">Publish</button>
                    </div>
                    
                </form>
    

            </section>

        </div>
    );  // end of render
  } 
} // end of publish

export default Publish;
