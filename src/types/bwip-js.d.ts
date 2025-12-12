declare module "bwip-js" {
  interface ToCanvasOptions {
    [key: string]: unknown;
  }

  interface ToSVGOptions {
    [key: string]: unknown;
  }

  interface BwipJs {
    toCanvas: (canvas: HTMLCanvasElement, options: ToCanvasOptions) => void;
    toSVG: (options: ToSVGOptions) => string;
  }

  const bwipjs: BwipJs;
  export default bwipjs;
}
