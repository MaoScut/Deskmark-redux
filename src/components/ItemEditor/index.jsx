import React from 'react';
import styles from './index.css'

/**
 * ItemEditor update or create an article
 * @param {function} onSave save article
 * @param {function} onCancle cancel edit and than hide
 */
class ItemEditor extends React.Component{
	render() {
		const {onSave, onCancel} = this.props;
		const item = this.props.item || {
			title: '',
			content: ''
		};
		let saveText = item.id ? 'save' : 'create';

		let save = ()=>{
		// use es7 to spread an object, override same keys' value
			onSave({
				...item,
				title: this.refs.title.value,
				content: this.refs.content.value,
			});
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