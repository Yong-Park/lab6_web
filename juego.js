
const cartas_imagenes = [
    {src:'./imagenes/blackmagician.jpg', matched: false},
    {src:'./imagenes/blue_eyes.jpg', matched: false},
    {src:'./imagenes/decode_talker.jpg', matched: false},
    {src:'./imagenes/neos.jpg', matched: false},
    {src:'./imagenes/odd_eyes.jpg', matched: false},
    {src:'./imagenes/raidraptor.jpg', matched: false},
    {src:'./imagenes/stardust_dragon.jpg', matched: false},
    {src:'./imagenes/utopia.jpg', matched: false}
];

function App(){
    const [cartas, ponerCartas] = React.useState([])
    const [turnos, ponerTurnos] = React.useState(0)
    const [opcionUno, setOpcionUno] = React.useState(null)
    const [opcionDos, setOpcionDos] = React.useState(null)
    const [disable, setDisable] = React.useState(false)

    //mezclar las cartas
    const mezclar = () =>{
        const mezclar = [...cartas_imagenes, ...cartas_imagenes]
            .sort(()=> Math.random()-0.5)
            .map((carta)=> ({...carta, id: Math.random()}))
        setOpcionUno(null)
        setOpcionDos(null)
        ponerCartas(mezclar)
        ponerTurnos(0)
    }

    const HandleChoice = (carta) => {
        console.log(carta)
        opcionUno ? setOpcionDos(carta) : setOpcionUno(carta)
    }

    React.useEffect(()=>{
        if(opcionUno && opcionDos){
            setDisable(true)

            if(opcionUno.src == opcionDos.src){
                ponerCartas(prevCartas => {
                    return prevCartas.map(carta => {
                        if(carta.src == opcionUno.src){
                            return {...carta, matched: true}
                        }else{
                            return carta
                        }
                    })
                })
                console.log('son iguales')
                resetearTurn()
            }else{
                console.log('no son iguales')
                setTimeout(() => resetearTurn(), 1000)
            }
        }
    },[opcionUno, opcionDos])

    console.log(cartas)

    const resetearTurn =() =>{
        setOpcionUno(null)
        setOpcionDos(null)  
        ponerTurnos(ponerTurnos => ponerTurnos +1)
        setDisable(false)
    }

    //mostrar la carta y obtener su imagen
    function CartaUnica({carta, HandleChoice, flipped, disable}){

        const HandleClick = ()=>{
            if(!disable){
                HandleChoice(carta)
            }
        }
        return(
            <div className="carta">
                <div className={flipped ? "flipped" : ""}>
                    <img className = "frontal" src={carta.src} alt ="carta frontal" />
                    <img className = "atras" src="/imagenes/atras.png" onClick={HandleClick} alt ="carta atras" />
                </div>
            </div>
        )
    }
    //comenzar automaticamente el juego
    React.useEffect(()=> {
        mezclar()
    },[])

    return (
        <div className='juego'>
            <h1 className="titulo">Yu-Gi-Oh</h1>
            <button onClick={mezclar}>Jugar</button>

            <div className ="grid-carta">
                {cartas.map(carta => (
                    <CartaUnica 
                    key = {carta.id} 
                    carta = {carta} 
                    HandleChoice= {HandleChoice} 
                    flipped={carta === opcionUno || carta === opcionDos || carta.matched}
                    disable={disable}
                    />
                ))} 
            </div>
            <p>Turnos: {turnos}</p>
        </div>
        
    );
    
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)