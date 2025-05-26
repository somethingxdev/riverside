import { Map, Marker } from 'pigeon-maps';

const RiversideMap = () => {
  return (
    <Map  defaultCenter={[32.50707038398977, -93.74667575916865]} defaultZoom={17}>
      <Marker width={50} anchor={[32.50707038398977, -93.74667575916865]} />
    </Map>
  );
};

export default RiversideMap;
