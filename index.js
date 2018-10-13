const adminmock = require('./mocks/adminmock.json');
const fkitmock = require('./mocks/fkitmock.json');
const defaultmock = require('./mocks/defaultmock.json');

const { send } = require('micro');

const mocks = {
	fkitsmurf: fkitmock,
	adminsmurf: adminmock,
	smurf: defaultmock
};

const tokenResponse = {
	access_token: 'i am access token'
};

const getSelfMock = () => {
	const id = process.env.MOCK + 'smurf';
	return mocks[id] || defaultmock
}

const getSpecificMock = (pathname) => {
	const [_, _users, id] = pathname.replace('.json', '').split('/');

	if (id === undefined) {
		return Object.values(mocks);
	} else {
		return mocks[id] || defaultmock;
	}
}

const redirect = (res, url) => {
	res.setHeader('Location', url);
	return send(res, 302, null);
}

module.exports = (req, res) => {
	const url = new URL(req.url, 'http://localhost');

	console.log(req.url);

	if (url.pathname === '/oauth/authorize') {
		const params = url.searchParams;
		const [redirect_uri, state] = [params.get('redirect_uri'), params.get('state')];
		const location = redirect_uri + '?state=' + state;

		return redirect(res, location);
	} else if (url.pathname === '/oauth/token') {
		return tokenResponse;
	} else if (url.pathname === '/logout') {
		const params = url.searchParams;
		const return_to = params.get('return_to');

		return redirect(res, return_to);
	} else if (url.pathname === '/me.json') {
		return getSelfMock();
	} else if (url.pathname.indexOf('/users') !== -1) {
		return getSpecificMock(url.pathname);
	} else {
		console.log('fallthrough:', req.url);
		return defaultmock;
	}
}
