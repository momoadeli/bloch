"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("../crypto");
const config_1 = require("../config/config");
/**
 * Get special reward transaction
 */
function getCoinbaseTransaction(minerAddress) {
    return {
        id: crypto_1.generateUUID(),
        input: {},
        outputs: [
            { address: minerAddress, amount: config_1.config.miningReward },
        ],
    };
}
exports.getCoinbaseTransaction = getCoinbaseTransaction;
/**
 * Get a new transaction
 */
function getNewTransaction(sourceAddress, destAddress, sourceBalance, sendAmount) {
    if (sendAmount > sourceBalance) {
        throw new RangeError(`Amount ${sendAmount} exceeds wallet balance of ${sourceBalance}`);
    }
    return {
        id: crypto_1.generateUUID(),
        input: {
            address: sourceAddress,
            amount: sourceBalance,
            timestamp: Date.now(),
        },
        outputs: [
            { address: destAddress, amount: sendAmount },
            { address: sourceAddress, amount: sourceBalance - sendAmount },
        ],
    };
}
exports.getNewTransaction = getNewTransaction;
/**
 * Cryptographically sign a transaction with sender's private key
 */
function signTransaction(unsigned, senderPrivKey) {
    const hashedOutputs = crypto_1.generateHash(JSON.stringify(unsigned.outputs));
    const signature = crypto_1.signHash(senderPrivKey, hashedOutputs);
    return Object.assign(Object.assign({}, unsigned), { input: Object.assign(Object.assign({}, unsigned.input), { signature }) });
}
exports.signTransaction = signTransaction;
/**
 * Determine if a transaction is valid
 */
