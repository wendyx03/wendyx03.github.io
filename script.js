// Slideshow for AboutMe (index) page
document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
  
    function showSlide(index) {
      const slides = document.querySelectorAll('.slide');
      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      }
  
      slides.forEach((slide) => {
        slide.classList.remove('active');
      });
      slides[currentSlide].classList.add('active');
    }
  
    // Show the first slide initially
    showSlide(currentSlide);

    // Subsequent slide changing
    function changeSlide(n) {
        showSlide(currentSlide + n);
    }
  
    // TODO: Add timer option in addition to on-click
    document.querySelector('.prev').addEventListener('click', () => {changeSlide(-1);});
    document.querySelector('.next').addEventListener('click', () => {changeSlide(1)});
});


// Map showing locations for Travels page
// uses Google Maps API
// TODO: get async working lol why is it still yelling at me
async function initMap() {
    const center = { lat: 25.870900548426654, lng: 151.2065212563798}; // N of Sydney QVB
    var mapOptions = {
        zoom: 2,
        center: center,
        mapId: "DEMO_MAP",
        disableDefaultUI: true,
        // Below style from https://snazzymaps.com/style/144886 accessed 29th Feb 2025
        // Use style when you can afford $50/month -_-
        // styles: [
        //     {
        //         "featureType": "all",
        //         "elementType": "labels",
        //         "stylers": [{"visibility": "off"}, {"color": "#f49f53"}]
        //     },
        //     {
        //         "featureType": "all",
        //         "elementType": "labels.text",
        //         "stylers": [{"visibility": "simplified"}]
        //     },
        //     {
        //         "featureType": "landscape",
        //         "elementType": "all",
        //         "stylers": [{"color": "#f9ddc5"}, {"lightness": -7}]
        //     },
        //     {
        //         "featureType": "poi.business",
        //         "elementType": "all",
        //         "stylers": [{"color": "#645c20"}, {"lightness": 38}]
        //     },
        //     {
        //         "featureType": "poi.government",
        //         "elementType": "all",
        //         "stylers": [{"color": "#9e5916"}, {"lightness": 46}]
        //     },
        //     {
        //         "featureType": "poi.medical",
        //         "elementType": "geometry.fill",
        //         "stylers": [{"color": "#813033"}, {"lightness": 38}, {"visibility": "off"}]
        //     },
        //     {
        //         "featureType": "poi.park",
        //         "elementType": "all",
        //         "stylers": [{"color": "#645c20"}, {"lightness": 39}]
        //     },
        //     {
        //         "featureType": "poi.school",
        //         "elementType": "all",
        //         "stylers": [{"color": "#a95521"}, {"lightness": 35}]
        //     },
        //     {
        //         "featureType": "poi.sports_complex",
        //         "elementType": "all",
        //         "stylers": [{"color": "#9e5916"}, {"lightness": 32}]
        //     },
        //     {
        //         "featureType": "road",
        //         "elementType": "all",
        //         "stylers": [{"color": "#813033"}, {"lightness": 43}]
        //     },
        //     {
        //         "featureType": "road.local",
        //         "elementType": "geometry.fill",
        //         "stylers": [{"color": "#f19f53"}, {"weight": 1.3}, {"visibility": "on"}, {"lightness": 16}]
        //     },
        //     {
        //         "featureType": "road.local",
        //         "elementType": "geometry.stroke",
        //         "stylers": [{"color": "#f19f53"}, {"lightness": -10}]
        //     },
        //     {
        //         "featureType": "transit",
        //         "elementType": "all",
        //         "stylers": [{"lightness": 38}]
        //     },
        //     {
        //         "featureType": "transit.line",
        //         "elementType": "all",
        //         "stylers": [{"color": "#813033"}, {"lightness": 22}]
        //     },
        //     {
        //         "featureType": "transit.station",
        //         "elementType": "all",
        //         "stylers": [{"visibility": "off"}]
        //     },
        //     {
        //         "featureType": "water",
        //         "elementType": "all",
        //         "stylers": [{"color": "#1994bf"}, {"saturation": -69}, {"gamma": 0.99}, {"lightness": 43}]
        //     }
        // ]
    }

    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);

    // make marker and info box for every location in array
    var infoWindow = new google.maps.InfoWindow();
    for (const location of locations) {
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            title: location.title,
            position: { lat: location.lat, lng: location.lng },
        });

        marker.addListener("click", function() {
            var content = `
                <div style="text-align:center; margin:0; padding:0;">
                    <h3 style="margin:0; padding:0;">${location.title}</h3>
                    <p style="margin:4px 0;">${location.description}</p>
                    <img src="${location.image}" alt="${location.title}" style="width:200px; height:auto; margin-top:5px; border-radius:10px;">
                </div>
            `;
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        });
        
        // NOTE: for after gmp beta testing
        // marker.addEventListener('gmp-click', () => {
        //     infoWindow.open({anchor: marker});
        // });

        // const marker = document.querySelector('gmp-advanced-marker');
    }
}

