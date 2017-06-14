import React from 'react';
import styles from './Deskmark.css';
import List from '../List/index';
//import CreateBar from '../CreateBar';
import ItemEditor from '../ItemEditor';
import ItemShowLayer from '../ItemShowLayer';
import uuid from 'uuid';

const itemsInitial = [
	{
		
		"id": "1",
		"title": "hello0",
		"content": "hello world0",
		"time": "2017/5/6"
	
	},
	{
		"id": "2",
		"title": "hello1",
		"content": "hello world1",
		"time": "2017/5/6"
	},
	{
		"id": "3",
		"title": "hello2",
		"content": "hello world2",
		"time": "2017/5/6"
	}];
class Deskmark extends React.Component{
	constructor(props){
		super(props);
		this.state={
			items:itemsInitial,
			selectedId: null,
			editing: false
		};
		this.saveItem = this.saveItem.bind(this);
		this.selectItem = this.selectItem.bind(this);
		this.createItem = this.createItem.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.editItem = this.editItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}
	saveItem(item){
		let items = this.state.items;
		if(!item.id)item.id = uuid.v4();
		let now = new Date();
		item.time = now.getMonth()+'/'+now.getDate()+' '+now.getHours()+':'+now.getMinutes();
		items = [...items,item];
		this.setState({
			items: items
		})
	}
	selectItem(id){
		if(id===this.state.selectedId){
			return
		}
		this.setState({
			selectedId: id,
			editing: false
		})
	}
	createItem(){
		this.setState({
			selectedId:null,
			editing: true
		})
	}
	cancelEdit(){
		this.setState({
			editing: false
		})
	}
	editItem(id){
		this.setState({
			selectedId: id,
			editing: true
		})
	}
	deleteItem(id){
		let items = this.state.items;
		let index = items.findIndex(item=>item.id==id);
		items.splice(index,1);
		this.setState({
			items: items
		})
	}
	render(){		
	let {items, selectedId, editing}=this.state;
	let selected = selectedId && items.find(item=>item.id ===selectedId);
	let mainPart = editing? <ItemEditor item={selected} onSave={this.saveItem} onCancel={this.cancelEdit} />
	:<ItemShowLayer item={selected} onEdit={this.editItem} onDelete={this.deleteItem} />
	return(		
		<section className={styles['top-layer']}>
				<div className={styles['left-bar']}>
					<button className={styles['create-button']} onClick={this.createItem}>create</button>
					<List selectedId={this.state.selectedId} items={this.state.items} onSelect={this.selectItem}/>
				</div>
				<div className={styles['right-bar']}>
					{mainPart}
				</div>					
		</section>
		)
	
} 
}

export default Deskmark;