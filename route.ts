/**
 * An Array of routes that are accessible to the public
 * Thanh
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/checkoutForm",
    "/menu"
]
/**
 * An Array of routes that are used for authentication purposes
 * @type {string[]}
 */
export const authenRoutes = [
    "/login",
    "/register"
]
/**
 * An api route that are always allowed for accessible
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"
/**
 * An api route that is redirected after login in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/"
