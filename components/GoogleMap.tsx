"use client"
import { useEffect } from 'react';


declare global {
    interface Window {
      google: any;
    }
}
const GoogleMap = () => {
  useEffect(() => {
    const initMap = () => {
      const map = new (window as any).google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: {lat: 21.026384799985255, lng:105.83220831216669}, // Vị trí mặc định là Hà nội
        zoom: 12,
        disableDefaultUI: true,  // Tắt toàn bộ UI mặc định
        zoomControl: false,      // Tắt nút zoom
        mapTypeControl: false,   // Tắt lựa chọn loại bản đồ
        streetViewControl: false
      });

      new (window as any).google.maps.Marker({
        position: { lat:  21.037984582333312, lng: 105.74725106668771 },
        map,
        title: 'Hello Hồ Chí Minh!',
      });
    };
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', initMap);
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return <div id="map" className='w-full h-full'></div>;
};

export default GoogleMap;
