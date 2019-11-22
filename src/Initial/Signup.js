import React from 'react';
import SignupFormFinal from './SignupFormFinal.js';
import axios from 'axios';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

const Signup = (props) => {
  
  const funcionForma = (datos) => {
    console.log(datos);
    axios.post('https://blog-api-u.herokuapp.com/users/', {
        user: {
          name: datos.username,
          email: datos.email,
          password: datos.password,
          password_confirmation: datos.password_confirmation
        }
    })
    .then(function(response){
        console.log(response);
        props.success();
        
    })
    .catch(function(error){
        console.log(error);
        props.error();
        
    })
    
  }
  return(
    <div>
       <h2>Sign Up</h2> 
       <br/>
       {props.mensaje.mensaje}
       <br/>
       <SignupFormFinal onSubmit={funcionForma}/>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    mensaje: state.userStatus
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    success: () => {
      dispatch({type: 'USER_CREATED'});
      dispatch(reset('SignupValidation'));
    },
    error: () => {
      dispatch({type: 'USER_ERROR'});
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)