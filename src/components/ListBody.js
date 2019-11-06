import React from 'react'
import ListItems from './ListItems'

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
        fetch(`http://localhost:3001/todoList`, {
          method: 'POST',
          body: JSON.stringify(this.state.currentItem),
          headers: {
            'Content-Type': 'application/json' //för den ska fatta det är json server 
          }
        })
        .then(() => this.getTodoList());
    }

    setUpdate(thetext, theid){
        const updateList = this.state.todoList
        updateList.map(item => {
            if(item.id === theid) {
                item.text = thetext
            } 
            console.log(theid);
        })
        this.setState({todoList: updateList}) 
    }

    // checkDone(event){
    //     const checkList = this.state.todoList.map(item => {
    //         if(item.id === event.id){
    //             item.isChecked = !item.isChecked 
    //     }
    //     return item
    //     })
    //     this.setState({todoList: checkList})
    // }

    checkDone(event){
        fetch(`http://localhost:3001/todoList/${id}`, {
          method: 'PATCH', 
          headers: {
            'Content-Type': 'application/json' //för den ska fatta det är json server 
          }, 
          body: JSON.stringify({isChecked})
        })
          .then(() => this.getTodoList());

        // const checkList = this.state.todoList.map(item => {
        //     if(item.id === event.id){
        //         item.isChecked = !item.isChecked 
        // }
        // return item
        // })
        // this.setState({todoList: checkList})
    }
      
    // radera ett item 
    deleteItem(id) {
        fetch(`http://localhost:3001/todoList/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json' //för den ska fatta det är json server 
          }
        })
          .then(() => this.getTodoList());
      }
      
    render () {
    return(
        <div className="App">
            <header> 
                <form onSubmit={this.addItem} >    
                    {/* <input type="checkbox"/>  */}
                    <input 
                        type="text"
                        placeholder="What u need to do?"
                        value={this.state.currentItem.text}
                        onChange={this.handleInput}
                    />
                    <button>Add item </button>
                    <ListItems 
                        todoList={this.state.todoList}
                        setUpdate={this.setUpdate} 
                        checkDone={this.checkDone}
                        deleteItem={this.deleteItem} 
                    />
                    </form>
            </header>
        </div>
    )
    }
}   

export default ListBody