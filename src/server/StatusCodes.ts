export class StatusCode {
    //success codes
    /** Code 200 */
    static readonly OK = 200;
    /** Code 201 */
    static readonly CREATED = 201;
    /** Code 202 */
    static readonly ACCEPTED = 202;
    /** Code 204 */
    static readonly NO_CONTENT = 204;
    //client error code
    /** Code 400 */
    static readonly BAD_REQUEST = 400;
    /** Code 401 */
    static readonly UNAUTHORISED = 401;
    /** Code 403 */
    static readonly FORBIDDEN = 403;
    /** Code 404 */
    static readonly NOT_FOUND = 404;
    /** Code 407 */
    static readonly PROXY_AUTH_REQUIRED = 407;
    /** Code 408 */
    static readonly REQUEST_TIMEOUT = 408;
    /** Code 409 */
    static readonly CONFLICT = 409;
    /** Code 418 */
    static readonly IM_A_TEAPOT = 418;
    /** Code 422 */
    static readonly UNPROCESSABLE_CONTENT = 422;
    //server error code
    /** Code 500 */
    static readonly INTERNAL_ERROR = 500;
    /** Code 501 */
    static readonly NOT_IMPLEMENTED = 501;
    /** Code 502 */
    static readonly BAD_GATEWAY = 502;
    /** Code 503 */
    static readonly SERVICE_UNAVAILABLE = 503;
    /** Code 511 */
    static readonly NETWORK_AUTH_REQUIRED = 511;
}
