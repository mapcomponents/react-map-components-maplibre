import Notification from '../../ui_components/Notification';
import { useNotifications } from '../../contexts/NotificationsContext';

const Notifications = () => {
	const { notifications, removeNotification } = useNotifications();

	return (
		<div>
			{notifications.map((notification) => (
				<Notification
					key={notification.name}
					severity={notification.severity}
					message={notification.message}
					showSpinner={notification.showSpinner}
					onClose={() => removeNotification(notification.name)}
				/>
			))}
		</div>
	);
};

export default Notifications;
