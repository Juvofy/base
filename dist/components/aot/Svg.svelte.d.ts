import type { SVGAttributes } from "svelte/elements";
export interface Props extends SVGAttributes<SVGSVGElement> {
    vars: {
        raw: string;
        fileId: string;
        attributes: SVGAttributes<SVGSymbolElement>;
    };
}
declare const Svg: import("svelte").Component<Props, {}, "">;
type Svg = ReturnType<typeof Svg>;
export default Svg;
