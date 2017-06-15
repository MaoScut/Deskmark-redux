import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../actions';
import Deskmark from './Deskmark/Deskmark';


export default connect(
	state => ({ state }),
	dispatch => ({
		actions: bindActionCreators(actionCreators, dispatch),
	}) 
)(Deskmark);
