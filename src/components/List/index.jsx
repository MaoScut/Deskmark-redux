import React from 'react';
import styles from './index.css'

function List ({items, onSelect, selectedId}) {
	items = items.map(item=>(<ListItem isSelected={item.id==selectedId?true:false} onSelect={onSelect} item={item} key={item.id} />));
	return (
		<div className={styles['list']}>
			{items}
		</div>
		)
}

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