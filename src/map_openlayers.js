import { ReactBingmaps } from 'react-bingmaps';

document.getElementById('root').style['height'] = window.innerHeight + 'px'

const Maplayers = () => {
    return (
        <ReactBingmaps
            bingmapKey="Aue53CqMhv_oforhu3pP6L5EpDqyDwfwptjqrsQdfA_SLBwzPiseBuhSTuAnlB41" >
            center = {[13.0827, 80.2707]}
        </ReactBingmaps>
    )
}

export default Maplayers




