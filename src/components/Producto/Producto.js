import React from 'react';
import clases from './Producto.module.css';

class Producto extends React.Component {
    componentDidMount(){
        console.log('<Producto> se ha montado');
    }

    componentWillUnmount(){
        console.log('<Producto> se va a demsontar');
    }
    render() {
        return (
            <div className={clases.Producto}>
                <img src={this.props.imagen}/>
                <p>Producto: {this.props.nombre}.</p>
                <p>Precio: {this.props.precio}.</p>
                <button onClick={this.props.pidiendo}>+</button>
            </div>
        )
    }
}

export default Producto;