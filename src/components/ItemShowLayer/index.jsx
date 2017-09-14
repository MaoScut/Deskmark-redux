import marked from 'marked';
import React from 'react';
import styles from './index.css';

/**
 * ItemShowLayer show article and delete button
 * @param object item article
 * @param function onEdit show ItemEditor
 * @param function onDelete delete this item
 */
function ItemShowLayer({ item, onEdit, onDelete }) {
	if (!item || !item.id) {
		return (
			<div>
				<div>please select an artical from left sidlebar</div>
			</div>)
	}
	let content = marked(item.content);
	return (
		<div className={styles['show-container']}>
			<div className={styles['show-frame']}>
				<div className={styles['title']} >{item.title}</div>
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</div>
			<div className={styles['button-container']}>
				<button className={styles.button} onClick={() => onDelete(item.id)}>delete</button>
				<button className={styles.button} onClick={() => onEdit(item.id)}>edit</button>
			</div>
		</div>
	)
}

export default ItemShowLayer;