export const isStrongPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~-])[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~-]{8,}$/
        .test(password);
};
