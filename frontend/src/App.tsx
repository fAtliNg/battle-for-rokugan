import { GameMap } from './components/GameMap';
import { mapData } from './components/GameMap/data';
import { IRegion } from './components/GameMap/types';

function App() {
  return (
    <div className="App">
      <GameMap 
        data={mapData as any[]}
        onProvinceClick={(currentProvince) => {
          console.log(currentProvince)
        }} 
      />
    </div>
  );
}

export default App;