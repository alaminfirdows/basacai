module.exports = {
	port: process.env.PORT,
	local_client_app: process.env.URL,
	remote_client_app: process.env.REMOTE_CLIENT_APP,
	allowedDomains:
		process.env.NODE_ENV === 'production'
			? [process.env.REMOTE_CLIENT_APP, process.env.REMOTE_SERVER_API]
			: [process.env.URL, process.env.LOCAL_SERVER_API],
};
