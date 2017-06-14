import React from 'react';
import styles from './index.css'

class ItemEditor extends React.Component{
	render() {
		const {onSave, onCancel} = this.props;
		const item = this.props.item || {
			title: '',
			content: ''
		};
		let saveText = item.id?'save':'create';

		let save = ()=>{
		item.title=this.refs.title.value;
		item.content=this.refs.content.value;
			onSave(item);
		}
		return(
		<div>
			<div className={styles['button-container']}>
				<button className={styles.button} onClick={save}>{saveText}</button>
				<button className={styles.button} onClick={onCancel}>cancel</button>
			</div>
			<div>
				<input className={styles.title} ref='title' defaultValue={item.title} placeholder='input title' type="text"/><br />
				<textarea className={styles.content} ref='content' defaultValue={item.content} placeholder="input article" />
			</div>
		</div>)
	}
}

export default ItemEditor;