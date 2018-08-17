var routes = [
  // Index page
    {
        path: '/',
        url: './index.html',
        name: 'home',
  },
  // About page
    {
        path: '/map/',
        componentUrl: './pages/map.html',
        name: 'map',
        //on: pageInit: 
  },
    {
        path: '/historie/',
        url: './pages/historie.html',
        name: 'historie',
  },
    {
        path: '/weer/',
        componentUrl: './pages/weer.html',
        name: 'weer',
  },
    {
        path: '/promoties/',
        url: './pages/promoties.html',
        name: 'promoties',
  },
    {
        path: '/tijdelijk/',
        url: './pages/tijdelijk.html',
        name: 'tijdelijk',
  },
    {
        path: '/receptjes/',
        url: './pages/receptjes.html',
        name: 'receptjes',
  },
    {
        path: '/saladebar/',
        url: './pages/saladebar.html',
        name: 'saladebar',
  },
    {
        path: '/schotels/',
        url: './pages/schotels.html',
        name: 'schotels',
  },

    


  // Color Themes
    {
        path: '/color-themes/',
        componentUrl: './pages/color-themes.html',
  },



  // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
  },
];
