const Auth = {
    isAuthenticated: false,
    authenticate(response: object | string, path?: string, role?: string, isLogedMeIn?: boolean): void {
        if (isLogedMeIn) {
            window.localStorage.setItem("token", typeof response === "string" ? response : JSON.stringify(response))
            window.localStorage.setItem("role", role || "User")
            if (localStorage.getItem("token")) {
                this.isAuthenticated = true
            }
        } else {
            window.sessionStorage.setItem("token", typeof response === "string" ? response : JSON.stringify(response))
            window.sessionStorage.setItem("role", role || "User")
            if (sessionStorage.getItem("token")) {
                this.isAuthenticated = true
            }
        }

        window.location.href = path || "/"
    },
    signout(): void {
        this.isAuthenticated = false
        sessionStorage.clear()
        localStorage.clear()
        window.location.href = "/"
    },

    getAuth(): boolean {
        if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
            this.isAuthenticated = true
        }
        return this.isAuthenticated
    },
}

export default Auth
