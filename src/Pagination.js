import React, { Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import https from 'https';

class Pagination extends Component {

  componentDidMount(){
    this.props.setTotal();
  }
  
  paginas = (props) => {
   var posts = 60;
   var total = Math.ceil(posts/3);

    let init = 1;
    let end = 10;
    if(total <= 10){
      end = total;
    }else if(total > 10){
      //Final
        if(this.props.pagina.page >= total-4){
          init = total - 9;
          end = total;
        }else if(this.props.pagina.page -4 <= 0){
          //Init
          init = 1;
          end = 10;
        }else{
          //Todo lo demas
          init = this.props.pagina.page -4;
          end = this.props.pagina.page +5;

        }
      

      //Todo lo demas
    }
    let lista = [];

    const barra = () => {
      for(let i = init; i <= end; i++){
        lista = lista.concat(
          <th key={i} onClick={(e) => {
            this.props.setCurrent(parseInt(e.target.innerHTML));
          }}>
            {i}
          </th>
        )
      }
      return lista;
    }
    return (
      <div>
        <table>
            <tbody>
              <tr>
                {barra()}
              </tr>
            </tbody>
        </table>
      </div>
    )
  }
  
  render() {
    return (
      <div>
        <h4>
          Paginación
          {this.props.pagina.page}

        </h4>
        {this.paginas()}

      </div>
    )
  } 
}
const mapStateToProps = (state) => {
  return {
    pagina: state.pagination
  }
}
const agent = new https.Agent({  
  rejectUnauthorized: false
});
const mapDispatchToProps = (dispatch) => {
  
  
  return {
      
    setTotal: () => {
        
        axios.get('https://blog-api-u.heroku.com/v1/totalposts', { httpsAgent: agent })
       
        .catch(function(error){
          console.log(error);
          
        })
      },
      setCurrent: (e) => {
        dispatch({type: 'SET_CURRENT', page: e});
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pagination)