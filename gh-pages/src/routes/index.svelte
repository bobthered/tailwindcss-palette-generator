<script>
  // imports
  import { copyToClipboard } from '@lib/actions';
  import { ntc } from '@lib/ntc';
  import { slide } from 'svelte/transition';
  import { Button, Fieldset, Icon, H1, Nav, Select } from 'sveltewind/components';
  import { Clipboard, Pencil, Trash } from 'sveltewind/components/icons';
  import { theme } from 'sveltewind/stores';

  // handlers
  const addClickHandler = () => (colors = [...colors, getNewColor(getRandomHex())]);
  const addToastMessage = (message) => {
    toastMessages = [...toastMessages, { _id: getId(), message }];
    setTimeout(() => {
      toastMessages = [...toastMessages.slice(0, 0), ...toastMessages.slice(1)];
    }, 3000);
  };
  const removeClickHandler = (i) => (colors = [...colors.slice(0, i), ...colors.slice(i + 1)]);

  // helpers
  const isLight = ({ h, s, l }) => {
    const { r, g, b } = hslToRGB({ h, s, l });
    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    return hsp > 127.5;
  };
  const getId = () => '_' + Math.random().toString(36).substr(2, 9);
  const getNewColor = (hex) => {
    return {
      hex,
      hsl: hexToHSL(hex),
      rgb: hexToRGB(hex),
      shades: getNewShades(hex)
    };
  };
  const getNewShades = (props) => {
    // check if prop is string
    if (typeof props === 'string') {
      // initiate color variables
      let hex;

      // determine if props is hex
      if (/^#[0-9A-F]{6}$/i.test(props)) hex = props;

      props = {
        hex,
        shades: [
          { name: '50', lightness: 98 },
          { name: '100', lightness: 95 },
          { name: '200', lightness: 90 },
          { name: '300', lightness: 82 },
          { name: '400', lightness: 64 },
          { name: '500', lightness: 46 },
          { name: '600', lightness: 33 },
          { name: '700', lightness: 24 },
          { name: '800', lightness: 14 },
          { name: '900', lightness: 7 },
          { name: '950', lightness: 4 }
        ]
      };
    }

    // convert hex to rgb
    props.hsl = hexToHSL(props.hex);

    // generate colors
    props.shades = props.shades.map(({ name, lightness }) => {
      // deconstruct base hsl
      const { h, s } = props.hsl;
      const hsl = { h, s, l: lightness };
      return { name, lightness, hsl };
    });

    return props.shades;
  };
  const getRandomHex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const getRandomHSL = () => {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 50) + 25;
    const l = Math.floor(Math.random() * 50) + 25;
    return { h, s, l };
  };
  const getShadeColor = ({ mode, hsl }) => {
    const { h, s, l } = hsl;
    if (mode === 'hex') return hslToHEX({ h, s, l });
    if (mode === 'hsl') return `hsl(${h}, ${s}%, ${l}%)`;
    if (mode === 'rgb') {
      const { r, g, b } = hslToRGB({ h, s, l });
      return `rgb(${r}, ${g}, ${b})`;
    }
  };
  const hexToHSL = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    try {
      let r = parseInt(result[1], 16);
      let g = parseInt(result[2], 16);
      let b = parseInt(result[3], 16);
      (r /= 255), (g /= 255), (b /= 255);
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h,
        s,
        l = (max + min) / 2;
      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      const HSL = new Object();
      HSL['h'] = Math.round(h * 360);
      HSL['s'] = Math.round(s * 100);
      HSL['l'] = Math.round(l * 100);
      return HSL;
    } catch (error) {
      console.log(hex);
      return { h: 0, s: 0, l: 0 };
    }
  };
  const hexToRGB = (hex) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  };
  const hslToHEX = ({ h, s, l }) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  const hslToRGB = ({ h, s, l }) => {
    var r, g, b;
    s /= 100;
    l /= 100;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      var hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };

  // props (internal)
  let colors = [getNewColor(getRandomHex())];
  let mode = 'hex';
  const modes = [
    { label: 'hex', value: 'hex' },
    { label: 'hsl', value: 'hsl' },
    { label: 'rgb', value: 'rgb' }
  ];
  let toastMessages = [];

  // props (dynamic)
  $: if (colors) {
    colors = [...colors].map(({ hex, name, shades, ...rest }) => {
      name = ntc.name(hex)[1].toLowerCase().replace(/\s/g, '-').replace(/'/g, '');
      shades = getNewShades({ hex, shades });
      return { hex, name, shades, ...rest };
    });
  }
</script>

<svelte:head>
  <title>Tailwindcss Palette Generator</title>
</svelte:head>

<div class="container mx-auto flex flex-col px-[1rem] py-[2rem] space-y-[2rem]">
  <H1>Tailwindcss Palette Generator</H1>
  <Nav class="flex-row overflow-y-visible justify-start items-end space-x-[1rem]">
    <Button on:click={addClickHandler}>Add Color</Button>
    <Fieldset legend="Color Mode">
      <Select options={modes} bind:value={mode} />
    </Fieldset>
  </Nav>
  <div
    class="grid grid-cols-6 lg:grid-cols-[fit-content(400px),1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-[.75rem] lg:gap-y-[1.5rem]"
  >
    {#each colors as { hex, name, shades }, i}
      <div transition:slide class="flex items-start space-x-[.5rem] min-w-[15rem]">
        <div class="flex space-x-[.5rem] w-full">
          {#if colors.length > 1}
            <Button
              class="{$theme.buttonIcon} bg-red-500 hover:bg-red-600 focus:bg-red-600 focus:ring-red-500/[.3]"
              on:click={() => removeClickHandler(i)}><Icon src={Trash} /></Button
            >
          {/if}
          <label class="group flex relative cursor-pointer">
            <input
              bind:value={hex}
              class="absolute opacity-0 p-0 top-0 w-0 peer"
              tabindex="-1"
              type="color"
            />
            <Button
              class="{$theme.buttonIcon} pointer-events-none peer-focus:ring-blue-500/[.3] peer-focus:bg-blue-600 group-hover:bg-blue-600"
              ><Icon src={Pencil} /></Button
            >
          </label>
          <div class="font-bold whitespace-nowrap">{name}</div>
        </div>
      </div>
      {#each shades as { name, hsl: { h, s, l } }, i}
        <div
          transition:slide={{ delay: i * 15 }}
          class="flex flex-col space-y-[.5rem] text-[.875rem]"
        >
          <button
            class="group relative w-full h-[5rem] outline-none rounded ring ring-transparent ring-offset-1 transform transition duration-200 scale-[1] hover:scale-[1.1] focus:scale-[1.1] ring-offset-black/[.25] dark:ring-offset-white/[.25] focus:ring-black/[.3] dark:focus:ring-white/[.3]"
            on:click={() => addToastMessage(`Copied ${getShadeColor({ mode, hsl: { h, s, l } })}`)}
            style={`background-color:hsl(${h},${s}%,${l}%);`}
            use:copyToClipboard={{
              trigger: 'click',
              text: getShadeColor({ mode, hsl: { h, s, l } })
            }}
          >
            <Icon
              class="transition duration-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-25%] opacity-0 group-hover:opacity-100 group-hover:translate-y-[-50%] group-focus:opacity-100 group-focus:translate-y-[-50%] {isLight(
                { h, s, l }
              )
                ? 'text-black'
                : 'text-white'}"
              src={Clipboard}
            />
          </button>
          <div class="flex flex-col space-y-[.25rem]">
            <div class="font-bold">{name}</div>
            <div>
              {getShadeColor({ mode, hsl: { h, s, l } })}
            </div>
          </div>
        </div>
      {/each}
    {/each}
  </div>
</div>

<div class="fixed bottom-0 right-0 z-[1]">
  <div class="flex flex-col p-[1rem] absolute bottom-0 right-0 space-y-[.5rem] items-end">
    {#each toastMessages as toastMessage (toastMessage._id)}
      <div
        class="rounded bg-gray-100/[.9] shadow-sm dark:bg-gray-800/[.9] whitespace-nowrap px-[1.5rem] py-[.75rem]"
        transition:slide={{ duration: 200 }}
      >
        {toastMessage.message}
      </div>
    {/each}
  </div>
</div>
