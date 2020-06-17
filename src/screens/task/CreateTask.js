import React, { Component } from 'react';
import {
	Text,
	View,
	Dimensions,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight,
} from 'react-native';
import uuidv1 from "uuid/v1";
import PushNotification from 'react-native-push-notification';
import WrappedTextInput from './components/WrappedTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Datetimemodal from './components/datetimemodal';
import { addTaskInDatabase } from '../../database/addItem';
import { addTaskInRedux, updateTaskInRedux, undoType } from '../../actions/taskActions';
import { updateTaskInDatabase } from '../../database/updateItem'
import { whichday, monthNames } from '../../constants/Calender';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);
const paddingE = Math.round(SCREEN_WIDTH * 0.05);

class Createtask extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: () => (
			<Text
				style={{
					fontSize: upadding * 1.5,
					color: '#8D8D8C',
					fontWeight: 'bold',
				}}>
				{`${
					navigation.getParam('update', false) ? 'UPDATE TASK' : 'CREATE TASK'
					}`}
			</Text>
		),
		headerRight: () => (
			<View style={{ flexDirection: 'row', marginRight: upadding }}>
				{navigation.getParam('update', false) ? (
					<TouchableOpacity
						onPress={navigation.getParam('deleting')}
						style={{ marginRight: upadding }}>
						<MaterialIcons name="delete" size={upadding * 2} color="#2B65EC" />
					</TouchableOpacity>
				) : (
						<View />
					)}
			</View>
		),
		headerTintColor: '#8D8D8C',
	});

	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.focustextinput = true;
		this.deletepress = false;
		const items = navigation.getParam('items', {});
		this.state = {
			task_title: items.task_title || '',
			items,
			task_description: items.task_description || '',
			taskid: items.taskid || '',
			task_deadline: items.task_deadline || 'Add Task Deadline For Completion',
			task_notificationid: items.task_notificationid || 0,
			taskid_backend: items.taskid_backend || '',
			task_reminder: items.task_reminder || 'Add Task Reminder For Completion',
			update: navigation.getParam('update', false),
			opacity: 0,
			visibledatetimeModal: 0,
			visibleremindermodal: 0,
			date_modal_opacity: 1,
			reminder_modal_opacity: 1,
		};
	}

	componentDidMount() {
		this.props.navigation.setParams({
			deleting: this.onPressdelete.bind(this),
		});
	}

	shouldComponentUpdate(nextProps) {
		if (
			this.focustextinput === true &&
			nextProps.navigation.getParam('update', false) === false
		) {
			this.focustextinput = false;
			return true;
		}
		return true;
	}

	onDayPress = day => {
		this.setState({
			selectedDate: day.dateString,
		});
	};
	ondate = value => {
		if (this.state.task_title.length === 0) {
		} else {
			this.setState({ visibledatetimeModal: value });
		}
	};

	visibleReminderModal = value => {
		this.setState({ visibleremindermodal: value });
	};
	setOpacity = value => {
		this.setState({ date_modal_opacity: value });
	};

	setReminderModalOpacity = value => {
		this.setState({ reminder_modal_opacity: value });
	};

	onPressdelete() {
		const { navigation } = this.props;
		const { Searchtask } = navigation.state.params;
		if (Searchtask) {
			const { settaskSearch } = navigation.state.params;
			settaskSearch(false);
		}
		// else {
		// 	const {
		// 		deleteid,
		// 		changeflip,
		// 		Deletetaskcountnumber,
		// 	} = navigation.state.params;
		// 	const index = deleteid.findIndex(obj => {
		// 		return obj.taskid === this.props.taskid;
		// 	});
		// 	if (index > -1) {
		// 		deleteid.splice(index, 1);
		// 		if (deleteid.length === 0) {
		// 			changeflip(0);
		// 			return;
		// 		}
		// 		else {
		// 			Deletetaskcountnumber(deleteid.length);
		// 		}
		// 	}
		// }
		const {
			callUndo
		} = navigation.state.params;
		this.deletepress = true;
		this.props.undoType(
			[
				{
					taskid: this.state.taskid
				},
			],
			'Deleted',
		);
		navigation.navigate('task');
		callUndo(
			[
				{
					taskid: this.state.taskid
				},
			],
			'delete',
		);
		return;
	}

	onChangeDeadline = (dates, time, visibledatetimeModal, notificationid) => {
		const date = new Date(dates);
		const day = whichday[date.getDay()];
		const month = monthNames[date.getMonth()];
		const year = date.getFullYear();
		if (time !== 'Select Deadline Time') {
			if (year > new Date().getFullYear()) {
				var deadline = `${day}, ${date.getDate()} ${month}, ${date.getFullYear()}, ${time}`;
			} else {
				var deadline = `${day}, ${date.getDate()} ${month}, ${time}`;
			}
		} else {
			if (year > new Date().getFullYear()) {
				var deadline = `${day}, ${date.getDate()} ${month}, ${date.getFullYear()}`;
			} else {
				var deadline = `${day}, ${date.getDate()} ${month}`;
			}
		}
		this.setState({ visibledatetimeModal });
		if (this.state.task_notificationid !== 0) {
			this.cancelNotification(
				this.state.task_notificationid,
				notificationid,
				deadline,
			);
		} else {
			this.setState({
				task_notificationid: notificationid,
				task_deadline: deadline,
			});
		}
	};

	cancelNotification = (
		localNotificationId,
		notificationid = 0,
		deadline = 'Add Task Deadline For Completion',
	) => {
		PushNotification.cancelLocalNotifications({ id: localNotificationId });
		this.setState({
			task_notificationid: notificationid,
			task_deadline: deadline,
		});
	};

	componentWillUnmount() {
		if (!this.deletepress) {
			const { navigation } = this.props;
			if (navigation.getParam('Searchtask', false)) {
				const a = navigation.getParam('settaskSearch');
				a(false);
			}
			const uuid = uuidv1();
			const data = {};
			const {
				task_title,
				task_description,
				task_deadline,
				task_reminder,
				task_notificationid,
			} = this.state;
			data['title'] = task_title;
			data['description'] = task_description;
			data['deadline'] = task_deadline;
			data['reminder'] = task_reminder;
			data['notificationid'] = task_notificationid;
			data['updatedAt'] = (new Date()).toString();
			data['date'] = (new Date()).toString();
			data['workid'] = this.props.workid;
			data['workid_backend'] = this.props.workid_backend;

			if (this.state.update) {
				const items = this.state.items;
				const {
					task_title: title,
					task_description: description,
					task_notificationid: notificationid,
				} = items;

				if (
					data.title !== title ||
					data.description !== description ||
					data.notificationid !== notificationid
				) {
					data['taskid'] = items.taskid;
					updateTaskInDatabase(data);
					this.props.updateTaskInRedux({ task_deadline, task_description, task_notificationid, task_reminder, task_title, taskid:this.state.taskid, workid: data.workid, workid_backend: data.workid_backend, taskid_backend: this.state.taskid_backend,task_createdAt:items.task_createdAt });
				}
			} else {
				if (
					this.state.task_title.length > 0 ||
					this.state.task_description.length > 0
				) {

					data['taskid'] = uuid;
					addTaskInDatabase(data);
					this.props.addTaskInRedux({ task_deadline, task_description, task_notificationid, task_reminder, task_title, taskid: uuid, workid: data.workid, workid_backend: data.workid_backend, taskid_backend: '', task_createdAt: (new Date()).toString()});
				}
			}
		} else {
		}
	}

	render() {
		const {
			task_description,
			task_title,
			task_deadline,
			task_notificationid,
		} = this.state;
		return (
			<View style={styles.container}>
				<ScrollView style={styles.ScrollView}>
					<View>
						<Text style={styles.titleStyle}>
							{this.props.work_title.toUpperCase()}
						</Text>
					</View>

					<KeyboardAwareScrollView>
						<WrappedTextInput
							placeholder={'Add Task'}
							value={task_title}
							onChangeText={title => {
								this.setState({ task_title: title });
							}}
							iconTitle={'title'}
							autoCorrect={false}
							autoFocus={true}
							ref={() => {}}
						/>
						<WrappedTextInput
							placeholder={'Add Description'}
							value={task_description}
							onChangeText={description => {
								this.setState({ task_description: description });
							}}
							iconTitle={'description'}
							autoCorrect={false}
							autoFocus={false}
							ref={() => { }}
						/>
					</KeyboardAwareScrollView>
					<TouchableHighlight
						onPress={() => {
							this.ondate(1);
						}}
						underlayColor={'#8D8D8C0F'}
						style={styles.touchablehighlightstyle}>
						<View style={styles.remindercontainer}>
							<View style={styles.firstrcontainer}>

								<MaterialIcons
									name="alarm"
									size={upadding * 1.5}
									color="black"
								/>
							</View>
							<View
								style={[
									styles.secondrcontainer,
									{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'flex-start',
									},
								]}>
								<Text style={styles.deadlineText}>{task_deadline}</Text>
								{task_notificationid !== 0 ? (
									<TouchableHighlight
										onPress={() => {
											this.cancelNotification(task_notificationid);
										}}
										style={{ flex: 2 }}
										underlayColor={null}>
										<MaterialIcons
											name="clear"
											size={paddingE}
											color="#8D8D8C"
										/>
									</TouchableHighlight>
								) : (
										<View />
									)}
							</View>
						</View>
					</TouchableHighlight>
					<View style={{ height: upadding * 4 }} />
				</ScrollView>
				<Modal
					isVisible={this.state.visibledatetimeModal === 1}
					useNativeDriver>
					<Datetimemodal
						onDate={this.ondate}
						setOpacity={this.setOpacity}
						onChangeDeadline={this.onChangeDeadline}
						visibleReminderModal={this.visibleReminderModal}
						title={task_title}
						description={task_description}
					/>
				</Modal>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		sortBy: state.task.data.sortBy,
		completed: state.task.data.completed,
		work_title: state.worklist.state.selectedwork.work_title,
		workid: state.worklist.state.selectedwork.workid,
		workid_backend: state.worklist.state.selectedwork.workid_backend,
	};
};

