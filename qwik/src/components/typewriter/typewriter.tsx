import { component$, useStore, useVisibleTask$, $ } from '@builder.io/qwik';
import typewriterstyle from "./typewriter.module.css";


interface StringSwitcherStore {
  currentString: string;
  strings: string[];
  currentIndex: number;
}

export const StringSwitcher = component$(() => {
  // Define the store to hold our state
  const store = useStore<StringSwitcherStore>({
    currentString: '',
    strings: [
      'VPS Provider',
      'VDS Provider',
      'Bare Metal Provider',
      'Game Server Provider',
      'Web Developer',
      'PC Builder'
    ],
    currentIndex: 0,
  });

  // Function to switch to the next string
  const switchString = $(() => {
    store.currentIndex = (store.currentIndex + 1) % store.strings.length;
    store.currentString = store.strings[store.currentIndex];
  });

  // Use useVisibleTask$ to set up the interval when the component becomes visible
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    // Set the initial string
    store.currentString = store.strings[0];

    // Set up an interval to switch strings every 3 seconds
    const intervalId = setInterval(() => {
      switchString();
    }, 5000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
      <div class={typewriterstyle.wrapper}>
        <p class={typewriterstyle.text}>Your reliable </p>
        <p class={`${typewriterstyle.text} ${typewriterstyle.stringswitcher}`}>{store.currentString}</p>
        <p class={typewriterstyle.text}> since 2023</p>
      </div>
  );
});
