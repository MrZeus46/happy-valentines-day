const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["images/bg-1.png","images/yayyyy.png","robots.txt","sounds/success.mp3"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".mp3":"audio/mpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.DXyRhoPx.js",app:"_app/immutable/entry/app.Da8FJ_2K.js",imports:["_app/immutable/entry/start.DXyRhoPx.js","_app/immutable/chunks/CVcMrlwG.js","_app/immutable/chunks/Dr-ZiH64.js","_app/immutable/chunks/BdSQOy3g.js","_app/immutable/entry/app.Da8FJ_2K.js","_app/immutable/chunks/Dr-ZiH64.js","_app/immutable/chunks/BWpjLrSS.js","_app/immutable/chunks/BcV2ey9D.js","_app/immutable/chunks/BdSQOy3g.js","_app/immutable/chunks/Q4QZ85b4.js","_app/immutable/chunks/CbvhzuuQ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-B7JUMF-_.js')),
			__memo(() => import('./chunks/1-CTPSIObA.js')),
			__memo(() => import('./chunks/2-BWaqvoaK.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
