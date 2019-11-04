import React from 'react'

function ListItems(props){
    const todoList = props.todoList

    const listItem = todoList.map(item => {
        return <div className = "list" key ={item.key} > 
            <p> 
                <input type="checkbox" onClick = {() => props.checkDone(item)}/>
                <input type="text" 
                    id={item.key} 
                    value={item.text} 
                    onChange={
                        (event) => {props.setUpdate(event.target.value, item.key)}}
                />
                <span onClick={() => props.deleteItem(item.key)}>x </span>

            </p>
            
        </div>
    })

    return(
        <div>
            {listItem}  
        </div>
    )
}

export default ListItems