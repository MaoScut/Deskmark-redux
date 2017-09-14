import React from 'react';
import styles from './Deskmark.css';
import List from '../List/index';
import ItemEditor from '../ItemEditor';
import ItemShowLayer from '../ItemShowLayer';
import uuid from 'uuid';

/**
 * [Deskmark description]
 * @param {object} state data for the children component
 * @param {object} actions change state
 */
class Deskmark extends React.Component {
	componentDidMount() {
		// although the state change, we never see setState was called, why this component change?
		// throught connect, setState was subscribed state change, so it will be call automatically
		this.props.actions.fetchEntryList();
	}
	render() {
		let { state, actions } = this.props;
		let { isEditing, selectedId } = state.editor;
		let items = state.items;
		let item = items.find(({ id }) => id === selectedId);

		// decide what to show according to isEditing
		let mainPart = isEditing ? <ItemEditor item={item} onSave={actions.saveEntry} onCancel={actions.cancelEdit} />
			: <ItemShowLayer item={item} onEdit={actions.editEntry} onDelete={actions.deleteEntry} />
		return (
			<section className={styles['top-layer']}>
				<div className={styles['right-bar']}>
					{mainPart}
				</div>
				<div className={styles['left-bar']}>
					<List selectedId={selectedId} items={items} onSelect={actions.selectEntry} />
					<button className={styles['create-button']} onClick={actions.createNewEntry}>create</button>
				</div>
			</section>
		)
	}
}

export default Deskmark;