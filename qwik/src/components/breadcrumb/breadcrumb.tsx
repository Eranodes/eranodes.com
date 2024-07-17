import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import breadcrumbstyles from "./breadcrumb.module.css";

export default component$(() => {
  const loc = useLocation();
  const currentPath = loc.url.pathname;

  const getBreadcrumb = (path: string) => {
    switch (path) {
      case '/':
        return 'Home';
      default:
        return path;
    }
  };

  return (
    <>
      <h1></h1>
      <div class={breadcrumbstyles.wrapper}>
        {loc.isNavigating && <p>Loading...</p>}
        <p class={breadcrumbstyles.pathname}>
          {getBreadcrumb(currentPath)}
        </p>
      </div>
    </>
  );
});
