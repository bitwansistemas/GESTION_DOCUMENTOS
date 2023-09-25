
import '../styles/header.css'

export const Header = (props)=>{
      
    return(
        <div className='globalContainerHeader'>            
            <h1 className='mainTitle'>{props.titulo}</h1>        
        </div>
    )
}