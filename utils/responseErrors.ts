const getUserLoginError = (error:any) => {
    const {code} = error
    if (code) {
        if (code === 'auth/wrong-password' || code === 'auth/user-not-found') {
            return 'Dane logowania są nieprawidłowe'
        }
        if (code === 'auth/invalid-email') {
            return 'Podany email, nie jest emailem'
        }
    }
    return 'Inny błąd'
}

export {
    getUserLoginError
}
