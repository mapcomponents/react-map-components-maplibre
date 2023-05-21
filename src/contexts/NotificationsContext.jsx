import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);

	const removeNotification = useCallback((name) => {
		setNotifications((prevNotifications) =>
			prevNotifications.filter((notification) => notification.name !== name)
		);
	}, []);

	const addNotification = useCallback(
		(notification) => {
			setNotifications((prevNotifications) => {
				const existingNotification = prevNotifications.find(
					(notif) => notif.name === notification.name
				);

				if (existingNotification) {
					// Replace existing notification with the new one
					return prevNotifications.map((notif) =>
						notif.name === notification.name ? { ...notification } : notif
					);
				} else {
					// Add the new notification
					return [...prevNotifications, { ...notification }];
				}
			});

			if (notification.timeout) {
				setTimeout(() => {
					removeNotification(notification.name);
				}, notification.timeout);
			}
		},
		[removeNotification]
	);

	const value = {
		notifications,
		addNotification,
		removeNotification,
	};

	return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export const useNotifications = () => useContext(NotificationsContext);
