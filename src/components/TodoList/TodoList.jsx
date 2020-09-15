import React from 'react'
import styles from './TodoList.module.css'


class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoItems: [
                {id: 1, text: 'buy milk', isActive: false},
                {id: 2, text: 'clean room', isActive: false},
                {id: 3, text: 'read documentation', isActive: false},
                {id: 4, text: 'Fly me to the moon👩🏿‍🚀', isActive: false}
            ],
            textareaValue: ''       
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

    onAddNewItem () {
        if (this.state.textareaValue) {
            this.setState({
                todoItems: [{
                        id: this.state.todoItems.length + 1,
                        text: this.state.textareaValue,
                        isActive: false
                    }, ...this.state.todoItems],
                textareaValue: ''
    
            })
        } else {
            alert('Enter something to textarea')
        }
        
    }

    onDeleteItem (id) {
        this.setState({
            todoItems: this.state.todoItems.filter(i => i.id !== id)
        })
    }

    render() {
        return <div className={styles.mainBlock}>
            <h1>It would be an unusual TODO List :)</h1>
            <textarea cols='50' className={styles.textarea} type='text' value={this.state.textareaValue} onChange={this.onTextareaChange}></textarea>
            <button className={styles.addNewButton} onClick={this.onAddNewItem}>Add new</button>
            <ul>
                {this.state.todoItems.map((item) => <ListItem deleteItem={this.onDeleteItem} key={`${item.text}${item.id}`} text={item.text} id={item.id} />)}
            </ul>
        </div>
    }
}


const ListItem = (props) => {
    return (
        <li className={styles.listItem}>
            <p>{props.text}</p>
            <button onClick={() => props.deleteItem(props.id)}>delete</button>
        </li>
    )
}

export default TodoList;