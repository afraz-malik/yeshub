import Auth from "../../Routes/Authentication"

const isLoggedIn = Auth.getAuth()

export { isLoggedIn }
