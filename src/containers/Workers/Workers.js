import React from 'react';
import clases from './Workers.module.css';
import Producto from '../../components/Producto/Producto';
import Carrito from '../../components/Carrito/Carrito';
import axios from 'axios';

export const ContextoAutenticado = React.createContext({
    autenticado: false,
});

class Workers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            aux: [],
            pedidos: [],
            total: [],
            auxenvio: "",
            auxnombrecliente: "",
            auxapellido: "",
            cliente: [
                {
                    nombrecliente: "",
                    envio: "",
                    apellido: ""
                }
            ],
            preciototal: 0,
            estado: false
        }
    }

    componentDidMount() {
        console.log('<App> se ha montado');
        axios.get('https://proyectofinal-e99ae-default-rtdb.europe-west1.firebasedatabase.app/Productos.json')
            .then(response => {
                console.log(response);
                let productos = [];
                for (let key in response.data) {
                    productos.push({
                        nombre: response.data[key].nombre,
                        precio: response.data[key].precio,
                        imagen: response.data[key].imagen,
                        idb: key
                    });
                }
                this.setState({ productos: productos });
                console.log(productos);
            });
    }

    componentWillUnmount() {
        console.log('<App> se va a desmontar');
    }

    rellenarPedido = (nombre, precio, ids) => {
        // console.log("PRIMER" + this.state.aux);
        let copia = [...this.state.pedidos];
        let prueba = {
            cantidad: 0,
            nombre: nombre,
            precio: precio,
            id: ids
        };
        // console.log(prueba.precio)
        let copiaprecio =this.state.preciototal;
        copiaprecio = copiaprecio+prueba.precio;
        // console.log(this.state.pedidos);
        if (copia.length === 0) {
            let inicio = {
                cantidad: 1,
                nombre: nombre,
                precio: precio,
                id: ids
            };
            copia.push(inicio);
            this.setState({
                pedidos: copia,
                preciototal: copiaprecio
            });
        } else {
            for (var i = 0; i < copia.length; i++) {
                if (copia[i].id === prueba.id) {
                    // console.log(copia[i].cantidad);
                    copia[i].cantidad = copia[i].cantidad + 1;
                    copia[i].precio = copia[i].precio + prueba.precio;
                    this.setState({
                        pedidos: copia,
                        preciototal: copiaprecio
                    });
                    break;
                } else {
                    if (i === copia.length - 1) {          
                        prueba.precio= prueba.precio/2;           
                        copia.push(prueba);
                        // console.log("cantidad" +copia[i].cantidad);
                        this.setState({
                            pedidos: copia,
                            preciototal: copiaprecio
                        })
                        // console.log(this.state.pedidos);
                    }
                }
            }
        }

        // console.log(this.state.pedidos);
    }


    formulario = () => {
        let ver = this.state.estado;
        this.setState({ estado: !ver })
    }

    pideProducto = () => {
        // console.log("entro");
        let clientefinal = [...this.state.cliente];
        let finalpedido = [...this.state.pedidos];
        let copiafinal = [];
        copiafinal.push(finalpedido);
        console.log(copiafinal);
        copiafinal.push(clientefinal);
        console.log(copiafinal);
        this.setState({
            total: copiafinal
        })
        // console.log("array total" + this.state.total);
        let copiatotal = [...this.state.total];
        console.log(copiatotal)
        axios.post('https://proyectofinal-e99ae-default-rtdb.europe-west1.firebasedatabase.app/Pedidos.json', copiafinal)
            .then(response => {
                // console.log("entro en el post");
                alert('Pedido realizado correctamente');
            });
        this.setState({
              pedidos: [],
              cliente: [
                {
                    nombrecliente: "",
                    envio: "",
                    apellido: ""
                }
            ],
            preciototal: 0,
            estado: false
        });
    }


    cambiaNombreCliente = (event) => {
        this.setState({
            cliente: [{
                nombrecliente: event.target.value,
                apellido: this.state.auxapellido,
                envio: this.state.auxenvio
            }],
            auxnombrecliente: event.target.value
        })
        // console.log(this.state.cliente);
    }

    cambiaApellido = (event) => {
        this.setState({
            cliente: [{
                nombrecliente: this.state.auxnombrecliente,
                apellido: event.target.value,
                envio: this.state.auxenvio
            }],
            auxapellido: event.target.value
        })
        // console.log(this.state.cliente);
    }

    cambiaEnvio = (event) => {
        this.setState({
            cliente: [{
                nombrecliente: this.state.auxnombrecliente,
                apellido: this.state.auxapellido,
                envio: event.target.value
            }],
            auxenvio: event.target.value
        })
        // console.log(this.state.cliente);
    }


    render() {
        let listaproductos = null;
        listaproductos = (
            <div>
                {this.state.productos.map((producto, id) => {
                    return <Producto nombre={producto.nombre}
                        key={id}
                        precio={producto.precio}
                        imagen={producto.imagen}
                        cantidad={0}
                        pidiendo={() => this.rellenarPedido(producto.nombre, producto.precio, id)} 
                    />
                })}
            </div>
        )

        let listapedidos = null;
        listapedidos = (
            <div>
                {this.state.pedidos.map((pedido, id) => {
                    return <Carrito nombre={pedido.nombre}
                        key={id}
                        precio={pedido.precio}
                        cantidad={pedido.cantidad}
                    />
                })}
            </div>
        )

        let formula = null;
        if (this.state.estado) {
            formula = (
                <div>
                    <form>
                        <label>
                            Nombre:
                <input type="text" name="nombrecliente" onChange={(event) => this.cambiaNombreCliente(event, this.state.cliente.apellido, this.state.cliente.envio)} value={this.state.cliente.nombrecliente} />
                        </label>
                        <label>
                            Apellido:
                <input type="text" name="apellido" onChange={this.cambiaApellido} value={this.state.cliente.apellido} />
                        </label>
                        <label>
                            Dirección de envío:
                <input type="text" name="envio" onChange={this.cambiaEnvio} value={this.state.cliente.envio} />
                        </label>
                        <input type="submit" value="Finalizar Pedido" onClick={this.pideProducto} />
                    </form>
                </div>

            );
        }

        return (
            <div className={clases.Workers}>
                <ContextoAutenticado.Provider>
                    {listaproductos}
                    <h3>Mi Carrito</h3>
                    {listapedidos}
                    <h5>Precio Total del pedido: {this.state.preciototal}</h5>
                    <button onClick={this.formulario}>finalizar</button>
                    {formula}
                </ContextoAutenticado.Provider>

            </div>
        )
    }

}

export default Workers;
