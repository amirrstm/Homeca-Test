import Facets from './components/Facets';
import Products from './components/Products';

export default function Page() {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-3">
        <Facets />
      </div>

      <div className="col-span-9">
        <Products />
      </div>
    </div>
  );
}
