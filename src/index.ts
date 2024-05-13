export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		if (request.headers.get("Upgrade") !== "websocket") {
			return new Response("missing websocket upgrade header", { status: 400 });
		}
		const { 0: client, 1: server } = new WebSocketPair();
		server.accept();
		server.addEventListener('close', async event => console.log(event));
		server.addEventListener("message",  async ({ data }) => {server.send(data)});
		return new Response(null, { webSocket: client, status: 101 });
	},
};
