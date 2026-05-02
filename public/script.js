// This script runs synchronously in the <head> to prevent a Flash of Unstyled Content (FOUC)
// by setting the theme class before the body is rendered.
if (localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: light)').matches)) {
    document.documentElement.classList.remove('dark');
} else {
    document.documentElement.classList.add('dark');
}
