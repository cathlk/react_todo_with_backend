import React from 'react'

function ListItem(props){
    const todoList = props.todoList

    const listItems = todoList.map(item => {
        return <div className = "list" key ={item.id} > 
            <p> 
                <input 
                    type="checkbox" 
                    onClick = {() => props.checkDone(item.id)} 
                    defaultChecked={ item.isChecked }
                /> 
                <input type="text" 
                    id={ item.id } 
                    value={ item.text } 
                    onChange= {
                        (event) => { props.setUpdate(event.target.value, item.id) }}
                />
                <span onClick={() => props.deleteItem(item.id)}>x </span>

            </p>
            
        </div>
    })

    return(
        <div>
            {listItems}  
        </div>
    )
}

export default ListItem