export default connect(
	mapStateToProps,
	{
		undoType,
		addTaskInRedux,
		updateTaskInRedux,
	},
)(Createtask);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	ScrollView: {
		flex: 1,
		paddingLeft: upadding * 2,
		paddingBottom: upadding * 4,
		paddingTop: upadding,
	},
	titleStyle: {
		fontSize: upadding * 1.3,
		fontWeight: '600',
		marginBottom: upadding,
	},
	textInput: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginRight: upadding * 2,
	},
	textInputBox: {
		flex: 9,
		fontSize: upadding * 1.1,
		color: '#8D8D8C',
	},
	deadlineText: {
		color: '#8D8D8C',
		flex: 18,
		fontSize: upadding * 1.2,
		fontWeight: 'bold',
	},
	touchablehighlightstyle: {
		height: upadding * 3,
		marginBottom: upadding,
		justifyContent: 'center',
		borderRadius: 3,
		marginRight: upadding * 2,
	},
	remindercontainer: {
		flex: 1,
		flexDirection: 'row',
		height: upadding * 2,
	},
	firstrcontainer: {
		flex: 1,
		justifyContent: 'center',
	},
	secondrcontainer: {
		flex: 9,
		backgroundColor: '#2B65EC0F',
		borderRadius: 3,
		justifyContent: 'center',
		paddingLeft: upadding,
	},
});
