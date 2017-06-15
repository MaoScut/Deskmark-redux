import React from 'react';
import styles from './Deskmark.css';
import List from '../List/index';
//import CreateBar from '../CreateBar';
import ItemEditor from '../ItemEditor';
import ItemShowLayer from '../ItemShowLayer';
import uuid from 'uuid';

class Deskmark extends React.Component{
	// constructor(props){
	// 	super(props);
	// 	this.state={
	// 		items:itemsInitial,
	// 		selectedId: null,
	// 		editing: false
	// 	};
	// 	this.saveItem = this.saveItem.bind(this);
	// 	this.selectItem = this.selectItem.bind(this);
	// 	this.createItem = this.createItem.bind(this);
	// 	this.cancelEdit = this.cancelEdit.bind(this);
	// 	this.editItem = this.editItem.bind(this);
	// 	this.deleteItem = this.deleteItem.bind(this);
	// }
	// saveItem(item){
	// 	let items = this.state.items;
	// 	if(!item.id)item.id = uuid.v4();
	// 	let now = new Date();
	// 	item.time = now.getMonth()+'/'+now.getDate()+' '+now.getHours()+':'+now.getMinutes();
	// 	items = [...items,item];
	// 	this.setState({
	// 		items: items
	// 	})
	// }
	// selectItem(id){
	// 	if(id===this.state.selectedId){
	// 		return
	// 	}
	// 	this.setState({
	// 		selectedId: id,
	// 		editing: false
	// 	})
	// }
	// createItem(){
	// 	this.setState({
	// 		selectedId:null,
	// 		editing: true
	// 	})
	// }
	// cancelEdit(){
	// 	this.setState({
	// 		editing: false
	// 	})
	// }
	// editItem(id){
	// 	this.setState({
	// 		selectedId: id,
	// 		editing: true
	// 	})
	// }
	// deleteItem(id){
	// 	let items = this.state.items;
	// 	let index = items.findIndex(item=>item.id==id);
	// 	items.splice(index,1);
	// 	this.setState({
	// 		items: items
	// 	})
	// }
	componentDidMount() {
		this.props.actions.fetchEntryList();
	}
	render() {		
	//let {items, selectedId, editing}=this.state;
	//let selected = selectedId && items.find(item=>item.id ===selectedId);
	let { state, actions } = this.props;
	let { isEditing, selectedId } = state.editor;
	let items = state.items;
	let item = items.find(({ id }) => id === selectedId);

	// let mainPart = editing? <ItemEditor item={selected} onSave={this.saveItem} onCancel={this.cancelEdit} />
	// :<ItemShowLayer item={selected} onEdit={this.editItem} onDelete={this.deleteItem} />
	let mainPart = isEditing ? <ItemEditor item={item} onSave={actions.saveEntry} onCancel={actions.cancelEdit} />
		: <ItemShowLayer item={item} onEdit={actions.editEntry} onDelete={actions.deleteEntry} />
	return(		
		<section className={styles['top-layer']}>
				<div className={styles['left-bar']}>
					<button className={styles['create-button']} onClick={actions.createNewEntry}>create???</button>
					<List selectedId={selectedId} items={items} onSelect={actions.selectEntry} />
				</div>
				<div className={styles['right-bar']}>
					{mainPart}
				</div>					
		</section>
		)
	
} 
}

export default Deskmark;