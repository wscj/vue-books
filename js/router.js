const router = new VueRouter({
	routes: [{
		path: '/',
		component: cmpBookList
	}, {
		path: '/books',
		component: cmpBook
	}, {
		path: '/link',
		component: { template: '<div>Link page</div>' }
	}]
})