function isValidTransaction(tx) {
    const startingBalance = tx.input.amount;
    const outputBalance = tx.outputs.reduce((acc, out) => acc + out.amount, 0);
    // sum of all outputs must match input
    if (outputBalance !== startingBalance) {
        return false;
    }
    const { address, signature } = tx.input;
    const expectedTxHash = crypto_1.generateHash(JSON.stringify(tx.outputs));
    return crypto_1.verifySignature(address, signature, expectedTxHash);
}
exports.isValidTransaction = isValidTransaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hhaW4vdHJhbnNhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Y7QUFDbEYsNkNBQTBDO0FBRzFDOztHQUVHO0FBQ0gsU0FBZ0Isc0JBQXNCLENBQUMsWUFBb0I7SUFDekQsT0FBTztRQUNMLEVBQUUsRUFBRSxxQkFBWSxFQUFFO1FBQ2xCLEtBQUssRUFBRSxFQUFFO1FBQ1QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxlQUFNLENBQUMsWUFBWSxFQUFFO1NBQ3ZEO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFSRCx3REFRQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsaUJBQWlCLENBQUMsYUFBcUIsRUFBRSxXQUFtQixFQUFFLGFBQXFCLEVBQUUsVUFBa0I7SUFDckgsSUFBSSxVQUFVLEdBQUcsYUFBYSxFQUFFO1FBQzlCLE1BQU0sSUFBSSxVQUFVLENBQUMsVUFBVSxVQUFVLDhCQUE4QixhQUFhLEVBQUUsQ0FBQyxDQUFDO0tBQ3pGO0lBRUQsT0FBTztRQUNMLEVBQUUsRUFBRSxxQkFBWSxFQUFFO1FBQ2xCLEtBQUssRUFBRTtZQUNMLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1NBQ3RCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUU7WUFDNUMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxhQUFhLEdBQUcsVUFBVSxFQUFFO1NBQy9EO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFqQkQsOENBaUJDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixlQUFlLENBQUMsUUFBNkIsRUFBRSxhQUFxQjtJQUNsRixNQUFNLGFBQWEsR0FBRyxxQkFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDckUsTUFBTSxTQUFTLEdBQUcsaUJBQVEsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFekQsdUNBQ0ssUUFBUSxLQUNYLEtBQUssa0NBQ0EsUUFBUSxDQUFDLEtBQUssS0FDakIsU0FBUyxPQUVYO0FBQ0osQ0FBQztBQVhELDBDQVdDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxFQUFxQjtJQUN0RCxNQUFNLGVBQWUsR0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNoRCxNQUFNLGFBQWEsR0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXBGLHNDQUFzQztJQUNyQyxJQUFJLGFBQWEsS0FBSyxlQUFlLEVBQUU7UUFDckMsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUV4QyxNQUFNLGNBQWMsR0FBRyxxQkFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFaEUsT0FBTyx3QkFBZSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQWRELGdEQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdmVyaWZ5U2lnbmF0dXJlLCBnZW5lcmF0ZUhhc2gsIGdlbmVyYXRlVVVJRCwgc2lnbkhhc2ggfSBmcm9tICcuLi9jcnlwdG8nO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgeyBDb2luYmFzZVRyYW5zYWN0aW9uLCBVbnNpZ25lZFRyYW5zYWN0aW9uLCBTaWduZWRUcmFuc2FjdGlvbiB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuLyoqXG4gKiBHZXQgc3BlY2lhbCByZXdhcmQgdHJhbnNhY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvaW5iYXNlVHJhbnNhY3Rpb24obWluZXJBZGRyZXNzOiBzdHJpbmcpOiBDb2luYmFzZVRyYW5zYWN0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogZ2VuZXJhdGVVVUlEKCksXG4gICAgaW5wdXQ6IHt9LFxuICAgIG91dHB1dHM6IFtcbiAgICAgIHsgYWRkcmVzczogbWluZXJBZGRyZXNzLCBhbW91bnQ6IGNvbmZpZy5taW5pbmdSZXdhcmQgfSxcbiAgICBdLFxuICB9O1xufVxuXG4vKipcbiAqIEdldCBhIG5ldyB0cmFuc2FjdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV3VHJhbnNhY3Rpb24oc291cmNlQWRkcmVzczogc3RyaW5nLCBkZXN0QWRkcmVzczogc3RyaW5nLCBzb3VyY2VCYWxhbmNlOiBudW1iZXIsIHNlbmRBbW91bnQ6IG51bWJlcik6IFVuc2lnbmVkVHJhbnNhY3Rpb24ge1xuICBpZiAoc2VuZEFtb3VudCA+IHNvdXJjZUJhbGFuY2UpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgQW1vdW50ICR7c2VuZEFtb3VudH0gZXhjZWVkcyB3YWxsZXQgYmFsYW5jZSBvZiAke3NvdXJjZUJhbGFuY2V9YCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlkOiBnZW5lcmF0ZVVVSUQoKSxcbiAgICBpbnB1dDoge1xuICAgICAgYWRkcmVzczogc291cmNlQWRkcmVzcyxcbiAgICAgIGFtb3VudDogc291cmNlQmFsYW5jZSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9LFxuICAgIG91dHB1dHM6IFtcbiAgICAgIHsgYWRkcmVzczogZGVzdEFkZHJlc3MsIGFtb3VudDogc2VuZEFtb3VudCB9LFxuICAgICAgeyBhZGRyZXNzOiBzb3VyY2VBZGRyZXNzLCBhbW91bnQ6IHNvdXJjZUJhbGFuY2UgLSBzZW5kQW1vdW50IH0sXG4gICAgXSxcbiAgfTtcbn1cblxuLyoqXG4gKiBDcnlwdG9ncmFwaGljYWxseSBzaWduIGEgdHJhbnNhY3Rpb24gd2l0aCBzZW5kZXIncyBwcml2YXRlIGtleVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2lnblRyYW5zYWN0aW9uKHVuc2lnbmVkOiBVbnNpZ25lZFRyYW5zYWN0aW9uLCBzZW5kZXJQcml2S2V5OiBzdHJpbmcpOiBTaWduZWRUcmFuc2FjdGlvbiB7XG4gIGNvbnN0IGhhc2hlZE91dHB1dHMgPSBnZW5lcmF0ZUhhc2goSlNPTi5zdHJpbmdpZnkodW5zaWduZWQub3V0cHV0cykpO1xuICBjb25zdCBzaWduYXR1cmUgPSBzaWduSGFzaChzZW5kZXJQcml2S2V5LCBoYXNoZWRPdXRwdXRzKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnVuc2lnbmVkLFxuICAgIGlucHV0OiB7XG4gICAgICAuLi51bnNpZ25lZC5pbnB1dCxcbiAgICAgIHNpZ25hdHVyZSxcbiAgICB9LFxuICB9O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHRyYW5zYWN0aW9uIGlzIHZhbGlkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkVHJhbnNhY3Rpb24odHg6IFNpZ25lZFRyYW5zYWN0aW9uKTogYm9vbGVhbiB7XG4gIGNvbnN0IHN0YXJ0aW5nQmFsYW5jZTogbnVtYmVyID0gdHguaW5wdXQuYW1vdW50O1xuICBjb25zdCBvdXRwdXRCYWxhbmNlOiBudW1iZXIgPSB0eC5vdXRwdXRzLnJlZHVjZSgoYWNjLCBvdXQpID0+IGFjYyArIG91dC5hbW91bnQsIDApO1xuXG4gLy8gc3VtIG9mIGFsbCBvdXRwdXRzIG11c3QgbWF0Y2ggaW5wdXRcbiAgaWYgKG91dHB1dEJhbGFuY2UgIT09IHN0YXJ0aW5nQmFsYW5jZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHsgYWRkcmVzcywgc2lnbmF0dXJlIH0gPSB0eC5pbnB1dDtcblxuICBjb25zdCBleHBlY3RlZFR4SGFzaCA9IGdlbmVyYXRlSGFzaChKU09OLnN0cmluZ2lmeSh0eC5vdXRwdXRzKSk7XG5cbiAgcmV0dXJuIHZlcmlmeVNpZ25hdHVyZShhZGRyZXNzLCBzaWduYXR1cmUsIGV4cGVjdGVkVHhIYXNoKTtcbn1cbiJdfQ==