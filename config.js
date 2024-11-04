// JS configuration for CKraft11's Startpage

// Page Configuration ############################

var debug_mode = true; // Debug mode (true/false)

// New York Times API Key ########################

var nyt_API_key = "PUT_API_KEY_HERE";

// OpenWeatherMap API Key ########################

var weather_API_key = 'PUT_API_KEY_HERE';

// Mboum Finance RapidAPI Keys ###################

/* 
Notes:
    - Single API key limited to 500 requests per month and 10 requests per minute.
    - you can add multiple api keys from multiple accounts if you plan on exceeding this
    - link to API: https://rapidapi.com/sparior/api/mboum-finance/
*/

var rapid_API_keys = ['PUT_API_KEY_HERE','OPTIONAL_API_KEY_HERE'];

// Stock Tickers #################################

/* 
Notes:
    - Add "^" before ticker for index (e.g. ^SPX for S&P 500)
*/

var stocks = [
    'TSM',
    'AAPL',
    'AMZN',
    'TSLA',
    'GOOGL',
    'MSFT',
    'NVO',
    'LLY',
    '^SPX'
    ];

// Startpage Links ################################

/* 
Notes:
    Format: ["Link Name", "Link URL", "Status"]
    Status: Displays Online/Offline Status and Ping (true/false) (use this for local services if applicable)
*/

var links_var = [

    [
        ['inbox', 'https://inbox.google.com', 'false'],
        ['drive', 'https://drive.google.com', 'false'],
        ['outlook', 'https://outlook.office.com/mail/', 'false'],
        ['okta', 'https://iastate.okta.com/app/UserHome', 'false'],
        ['canvas', 'https://canvas.iastate.edu/?login_success=1', 'false'],
    ],
    [
        ['amazon', 'https://amazon.com', 'false'],
        ['aliexpress', 'https://aliexpress.com', 'false'],
        ['ebay', 'https://ebay.com', 'false'],
        ['drop', 'https://drop.com/home', 'false'],
        ['newegg', 'https://www.newegg.com', 'false'],
    ],
    [
        ['/r/3dprinting', 'https://reddit.com/r/3dprinting', 'false'],
        ['/r/mechanicalkeyboards', 'https://reddit.com/r/mechanicalkeyboards', 'false'],
        ['/r/homelab', 'https://www.reddit.com/r/homelab/', 'false'],
        ['/r/selfhosted', 'https://www.reddit.com/r/selfhosted/', 'false'],
        ['/r/custom keyboards', 'https://reddit.com/r/customkeyboards', 'false'],
    ],
    [
        ['fivethirtyeight', 'https://fivethirtyeight.com/', 'false'],
        ['associated press', 'https://apnews.com', 'false'],
        ['reuters', 'https://www.reuters.com/', 'false'],
        ['aljazeera', 'https://www.aljazeera.com/', 'false'],
        ['ars technica', 'https://arstechnica.com', 'false'],
    
    ],
    [
        ['github', 'https://github.com/CKraft11', 'false'],
        ['tailscale', 'https://login.tailscale.com/admin/machines', 'false'],
        ['linkedin', 'https://linkedin.com', 'false'],
        ['dccu', 'https://my.deereemployeescu.com/login', 'false'],
        ['fidelity', 'https://www.fidelity.com', 'false'],
    
    ],
    [
        ['openmediavault', 'http://helium:8282', 'false'],
        ['ghost blog', 'http://helium:2368/ghost', 'false'],
        ['desktop', 'http://helium:8090', 'false'],
        ['portainer', 'http://helium:9000', 'false'],
        ['router', 'https://10.0.0.1', 'false'],
    
    ],
];
