import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import axios from 'axios';
import Pagination from '../Pagination.js'

class Home extends Component {

    //Se ejecuta automaticamente y solo una vez. Ideal para servidores.  
    componentDidMount(){
      this.props.dispatch1();
    }
    //Vamos a hacer una funcion que limpia cuando no estamos en el dom
    //De esta forma, no se repetirá el id
    componentWillUnmount(){
      this.props.clear();
    }

    allPosts = () => {
      const Posts = this.props.allPosts.map((post) => {
        return (
        <h4 key={post.id}>{post.title}</h4>
       )
      });
      return Posts;
    }
    render(){
      return(
        <div>
           {this.allPosts()}
          <h2>Hola desde el nuevo componente</h2>
          <Pagination/>
        </div>
      )
    }
}
const mapStateToProps = (state) => {
  return {
    allPosts: state.allPosts
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch1: () => {
        axios.get('https://blog-api-u.herokuapp.com/v1/posts')
        .then(function(response){
          console.log(response);
          dispatch({type:'DATA_LOADED',
          data: response.data
        });
        })
        .catch(function(error){
          console.log(error);
        })
    },
    clear : () => {
      dispatch({type: "CLEAR_DATA"});
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
