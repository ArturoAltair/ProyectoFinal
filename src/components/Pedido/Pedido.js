import React from 'react';
import clases from './Pedido.module.css';

class Pedido extends React.Component {
    componentDidMount(){
        console.log('<Pedido> se ha montado');
    }

    componentWillUnmount(){
        console.log('<Pedido> se va a demsontar');
    }
    render() {
        return (
            <div className={clases.Pedido}>
                <h3>Pedido</h3>
                <h5>Los productos que tengan el mismo identificador pertenecen al mismo pedido</h5>
                <p>Identificador de pedido {this.props.idb}</p>
                <p>Producto: {this.props.nombre}.</p>
                <p>Cantidad: {this.props.cantidad}.</p>
                <p>Precio: {this.props.precio}.</p>
                <p>Nombre del Cliente {this.props.nombrecliente}</p>
                <p>Apellido: {this.props.apellido}</p>
                <p>Dirección de envio: {this.props.envio}</p>
                <button onClick={this.props.borrando}>Borrar</button>
            </div>
        )
    }
}

export default Pedido;