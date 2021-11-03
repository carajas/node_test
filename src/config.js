module.exports = {
    database: `${process.env.DB}`,
    versionApi: "v1",
    base: "api",
    port: 8080,
    oracle: {
        user: `${process.env.USER}`,
        password: `${process.env.PASSWORD}`,
        connectString: `${process.env.CONNECTSTRING}`
    }
}