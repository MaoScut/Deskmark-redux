import marked from 'marked';
import React from 'react';
import styles from './index.css';

function ItemShowLayer({item, onEdit, onDelete}){
	if(!item||!item.id){
		return(
			<div>
				<div>please select an artical from left sidlebar</div>
			</div>)
	}
	let content = marked(item.content);
	return (
		<div>
			<div className={styles['button-container']}>
				<button className={styles.button} onClick={()=>onEdit(item.id)}>edit</button>
				<button className={styles.button} onClick={()=>onDelete(item.id)}>delete</button>
			</div>
			<div className={styles['show-container']}>
			<h2 className={styles['title']} >{item.title}</h2>
			
				<div dangerouslySetInnerHTML={{__html: content}} />
			</div>
		</div>
		)
}

export default ItemShowLayer;