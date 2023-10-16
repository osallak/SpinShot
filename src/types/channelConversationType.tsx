interface userInformation {
	avatar: string;
	id: string;
	username: string;
}

interface allMessages {
	message: string;
	sentAt: string;
	user: userInformation;
}

interface messages {
	messages: allMessages[];
}

export default interface channelConversationType {
  // blockedUsers: blockedUsers[],
  messages: messages[];
}
