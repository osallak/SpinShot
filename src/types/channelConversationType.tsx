interface userInformation {
	avatar: string;
	id: string;
	username: string;
}

export default interface messagesType {
	message: string;
	sentAt: string;
	user: userInformation;
}
