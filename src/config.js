module.exports = {
    PORT: process.env.PORT || 8000,
    API_TOKEN: process.env.API_TOKEN || "910237e9-95fd-4ecf-b17b-4af6605a1f01",
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/noteful',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL
}