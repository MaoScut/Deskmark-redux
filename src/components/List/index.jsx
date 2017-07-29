import React from 'react';
import styles from './index.css'

/**
 * List show article title list
 * @param {array} items all articles object
 * @param {function}	onSelect show ItemShowLayer
 * @param {string} selectedId the selected article's id
 */
function List ({items, onSelect, selectedId}) {
	items = items.map(item=>(<ListItem isSelected={item.id==selectedId?true:false} onSelect={onSelect} item={item} key={item.id} />));
	return (
		<div className={styles['list']}>
			{items}
		</div>
		)
}

/**
 * ListItem single item of List
 * @param {obj} item include title and content
 * @param {function} onSelect show ItemShowLayer
 * @param {bool} whether this item is selected or not
 */
function ListItem({item, onSelect, isSelected}){
	let itemStyle = isSelected? styles["list-group-item"]+' '+styles["list-group-item-selected"]:styles["list-group-item"];
	return (
	<li onClick={()=>onSelect(item.id)} href="#" className={itemStyle}>		
		{item.title}
		<span className={styles["right"]}>
			{item.time}
		</span>
	</li>
		)
}
export default List;