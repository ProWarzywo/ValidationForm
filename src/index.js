import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class App extends Component {
    state = { 
        username: '',
        email:'',
        pass: '',
        accept: false,
       

        errors:{
            username: false,
            email:false,
            pass: false,
            accept: false,
        }
     } 
     messages = {
        incorrect: "Błędne dane"
     }
     handleChange = (e) =>{
        const name = e.target.name;
        const type = e.target.type;
        if(type === "text" || type ==="password" || type === "email"){
            const value = e.target.value;
            this.setState({
                [name]:value
    
            })
        }else if(type === "checkbox"){
            const checked  = e.target.checked;
            this.setState({
                [name]:checked
    
            })
        }
     }
     formValidation = () =>{
         let username = false;
         let email = false;
         let password = false;
         let accept = false;
         let correct = false;

         if(this.state.username.length > 10 && this.state.username.indexOf(' ') === -1)
         {
             
            username = true;
         }
         if(this.state.email.indexOf('@') !== -1){
             email = true;
         }
         if(this.state.pass.length === 8){
             password = true;
         }
         if(this.state.accept){
             accept = true;
         }
         if(username && email && password && accept){
             correct = true
         }
         return({
             correct,
             username,
             email,
             password,
             accept
         })
     }
     handdleSubmit = (e) => {
         e.preventDefault()
         const validation = this.formValidation()
         console.log(validation)
         if(validation.correct){
             this.setState({
                username: '',
                email:'',
                password: '',
                accept: false,
                mess:'Formularz zotał wysłany',
        
                errors:{
                    username: false,
                    email:false,
                    pass: false,
                    accept: false,
                }
             })
             console.log("wyslane")
         }else{
             this.setState({
                errors:{
                    username: !validation.username,
                    email: !validation.email,
                    pass: !validation.password,
                    accept: !validation.accept,
                }
             })
         }
     }
     componentDidUpdate(){
         if(this.state.mess !== ''){
             setTimeout(()=>this.setState({
                 mess:''
             }),7000)
         }
     }
    render() { 
        return ( 
            <div className="App">
                <span>ZAPISZ SIĘ</span>
                <form onSubmit={this.handdleSubmit} noValidate>
                    <label htmlFor="user">Twoje imię: <br />
                    <input type="text" placeholder="Podaj imię" className="inpText" id="user" name="username" value={this.state.username} onChange={this.handleChange}/>
                    {this.state.errors.username && <span>{this.messages.incorrect}</span>}
                    </label>
                    
                    <label htmlFor="email">Twój Email: <br />
                    <input type="email" placeholder="Podaj Email" id="email" className="inpText" name="email" value={this.state.email} onChange={this.handleChange} />
                    {this.state.errors.email && <span>{this.messages.incorrect}</span>}
                    </label>
                    
                    <label htmlFor="password">Twoje Hasło: <br />
                    <input type="password" placeholder="Podaj Hasło" name="pass" id="password" className="inpText"  value={this.state.password} onChange={this.handleChange} />
                    {this.state.errors.pass && <span>{this.messages.incorrect}</span>}
                    </label>

                    <label htmlFor="accept" className="reg">
                    Akcpetujesz Regulamin 
                        <input type="checkbox" name="accept" id="accept"  checked={this.state.checked } onChange={this.handleChange}/> 
                    </label>
                    
                    <button>Zapisz sie</button>
                    
                </form>
                {this.state.mess && <h3>{this.state.mess}</h3>}
            </div>
         );
    }
}
 
ReactDOM.render(<App/>,document.getElementById('root'))