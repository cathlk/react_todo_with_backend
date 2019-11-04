import React from 'react'

function ListItem(props){
    return (
    <p className = "list"> 
        <input type="checkbox" onClick = {props.checkDone}/>
        <input type="text" 
            id={props.id} 
            value={props.text} 
            onChange={props.setUpdate}
        />
        <span onClick={props.deleteItem}>x </span>
    </p>
    )
}

export default ListItem