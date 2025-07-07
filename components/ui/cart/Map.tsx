import { AuthContext } from '@/context/auth';
import { AddressDTO } from '@/types';
import { Loader } from '@googlemaps/js-api-loader';
import { Input } from '@heroui/input';
import React, { FC } from 'react'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'

const loader = new Loader({
  apiKey: "AIzaSyCFgCKva937BK3IEE4y-jWGhvXh5DNaRIg",
  version: "weekly"
});

let map: google.maps.Map;
let empresa_marker: google.maps.Marker;
let user_marker: google.maps.Marker;
let geocoder: google.maps.Geocoder;
let matrix_service: google.maps.DistanceMatrixService;

type Props = {
  initDestination?: { lat: number, lng: number };
  onSelectDirection: ( direction: { address: AddressDTO, distanceCost: string, distance: number } ) => void;
}

export const Map: FC<Props> = ({ onSelectDirection, initDestination = { lat: -12.190860, lng: -76.994641 } }) => {

  const { user } = React.useContext( AuthContext );

  const mapRef = React.useRef<HTMLDivElement>(null);
  const inputSearchRef = React.useRef<HTMLInputElement>(null);

  const [origin] = React.useState<{ lat: number, lng: number }>({ lat: -12.190860, lng: -76.994641 });
  const [destination, setDestination] = React.useState<{ lat: number, lng: number }>(initDestination );
  const [distance, setDistance] = React.useState<{ value: number, text: string }|null>(null);

  const [selectedLocality, setSelectedLocality] = React.useState("");
  const [selectedProvincia, setSelectedProvincia] = React.useState("");
  const [selectedDepartamento, setSelectedDepartamento] = React.useState("");
  const [selectedPostalCode, setSelectedPostalCode] = React.useState("");
  const [selectedUrbanizacion, setSelectedUrbanizacion] = React.useState("");
  const [selectedCalle, setSelectedCalle] = React.useState("");

  React.useEffect(() => {
    const initMap = async () => {

      const { Map } = await loader.importLibrary("maps");

      const position = { lat: -12.190860, lng: -76.994641 }

      map = new Map(mapRef.current as HTMLElement, {
        zoom: 20,
        center: origin,
        mapTypeControl: false,
      });

      geocoder = new google.maps.Geocoder();
      matrix_service = new google.maps.DistanceMatrixService();

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputSearchRef.current as HTMLInputElement);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputSearchRef.current as HTMLButtonElement);
      
      empresa_marker = new google.maps.Marker({
        map,
        position
      });

      user_marker = new google.maps.Marker({
        map,
        icon: {
          url: "https://lh3.googleusercontent.com/ogw/AF2bZyhaEe-p9PFpFLZj0B380luL69WHPtu6SIXX93mogIzL-k4=s32-c-mo"
        },
        label: {
          text: user ? user.firstName + "(Usted)" : "Tu",
          className: "text-semibold text-primary flex flex-col gap-2",
          fontSize: "15px"
        },
        title: user.firstName
      });
    }
    initMap();
  }, []);

  function displayRoute(
    service: google.maps.DirectionsService,
    display: google.maps.DirectionsRenderer
  ) {
    service
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: true,
      })
      .then((result: google.maps.DirectionsResult) => {
        display.setDirections(result);
      })
      .catch((e) => {
        console.log("Could not display directions due to: " + e);
      });
  }

  React.useEffect(() => {
    const selectedAddress = (selectedProvincia + (selectedLocality !== "" ? (", "+selectedLocality) : "")) + (selectedUrbanizacion !== "" ? (", "+selectedUrbanizacion) : "")  +  ( selectedCalle !== "" ? (", " + selectedCalle) : "" ); 
    onSelectDirection({
      address: {
        id: user.profile.address ? user.profile.address.id : "",
        department: selectedDepartamento,
        district: selectedLocality,
        lng: destination.lng,
        lta: destination.lat,
        postalCode: parseInt(selectedPostalCode),
        province: selectedProvincia,
        street: selectedCalle,
        urbanization: selectedUrbanizacion,
        fullAddress: selectedAddress
      },
      distance: distance?.value ? distance.value : 0.0,
      distanceCost: distance?.value ? (distance?.value * 2).toFixed(2) : ""
    });
  }, [selectedLocality, selectedDepartamento, selectedCalle, selectedPostalCode, selectedProvincia, selectedUrbanizacion, distance])

  React.useEffect(() => {
    (async() => {
      const { DirectionsService, DirectionsRenderer } = await loader.importLibrary("routes")
      const directionsService = new DirectionsService();
      const directionsRenderer = new DirectionsRenderer({
        draggable: true,
        map
      });
  
      directionsRenderer.addListener("directions_changed", () => {
        const directions = directionsRenderer.getDirections();
        if (directions) {
          computeTotalDistance(directions);
          const latlng = {
            lat: (directions.request.destination as google.maps.LatLng).lat(),
            lng: (directions.request.destination as google.maps.LatLng).lng()
          }
          codeLatLng(latlng);
        }
      });
  
      displayRoute(directionsService, directionsRenderer);
    })();

  }, [  ]);

  React.useEffect(() => {
    if( user.profile.address ){
      const { department, district, province, street, postalCode, urbanization } = user.profile.address;
      setSelectedCalle(street ? street : "");
      setSelectedDepartamento(department ? department: "");
      setSelectedLocality(district ? district : "");
      setSelectedUrbanizacion(urbanization ? urbanization : "");
      setSelectedPostalCode(postalCode ? postalCode+"" : "");
      setSelectedProvincia(province ? province: "");
    }else{
      const address = JSON.parse(Cookies.get("address") || "null") as AddressDTO;
      if( address ){
        const { department, district, province, street, postalCode, urbanization } = address;
        setSelectedCalle(street);
        setSelectedDepartamento(department);
        setSelectedLocality(district);
        setSelectedUrbanizacion(urbanization);
        setSelectedPostalCode(postalCode+"");
        setSelectedProvincia(province);
      }else {
        resetInputs();
      }
    }
  }, [user])

  function computeTotalDistance(result: google.maps.DirectionsResult) {
    let total = 0;
    const myroute = result.routes[0];
  
    if (!myroute) {
      return;
    }
  
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i]!.distance!.value;
    }
  
    total = total / 1000;
    setDistance({
      text: total + "km" ,
      value: total
    })
  }

  function codeLatLng({lat, lng}: { lat: number, lng: number }) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
      'location': latlng
    }, function (results, status) {
      resetInputs();
      if (status === google.maps.GeocoderStatus.OK) {
        if (results) {
          results[1].address_components.forEach( ac => {
            ac.types.forEach(t => {
              if(t === "locality"){
                setSelectedLocality(p => ac.short_name );
              }
              if(t === "route"){
                setSelectedCalle(p => ac.short_name );
              }
              if(t === "sublocality"){
                setSelectedUrbanizacion( ac.short_name );
              }
              if(t === "administrative_area_level_2"){
                setSelectedProvincia( ac.short_name );
              }
              if(t === "administrative_area_level_1"){
                setSelectedDepartamento( ac.short_name );
              }
              if(t === "postal_code"){
                setSelectedPostalCode( ac.short_name );
              }
            })
            setDestination({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            })
          })
        } else {
          toast.error('No results found');
        }
      } else {
        toast.error('ERROR GEOCODER REVERSE' + status);
      }
    });
  }

  function resetInputs() {
    setSelectedCalle("");
    setSelectedDepartamento("");
    setSelectedLocality("");
    setSelectedUrbanizacion("");
    setSelectedPostalCode("");
    setSelectedProvincia("");
  }

  return (
    <div className='flex flex-col gap-2'>
      <div id='map' className="h-[350px]" ref={mapRef}></div>
      <div className='flex flex-col gap-2'>
        <h2 className='font-semibold'>Dirección Seleccionada</h2>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <Input disabled value={ selectedDepartamento } size='sm' label="Departamento" />
            <Input disabled value={ selectedProvincia } size='sm' label="Provincia" />
          </div>
          <div className='flex gap-2'>
            <Input disabled value={ selectedLocality } size='sm' label="Distrito" />
            <Input disabled value={ selectedUrbanizacion } size='sm' label="Urbanizacion" />
          </div>
          <div className='flex gap-2'>
            <Input disabled value={ selectedPostalCode } size='sm' label="Codigo Postal" />
            <Input disabled value={ selectedCalle } size='sm' label="Calle" />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='font-semibold'>Distancia y Calculo de Precio</h2>
        <div className='flex gap-2'>
          <Input disabled value={ distance?.text || "" } size='sm' label="Distancia" />
          <Input disabled value={ distance?.value ? "S/. " + (distance?.value * 2).toFixed(2) : "" } size='sm' label="Costo de envio"/>
        </div>
      </div>
    </div>
  )
}