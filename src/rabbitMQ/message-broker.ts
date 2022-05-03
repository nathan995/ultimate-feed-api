import * as amqplib from 'amqplib';
import * as _ from 'lodash';
export declare type MessageHandler = (msg: any, ack: Ack) => void;
export declare type Ack = () => void;
// /
//  * Broker for async messaging
//  */
export abstract class MessageBroker {
    queues: any;
    connection?: amqplib.Connection;
    _channel?: amqplib.Channel;

    get channel(): amqplib.Channel {
        if (this._channel) {
            return this._channel;
        }
        throw new Error('Channel not created');
    }
    // /
    //  * Trigger init connection method
    //  */
    constructor() {
        this.queues = {};
    }

    // /
    //  * Initialize connection to rabbitMQ
    //  */
    async init(): Promise<MessageBroker> {
        try {
            const path = process.env.RABBITMQ_URL || 'amqp://localhost';
            console.log('Connecting Rabbit MQ: ' + path);

            this.connection = await amqplib.connect(path);
            this._channel = await this.connection?.createChannel();
            return this;
        } catch (e) {
            await new Promise((_) => setTimeout(_, 1000));
            console.log('Rabbit MQ Error: ' + e);
            return this.init();
        }
    }

    // /
    //  * Send message to queue
    //  * @param {String} queue Queue name
    //  * @param {Object} msg Message as Buffer
    //  */
    async send(queue: string, msg: any) {
        if (!this.connection) {
            await this.init();
        }
        await this.channel.assertQueue(queue, { durable: true });
        return this.channel.sendToQueue(queue, msg);
    }

    // /
    //  * @param {String} queue Queue name
    //  * @param {Function} handler Handler that will be invoked with given message and acknowledge function (msg, ack)
    //  */
    async subscribe(queue: string, handler: MessageHandler) {
        if (!this.connection) {
            await this.init();
        }
        if (this.queues[queue]) {
            const existingHandler = _.find(
                this.queues[queue],
                (h: MessageHandler) => h === handler,
            );
            if (existingHandler) {
                return () => this.unsubscribe(queue, existingHandler);
            }
            this.queues[queue].push(handler);
            return () => this.unsubscribe(queue, handler);
        }

        await this.channel.assertQueue(queue, { durable: true });
        this.queues[queue] = [handler];
        this.channel.consume(queue, async (msg: any) => {
            const ack = _.once(() => this.channel.ack(msg));
            this.queues[queue].forEach((h: MessageHandler) => h(msg, ack));
        });
        return () => this.unsubscribe(queue, handler);
    }

    async unsubscribe(queue: string, handler: MessageHandler) {
        _.pull(this.queues[queue], handler);
    }
}
