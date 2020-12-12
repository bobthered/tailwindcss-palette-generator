<link rel="stylesheet" type="text/css" href="./style.css" />
<h1 class="text-center text-4xl p-8">TailwindCSS - Palette Generator</h1>
<p class="text-center p-4">
Quickly generate <a href="https://tailwindcss.com" class="shadow-link hover:no-underline">tailwindcss</a> color palettes from a base color or colors.
</p>
<div class="flex justify-center py-4">
  <a href="https://badge.fury.io/js/%40bobthered%2Ftailwindcss-palette-generator">
    <img src="https://badge.fury.io/js/%40bobthered%2Ftailwindcss-palette-generator.svg"
         alt="NPM">
  </a>
</div>

<div class="items-center py-4 text-lg text-center">
  <a href="#key-features" class="shadow-link hover:no-underline">Key Features</a> •
  <a href="#installation" class="shadow-link hover:no-underline">Installation</a> •
  <a href="#usage" class="shadow-link hover:no-underline">Usage</a>
</div>

<div class="flex flex-col">
  <section id="key-features" class="w-full py-4">
    <h4 class="text-2xl py-4">Key Features</h4>
    <ul class="list-disc pl-4">
      <li>Generate color palette with as little as a hex value</li>
      <li>Customize the palette shade names</li>
      <li>Default color naming applied automatically or can be overwritten</li>
      <li>Shade intensities can be overwritten for full control</li>
    </ul>
  </section>
  <section id="installation" class="w-full py-4">
  <h4 class="text-2xl py-4">Installation</h4>
    
    npm i @bobthered/tailwindcss-palette-generator

  </section>
  <section id="usage" class="w-full py-4">
    <h4 class="text-2xl py-4">Usage</h4>

    // tailwind.config.js
    const paletteGenerator = require('@bobthered/tailwindcss-palette-generator');

    module.exports = {
      purge: [],
      darkMode: false, // or 'media' or 'class'
      theme: {
        extend: {
          colors: paletteGenerator('#FF0040'),
        },
      },
      variants: {},
      plugins: [],
    };

  </section>
</div>
