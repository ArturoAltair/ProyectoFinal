import React from 'react';
import clases from './Historial.module.css';
import Pedido from '../../components/Pedido/Pedido';
import axios from 'axios';

export const ContextoAutenticado = React.createContext({
    autenticado: false,
});

class Historial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            aux: [],
            pedidos: [],
            estado: true
        }
    }

    componentDidMount() {
        console.log('<Historial> se ha montado');
        axios.get('https://proyectofinal-e99ae-default-rtdb.europe-west1.firebasedatabase.app/Pedidos.json')
            .then(response => {
                console.log(response);
                let pedidos = [];
                let cont1 = 0;
                for (let key in response.data) {
                    console.log(key);

                    for (let cont2 = 0; cont2 < 3; cont2++) {
                        console.log("Entra for " + cont2);
                        console.log(response.data[key][cont1])
                        if (response.data[key][cont1][cont2] != undefined) {
                            console.log("Entra if");
                            pedidos.push({
                                nombre: response.data[key][cont1][cont2].nombre,
                                precio: response.data[key][cont1][cont2].precio,
                                cantidad: response.data[key][cont1][cont2].cantidad,
                                nombrecliente: response.data[key][1][0].nombrecliente,
                                apellido: response.data[key][1][0].apellido,
                                envio: response.data[key][1][0].envio,
                                idb: key
                            });
                        }
                    }
                }
                this.setState({ pedidos: pedidos });
                console.log(pedidos);
            });
    }

    componentWillUnmount() {
        console.log('<Historial> se va a desmontar');
    }

    formulario = () => {
        let ver = this.state.estado;
        if(ver===false){
            this.componentDidMount();
        }
        this.setState({ estado: !ver })
    }

    borrapersona = (id, idb) => {
        console.log("Entraste wey")
        console.log(idb);
        // console.log(key);
        axios.delete('https://proyectofinal-e99ae-default-rtdb.europe-west1.firebasedatabase.app/Pedidos/' + idb + '.json')
            .then(response => {
                console.log("entras aqui?")
                console.log(response);
            });
        let copiapedido = [...this.state.pedidos];
        copiapedido.splice(id, 1);
        //personas[id].nombre = 'Borrado';
        this.setState({ pedidos: []});
        alert('Pedido borrado');
        this.formulario();
    }

    render() {

        let normal = null;
        if (this.state.estado) {
            normal = (
                <div>
                    {this.state.pedidos.map((pedido, id) => {
                        return <Pedido nombre={pedido.nombre}
                            key={id}
                            precio={pedido.precio}
                            cantidad={pedido.cantidad}
                            nombrecliente={pedido.nombrecliente}
                            apellido={pedido.apellido}
                            envio={pedido.envio}
                            idb={pedido.idb}
                            borrando={() => this.borrapersona(id, pedido.idb)}
                        />
                    })}
                </div>
            )
        } else {
            normal = (
            
            <div>
             <h5>OPERACIÓN FINALIZADA</h5>
             <p>Pulse el boton para continuar</p>
             <button onClick={this.formulario} >Continuar</button>
            </div>
            )
        }

        return (
            <div className={clases.Historial}>
                <ContextoAutenticado.Provider>
                    <h3>Listado de Pedidos</h3>
                    {normal}
                </ContextoAutenticado.Provider>

            </div>
        )
    }

}

export default Historial;