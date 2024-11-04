# Custom Startpage

A modern, customizable startpage featuring news updates, weather information, stock tracking, and organized links with status monitoring capabilities.

![startpage.png]

## Features

- New York Times news integration
- Real-time weather updates
- Stock market tracking with multiple tickers support
- Organized link management with online/offline status monitoring
- Clean and modern interface

## Prerequisites

Before setting up the startpage, you'll need to obtain the following API keys:

### 1. New York Times API
1. Visit [NYT Developer Portal](https://developer.nytimes.com/)
2. Create an account and sign in
3. Go to "Apps" and create a new application
4. Generate an API key
5. Copy the key to `nyt_API_key` in the config file

### 2. OpenWeatherMap API
1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Create an account and sign in
3. Navigate to "API Keys" section
4. Generate a new API key
5. Copy the key to `weather_API_key` in the config file

### 3. Mboum Finance API (via RapidAPI)
1. Create an account on [RapidAPI](https://rapidapi.com/)
2. Subscribe to [Mboum Finance API](https://rapidapi.com/sparior/api/mboum-finance/)
3. Copy your RapidAPI key
4. Add the key to `rapid_API_keys` array in the config file

**Note:** The free tier of Mboum Finance API is limited to 500 requests per month and 10 requests per minute. You can add multiple API keys from different accounts if you need higher limits.

## Configuration

### Debug Mode
```javascript
var debug_mode = true; // Set to false in production
```

### Stock Tickers
Configure which stocks you want to track:
```javascript
var stocks = [
    'TSM',
    'AAPL',
    'AMZN',
    '^SPX'  // Use ^ prefix for indices
];
```

### Link Configuration
Links are organized in groups and support status monitoring for local services:
```javascript
var links_var = [
    [
        ['link_name', 'url', 'status_monitoring'],
        // Example:
        ['github', 'https://github.com', 'false']
    ]
];
```

Link format:
- `link_name`: Display name for the link
- `url`: The URL to navigate to
- `status_monitoring`: Set to 'true' for local services you want to monitor, 'false' for external links

## Customizing Link Groups

The startpage comes with predefined link groups that you can modify:
1. Productivity (Email, Drive, etc.)
2. Shopping
3. Reddit
4. News
5. Personal
6. Local Services

To modify these groups, edit the `links_var` array in the config file. Each inner array represents a group of links.

### Local Services Configuration
For local services, use your local IP addresses or hostnames:
```javascript
['openmediavault', 'http://helium:8282', 'true'],
['portainer', 'http://helium:9000', 'true']
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/startpage.git
```

2. Edit `config.js` with your API keys and preferred links

3. Open `index.html` in your browser or host it on a web server

## Usage

- The page will automatically load with your configured links, news, weather, and stock information
- Status monitoring (if enabled) will check the availability of your local services
- Stock information updates periodically
- Weather and news are fetched on page load

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Acknowledgments

- New York Times API for news content
- OpenWeatherMap for weather data
- Mboum Finance API for stock information
- All other open-source contributors

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.![startpage](https://github.com/user-attachments/assets/19e2303f-d89c-4476-95f6-18d60bc09fbe)
