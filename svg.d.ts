// Без импортов на верхнем уровне: иначе файл станет модулем
// и declare module превратится в дополнение, а не в объявление.

// SVG как React-компонент: import Icon from "./icon.svg?react".
// Через @svgr/webpack (Next) и vite-plugin-svgr (vitest). Суффикс нужен,
// потому что тип "*.svg" Next уже объявил как any и перекрыть его нельзя
declare module "*.svg?react" {
  const SvgComponent: import("react").FC<
    import("react").SVGProps<SVGSVGElement>
  >;

  export default SvgComponent;
}

// SVG как файл: import icon from "./icon.svg?url" → <Image src={icon} />.
// Next отдаёт объект { src, width, height }, а не строку
declare module "*.svg?url" {
  const image: import("next/image").StaticImageData;

  export default image;
}
