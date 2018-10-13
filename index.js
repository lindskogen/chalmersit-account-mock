const adminmock = require('./mocks/adminmock.json');
const fkitmock = require('./mocks/fkitmock.json');
const defaultmock = require('./mocks/defaultmock.json');


const getSelfMock = () => {
	const mock = process.env.MOCK;

	if (mock === 'admin')  {
		return adminmock;
	} else if (mock === 'fkit') {
		return fkitmock;
	} else {
		return defaultmock;
	}
}

module.exports = (req) => {
	if (req.url === '/me.json') {
		return getSelfMock();
	} else {
		return defaultmock;
	}
}
