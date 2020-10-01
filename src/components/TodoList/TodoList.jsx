import React from 'react'
import styles from './TodoList.module.css'
import { Transition } from 'react-transition-group'
import withAnimation from '../../hoc/withAnimation'

let Data = [
    {id: 0, text: 'buy milk', isDone: false},
    {id: 1, text: 'clean room', isDone: false},
    {id: 2, text: 'read documentation', isDone: false},
    {id: 3, text: 'Fly me to the moon👩🏿‍🚀', isDone: false}
]

const ListItem = (props) => {
    return (
        <li className={styles.listItem}>
            <p className={props.isDone && styles.line}>{props.text}</p>
            <div>
                <button className={styles.doneButton} onClick={() => props.doneItem(props.id)}>done</button>
                <button className={styles.deleteButton} onClick={() => props.deleteItem(props.id)}>delete</button>    
            </div>
        </li>
    )
}



class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoItems: Data,
            textareaValue: '',
            lastId: Data.length + 1        
        };

        this.onTextareaChange = this.onTextareaChange.bind(this);
        this.onAddNewItem = this.onAddNewItem.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
    }

    onTextareaChange(e) {
        this.setState({
            textareaValue: e.target.value 
        });
    }

    onAddNewItem() {
        if (this.state.textareaValue) {
            this.setState({
                todoItems: [{
                        id: this.state.lastId,
                        text: this.state.textareaValue,
                        isActive: false
                    }, ...this.state.todoItems],
                textareaValue: '',
                lastId: this.state.lastId + 1,
            })
            
        } else {
            alert('Enter something to textarea')
        }
        
    }

    onDeleteItem(id) {
        this.setState({
            todoItems: this.state.todoItems.filter(i => i.id !== id),
            shouldBeAnimated: false
        })
    }

    onDoneItem = (id) => {
        let newArray = [...this.state.todoItems]
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].id === id) {
                newArray[i].isDone = !newArray[i].isDone
                console.log(newArray[i])
            }
        }
        //let newItem = newArray.filter(i => i.id === id)
        //newItem.isDone = true;
        this.setState({
            todoItems: [...newArray]
        })
    }

    render() {
        return <div className={styles.mainBlock}>
            <h1>It would be an another regular TODO List :)</h1>
            <input cols='50' className={styles.textarea} type='text' value={this.state.textareaValue} onChange={this.onTextareaChange} />
            <button className={styles.addNewButton} onClick={this.onAddNewItem}>Add new</button>
            <ul>
                {this.state.todoItems.map((item) => <ListItem isDone={item.isDone} doneItem={this.onDoneItem} deleteItem={this.onDeleteItem} key={`${item.text}${item.id}`} text={item.text} id={item.id} />)}
            </ul>
        </div>
    }
}



export default TodoList;