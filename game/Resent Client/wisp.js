const ERROR_MESSAGE = '\u00A7cWisp Proxy is not enabled!'

class WispWebSocket extends EventTarget {
  readyState;
	constructor() {
		super();
		this.readyState = WebSocket.CLOSED;
		setTimeout(() => {
			this.dispatchEvent(new Event('open'));
		});
	}
	send(chunk) {
		if (typeof chunk === 'string' && chunk.trim().toLowerCase().replaceAll(' ', '') === 'accept:motd') {
			this.dispatchEvent(
				new MessageEvent("message", {
					data: JSON.stringify({
						name: '',
						brand: '',
						vers: '',
						cracked: true,
						time: Date.now(),
						uuid: '',
						type: 'motd',
						data: {
							cache: true,
							icon: false,
							online: 0,
							max: -1,
							motd: [ERROR_MESSAGE],
							players: [],
						},
					}),
				})
			);
    } else {
			const enc = new TextEncoder().encode(ERROR_MESSAGE);
			const eag = Uint8Array.from([0xff, 0x08, enc.length, ...enc]);
			this.dispatchEvent(new MessageEvent('message', { data: eag }));
			this.dispatchEvent(new CloseEvent('close'));
    }
  }
  close() {}
}

window.WebSocket = new Proxy(window.WebSocket, {
  construct (a, [b, c]) {
    if (b.includes('java://')) {
      return new WispWebSocket();
    } else {
      return new a(b, c);
    }
  }
});