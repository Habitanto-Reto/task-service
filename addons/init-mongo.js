db.createUser({
    user: 'auth-user',
    pwd: 'password-db',
    roles: [
        {
            role: 'readWrite',
            db: 'users'
        }
    ]
});
