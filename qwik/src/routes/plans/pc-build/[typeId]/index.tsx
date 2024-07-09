// routes/products/[productId]/index.tsx
import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const loc = useLocation();
  return(
    <>
        <div class="container"></div>
        <h1>Pc Build ({loc.params.typeId})</h1>
    </>
  ) 
});