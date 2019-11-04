import React from 'react'
import ListItem from './ListItem'


class ListBody extends React.Component { 
    constructor(props){
        super(props) 

        this.state = {
            todoList: [], 
            currentItem: {
                text: "", 
                id: "",
                isChecked: false
            }
        }
        
        this.getTodoList = this.getTodoList.bind(this)        
        this.handleInput = this.handleInput.bind(this)
        this.addItem = this.addItem.bind(this)
        this.setUpdate = this.setUpdate.bind(this)
        this.checkDone = this.checkDone.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }   
    
    componentDidMount() {
        this.getTodoList() 
    }

    getTodoList() {
        fetch('http://localhost:3001/todoList')
          .then(res => res.json())
          .then(todoList => this.setState({ todoList: todoList })) 
    }

    // uppdatera inputfält skickar med information till varje skapat item  
    handleInput(event){
        this.setState({
            currentItem: {
            text: event.target.value, 
            id: Date.now(), 
            isChecked: false
            }
        })
    }
    
    // lägg till item i listan 
    addItem(event){
        //så att sidan inte laddas om 
        event.preventDefault() 
        const newItem = this.state.currentItem

        if(newItem.text !== ""){
            const newTodoList = [...this.state.todoList, newItem]
            this.setState({
                todoList: newTodoList, 
                currentItem: {
                    text: "", 
                    id: "",
                    isChecked: false
                }  
            })
        }
    }

    setUpdate(thetext, theid){
        const updateList = this.state.todoList
        updateList.map(item => {
            if(item.id === theid) {
                item.text = thetext
                console.log(theid);
            } 
        })
        this.setState({todoList: updateList}) 
    }

    checkDone(event){
        const checkList = this.state.todoList.map(item => {
            if(item.id === event.id){
                item.isChecked = !item.isChecked 
        }
        return item
        })
        this.setState({todoList: checkList})
    }
      
    // radera ett item 
    deleteItem(theid){ 
        const filteredList = this.state.todoList.filter(item =>
            item.id !== theid) 
            this.setState({ todoList: filteredList })
        }

    // deleteTodoItem(id) {
    //     fetch(`http://localhost:3001/todoList/${id}`, {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json' //för den ska fatta det är json server 
    //       }
    //     })
    //       .then(() => this.getTodoList()) 
    // }

    render () {
    return(
        <div className="App">
            <header> 
                <form onSubmit={this.addItem} >    
                    <input 
                        type="text"
                        placeholder="What u need to do?"
                        value={this.state.currentItem.text}
                        onChange={this.handleInput}
                    />
                    <button>Add item </button>

                    {this.state.todoList.map(item => 
                        <ListItem
                            key={item.id}
                            value={item.text}
                            isChecked={false}
                            
                            setUpdate={()=> this.setUpdate(item.target.value, item.id)} 
                            checkDone={() => this.checkDone(item)}
                            deleteItem={() => this.deleteItem(item.id)} 
                        />)
                    }
                    </form>
            </header>
        </div>
    )
    }
}   

export default ListBody