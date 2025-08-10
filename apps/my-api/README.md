# My API

## CORS Configuration

The API uses environment variables for CORS configuration:

### Development
By default, `http://localhost:4200` is allowed. No configuration needed.

### Production
Set the `ALLOWED_ORIGINS` environment variable with comma-separated origins:

```bash
# Example:
ALLOWED_ORIGINS=https://myapp.com,https://admin.myapp.com

# To allow any origin (not recommended for production):
ALLOWED_ORIGINS=*
```

### Security Features
- Origin validation
- Support for multiple origins
- Configurable allowed methods and headers
- Credentials support (for cookies/auth)
- Pre-flight request caching (24 hours)
- Protection against unauthorized origins

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Set to 'production' for production mode | 'development' |
| ALLOWED_ORIGINS | Comma-separated list of allowed origins | http://localhost:4200 |

### CORS Options

The following headers and methods are allowed:
- Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
- Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization
- Credentials: Enabled
- Max Age: 24 hours (86400 seconds)
