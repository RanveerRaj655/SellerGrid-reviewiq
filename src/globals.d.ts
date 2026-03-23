// CSS modules type declaration for Next.js
declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.css?url' {
  const content: string;
  export default content;
}

