<script>
  // imports
  import { Header, Main, Nav } from 'sveltewind/components';
  import { theme } from 'sveltewind/stores';
  import '../app.css';

  theme.set({
    buttonIcon: 'px-[.5rem]',
    header: 'bg-white shadow-sm'
  });
</script>

<Main class="lg:flex-col">
  <!-- <Header><div class="container mx-auto px-[1rem]"><Nav>Test</Nav></div></Header> -->
  <slot />
</Main>
