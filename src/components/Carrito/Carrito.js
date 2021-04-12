import React from 'react';

class Carrito extends React.Component {
    componentDidMount(){
        console.log('<Carrito> se ha montado');
    }

    componentWillUnmount(){
        console.log('<Carrito> se va a demsontar');
    }
    render() {
        return (
            <div>
                <p>Producto: {this.props.nombre}.</p>
                <p>Cantidad: {this.props.cantidad}</p>
                <p>Precio: {this.props.precio}€.</p>
            </div>
        )
    }
}

export default Carrito;