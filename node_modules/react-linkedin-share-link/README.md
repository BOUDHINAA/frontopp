# react-linkedin-link

Create "share this on Linkedin" links in React.

## Installation

With npm:

```bash
npm install --save react-linkedin-share-link
```

Or with Yarn:

```bash
yarn add react-linkedin-share-link
```

## Usage

```jsx
import ShareLink from 'react-linkedin-share-link'

...

<ShareLink link='https://your-site.com/some-page'>
   {link => (
      <a href={link} target='_blank'>Share this on Linkedin</a>
   )}
</ShareLink>
```

If you don't pass in a `link` prop, it will use the current page (`window.location.href`).