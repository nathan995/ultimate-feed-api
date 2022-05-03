import { Ack, MessageBroker, MessageHandler } from './message-broker';
export class Completer<T> {
    public readonly promise: Promise<T>;
    public complete!: (value: PromiseLike<T> | T) => void;
    private reject!: (reason?: any) => void;

    public constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.complete = resolve;
            this.reject = reject;
        });
    }
}

export class JsonMessageBroker extends MessageBroker {
    static instance: JsonMessageBroker;
    static request: Completer<JsonMessageBroker>;

    static async getInstance(): Promise<JsonMessageBroker> {
        if (!JsonMessageBroker.instance) {
            const broker = new JsonMessageBroker();
            if (!this.request) {
                this.request = new Completer<JsonMessageBroker>();
                broker.init().then(async () => {
                    JsonMessageBroker.instance = broker;
                    this.request.complete(broker);
                });
            }

            return this.request.promise;
        }
        return JsonMessageBroker.instance;
    }

    serialize(data: any) {
        return Buffer.from(JSON.stringify(data));
    }

    deserialize(handler: MessageHandler) {
        const wrapped = async (data: any, ack: Ack) => {
            return handler(JSON.parse(data.content.toString()), ack);
        };
        return wrapped;
    }

    async send(queue: string, msg: any) {
        return super.send(queue, this.serialize(msg));
    }
    async subscribe(queue: string, handler: MessageHandler) {
        return super.subscribe(queue, this.deserialize(handler));
    }
}