const locations = [
    {
        title: "Shanghai",
        lat: 31.23206170662424,
        lng: 121.50670118061745,
        image: "./assets/Shanghai.jpg",
        description: "I was born and raised in Shanghai. I was such a cute baby, what happened?"
    },
    {
        title: "Hong Kong",
        lat: 31.23206170662424,
        lng: 121.50670118061745,
        image: "./assets/HK.jpg",
        description: "Visited on a working holiday:)"
    },
    {
        title: "Taiwan",
        lat: 25.103578240825716,
        lng: 121.82166443727816,
        image: "./assets/Taiwan.jpg",
        description: "Village of Jiufen, the inspo of Spirited Away"
    },
    {
        title: "Tokyo",
        lat: 35.65735032009932,
        lng: 139.79046053932964,
        image: "./assets/Tokyo.jpg",
        description: "teamLab Planets Museum"
    },
    {
        title: "Sydney",
        lat: -33.864911633816334,
        lng: 151.19284069696397,
        image: "./assets/Sydney.png",
        description: "Spot me at Sanct. jks I'm retired."
    },
    {
        title: "Lucerne",
        lat: 47.058648087688475,
        lng: 8.305954889192389,
        image: "./assets/Lucerne.jpg",
        description: "Home to some of the most beautiful lakes"
    },
    {
        title: "Jungfraujoch",
        lat: 46.54892490812434,
        lng: 7.980471685813933,
        image: "./assets/Jungfraujoch.jpg",
        description: "The highest railway in Europe"
    },
    {
        title: "Lisbon",
        lat: 38.723161075336186,
        lng: -9.14223009575278,
        image: "./assets/Lisbon.jpg",
        description: "I ate so many Portugese egg tarts"
    },
    {
        title: "Amsterdam",
        lat: 52.37090401745469,
        lng: 4.906008462663621,
        image: "./assets/Amsterdam.jpg",
        description: "sins were committed. ask me for stories"
    },
    {
        title: "London",
        lat: 51.50758961939199,
        lng: -0.12564332611880571,
        image: "./assets/London.jpg",
        description: "No fear Shakespeare!"
    },
    {
        title: "LA",
        lat: 33.771198105937984,
        lng: -118.19074757834349,
        image: "./assets/LA.jpg",
        description: "Glad I travelled here before it burnt down....."
    },
    {
        title: "Las Vegas",
        lat: 36.17811326424513,
        lng: -115.162655885836,
        image: "./assets/LV.jpg",
        description: "Watched Cirque du Soleil with the fam. No shenanigans."
    },
    {
        title: "New York",
        lat: 40.718534198109566,
        lng: -74.0001634996745,
        image: "./assets/NY.jpeg",
        description: "They fr racist affff assholes but I loved the place"
    },
    {
        title: "Toronto",
        lat: 43.655559916670036,
        lng: -79.3773853499927,
        image: "./assets/Toronto.jpg",
        description: "Just as racist as NY but I just didn't like it here"
    },
];